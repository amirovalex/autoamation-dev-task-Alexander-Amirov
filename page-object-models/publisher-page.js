const { expect } = require('@playwright/test');

exports.PublisherPagePOM = class PublisherPagePOM {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page,uniqueId) {
    this.uniqueId = uniqueId
    this.page = page;
    this.publisherRowInTable
    this.createNewPublisherButton = page.getByRole('link', { name: 'Create new' });
    this.filterMenuButton = page.locator('[data-css="Publisher-filter-button"]');
    this.filterNameInput = page.locator('[name="filter-name"]');
    this.filterEmailInput = page.locator('[name="filter-email"]');
    this.filterApplyChangesButton = page.getByRole('button', { name: 'Apply Changes' });
    this.successfulyDeletedText = page.getByText('Successfully deleted given record')
  }

  async goto() {
    //Go to the publisher page
    await this.page.goto('./admin/resources/Publisher');
  }

  async clickCreateNewPublisherButton() {
    //Click on Create new publisher button
    await this.createNewPublisherButton.click()
  }

  async clickFilterMenuButton() {
    //Click on Filter button
    // await expect(await this.filterMenuButton).toBeVisible()
    console.log(await this.filterMenuButton)
    await this.filterMenuButton.click()
  }
  async clickFilterApplyChangesButton() {
    //Click on Filter button
    await this.filterApplyChangesButton.click()
  }

  async fillFilterNameInput() {
    //Fill the form with credentials
    console.log(this.filterNameInput)
    await this.filterNameInput.fill('Test Publisher ' + this.uniqueId)
  }

  async fillFilterEmailInput() {
    //Fill the form with credentials
    console.log(this.filterEmailInput)
    await this.filterEmailInput.fill(`testemail${this.uniqueId}@example.com`)
  }

  async populatePublisherRowInTable() {
    //Populate publisher row in table
    this.publisherRowInTable = this.page.locator('table tbody tr')
  }

  async clickPublisherRowInTable() {
    //Click on publisher row in table
    await this.publisherRowInTable.click()
  }

  async setSuccessfulyDeletedText() {
    this.successfulyDeletedText = this.page.getByText('Successfully deleted given record')

  }

  async expectSuccessfulyDeletedText() {
    await this.successfulyDeletedText.click()
    await expect(this.successfulyDeletedText).toBeVisible()
  }
};