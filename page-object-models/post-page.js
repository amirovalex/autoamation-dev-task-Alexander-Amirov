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
    this.filterIdInput = page.locator('[name="filter-id"]');
    this.filterPublisherInput = page.locator('[data-testid="property-filter-publisher"]').locator('input');
    this.filterPublisherSelect
    this.filterApplyChangesButton = page.getByRole('button', { name: 'Apply Changes' });
    this.successfulyDeletedText = page.getByText('Successfully deleted given record')
    this.successfulyCreatedText = page.getByText('Successfully created a new record')
    this.successfulyUpdatedText = page.getByText('Successfully updated given record')
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
    await this.filterMenuButton.click()
  }
  async clickFilterApplyChangesButton() {
    //Click on Filter button
    await this.filterApplyChangesButton.click()
  }

  async fillFilterTitleInput() {
    //Fill the form with credentials
    await this.filterTitleInput.fill('Test Post Title ' + this.uniqueId)
  }

  async fillFilterContentInput() {
    //Fill the form with credentials
    await this.filterContentInput.fill('Test Post Content ' + this.uniqueId)
  }

  async fillFilterPublisherInput() {
    //Fill the form with credentials
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

  async sortPostsByIdDesc() {
    await this.sortByIdButton.click() 
    await this.sortByIdButton.click()
  }

  async filterPostsByPostData() {
    await this.clickFilterMenuButton();
    await this.fillFilterTitleInput();
    await this.fillFilterContentInput();
    await this.fillFilterPublisherInput();
    await this.clickFilterApplyChangesButton();
  }

  async findPostRowInTable() {
    await this.sortPostsByIdDesc();
    await this.populatePostRowInTable();
  }

  async assertPostIsVisibleInTable() {
    await expect(this.postRowInTable).toBeVisible()
  }

  async filterPostsByPostId(postId) {
    await this.clickFilterMenuButton();
    await this.filterIdInput.fill(`${postId}`)
    await this.clickFilterApplyChangesButton();
  }
};