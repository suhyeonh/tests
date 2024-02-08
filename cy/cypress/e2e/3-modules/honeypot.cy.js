import {randString} from "../../support/commands";

// const randomString = randString(10).toLowerCase()
const randomString = "jackfuller";

describe('Check Honeypot traps are enabled on webforms', () => {


    it('Check Honeypot module is enabled', () => {
        cy.execDrush('pm:list | grep honeypot | grep Enabled')
        cy.execDrush(`cset -y honeypot.settings element_name ${randomString}`)
        cy.execDrush(`cset -y honeypot.settings protect_all_forms true`)
    })

    it('Check Honeypot is present on password reset form', () => {
        cy.visit('user/password')
        cy.get(`[data-drupal-selector="edit-${randomString}"]`)
    })

    it('Check Honeypot completion prevents password reset submission', () => {
        // Enabled logging to ensure honeypot blocking can be checked
        cy.execDrush('pm:install dblog -y')

        cy.visit('user/password')
        cy.get('[data-drupal-selector="edit-name"]').type('test@example.com')
        cy.get(`[data-drupal-selector="edit-${randomString}"]`).type('Im a hacker!', {force: true})

        // Wipe Watchdog logs
        cy.execDrush('wd all -y')
        // Submit form
        cy.confirm()
        // Check Watchdog logs for honeypot
        cy.execDrush('ws').its('stdout').should('contain', 'Blocked user')
        //disabled Watchdog
        cy.execDrush('pm:uninstall dblog -y')
    })

})
