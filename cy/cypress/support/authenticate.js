// --- Commands (Functions) ----------------------------------------------------

// Drupal login.
Cypress.Commands.add("drupalLogin", (user, password) => {
    cy.visit('user/logout')
    // Try obtaining login details from env file first
    user = user || Cypress.env('user').super.username
    password = password || Cypress.env('user').super.password
    // If they cannot be found, use the default
    if (user == null || password == null) {
        user = "admin"
        password = "password"
    }
    // Attempt login
    cy.visit(`/user/login`)
    cy.get("#edit-name").type(user)
    cy.get("#edit-pass").type(password)
    cy.get("#edit-submit").click()
});

// Drupal logout.
Cypress.Commands.add('drupalLogout', () => {
    return cy.request('/user/logout');
});
