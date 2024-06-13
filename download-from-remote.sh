#!/bin/bash

# source agent-start "$GITHUB_ACTION"
# echo "$INPUT_REMOTE_KEY" | SSH_PASS="$INPUT_REMOTE_KEY_PASS" agent-add

# Add strict errors.
set -eu

downloadAssetsPreparation="${BASH_SOURCE%/*}/download-assets.mjs"
node "$downloadAssetsPreparation"

remoteFiles="${BASH_SOURCE%/*}/src/json/rsyncRemoteFiles.txt"
# remoteShareFiles="${BASH_SOURCE%/*}/src/json/remoteShareFiles.json"
staticAssets="public/static-assets"

rsync -Pavn --files-from="$remoteFiles" --no-relative -e "ssh -o StrictHostKeyChecking=no" "$INPUT_REMOTE_USER"@"$INPUT_REMOTE_HOST": "$staticAssets"

# count=$(jq 'length' "$remoteShareFiles")

# for ((i=0; i<count; i++)); do
#     src=$(jq -r '.['$i'].src' "$remoteShareFiles")
#     slug=$(jq -r '.['$i'].slug' "$remoteShareFiles")
#     curl -s -L "$src" --create-dirs -o "$staticAssets/shareImages/$slug/share.png"
# done

ls public/static-assets

