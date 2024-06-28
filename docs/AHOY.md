# Ahoy Commands for Project Management

This project utilizes Ahoy to streamline development and management tasks with Docker. Below is a guide on how to use the various Ahoy commands included in this project.

## Prerequisites

- Ensure you have Docker and Docker Compose installed.
- Install Ahoy by following the instructions at [Ahoy](https://ahoy-cli.readthedocs.io/en/latest/).

## Available Commands

### Project Lifecycle

- **up**
  - **Usage:** `ahoy up`
  - **Description:** Builds and starts the project.
  - **Details:** Starts all necessary services and containers.
  
- **down**
  - **Usage:** `ahoy down`
  - **Description:** Stops and removes the project containers.

- **build**
  - **Usage:** `ahoy build`
  - **Description:** Builds the project containers.

- **restart**
  - **Usage:** `ahoy restart`
  - **Description:** Restarts the project containers.

- **stop**
  - **Usage:** `ahoy stop`
  - **Description:** Stops the project containers.

### Development

- **watch**
  - **Usage:** `ahoy watch`
  - **Description:** Uses Compose Watch for live development.

- **cli**
  - **Usage:** `ahoy cli`
  - **Description:** Starts a shell inside the govcms container.

### Composer

- **composer**
  - **Usage:** `ahoy composer [command]`
  - **Description:** Runs a Composer command inside the govcms container.
  - **Example:** `ahoy composer install`

### Code Analysis

- **rector**
  - **Usage:** `ahoy rector [command]`
  - **Description:** Analyzes your code with Rector and reviews suggested changes.
  
- **drupal-check**
  - **Usage:** `ahoy drupal-check [command]`
  - **Description:** Runs static analysis to check for correctness and deprecation errors.

### Testing

- **phpunit**
  - **Usage:** `ahoy phpunit [options]`
  - **Description:** Runs PHPUnit tests inside the govcms container.
  
- **phpunit-govcms**
  - **Usage:** `ahoy phpunit-govcms`
  - **Description:** Runs PHPUnit tests specifically for GovCMS with testdox output.

- **phpunit-govcms-baseline**
  - **Usage:** `ahoy phpunit-govcms-baseline`
  - **Description:** Runs baseline PHPUnit tests for GovCMS with testdox output.

- **cypress**
  - **Usage:** `ahoy cypress`
  - **Description:** Runs all Cypress tests for end-to-end testing.

- **cr**
  - **Usage:** `ahoy cr`
  - **Description:** Alias for `ahoy cypress`.

- **co**
  - **Usage:** `ahoy co`
  - **Description:** Opens a new Cypress testing window for interactive testing.

### Services Management

- **start-services**
  - **Usage:** `ahoy start-services`
  - **Description:** Starts the GovCMS local services.

- **stop-services**
  - **Usage:** `ahoy stop-services`
  - **Description:** Stops the GovCMS local services.

- **restart-services**
  - **Usage:** `ahoy restart-services`
  - **Description:** Restarts the GovCMS local services.

### SSL Certificates

- **create-certs**
  - **Usage:** `ahoy create-certs`
  - **Description:** Generates SSL certificates for local development.
