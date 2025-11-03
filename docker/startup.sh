#!/bin/sh

CONFIG_FILE=/usr/share/nginx/html/assets/config.json

echo "Replacing env placeholders in config.json..."
envsubst < $CONFIG_FILE > ${CONFIG_FILE}.tmp && mv ${CONFIG_FILE}.tmp $CONFIG_FILE

echo "Starting Nginx..."
nginx -g 'daemon off;'
