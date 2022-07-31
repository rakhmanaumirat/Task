module.exports = {
    before: async function (browser) {
        console.log('Setting up...')
        browser.page.home().navigate()
        await browser.windowMaximize()
    },

    '@tags': ['location', 'smoke', 'regression'],
    'Location Verification': async function (browser) {
        const locationsPage = browser.page.locations()

        await locationsPage.navigateToCityPage(browser.globals.chicago)
        const actualCityCode = await locationsPage.getCityCode()
        browser.assert.ok(actualCityCode === browser.globals.chicagoCode, "city codes are equal")

        locationsPage.showCityAddress()
        let actualPhoneNumber = await locationsPage.getPhoneNumber()
        browser.assert.ok(actualPhoneNumber === browser.globals.chicagoPhone, "phone numbers are equal")

        let actualFontSize = await locationsPage.getElementFontSize(browser.globals.h1Text)
        browser.assert.ok(actualFontSize === browser.globals.font40, "fonts size are equal")

        let url = await locationsPage.getLocationUrl()
        browser.assert.ok(url === browser.globals.chicagoURL, "URLs are equal")
    },

    after: function (browser) {
        console.log('Closing down...')
        browser.quit()
    }
}