const { expect } = require('@playwright/test');
require('dotenv').config()

exports.LoginPagePOM = class LoginPagePOM {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.emailInput = page.getByRole('textbox', { name: 'email' });
    this.passwordInput = page.getByRole('textbox', { name: 'password' });
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  async goto() {
    //Go to the login page
    await this.page.goto('./admin/login');
  }

  async fillFormWithCredentials() {
    //Fill the form with credentials
    await this.emailInput.fill(process.env.PLATFORM_LOGIN_EMAIL)
    await this.passwordInput.fill(process.env.PLATFORM_LOGIN_PASSWORD)
  }

  async clickLoginButton() {
    //Click on Login button to login
    await this.loginButton.click()
  }
};