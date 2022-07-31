const locationsPageCommands = {

    navigateToCityPage: function (city) {
        const homePage = browser.page.home()
        homePage.openMenuToggle()
        this
            .waitForElementVisible('@locationsLink', 2000)
            .click('@locationsLink')
        let desiredCity = "//a[text()='" + city + "']"
        this
            .waitForElementVisible("xpath", desiredCity, 3000)
            .click("xpath", desiredCity)
        return this
    },

    getCityCode: async function () {
        return await this.getText('h1')
    },

    showCityAddress: function () {
        browser.execute('var footerElements = document.getElementsByClassName("rte spacing-right");' +
            'footerElements[0].scrollIntoView(true);')
        return this
    },

    getPhoneNumber: async function () {
        return await this.getText('xpath', '@phoneNumber')
    },

    getElementFontSize: async function (text) {
        let locator = "//h2[text()='" + text + "']"
        return await this.getCssProperty("xpath", locator, "font-size")
    },

    getLocationUrl: async function () {
        return await this.getAttribute('@urlLink', 'href')
    }
}

module.exports = {

    commands: [locationsPageCommands],

    elements: {
        urlLink: {
            locateStrategy: 'css selector',
            selector: "a[class='location']"
        },
        locationsLink: {
            locateStrategy: 'xpath',
            selector: "//a[text()='LOCATIONS']"
        },
        cityCode: {
            locateStrategy: 'xpath',
            selector: "//h1[@class='heading-xl']"
        },
        locationInfo: {
            locateStrategy: 'xpath',
            selector: "//div[@class='container location-detail']"
        },
        phoneNumber: {
            locateStrategy: 'xpath',
            selector: "//p[contains(text(),'Phone:')]"
        }
    }
}