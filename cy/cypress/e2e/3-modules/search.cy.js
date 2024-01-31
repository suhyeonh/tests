describe('Search functionality works as expected', () => {
    it('Install search and set up dummy content', () => {
        cy.install('search')
        // Create dummy content
        cy.drupalLogin()
        cy.visit('node/add/govcms_blog_article')
        cy.getDrupal('edit-title-0-value').type('Test blog')
        cy.get('.ck-content[contenteditable=true]').then(el => {
            const editor = el[0].ckeditorInstance
            editor.setData('Typing some stuff')
        })
        cy.confirm()
        // Give users access to search
        cy.execDrush('-y role:perm:add anonymous \\"search content\\"')
        cy.execDrush('-y role:perm:add authenticated \\"search content\\"')
    })

    it('Check anonymous user can search', () => {
        cy.visit('search')
    })


    it('Clean up', () => {
        cy.uninstall('search')
        cy.execDrush('entity:delete node')
    })
})
