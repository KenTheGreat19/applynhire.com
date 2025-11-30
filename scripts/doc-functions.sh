#!/bin/bash

# Shell function to add to your .bashrc or .zshrc
# This function automatically moves newly created .md files to the documentation folder

# Add this to your ~/.bashrc or ~/.zshrc file:
doc_auto_organize() {
    # Watch the repository for new .md files and move them to documentation folder
    # Usage: doc_auto_organize /path/to/repo
    
    local repo_dir="${1:-.}"
    local docs_folder="$repo_dir/documentation"
    
    if [ ! -d "$docs_folder" ]; then
        echo "Error: Documentation folder not found at $docs_folder"
        return 1
    fi
    
    # Check for .md files in common directories and move them
    local dirs_to_check=(
        "$repo_dir"
        "$repo_dir/docs"
        "$repo_dir/backend"
        "$repo_dir/site"
        "$repo_dir/src"
    )
    
    for dir in "${dirs_to_check[@]}"; do
        if [ -d "$dir" ]; then
            find "$dir" -maxdepth 1 -name "*.md" -type f ! -path "$docs_folder/*" | while read -r file; do
                if [ -f "$file" ] && [ "$(dirname "$file")" != "$docs_folder" ]; then
                    local basename=$(basename "$file")
                    # Avoid moving if it's already in the docs folder
                    if [ ! -f "$docs_folder/$basename" ]; then
                        mv "$file" "$docs_folder/$basename"
                        echo "Moved: $basename"
                    fi
                fi
            done
        fi
    done
}

# Export the function so it's available in subshells
export -f doc_auto_organize
