module.exports = {
    before: function (browser) {
        console.log('Setting up...')
        browser.page.home().navigate()
    },

    "Menu Verification": async function (browser) {
        const menuOptions = browser.globals.menuOptions
        const pageTitles = browser.globals.pageTitles
        const homePage = browser.page.home()

        let actualOptions = await homePage.getAllMenuOptions()
        browser.assert.ok(actualOptions.length == 6, "array has length of 6")

        let result = await homePage.getMenuOptionsAndPageTitlesFromAllPages(menuOptions)
        browser.assert.ok(await homePage.compareMenuOptions(result[0], menuOptions), "menu options are equal")
        browser.assert.ok(await homePage.checkArraysEqual(result[1], pageTitles), "page titles are equal")
    },

    after: function (browser) {
        console.log('Closing down...')
        browser.quit()
    }
}