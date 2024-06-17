const { expect } = require('@playwright/test');

exports.NewPostPagePOM = class NewPostPagePOM {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page,uniqueId) {
    this.uniqueId = uniqueId
    this.page = page;
    this.titleInput = page.getByLabel('Title');
    this.contentInput = page.getByLabel('Content');
    this.statusInput = page.getByTestId('property-edit-status').locator('div').filter({ hasText: 'Select...' }).nth(2)
    this.publishedInput = page.getByText('Published', {exact: true});
    this.someJSONInput = page.getByRole('button', {name: 'Add new item'});
    this.publisherInput = page.getByTestId('property-edit-publisher').locator('input')
    this.someJSONNumber
    this.someJSONString
    this.someJSONBoolean
    this.someJSONDate
    this.publisherSelect
    this.activeSelectInput
    this.removedSelectInput
    this.createPostButton = page.getByRole('button', { name: 'Save' });
  }

  async goto() {
    //Go to the publisher page
    await this.page.goto('./admin/resources/Post/actions/new');
  }
  
  async fillTitleInput() {
    //Click on Create new publisher button
    await this.titleInput.fill('Test Post Title ' + this.uniqueId)
  }

  async fillContentInput() {
    //Click on Create new publisher button
    await this.contentInput.fill('Test Post Content ' + this.uniqueId)
  }

  async clickAddJSONData() {
    await this.someJSONInput.click();
  }

  async fillSomeJSONNumber() {
    this.someJSONNumber = this.page.getByLabel('Some Json Number')
    await this.someJSONNumber.fill('123')
    await this.someJSONNumber.blur()
  }

  async fillSomeJSONString() {
    // this.someJSONString = this.page.getByRole('textbox', { name: 'Some Json String'})
    // this.someJSONString = this.page.locator('//input[@id="someJson.0.string"]');
    this.someJSONString = this.page.getByLabel('Some Json String');
    await this.someJSONString.fill('Some JSON String')
    await this.someJSONString.blur()
  }

  async clickSomeJSONBoolean() {
    this.someJSONBoolean = this.page.getByText('Some Json Boolean', {exact: true});
    await this.someJSONBoolean.click()
    await this.someJSONBoolean.blur()
  }

  async fillStatusInput() {
    //Click on Create new publisher button
    await this.statusInput.click()
    this.activeSelectInput = this.page.getByText('ACTIVE', {exact: true});
    await this.activeSelectInput.click()
  }

  async fillPublisherInput() {
    //Click on Create new publisher button
    await this.publisherInput.fill(`testemail${this.uniqueId}@example.com`)
    this.publisherSelect = this.page.getByText(`testemail${this.uniqueId}@example.com`, {exact: true});
    await this.publisherSelect.click()
  }

  async checkPublishedInput() {
    //Click on Create new publisher button
    await this.publishedInput.check()
  }

  async clickCreatePostButton() {
    //Click on Create button
    await this.createPostButton.click()
  }

  async fillJSONData() {
    await this.fillSomeJSONNumber()
    await this.fillSomeJSONString()
    await this.clickSomeJSONBoolean()
  }

  async fillNewPostData() {
    await this.fillTitleInput();
    await this.fillContentInput();
    await this.clickAddJSONData();
    await this.fillSomeJSONNumber();
    await this.fillSomeJSONString();
    await this.clickSomeJSONBoolean();
    await this.fillStatusInput();
    await this.checkPublishedInput();
    await this.fillPublisherInput();
  }


};