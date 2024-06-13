#!/bin/bash

downloadAssetsPreparation="${BASH_SOURCE%/*}/download-assets.mjs"
remoteFiles="$(xargs -I{} <  "${BASH_SOURCE%/*}"/src/json/rsyncRemoteFiles.txt)"
remoteShareFiles="${BASH_SOURCE%/*}/src/json/remoteShareFiles.json"
staticAssets="${BASH_SOURCE%/*}/public/static-assets"

node "$downloadAssetsPreparation"

rsync -Pav -e "ssh -o StrictHostKeyChecking=no" "$remote_user"@"$remote_host":"$remoteFiles" "$staticAssets"

count=$(jq 'length' "$remoteShareFiles")

for ((i=0; i<count; i++)); do
    src=$(jq -r '.['$i'].src' "$remoteShareFiles")
    slug=$(jq -r '.['$i'].slug' "$remoteShareFiles")
    curl -s -L "$src" --create-dirs -o "$staticAssets/shareImages/$slug/share.png"
done

ls "$staticAssets"

ls "$staticAssets/shareImages"

