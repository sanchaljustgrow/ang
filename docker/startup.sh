#!/bin/sh
set -e

echo "🔧 Generating runtime config.json from environment variables..."

# Replace placeholders in config.template.json with actual ENV values
envsubst < /usr/share/nginx/html/assets/config.template.json > /usr/share/nginx/html/assets/config.json

echo "✅ Generated /usr/share/nginx/html/assets/config.json:"
cat /usr/share/nginx/html/assets/config.json

# Continue with normal Nginx startup
exec nginx -g 'daemon off;'
