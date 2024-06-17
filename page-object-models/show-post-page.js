const { expect } = require('@playwright/test');

exports.ShowPostPagePOM = class ShowPostPagePOM {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page,uniqueId) {
    this.uniqueId = uniqueId
    this.page = page;
    this.deletePostButton = page.getByRole('link', { name: 'Delete' });
    this.editPostButton = page.getByRole('link', { name: 'Edit' });
    this.confirmDeleteButton = page.getByRole('button', { name: 'Confirm'})
    this.postStatus = page.locator('[data-css="Post-show-status"]').locator('span');
    this.publishedStatus = page.locator('[data-css="Post-show-published"]').locator('span');
    // this.postStatus = page.locator('[data-css="Post-show-status"]').locator('span', {hasText: 'REMOVED'});
    this.publisherOfPost = page.locator('[data-css="Post-show-publisher"]').locator('a');
    // this.publisherOfPost - page.getByRole('link', { name: `testemail${this.uniqueId}@example.com` })
  }

  async deleteTestPost() {
    await this.deletePostButton.click();
    await this.confirmDeleteButton.click();
  }

  async clickEditPostButton() {
    await this.editPostButton.click();
  }
  
  async assertPostIsLinkedToPublisher() {
    await expect(this.publisherOfPost).toHaveText(`testemail${this.uniqueId}@example.com`);
  }
  
  async assertPostStatusIsActive() {
    await expect(this.postStatus).toHaveText('ACTIVE');
  }
  
  async assertPostStatusIsRemoved() {
    await expect(this.postStatus).toHaveText('REMOVED');
  }
  

  async assertPublishedStatusIsTrue() {
    await expect(this.publishedStatus).toHaveText('Yes');
  }

  async assertPublishedStatusIsFalse() {
    await expect(this.publishedStatus).toHaveText('No');
  }
};