const { expect } = require('@playwright/test');

exports.HomePagePOM = class HomePagePOM {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.greetingTitle = page.locator('[font-size=h2]');
    this.greetingText = "Welcome, Candidate!"
  }

  async goto() {
    //Go to the home page
    await this.page.goto('./admin');
  }

  async checkTitleHasCorrectText() {
  //Assert the title has the correct text
  await expect(this.greetingTitle).toHaveText(this.greetingText);
  }
};