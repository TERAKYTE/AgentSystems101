# Weather MCP Server

This example implements a real weather-query MCP server with the HelloAgents framework.

## Features

- Real-time weather lookup.
- Support for 12 major Chinese cities.
- `wttr.in` integration with no API key required.
- HelloAgents-compatible MCP tool interface.

## Install

```bash
pip install hello-agents requests
```

## Usage

### Run Directly

```bash
python server.py
```

### Use with Claude Desktop

Edit `~/Library/Application Support/Claude/claude_desktop_config.json` on macOS or `%APPDATA%\Claude\claude_desktop_config.json` on Windows:

```json
{
  "mcpServers": {
    "weather": {
      "command": "python",
      "args": ["/path/to/server.py"]
    }
  }
}
```

### Use with HelloAgents

```python
from hello_agents import SimpleAgent, HelloAgentsLLM
from hello_agents.tools import MCPTool

agent = SimpleAgent(name="weather-assistant", llm=HelloAgentsLLM())
weather_tool = MCPTool(server_command=["python", "server.py"])
agent.add_tool(weather_tool)

response = agent.run("What is the weather in Beijing today?")
```

## API Tools

### `get_weather`

Returns current weather for a city.

Parameters:

- `city` (string): city name. Chinese and English names are supported.

Example:

```json
{
  "city": "Beijing"
}
```

Response:

```json
{
  "city": "Beijing",
  "temperature": 10.0,
  "feels_like": 9.0,
  "humidity": 94,
  "condition": "Light rain",
  "wind_speed": 1.7,
  "visibility": 10.0,
  "timestamp": "2025-10-09 13:25:03"
}
```

### `list_supported_cities`

Lists the built-in Chinese city aliases.

Response:

```json
{
  "cities": ["Beijing", "Shanghai", "Guangzhou", "Shenzhen", "Hangzhou", "Chengdu", "Chongqing", "Wuhan", "Xi'an", "Nanjing", "Tianjin", "Suzhou"],
  "count": 12
}
```

### `get_server_info`

Returns server metadata.

Response:

```json
{
  "name": "Weather MCP Server",
  "version": "1.0.0",
  "tools": ["get_weather", "list_supported_cities", "get_server_info"]
}
```

## Supported Cities

Built-in aliases cover Beijing, Shanghai, Guangzhou, Shenzhen, Hangzhou, Chengdu, Chongqing, Wuhan, Xi'an, Nanjing, Tianjin, and Suzhou. English city names can also be used to query other global locations through `wttr.in`.

## License

MIT License

## Authors

HelloAgents Team
