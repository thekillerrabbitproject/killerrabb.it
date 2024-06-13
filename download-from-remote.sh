#!/bin/bash

downloadAssetsPreparation="${BASH_SOURCE%/*}/download-assets.mjs"
convertToWebp="${BASH_SOURCE%/*}/src/utils/image-converter.mjs"
generateBlurImages="${BASH_SOURCE%/*}/src/utils/image-resize-blur.mjs"

# node "$downloadAssetsPreparation"

# remoteFiles="${BASH_SOURCE%/*}/src/json/rsyncRemoteFiles.txt"
# remoteShareFiles="${BASH_SOURCE%/*}/src/json/remoteShareFiles.json"
# staticAssets="public/static-assets"

# if [[ -z "${LOCAL_KEY}" ]]; then
#   rsync -Paq --files-from="$remoteFiles" --no-relative -e "ssh -o StrictHostKeyChecking=no" "$INPUT_REMOTE_USER"@"$INPUT_REMOTE_HOST": "$staticAssets"
# else
#   rsync -Paq --files-from="$remoteFiles" --no-relative -e "ssh -i ${BASH_SOURCE%/*}/$LOCAL_KEY" "$INPUT_REMOTE_USER"@"$INPUT_REMOTE_HOST": "$staticAssets"
# fi

# count=$(jq 'length' "$remoteShareFiles")

# for ((i=0; i<count; i++)); do
#     src=$(jq -r '.['$i'].src' "$remoteShareFiles")
#     slug=$(jq -r '.['$i'].slug' "$remoteShareFiles")
#     curl -s -L "$src" --create-dirs -o "$staticAssets/shareImages/$slug/share.png"
# done

node "$convertToWebp"

node "$generateBlurImages"

