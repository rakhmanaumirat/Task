const homePageCommands = {

    openMenuToggle: async function () {
        const result = await this.isVisible('@menuWindow')
        if (result == false) {
            await this.click('@menuToggle').waitForElementVisible('@menuWindow', 1000)
        }
        return this
    },

    getAllMenuOptions: async function () {
        await this.openMenuToggle()
        const jsonElements = await this.findElements('@menuItems')
        const ids = jsonElements.map(function (jsonElement) { return jsonElement.getId() })
        const actualOptions = []
        for (let id of ids) {
            const elementValue = await browser.elementIdText(id, function (element) { return element.value })
            actualOptions.push(elementValue)
        }
        return actualOptions
    },

    getMenuOptionsAndPageTitlesFromAllPages: async function (menuOptions) {
        let options = []
        let titles = []
        for (let option of menuOptions) {
            await this.openMenuToggle()
            this.navigateTo(option)
            let actualOptions = await this.getAllMenuOptions(menuOptions)
            options.push(actualOptions)
            let title = await this.getTitle(function (title) { return title })
            titles.push(title)
        }
        return [options, titles]
    },

    navigateTo: function (menuOption) {
        const locator = "//a[text()='" + menuOption + "']"
        this
            .waitForElementVisible("xpath", locator, 2000)
            .click("xpath", locator)
        if (menuOption === browser.globals.locations) {
            const defaultCity = browser.globals.defaultCity
            const cityLocator = "//a[text()='" + defaultCity + "']"
            this
                .waitForElementVisible('@locationsMenu', 2000)
                .click("xpath", cityLocator)
        }
        return this
    },

    compareMenuOptions: async function (actual, expected) {
        const helper = browser.page.helper()
        let returnBoolean = true
        for (let option of actual) {
            let result = await helper.checkArraysEqual(option, expected)
            if (result == false) {
                returnBoolean = false
                return false
            }
        }
        return returnBoolean
    },

    getMenuOptionsFromAllPages: async function (menuOptions) {
        const helper = browser.page.helper()
        let returnBoolean = true
        for (let option of menuOptions) {
            await this.openMenuToggle()
            this.navigateTo(option)
            let actualOptions = await this.getAllMenuOptions(menuOptions)
            let result = await helper.checkArraysEqual(menuOptions, actualOptions)
            if (result == false) {
                returnBoolean = false
                return false
            }
        }
        return returnBoolean
    },

    getPageTitles: async function (menuOptions) {
        let titles = []
        for (let menuOption of menuOptions) {
            let title = await this.getPageTitle(menuOption)
            titles.push(title)
        }
        return titles
    },

    getPageTitle: async function (menuOption) {
        await this.openMenuToggle()
        this.navigateTo(menuOption)
        return await this.getTitle(function (title) { return title });
    },

    acceptCookies: function () {
        this.waitForElementVisible('@cookieWindow')
        this.click('@acceptCookie')
        this.waitForElementNotVisible('@cookieWindow')
        browser.refresh()
        return this
    },

    deleteAllCookies: function () {
        browser.deleteCookies()
        browser.refresh()
        return this
    },

    cookieWindowIsNotPresent: function () {
        return this.waitForElementNotPresent('@cookieWindow')
    },

    cookieWindowIsPresent: function () {
        return this.waitForElementVisible('@cookieWindow')
    },
}

module.exports = {

    url: 'https://www.designory.com',

    commands: [homePageCommands],

    elements: {
        menuToggle: '#nav-toggle',
        menuItems: 'div.nav-wrapper.scroll>nav>ul>li>a',
        menuWindow: '.nav-wrapper.scroll',
        locationsMenu: ".subnav",
        cookieWindow: '#CybotCookiebotDialog',
        acceptCookie: '#CybotCookiebotDialogBodyButtonAccept'
    }
}