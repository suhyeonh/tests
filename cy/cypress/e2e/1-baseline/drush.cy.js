describe('Check Drush integration', () => {
    it('Try \'drush --version\'', () => {
        cy.execDrush("--version").then((result) => {
            cy.log(result.stdout)
        })
    })

})
