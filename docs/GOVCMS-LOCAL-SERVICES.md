# GovCMS Local Services for Local Development and Testing

This README provides an overview of the local services configured for GovCMS local development and testing. The services included in this setup are designed to facilitate a comprehensive and efficient development environment.

## Services Overview

### Docker Registry
A private Docker registry to store and distribute Docker images. This service allows you to manage your own Docker images locally, enabling you to push and pull images as needed for development and testing purposes. 
For more information, refer to the [Docker Hub Mirror documentation](https://docs.docker.com/docker-hub/mirror/). This service is optional and can be ignored if you are not familiar with it.

### Traefik
Traefik is a reverse proxy and load balancer that handles HTTP and HTTPS traffic. It routes requests to the appropriate services based on rules and can provide a single point of entry for all web services running on the local environment.

### Mailhog
Mailhog is used to capture and inspect emails sent from the local environment. It provides a web interface to view and manage the emails, making it easier to test email functionalities without sending emails to the real world.

### MariaDB
MariaDB serves as the database for the local development environment. It provides a reliable and scalable database solution, ensuring that you can test database interactions and operations as you would in a production environment.

### Packeton
Packeton is a private Composer repository used for managing Composer packages. This service allows you to host your own Composer packages and dependencies, making it easier to manage dependencies and package versions for your projects.

### Redis
Redis is used as a caching layer for Packeton. It provides a fast and efficient caching mechanism, improving the performance and scalability of your local development environment by caching frequently accessed data.

## Volumes

Persistent storage is configured using Docker volumes to ensure data persistence across container restarts. This means that even if you stop and start your containers, the data will remain intact.

## Networks

Two networks are defined: `web` for external-facing services and `internal` for internal communication between services. This separation ensures that external requests are properly routed, while internal services can communicate securely and efficiently.

## Accessing Services

- **Registry**: Accessible at `localhost:5001`
- **Traefik Dashboard**: Accessible at `localhost:8080`
- **Mailhog**: Accessible at `mailhog.govcms.localhost`
- **Packeton**: Accessible at `packeton.govcms.localhost`

## Notes

- Adjust environment variables as needed for your local setup.
- Configure Traefik for HTTPS if required by uncommenting the relevant lines.
