// @ts-check
// const { test, expect } = require('@playwright/test');
const { LoginPagePOM } = require('../../page-object-models/login-page');
const { HomePagePOM } = require('../../page-object-models/home-page');
const crypto = require('crypto');
const { test, expect } =  require('../../customFixtures.js')
const globalContext = require('../../global-context.js');
require('dotenv').config()

function getProjectNamesFromCLI() {
  const args = process.argv.slice(2);
  const projectNames = [];

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--project' && args[i + 1]) {
      projectNames.push(args[i + 1]);
      i++; // Skip the next element as it's the project name
    }
  }

  return projectNames;
}

const projectNames = getProjectNamesFromCLI();
console.log(projectNames)
test('Login to the admin panel', async ({ page },testInfo) => {
  const testInfoObject = testInfo.project.use;
  console.log('testUniqueId ', testInfoObject)
  const cliArgs = process.argv;
console.log('cliArgs ', cliArgs)

  //Setup env variables to defaults before test
  process.env.UNIQUE_ID_CHROME = crypto.randomBytes(4).toString('hex');
  process.env.UNIQUE_ID_FIREFOX = crypto.randomBytes(4).toString('hex');
  process.env.UNIQUE_ID_WEBKIT = crypto.randomBytes(4).toString('hex');
  
  console.log('unique id process.env.UNIQUE_ID_CHROME: ',process.env.UNIQUE_ID_CHROME)

  //Go to the login page
  const loginPage = new LoginPagePOM(page);
  await loginPage.goto();

  //Fill the login form with credentials
  await loginPage.fillFormWithCredentials();

  //Login to the admin panel
  await loginPage.clickLoginButton();

  //Assert the greeting title has the correct text
  const homePage = new HomePagePOM(page);
  await homePage.checkTitleHasCorrectText();
  await page.context().storageState({ path: 'storageState.json' });

});
