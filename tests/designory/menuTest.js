module.exports = {
    before: async function (browser) {
        console.log('Setting up...')
        browser.page.home().navigate()
        await browser.windowMaximize()
    },

    '@tags': ['menu', 'smoke', 'regression'],
    "Menu Verification": async function (browser) {
        const homePage = browser.page.home()
        const helper = browser.page.helper()

        let actualOptions = await homePage.getAllMenuOptions()
        browser.assert.ok(actualOptions.length == 6, "array has length of 6")

        let result = await homePage.getMenuOptionsAndPageTitlesFromAllPages(browser.globals.menuOptions)
        const actualMenuOptions = result[0]
        const actualPageTitles = result[1]
        browser.assert.ok(await homePage.compareMenuOptions(actualMenuOptions, browser.globals.menuOptions), "menu options are equal")
        browser.assert.ok(await helper.checkArraysEqual(actualPageTitles, browser.globals.pageTitles), "page titles are equal")
    },

    after: function (browser) {
        console.log('Closing down...')
        browser.quit()
    }
}