const { expect } = require('@playwright/test');
const { NewPublisherPagePOM } = require('./new-publisher-page');
exports.PublisherPagePOM = class PublisherPagePOM {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page,uniqueId) {
    this.uniqueId = uniqueId
    this.page = page;
    this.publisherRowInTable
    this.sortByIdButton = page.getByRole('link', {name:"#"})
    this.createNewPublisherButton = page.getByRole('link', { name: 'Create new' });
    this.filterMenuButton = page.locator('[data-css="Publisher-filter-button"]');
    this.filterNameInput = page.locator('[name="filter-name"]');
    this.filterEmailInput = page.locator('[name="filter-email"]');
    this.filterIdInput = page.locator('[name="filter-id"]');
    this.filterApplyChangesButton = page.getByRole('button', { name: 'Apply Changes' });
    this.successfulyDeletedText = page.getByText('Successfully deleted given record')
    this.successfulyCreatedText = page.getByText('Successfully created a new record')
    this.successfulyUpdatedText = page.getByText('Successfully updated given record')
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
    await this.filterMenuButton.click()
  }
  async clickFilterApplyChangesButton() {
    //Click on Filter button
    await this.filterApplyChangesButton.click()
  }

  async fillFilterNameInput() {
    //Fill the form with credentials
    await this.filterNameInput.fill('Test Publisher ' + this.uniqueId)
  }

  async sortPublishersByIdDesc() {
    await this.sortByIdButton.click() 
    await this.sortByIdButton.click()
  }

  async fillFilterEmailInput() {
    //Fill the form with credentials
    await this.filterEmailInput.fill(`testemail${this.uniqueId}@example.com`)
  }

  async populatePublisherRowInTable() {
    //Populate publisher row in table
    this.publisherRowInTable = this.page.locator('table tbody tr').locator('nth=0')
  }

  async clickPublisherRowInTable() {
    //Click on publisher row in table
    await this.publisherRowInTable.click()
  }

  async setSuccessfulyDeletedText() {
    this.successfulyDeletedText = this.page.getByText('Successfully deleted given record')

  }

  async assertSuccessfulyDeletedTextIsVisible() {
    await this.successfulyDeletedText.click()
    await expect(this.successfulyDeletedText).toBeVisible()
  }

  async assertSuccessfulyCreatedTextIsVisible() {
    await this.successfulyCreatedText.click()
    await expect(this.successfulyCreatedText).toBeVisible()
  }

  async assertSuccessfulyUpdatedTextIsVisible() {
    await this.successfulyUpdatedText.click()
    await expect(this.successfulyUpdatedText).toBeVisible()
  }

  async filterPublisher() {
    await this.clickFilterMenuButton();
    await this.fillFilterNameInput();
    await this.fillFilterEmailInput();
    await this.clickFilterApplyChangesButton();
  }

  async findPublisherRowInTable() {
    //Filter the publishers to find recently created one
    await this.sortPublishersByIdDesc();
    await this.populatePublisherRowInTable();
  }

  async assertPublisherIsVisibleInTable() {
    await expect(this.publisherRowInTable).toBeVisible()
  }

  async filterPublishersByPublishertId(publisherId) {
    await this.clickFilterMenuButton();
    await this.filterIdInput.fill(`${publisherId}`)
    await this.clickFilterApplyChangesButton();
  }

  async createNewPublisher() {
    await this.goto();
    await this.clickCreateNewPublisherButton();
  
    const newPublisherPage = new NewPublisherPagePOM(this.page,this.uniqueId);
    await newPublisherPage.fillPublisherForm();
    await newPublisherPage.clickCreatePublisherButton();
  }
};