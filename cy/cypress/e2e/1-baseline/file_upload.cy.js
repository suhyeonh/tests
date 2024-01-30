import {randString} from "../../support/commands";

const testUser = randString(10)
const testFileName = randString(10)

//let fileArray = ['audio_test', 'docx_test', 'image_test', 'pdf_test', 'video_test']

describe('User can upload files', () => {

  before('Create test user', () => {
    cy.execDrush(`ucrt ${testUser} --password=password`)
    cy.execDrush(`user:role:add govcms_content_author ${testUser}`)
  })


  it('Test audio file upload', () => {
    cy.drupalLogin(testUser, 'password')
    cy.visit('media/add/audio')
    cy.get('[data-drupal-selector="edit-name-0-value"]').type(`${testFileName}`)
    cy.get('[data-drupal-selector="edit-field-media-audio-file-0-upload"]').selectFile('cypress/fixtures/media/audio_test.mp3')
    cy.wait(500)
    cy.confirm()
    cy.get('.messages.messages--status').contains(`Audio ${testFileName} has been created.`)
  })

  it('Test video file upload', () => {
    cy.drupalLogin(testUser, 'password')
    cy.visit('media/add/video')
    cy.get('[data-drupal-selector="edit-name-0-value"]').type(`${testFileName}`)
    cy.get('[data-drupal-selector="edit-field-media-video-file-0-upload"]').selectFile('cypress/fixtures/media/video_test.mp4')
    cy.wait(500)
    cy.confirm()
    cy.get('.messages.messages--status').contains(`Video ${testFileName} has been created.`)
  })

  it('Test image file upload', () => {
    cy.drupalLogin(testUser, 'password')
    cy.visit('media/add/image')
    cy.get('[data-drupal-selector="edit-name-0-value"]').type(`${testFileName}`)
    cy.get('[data-drupal-selector="edit-field-media-image-0-upload"]').selectFile('cypress/fixtures/media/image_test.jpeg')
    cy.wait(500)
    cy.get('[data-drupal-selector="edit-field-media-image-0-alt"]').type('blah blah')
    cy.confirm()
    cy.get('.messages.messages--status').contains(`Image ${testFileName} has been created.`)
  })

  it('Test PDF file upload', () => {
    cy.drupalLogin(testUser, 'password')
    cy.visit('media/add/document')
    cy.get('[data-drupal-selector="edit-name-0-value"]').type(`${testFileName}`)
    cy.get('[data-drupal-selector="edit-field-media-document-0-upload"]').selectFile('cypress/fixtures/media/pdf_test.pdf')
    cy.wait(500)
    cy.confirm()
    cy.get('.messages.messages--status').contains(`Document ${testFileName} has been created.`)
  })

  it('Test DOCX file upload', () => {
    cy.drupalLogin(testUser, 'password')
    cy.visit('media/add/document')
    cy.get('[data-drupal-selector="edit-name-0-value"]').type(`${testFileName}`)
    cy.get('[data-drupal-selector="edit-field-media-document-0-upload"]').selectFile('cypress/fixtures/media/docx_test.docx')
    cy.wait(500)
    cy.confirm()
    cy.get('.messages.messages--status').contains(`Document ${testFileName} has been created.`)
  })

  after('Clean up', () => {
    // Remove all test files
    cy.drupalLogin()
    cy.visit('admin/content/media')
    cy.get('.select-all > .form-checkbox').check()
    cy.get('#edit-action').select('media_delete_action')
    cy.get('#edit-submit').click()
    cy.get('#edit-also-delete-file').check()
    cy.confirm()
    // Delete test user
    cy.execDrush(`user:cancel -y --delete-content ${testUser}`)
  })




})
