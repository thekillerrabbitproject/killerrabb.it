#!/bin/bash

# source agent-start "$GITHUB_ACTION"
# echo "$INPUT_REMOTE_KEY" | SSH_PASS="$INPUT_REMOTE_KEY_PASS" agent-add

# Add strict errors.
set -eu

downloadAssetsPreparation="${BASH_SOURCE%/*}/download-assets.mjs"
node "$downloadAssetsPreparation"

remoteTxtFile="${BASH_SOURCE%/*}/src/json/rsyncRemoteFiles.txt"
remoteFiles="$(xargs -I{} <  "$remoteTxtFile")"
remoteShareFiles="${BASH_SOURCE%/*}/src/json/remoteShareFiles.json"
staticAssets="${BASH_SOURCE%/*}/public/static-assets"


rsync -Pav -e "ssh -o StrictHostKeyChecking=no" "$INPUT_REMOTE_USER"@"$INPUT_REMOTE_HOST":"$remoteFiles" "$staticAssets"

count=$(jq 'length' "$remoteShareFiles")

for ((i=0; i<count; i++)); do
    src=$(jq -r '.['$i'].src' "$remoteShareFiles")
    slug=$(jq -r '.['$i'].slug' "$remoteShareFiles")
    curl -s -L "$src" --create-dirs -o "$staticAssets/shareImages/$slug/share.png"
done

ls "$staticAssets"

ls "$staticAssets/shareImages"
