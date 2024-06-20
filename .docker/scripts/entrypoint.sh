#!/bin/sh

# Run custom startup script
sh /app/startup.sh

# Execute the original entrypoint with all passed arguments
exec "$@"