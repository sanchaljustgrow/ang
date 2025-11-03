#!/bin/sh
set -e

echo "Updating runtime config.json..."
cat >/usr/share/nginx/html/assets/config.json <<EOL
{
  "NG_APP_API_URL": "${NG_APP_API_URL}",
  "NG_APP_VAR1": "${NG_APP_VAR1}",
  "NG_APP_VAR2": "${NG_APP_VAR2}"
}
EOL

exec "$@"
