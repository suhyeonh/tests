import {randString} from "../../support/commands";

const formTitle = randString(10)

describe('User can create webforms with file attachment fields', () => {
  it('Set up the webform module', () => {
    cy.execDrush('-y pm:install webform, webform_node')
  })

  it('Create test webform with file field', () => {
    cy.drupalLogin()
    cy.visit('admin/structure/webform/add')
    cy.get('[data-drupal-selector="title"]').type(`${formTitle}`)
    cy.wait(500)
    cy.confirm()
    cy.visit(`admin/structure/webform/manage/${formTitle}`)
    cy.readFile('cypress/fixtures/webform.yml').then( (str) => {
      cy.get('[data-drupal-selector="edit-elements"]').type(str, {force: true})
    })

    cy.confirm()
    // A second confirmation is needed for some reason. It appears typing into the CodeMirror element (done above)
    // isnt saved until the user clicks out of it such as by clicking the confirm button.
    cy.confirm()

    cy.get('.messages.messages--status').contains(`Webform ${formTitle} elements saved.`)
  })

  it('Test adding webform to standard page', () => {


  })

  it('Clean up', () => {
    cy.execDrush('-y pm:uninstall webform_node; drush pm:uninstall webform')
  })
})
