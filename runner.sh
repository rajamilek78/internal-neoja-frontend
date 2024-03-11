#!/bin/bash

# This is not in use as of now.

if [ "$ELEAGUEONLINE_ENVIRONMENT" = "prod" ]; then
    exec npm run start-prod
else
    exec npm run start
fi