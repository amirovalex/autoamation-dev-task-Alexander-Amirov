const { expect } = require('@playwright/test');

exports.EditPostPagePOM = class EditPostPagePOM {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.deletePostButton = page.getByRole('link', { name: 'Delete' });
    this.editPostButton = page.getByRole('link', { name: 'Delete' });
    this.confirmDeleteButton = page.getByRole('button', { name: 'Confirm'})

    this.titleInput = page.getByLabel('Title');
    this.contentInput = page.getByLabel('Content');
    this.statusInput = page.getByTestId('property-edit-status').locator('div').filter({ hasText: 'ACTIVE' }).nth(2)
    this.publishedInput = page.getByText('Published', {exact: true});
    this.publisherInput = page.getByTestId('property-edit-publisher').locator('input')
    this.publisherSelect
    this.removeSelectInput
    this.removedSelectInput
    this.savePostEditButton = page.getByRole('button', { name: 'Save' });
  }

  async deleteTestPost() {
    await this.deletePostButton.click();
    await this.confirmDeleteButton.click();
  }

  async editTestPost() {
    await this.editPostButton.click();
  }

  async changeStatusToRemove() {
    //Click on Create new publisher button
    await this.statusInput.click()
    this.activeSelectInput = this.page.getByText('REMOVED', {exact: true});
    await this.activeSelectInput.click()
  }

  async clickSavePostEditButton() {
    //Click on Create button
    await this.savePostEditButton.click()
  }
  
};