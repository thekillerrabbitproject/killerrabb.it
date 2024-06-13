#!/bin/bash

# downloadAssetsPreparation="${BASH_SOURCE%/*}/download-assets.mjs"

# remoteFiles="$(xargs -I{} <  "${BASH_SOURCE%/*}"/src/json/rsyncRemoteFiles.txt)"
# remoteShareFiles="${BASH_SOURCE%/*}/src/json/remoteShareFiles.json"

staticAssets="${BASH_SOURCE%/*}/public/static-assets"

remoteFiles="$(cat "${BASH_SOURCE%/*}/src/json/rsyncRemoteFiles.txt")"

# rsync host::'modname/dir1/file1 modname/dir2/file2' /dest
# rsync -Pav -e "ssh -i $HOME/.ssh/somekey" username@hostname:

rsync -Pavn -e "ssh -i tkrp_rsync_deploy" persocon@tkrp.net:"$remoteFiles" "$staticAssets"

# node "$downloadAssetsPreparation"

# count=$(jq 'length' "$remoteShareFiles")

# for ((i=0; i<count; i++)); do
#     src=$(jq -r '.['$i'].src' "$remoteShareFiles")
#     slug=$(jq -r '.['$i'].slug' "$remoteShareFiles")
#     curl -s -L "$src" --create-dirs -o "$staticAssets/shareImages/$slug/share.png"
# done



