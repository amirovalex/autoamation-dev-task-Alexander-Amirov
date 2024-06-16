const { expect } = require('@playwright/test');

exports.ShowPostPagePOM = class ShowPostPagePOM {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.deletePostButton = page.getByRole('link', { name: 'Delete' });
    this.editPostButton = page.getByRole('link', { name: 'Edit' });
    this.confirmDeleteButton = page.getByRole('button', { name: 'Confirm'})
    this.postStatus = page.locator('[data-css="Post-show-status"]').locator('span', {hasText: 'REMOVED'});
  }

  async deleteTestPost() {
    await this.deletePostButton.click();
    await this.confirmDeleteButton.click();
  }

  async clickEditPostButton() {
    await this.editPostButton.click();
  }
  
};