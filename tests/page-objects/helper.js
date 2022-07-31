const helperCommands = {

    scrollIntoViewByClassName: function (className) {
        browser.execute(
            "var footerElements = document.getElementsByClassName('" + className + "');" +
            browser.globals.scrollIntoView)
        return this
    },

    checkArraysEqual: async function (a, b) {
        return JSON.stringify(a) === JSON.stringify(b)
    },
}

module.exports = {

    commands: [helperCommands]
}