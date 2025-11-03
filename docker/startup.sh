#!/bin/sh
set -e

CONFIG_DIR="/usr/share/nginx/html/assets"
CONFIG_FILE="$CONFIG_DIR/config.json"

echo "🔧 Generating runtime config.json from environment..."

# Ensure assets dir exists
mkdir -p "$CONFIG_DIR"

# Start JSON
echo "{" > "$CONFIG_FILE.temp"

# Add specific variables (explicit keys). Add or remove keys as needed:
echo "  \"API_URL\": \"${API_URL}\"," >> "$CONFIG_FILE.temp"
echo "  \"KEYCLOAK_URL\": \"${KEYCLOAK_URL}\"" >> "$CONFIG_FILE.temp"

# Finish JSON
echo "}" >> "$CONFIG_FILE.temp"

# Move into place atomically
mv "$CONFIG_FILE.temp" "$CONFIG_FILE"

echo "✅ Wrote $CONFIG_FILE:"
cat "$CONFIG_FILE"

# Start nginx
echo "🚀 Starting nginx..."
exec nginx -g 'daemon off;'
