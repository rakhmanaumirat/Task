module.exports = {
    before: async function (browser) {
        console.log('Setting up...')
        browser.page.home().navigate()
        await browser.windowMaximize()
    },

    'Cookie Verification': function (browser) {
        const homePage = browser.page.home()

        homePage.acceptCookies()
        browser.assert.ok(homePage.cookieWindowIsNotPresent(), "cookie window is not present")

        homePage.deleteAllCookies()
        browser.assert.ok(homePage.cookieWindowIsPresent(), "cookie window is present")
    },

    after: function (browser) {
        console.log('Closing down...')
        browser.quit()
    }
}