import packages from '../../../../../composer.json'

let modules = Object.entries(packages['require']).filter((str) => {
    return str[1].indexOf('^') === 0
})


describe('Cross check module and library versions', () => {
    it('Ensure modules are installed', () => {
        cy.composerCommand('install')
    })

    modules.forEach((module, i) => {
        it(`${module}`, () => {
            const moduleVersion = module[1].substring(0, module[1].indexOf(" as"));
            cy.composerCommand('show ' + module[0] + ' | grep versions').its('stdout').should('contain', moduleVersion)
        })
    })
})
