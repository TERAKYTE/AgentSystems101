#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Batch-fix Markdown bold formatting.

Replaces **text** with <strong>text</strong> outside fenced code blocks.
"""

import re
import os

def fix_bold_format_in_file(file_path):
    """Fix bold formatting in a single file."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Locate fenced code blocks first so they are not modified.
        code_blocks = []
        code_pattern = r'```[\s\S]*?```'
        for match in re.finditer(code_pattern, content):
            code_blocks.append((match.start(), match.end()))
        
        # Replace **text** with <strong>text</strong> outside code fences.
        pattern = r'\*\*([^*]+?)\*\*'
        
        def replacement_func(match):
            # Skip matches inside fenced code blocks.
            match_start = match.start()
            for block_start, block_end in code_blocks:
                if block_start <= match_start < block_end:
                    return match.group(0)
            return f'<strong>{match.group(1)}</strong>'
        
        new_content = re.sub(pattern, replacement_func, content)
        
        if new_content != content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"[fixed] {file_path}")
            return True
        else:
            print(f"[unchanged] {file_path}")
            return False
            
    except Exception as e:
        print(f"[error] Could not process {file_path}: {e}")
        return False

def main():
    """Run the Markdown bold-format fixer."""
    docs_dir = "xxx/xxx"
    
    md_files = []
    for root, dirs, files in os.walk(docs_dir):
        for file in files:
            if file.endswith('.md'):
                md_files.append(os.path.join(root, file))
    
    print(f"Found {len(md_files)} Markdown files")
    print("=" * 50)
    
    modified_count = 0
    for file_path in md_files:
        if fix_bold_format_in_file(file_path):
            modified_count += 1
    
    print("=" * 50)
    print(f"Done. Modified {modified_count} files")

if __name__ == "__main__":
    main()
