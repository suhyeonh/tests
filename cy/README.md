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