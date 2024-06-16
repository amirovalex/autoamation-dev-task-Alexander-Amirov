const { expect } = require('@playwright/test');

exports.PostPagePOM = class PostPagePOM {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page, uniqueId) {
    this.uniqueId = uniqueId
    this.page = page;
    this.postRowInTable
    this.sortByIdButton = page.getByRole('link', {name:"#"})
    this.createNewPostButton = page.getByRole('link', { name: 'Create new' });
    this.filterMenuButton = page.locator('[data-css="Post-filter-button"]');
    this.filterTitleInput = page.locator('[name="filter-title"]');
    this.filterContentInput = page.locator('[name="filter-content"]');
    this.filterPublisherInput = page.locator('[data-testid="property-filter-publisher"]').locator('input');
    this.filterPublisherSelect
    this.filterApplyChangesButton = page.getByRole('button', { name: 'Apply Changes' });
    this.successfulyDeletedText = page.getByText('Successfully deleted given record')
  }

  async goto() {
    //Go to the publisher page
    await this.page.goto('./admin/resources/Post');
  }

  async clickCreateNewPostButton() {
    //Click on Create new publisher button
    await this.createNewPostButton.click()
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

  async fillFilterTitleInput() {
    //Fill the form with credentials
    console.log(this.filterTitleInput)
    await this.filterTitleInput.fill('Test Post Title ' + this.uniqueId)
  }

  async fillFilterContentInput() {
    //Fill the form with credentials
    console.log(this.filterContentInput)
    await this.filterContentInput.fill('Test Post Content ' + this.uniqueId)
  }

  async fillFilterPublisherInput() {
    //Fill the form with credentials
    console.log(this.filterPublisherInput)
    await this.filterPublisherInput.fill(`testemail${this.uniqueId}@example.com`)
    this.filterPublisherSelect = this.page.locator('[data-testid="property-filter-publisher"]').getByText(`testemail${this.uniqueId}@example.com`, {exact: true});
    await this.filterPublisherSelect.click()
  }

  async populatePostRowInTable() {
    //Populate publisher row in table
    this.postRowInTable = this.page.locator('table tbody tr').locator('nth=0')
  }

  async clickPostRowInTable() {
    //Click on publisher row in table
    await this.postRowInTable.click()
  }

  async setSuccessfulyDeletedText() {
    this.successfulyDeletedText = this.page.getByText('Successfully deleted given record')

  }

  async expectSuccessfulyDeletedText() {
    await this.successfulyDeletedText.click()
    await expect(this.successfulyDeletedText).toBeVisible()
  }

  async sortPostsByIdDesc() {
    await this.sortByIdButton.click() 
    await this.sortByIdButton.click()
  }
};