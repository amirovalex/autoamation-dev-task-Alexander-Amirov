const { expect } = require('@playwright/test');

exports.NewPublisherPagePOM = class NewPublisherPagePOM {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page, uniqueId) {
    this.uniqueId = uniqueId
    this.page = page;
    this.nameInput = page.getByLabel('Name');
    this.emailInput = page.getByLabel('Email');
    this.createPublisherButton = page.getByRole('button', { name: 'Save' });
  }

  async goto() {
    //Go to the publisher page
    await this.page.goto('./admin/resources/Publisher/actions/new');
  }

  async fillNameInput() {
    //Click on Create new publisher button
    await this.nameInput.fill('Test Publisher ' + this.uniqueId)
  }

  async fillEmailInput() {
    //Click on Create new publisher button
    await this.emailInput.fill(`testemail${this.uniqueId}@example.com`)
  }

  async clickCreatePublisherButton() {
    //Click on Create button
    await this.createPublisherButton.click()
  }

  async fillPublisherForm() {
    await this.fillNameInput();
    await this.fillEmailInput();
  }

};