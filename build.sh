#!/bin/bash

npm install

npm test

GENERATE_SOURCEMAP=false npm run build
