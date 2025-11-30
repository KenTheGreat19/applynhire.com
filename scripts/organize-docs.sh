#!/bin/bash

# Documentation Organization Script
# This script organizes markdown files into a documentation folder
# and sets up automation for future documentation files

set -e

REPO_ROOT="${1:-.}"
DOCS_FOLDER="$REPO_ROOT/documentation"
PRESERVE_DOCS_FOLDER="$REPO_ROOT/docs"  # Existing docs folder to preserve

# Color output for readability
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Create documentation folder if it doesn't exist
if [ ! -d "$DOCS_FOLDER" ]; then
    mkdir -p "$DOCS_FOLDER"
    echo -e "${GREEN}✓${NC} Created documentation folder at $DOCS_FOLDER"
else
    echo -e "${YELLOW}!${NC} Documentation folder already exists at $DOCS_FOLDER"
fi

# Function to move a file to documentation folder
move_to_docs() {
    local file="$1"
    if [ -f "$file" ]; then
        local filename=$(basename "$file")
        mv "$file" "$DOCS_FOLDER/$filename"
        echo -e "${GREEN}✓${NC} Moved: $filename"
    fi
}

# Move root-level .md files (except any critical ones you want to keep)
echo -e "\n${YELLOW}Moving root-level markdown files...${NC}"
for file in "$REPO_ROOT"/*.md; do
    if [ -f "$file" ]; then
        filename=$(basename "$file")
        # You can add exceptions here if you want to keep certain files at root
        # For example: if [ "$filename" != "README.md" ]; then
        move_to_docs "$file"
    fi
done

# Move files from existing docs folder
echo -e "\n${YELLOW}Moving files from existing docs folder...${NC}"
if [ -d "$PRESERVE_DOCS_FOLDER" ]; then
    for file in "$PRESERVE_DOCS_FOLDER"/*.md; do
        if [ -f "$file" ]; then
            filename=$(basename "$file")
            mv "$file" "$DOCS_FOLDER/$filename"
            echo -e "${GREEN}✓${NC} Moved: $filename"
        fi
    done
    # Remove the old docs folder if empty
    if [ -z "$(ls -A "$PRESERVE_DOCS_FOLDER")" ]; then
        rmdir "$PRESERVE_DOCS_FOLDER"
        echo -e "${GREEN}✓${NC} Removed empty docs folder"
    fi
fi

# Move backend README
if [ -f "$REPO_ROOT/backend/README.md" ]; then
    mv "$REPO_ROOT/backend/README.md" "$DOCS_FOLDER/BACKEND.md"
    echo -e "${GREEN}✓${NC} Moved: backend/README.md → BACKEND.md"
fi

echo -e "\n${GREEN}✓ Documentation organization complete!${NC}"
echo -e "All markdown files are now in: $DOCS_FOLDER"
