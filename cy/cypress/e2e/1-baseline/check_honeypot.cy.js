import {randString} from "../../support/commands";

const randomString = randString(10).toLowerCase()

describe('Check Honeypot traps are enabled on webforms', () => {


  it('Check Honeypot module is enabled', () => {
    cy.execDrush('pm:list | grep honeypot | grep Enabled')
    cy.execDrush(`cset -y honeypot.settings element_name ${randomString}`)
  })

  it('Check Honeypot is present on password reset form', () => {
    cy.visit('user/password')
    cy.get(`[data-drupal-selector="edit-${randomString}"]`)
  })

  it('Check Honeypot completion prevents password reset submission', () => {
    cy.visit('user/password')
    cy.get('[data-drupal-selector="edit-name"]').type('test@example.com')
    cy.get(`[data-drupal-selector="edit-${randomString}"]`).type('Im a hacker!', {force: true})
    // Wipe Watchdog logs
    cy.execDrush('wd all -y')
    // Submit form
    cy.confirm()
    // Check Watchdog logs for honeypot
    cy.execDrush('ws | grep honeypot')
  })

})
