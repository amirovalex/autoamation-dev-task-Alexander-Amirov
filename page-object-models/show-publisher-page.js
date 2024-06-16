const { expect } = require('@playwright/test');

exports.ShowPublisherPagePOM = class ShowPublisherPagePOM {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.deletePublisherButton = page.getByRole('link', { name: 'Delete' });
    this.confirmDeleteButton = page.getByRole('button', { name: 'Confirm'})
  }

  async deleteTestPublisher() {
    await this.deletePublisherButton.click();
    await this.confirmDeleteButton.click();
  }
  
};