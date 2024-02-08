const {defineConfig} = require('cypress')

module.exports = defineConfig({
    blockHosts: ['www.google-analytics.com'],
    chromeWebSecurity: false,
    env: {
        localEnv: 'lagoon',
        user: {
            administrator: {
                username: 'administrator',
                password: 'password',
            },
            approver: {
                username: 'approver',
                password: 'password',
            },
            author: {
                username: 'author',
                password: 'password',
            },
            super: {
                username: 'admin',
                password: 'password',
            },
        },
        viewports: ['macbook-15', 'iphone-6'],
        viewports_desktop: 'macbook-15',
        viewports_mobile: 'iphone-6',
    },
    video: true,
    e2e: {
        setupNodeEvents(on, config) {
            return require('./cypress/plugins/index.js')(on, config)
        },
        baseUrl: 'http://localhost:8888',
        experimentalRunAllSpecs: true,
        experimentalStudio: true
    },
    watchForFileChanges: false
})
