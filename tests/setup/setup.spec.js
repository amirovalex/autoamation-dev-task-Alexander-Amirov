// @ts-check
// const { test, expect } = require('@playwright/test');
const { LoginPagePOM } = require('../../page-object-models/login-page');
const { HomePagePOM } = require('../../page-object-models/home-page');
const crypto = require('crypto');
const { test, expect } =  require('../../customFixtures.js')
require('dotenv').config()

test('Login to the admin panel', async ({ page },testInfo) => {
  //Setup env variables to defaults before test
  process.env.UNIQUE_ID_CHROME = crypto.randomBytes(4).toString('hex');
  process.env.UNIQUE_ID_FIREFOX = crypto.randomBytes(4).toString('hex');
  process.env.UNIQUE_ID_WEBKIT = crypto.randomBytes(4).toString('hex');
  
  //Go to the login page
  const loginPage = new LoginPagePOM(page);
  await loginPage.goto();

  //Fill the login form with credentials
  await loginPage.fillFormWithCredentials();

  //Login to the admin panel
  await loginPage.clickLoginButton();

  //Assert the greeting title has the correct text
  const homePage = new HomePagePOM(page);
  await homePage.assertTitleHasCorrectText();

  //Save the login state
  await page.context().storageState({ path: 'storageState.json' });

});
