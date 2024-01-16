# Cypress Integration for GovCMS Testing

This documentation covers the integration of Cypress for testing the GovCMS distribution, offering a collection of Cypress commands designed for Drupal/GovCMS website testing.

## Features

### Drupal Collection

Our Drupal collection provides Cypress commands tailored for interacting with Drupal/GovCMS websites. It simplifies the testing process by offering the following commands:

#### drupalLogin(username, password)

Initiate an authenticated session for a user by providing a username and password as arguments. This simulates the login action.

Usage example:

```console
cy.drupalLogin('admin', 'admin')
```

#### drupalLogout()

Terminate the authenticated session for the current user, simulating a logout action.

Usage example:

```console
cy.drupalLogout()
```

#### drupalDrushCommand(command)

Execute Drush commands within your Drupal website. You can pass the Drush command as a string or an array of strings.

Usage example with a string command:

```console
cy.drupalDrushCommand('status');
```

Usage example with an array of commands and arguments:

```console
cy.drupalDrushCommand(['upwd', 'admin', 'admin']);
```

These Cypress commands aim to streamline testing and interaction with your Drupal/GovCMS website when working with the GovCMS distribution. You can automate actions, verify functionality, and ensure the reliability of your testing processes.

# Running Cypress locally

## Install Cypress and dependencies.

We assume you already have NPM and Yarn installed locally.

First, navigate to the cy directory

```
cd cy
```

Install using yarn

```
npm init -y
yarn add cypress
yarn install
```

Cypress should be now be installed. To check, run

```
yarn run cypress open
```

which should open Cypress' browser testing app.

## Configure local environment

In order to use these tests, you will have to configure some local env vars. First,
we assume that you already have a local GovCMS instance running (i.e using Docker)
with global superadmin already created. We then need to configure two things:
- local url
- Superadmin details.
- Drush location
- Composer location

*Local URL*

In the 'cypress.config.js' file, change the 'baseUrl' value to your local url.

*Superadmin details*

You must create a new file 'cypress.env.json' and add the following details:

```json
{
    "user" : {
      "super" : {
        "username" : "<your username>",
        "password" : "<your password>"
      }
    }
}
```

*Drush location*

Some of the Cypress tests use Drush to speed up test runs. For example, a basic task such as user creation takes several
stages of browser navigation, including typing into forms. In contrast, the same task can be done using a single Drush
command that takes only an instant to complete.

For Drush to work, we must give Cypress access to it. We do this by setting `drupalDrushCmdLine` to the bash command
necessary to execute Drush locally. In the case of Docker Compose, we set:

```json
{
  "drupalDrushCmdLine" : "docker compose exec govcms bash -c \"drush %command\""
}
```
where `govcms` is the docker container name.

*Composer location*

Similar to Drush, you need to tell Cypress where to find Composer. This can be configured by setting `composerCmdLine`, for example:
```json
"composerCmdLine": "cd ..; composer %command"
```

You are now set up and ready to run tests!

## Running tests

First, you can run tests through Cypress' app as above with

```
yarn run cypress open
```

Alternatively, tests can be run through the command line with

```
yarn run cypress run
```

for all tests, or for specific test(s)

```
yarn run cypress run --spec cypress/e2e/1-baseline/create_user_with_role.cy.js
```
or
```
yarn run cypress run --spec cypress/e2e/*
```
