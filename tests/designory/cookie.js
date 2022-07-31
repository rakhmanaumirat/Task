module.exports = {
    before: function (browser) {
        console.log('Setting up...')
        browser.page.home().navigate()
    },

    'Cookie Verification': function (browser) {
        const homePage = browser.page.home()

        homePage.acceptCookies()
        browser.assert.ok(homePage.cookieWindowIsNotPresent())

        homePage.deleteAllCookies()
        browser.assert.ok(homePage.cookieWindowIsPresent())
    },

    after: function (browser) {
        console.log('Closing down...')
        browser.quit()
    }
}