# https://killerrabb.it [![Build Status](https://travis-ci.org/persocon/killerrabb.it.svg?branch=master)](https://travis-ci.org/persocon/killerrabb.it) ![Github e2e Action](https://github.com/persocon/killerrabb.it/workflows/Continuous%20lighthouse%20test/badge.svg)

## Install deps

`export TKRP_GRAPHQL_API="your graphql server"`

`npm install`

## Develop

`npm run develop`

go to `http://localhost:8000`

## Build production

`npm run build`

## Run Production

`npm run serve`

go to `http://localhost:9000`

## Deploy

You need to have the credentials set

`export SSH_TKRP="your ssh server"`

`npm run deploy`