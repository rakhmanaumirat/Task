// Refer to the online docs for more details:
// https://nightwatchjs.org/gettingstarted/configuration/
//

//  _   _  _         _      _                     _          _
// | \ | |(_)       | |    | |                   | |        | |
// |  \| | _   __ _ | |__  | |_ __      __  __ _ | |_   ___ | |__
// | . ` || | / _` || '_ \ | __|\ \ /\ / / / _` || __| / __|| '_ \
// | |\  || || (_| || | | || |_  \ V  V / | (_| || |_ | (__ | | | |
// \_| \_/|_| \__, ||_| |_| \__|  \_/\_/   \__,_| \__| \___||_| |_|
//             __/ |
//            |___/

module.exports = {
  // An array of folders (excluding subfolders) where your tests are located;
  // if this is not specified, the test source must be passed as the second argument to the test runner.
  src_folders: ['tests/designory'],

  // See https://nightwatchjs.org/guide/concepts/page-object-model.html
  page_objects_path: ['tests/page-objects'],

  // See https://nightwatchjs.org/guide/extending-nightwatch/adding-custom-commands.html
  //custom_commands_path: ['tests/custom-commands'],

  // See https://nightwatchjs.org/guide/extending-nightwatch/adding-custom-assertions.html
  //custom_assertions_path: ['tests/custom-assertions'],

  // See https://nightwatchjs.org/guide/extending-nightwatch/adding-plugins.html
  // plugins: [],

  // See https://nightwatchjs.org/guide/concepts/test-globals.html
  globals_path: '',

  webdriver: {},

  test_settings: {
    default: {
      disable_error_log: false,
      launch_url: 'https://www.designory.com/',

      globals: {
        menuOptions: ["WORK", "ABOUT", "CAREERS", "LOCATIONS", "CONTACT", "NEWS"],
        pageTitles: [
          "Designory Work & Case Studies",
          "Print & Digital Agency | Designory",
          "Careers | Designory",
          "Chicago Advertising Agency | The Designory",
          "Contact | Designory",
          "Designory News & Awards | Designory"],
        defaultCity: "CHICAGO",
        chicago: "CHICAGO",
        chicagoCode: "CHI",
        chicagoPhone: "Phone: +1 312 729 4500",
        h1Text: "At such great heights.",
        font40: "40px",
        chicagoURL: "http://maps.google.com/?q= 225 N Michigan Ave, Suite 2100 Chicago, IL 60601"
      },

      screenshots: {
        enabled: false,
        path: 'screens',
        on_failure: true
      },

      desiredCapabilities: {
        browserName: 'chrome',
        // chromeOptions: {
        //   "args": ["window-size=1920,1080"]
        // },
      },

      webdriver: {
        start_process: true,
        server_path: ''
      },

    },

    firefox: {
      desiredCapabilities: {
        browserName: 'firefox',
        alwaysMatch: {
          acceptInsecureCerts: true,
          'moz:firefoxOptions': {
            args: [
              // '-headless',
              // '-verbose'
            ]
          }
        }
      },
      webdriver: {
        start_process: true,
        server_path: '',
        cli_args: [
          // very verbose geckodriver logs
          // '-vv'
        ]
      }
    },

    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {
          // More info on Chromedriver: https://sites.google.com/a/chromium.org/chromedriver/
          //
          // w3c:false tells Chromedriver to run using the legacy JSONWire protocol (not required in Chrome 78)
          w3c: true,
          args: [
            //'--no-sandbox',
            //'--ignore-certificate-errors',
            //'--allow-insecure-localhost',
            //'--headless'
          ]
        }
      },

      webdriver: {
        start_process: true,
        server_path: '',
        cli_args: [
          // --verbose
        ]
      }
    },

  }
};
