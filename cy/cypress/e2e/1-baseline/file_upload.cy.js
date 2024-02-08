import {randString} from "../../support/commands";

const testUser = randString(10)
const testFileName = randString(10)


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
        cy.execDrush(`sql:query 'SELECT * FROM media_field_data' | grep audio | grep ${testFileName}`)
    })

    it('Test video file upload', () => {
        cy.drupalLogin(testUser, 'password')
        cy.visit('media/add/video')
        cy.get('[data-drupal-selector="edit-name-0-value"]').type(`${testFileName}`)
        cy.get('[data-drupal-selector="edit-field-media-video-file-0-upload"]').selectFile('cypress/fixtures/media/video_test.mp4')
        cy.wait(500)
        cy.confirm()
        cy.execDrush(`sql:query 'SELECT * FROM media_field_data' | grep video | grep ${testFileName}`)
    })

    it('Test image file upload', () => {
        cy.drupalLogin(testUser, 'password')
        cy.visit('media/add/image')
        cy.get('[data-drupal-selector="edit-name-0-value"]').type(`${testFileName}`)
        cy.get('[data-drupal-selector="edit-field-media-image-0-upload"]').selectFile('cypress/fixtures/media/image_test.jpeg')
        cy.wait(500)
        cy.get('[data-drupal-selector="edit-field-media-image-0-alt"]').type('blah blah')
        cy.confirm()
        cy.execDrush(`sql:query 'SELECT * FROM media_field_data' | grep image | grep ${testFileName}`)
    })

    it('Test PDF file upload', () => {
        cy.drupalLogin(testUser, 'password')
        cy.visit('media/add/document')
        cy.get('[data-drupal-selector="edit-name-0-value"]').type(`pdf${testFileName}`)
        cy.get('[data-drupal-selector="edit-field-media-document-0-upload"]').selectFile('cypress/fixtures/media/pdf_test.pdf')
        cy.wait(500)
        cy.confirm()
        cy.execDrush(`sql:query 'SELECT * FROM media_field_data' | grep document | grep pdf${testFileName}`)
    })

    it('Test DOCX file upload', () => {
        cy.drupalLogin(testUser, 'password')
        cy.visit('media/add/document')
        cy.get('[data-drupal-selector="edit-name-0-value"]').type(`docx${testFileName}`)
        cy.get('[data-drupal-selector="edit-field-media-document-0-upload"]').selectFile('cypress/fixtures/media/docx_test.docx')
        cy.wait(500)
        cy.confirm()
        cy.execDrush(`sql:query 'SELECT * FROM media_field_data' | grep document | grep docx${testFileName}`)
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
