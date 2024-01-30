import {randString} from "../../support/commands";

const formTitle = randString(10)

describe('User can create webforms with file attachment fields', () => {
  it('Set up the webform module', () => {
    cy.execDrush('-y pm:install webform, webform_node')
  })

  it('Create test webform with file field', () => {
    cy.userLogin('govcms-site-admin')
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
    cy.userLogin('govcms-site-admin')
    cy.visit('node/add/webform')
    cy.getDrupal('edit-title-0-value').type(`web${formTitle}`)
    cy.getDrupal('edit-webform-0-target-id').select(`${formTitle}`)
    cy.confirm()
    cy.get('.messages.messages--status').contains(`Webform web${formTitle} has been created.`)
    // Check webform is visible when not logged in, need to get webform node ID.
    cy.execDrush(`sql:query 'SELECT entity_id FROM node__webform WHERE webform_target_id=\\"${formTitle}\\"'`).then((result) => {
      cy.drupalLogout()
      cy.visit(`node/${result.stdout}`)
      }
    )
  })

  it('Clean up', () => {
    cy.execDrush('entity:delete node; drush -y pm:uninstall webform_node; drush pm:uninstall webform')
  })
})
