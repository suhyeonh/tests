# Welcome to GovCMS!
print("""
-----------------------------------------------------------------
✨ Hello GovCMS!
-----------------------------------------------------------------
""".strip())

# Include development services and sites
docker_compose('./docker-compose.yml')

DOCKER_COMPOSE_LOCAL = os.path.exists('./docker-compose.override.yml')
if DOCKER_COMPOSE_LOCAL:
    docker_compose('./docker-compose.override.yml')

# Good bye
if config.tilt_subcommand == 'down':
    print("""
    -----------------------------------------------------------------
✨ GovCMS Ops Team
-----------------------------------------------------------------
    """.strip())