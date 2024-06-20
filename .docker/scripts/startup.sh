#!/bin/sh

# Wait for packeton service to be up
until curl -s http://packeton:80/packages.json -o /dev/null; do
  echo "Waiting for packeton service..."
  sleep 5
done

echo "Packeton service is up!"

# Rebuild and optimize Composer autoload
composer dump-autoload -o

echo "Composer autoload rebuilt and optimized!"