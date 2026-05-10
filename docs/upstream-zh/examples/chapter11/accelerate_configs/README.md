# Accelerate Configuration Files

This directory contains Hugging Face Accelerate configuration files for distributed training.

## Configuration Files

### `multi_gpu_ddp.yaml`

Data Parallelism (DDP) is the simplest multi-GPU training setup.

- **Best for**: one machine with 2-8 GPUs.
- **Pros**: simple and fast.
- **Cons**: every GPU stores a full model copy.
- **Memory requirement**: roughly the same per GPU as single-GPU training.

Run:

```bash
accelerate launch --config_file accelerate_configs/multi_gpu_ddp.yaml train_script.py
```

### `deepspeed_zero2.yaml`

DeepSpeed ZeRO-2 shards optimizer state.

- **Best for**: medium models, roughly 1B-7B parameters.
- **Pros**: lower GPU memory use and larger batch sizes.
- **Cons**: slightly slower than DDP because of communication overhead.
- **Typical memory saving**: about 30%.

Run:

```bash
accelerate launch --config_file accelerate_configs/deepspeed_zero2.yaml train_script.py
```

### `deepspeed_zero3.yaml`

DeepSpeed ZeRO-3 shards optimizer state, gradients, and model parameters.

- **Best for**: larger models, especially above 7B parameters.
- **Pros**: strongest memory reduction.
- **Cons**: higher communication overhead and more configuration complexity.
- **Typical memory saving**: about 50%, depending on model and hardware.

Run:

```bash
accelerate launch --config_file accelerate_configs/deepspeed_zero3.yaml train_script.py
```

## Quickstart

### 1. Install Dependencies

```bash
pip install accelerate deepspeed
```

### 2. Configure Accelerate

Use a provided configuration file:

```bash
accelerate launch --config_file accelerate_configs/multi_gpu_ddp.yaml your_script.py
```

Or configure interactively:

```bash
accelerate config
```

Or pass launch arguments directly:

```bash
accelerate launch --num_processes 4 --mixed_precision fp16 your_script.py
```

### 3. Run Training

```bash
# DDP training with 4 GPUs.
accelerate launch --config_file accelerate_configs/multi_gpu_ddp.yaml 07_distributed_training.py

# DeepSpeed ZeRO-2 training with 4 GPUs.
accelerate launch --config_file accelerate_configs/deepspeed_zero2.yaml 07_distributed_training.py

# DeepSpeed ZeRO-3 training with 4 GPUs.
accelerate launch --config_file accelerate_configs/deepspeed_zero3.yaml 07_distributed_training.py
```

## Configuration Parameters

Common parameters:

- `compute_environment`: compute environment such as `LOCAL_MACHINE` or `AMAZON_SAGEMAKER`.
- `distributed_type`: distributed backend such as `MULTI_GPU`, `DEEPSPEED`, or `FSDP`.
- `num_processes`: total number of processes, usually the number of GPUs.
- `machine_rank`: node rank. The main node is `0`.
- `num_machines`: number of machines.
- `gpu_ids`: GPU IDs to use. `all` uses all available GPUs.
- `mixed_precision`: precision mode, such as `no`, `fp16`, or `bf16`.

DeepSpeed parameters:

- `zero_stage`: ZeRO optimization stage.
  - ZeRO-1 shards optimizer state.
  - ZeRO-2 shards optimizer state and gradients.
  - ZeRO-3 shards optimizer state, gradients, and model parameters.
- `offload_optimizer_device`: device for optimizer-state offload, such as `none`, `cpu`, or `nvme`.
- `offload_param_device`: device for parameter offload, such as `none`, `cpu`, or `nvme`.
- `gradient_accumulation_steps`: number of gradient accumulation steps.
- `gradient_clipping`: gradient clipping threshold.
- `zero3_init_flag`: ZeRO-3 initialization flag.

## Performance Tuning

### Batch Size

For distributed training:

```text
total_batch_size = per_device_batch_size * num_gpus * gradient_accumulation_steps
```

Example:

```python
# Single GPU: batch_size=4, gradient_accumulation=4, total_batch=16
# 4-GPU DDP: batch_size=4, gradient_accumulation=1, total_batch=16
```

### Learning Rate Scaling

Use linear or square-root scaling only after checking training stability:

```python
lr_new = lr_base * sqrt(total_batch_size_new / total_batch_size_base)
```

### Mixed Precision

- **fp16**: fast and suitable for many workloads.
- **bf16**: better numerical stability on Ampere-class GPUs such as A100 or A6000.
- **no**: full precision. Most stable, but slower and more memory-intensive.

### Gradient Accumulation

Increase `gradient_accumulation_steps` when GPU memory is tight:

```yaml
deepspeed_config:
  gradient_accumulation_steps: 8
```

## Troubleshooting

### How do I inspect the active Accelerate environment?

```bash
accelerate env
```

### Why is multi-GPU training not scaling linearly?

Common causes:

- Communication overhead.
- Data-loading bottlenecks.
- Batch size too small for the hardware.

Mitigations:

- Increase batch size if training remains stable.
- Improve data loading.
- Check network bandwidth for multi-node runs.

### Why is DeepSpeed training stuck?

Possible causes include model initialization problems or communication timeout.

Enable debug logs and increase timeout:

```bash
export ACCELERATE_LOG_LEVEL=INFO
export NCCL_DEBUG=INFO
export NCCL_TIMEOUT=1800
```

### How do I train across multiple nodes?

1. Install the same environment on every node.
2. Configure passwordless SSH if needed.
3. Set `num_machines` and `main_process_ip` in the configuration.
4. Run the same launch command on each node.

## References

- [Accelerate documentation](https://huggingface.co/docs/accelerate)
- [DeepSpeed documentation](https://www.deepspeed.ai/)
- [TRL distributed training guide](https://huggingface.co/docs/trl/customization)
