# DEVELOPMENT GUIDE

## Overview

This document provides an explanation of the GovCMS local development environment and the experimental Cypress testing service defined in the provided configuration.

## Services

### GovCMS Local Development

The `govcms` service is designed to facilitate local development of GovCMS projects. It provides a containerized environment that replicates the production setup, allowing developers to work in a consistent and isolated environment.

#### Key Features

- **Build Context and Dockerfile:** The service uses a specific Dockerfile located in the `.docker` directory to build the GovCMS environment. This ensures that all dependencies and configurations are consistently applied.
- **Container Name:** The container is named `govcms` for easy identification and management.
- **Volumes:** Several volumes are mounted to facilitate development and testing:
  - **Source Code Volumes:** These include directories for modules and themes, enabling developers to easily work on custom code.
  - **Test Volumes:** Separate volumes for Behat, Cypress, and PHPUnit tests are provided to keep test data organized.
  - **Composer Cache:** A volume is dedicated to Composer cache to speed up dependency management.
  - **Configuration Files:** Configuration files such as `rector.php` are mapped into the container for consistent application setup.
- **Environment Variables:** The `GOVCMS_ENV` variable is set to `development` to tailor the environment for local development.
- **Traefik Labels:** These labels configure Traefik to route requests to the GovCMS service at `govcms.localhost`.
- **Networks:** The service connects to multiple networks, including internal networks and networks specific to local services, ensuring proper communication and isolation.

#### Development Watchers

- **Sync Action:** Watches the entire project directory and syncs changes to the `/app/tests` directory inside the container, ignoring specified directories.
- **Rebuild Action:** Watches the `composer.json` file and triggers a rebuild if it changes, ensuring dependencies are always up-to-date.

### Cypress Testing Service (Experimental)

The `cypress` service is an experimental setup for running end-to-end tests using Cypress. This service is designed to provide an isolated environment for running UI tests against the GovCMS service.

#### Key Features

- **Image:** The service uses the official Cypress included Docker image, which comes pre-installed with Cypress and its dependencies.
- **Container Name:** The container is named `cypress` for easy identification.
- **Entry Point:** The service runs Cypress tests located in the `/e2e` directory. It is configured to run tests in the `4-ui` folder, making it easy to manage and execute specific test suites.
- **Environment Variables:** The `CYPRESS_baseUrl` environment variable is set to `http://govcms`, ensuring tests are run against the GovCMS service.
- **Volumes:** 
  - **Test Files Volume:** The local `cy` directory is mapped to `/e2e` in the container, allowing developers to store and manage test scripts.
  - **X11 Socket Volume:** Maps the host's X11 socket to the container, enabling GUI test execution.
- **Networks:** The service connects to the internal network, allowing it to communicate with the GovCMS service.

### Notes on Experimental Nature

The Cypress service is marked as experimental, indicating that it is still in the testing phase. It is intended to explore the capabilities of Cypress for end-to-end testing in the GovCMS environment. Feedback and iterative improvements are expected as developers use and refine this setup.

## Volumes and Networks

### Volumes

- **Local Volumes for Source Code and Tests:** These volumes are critical for maintaining code separation and ensuring that changes in the local file system are reflected in the container environment.
- **Composer Cache Volume:** Speeds up dependency installation by caching Composer downloads.
- **Configuration File Volume:** Ensures configuration files are consistently applied within the container.

### Networks

- **Internal Network:** Used for inter-container communication within the local development environment.
- **GovCMS-specific Networks:** Allow the GovCMS service to connect with other local services and networks, ensuring proper routing and isolation.

## Usage

### Starting the Services

To start the GovCMS local development and experimental Cypress testing services, use your container orchestration tool (e.g., Ahoy or Docker Compose) with the provided configuration.

### Accessing the GovCMS Service

Once the services are running, you can access the GovCMS service via `http://govcms.localhost`.

### Running Cypress Tests

Ensure the Cypress service is running, then execute the tests as defined. The Cypress tests will run against the GovCMS service at the specified base URL.

### Managing Volumes

Ensure that the local directories specified in the volume configurations exist and contain the appropriate files. These directories are critical for maintaining code and test data integrity.

### Configuration Files

Place necessary configuration files in the specified paths to ensure they are correctly mapped into the containers. Adjust paths as needed for your local setup.

### Environment Variables and Traefik Configuration

Make sure the required environment variables are set correctly, and Traefik is configured to route requests to `govcms.localhost`.

## Conclusion

This document provides an overview and usage instructions for setting up and using the GovCMS local development environment and the experimental Cypress testing service. Adjust the configuration as needed for your development setup. If you encounter any issues or have questions, refer to the documentation for Docker, Cypress, and related tools.
