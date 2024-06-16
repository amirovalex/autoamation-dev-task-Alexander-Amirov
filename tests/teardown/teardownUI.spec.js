import { test as teardown } from '../../customFixtures.js';
import exp from 'constants';
const { expect } = require('@playwright/test');
const { PublisherPagePOM } = require('../../page-object-models/publisher-page');
const { ShowPublisherPagePOM } = require('../../page-object-models/show-publisher-page');
const { PostPagePOM } = require('../../page-object-models/post-page');
const { ShowPostPagePOM } = require('../../page-object-models/show-post-page');
const globalContext = require('../../global-context.js');
require('dotenv').config()

teardown('delete data', async ({ page,baseURL }) => {
  const testEnviroments = process.env.TESTS_RUNNING_IN_ENVIROMENTS.split(',')
  console.log(testEnviroments)
  console.log(process.env.TESTS_RUNNING_IN_ENVIROMENTS)
  console.log('unique id process.env.UNIQUE_ID_CHROME: ',process.env.UNIQUE_ID_CHROME)
  console.log('unique id process.env.UNIQUE_ID_FIREFOX: ',process.env.UNIQUE_ID_FIREFOX)
  console.log('unique id process.env.UNIQUE_ID_WEBKIT: ',process.env.UNIQUE_ID_WEBKIT)

  for(let testEnviroment of testEnviroments) {
    //Filter the posts to find the recently created one
    let uniqueId = '';
    if(testEnviroment === 'chromium' && process.env.UNIQUE_ID_CHROME){
        uniqueId = process.env.UNIQUE_ID_CHROME
    }
    if(testEnviroment === 'firefox' && process.env.UNIQUE_ID_FIREFOX){
        uniqueId = process.env.UNIQUE_ID_FIREFOX
    }
    if(testEnviroment === 'webkit' && process.env.UNIQUE_ID_WEBKIT){
        uniqueId = process.env.UNIQUE_ID_WEBKIT
    }

      const postPage = new PostPagePOM(page,uniqueId);
      await postPage.goto();
      await postPage.clickFilterMenuButton();
      await postPage.fillFilterTitleInput();
      await postPage.fillFilterContentInput();
      await postPage.fillFilterPublisherInput();
      await postPage.clickFilterApplyChangesButton();
      await postPage.sortPostsByIdDesc();
      await postPage.populatePostRowInTable();
      await postPage.clickPostRowInTable();
    
      const showPostPage = new ShowPostPagePOM(page);
      await showPostPage.deleteTestPost();
      
      //Filter the publishers to find recently created one
      const publisherPage = new PublisherPagePOM(page,uniqueId);
      await publisherPage.goto();
    
      await publisherPage.clickFilterMenuButton();
      await publisherPage.fillFilterNameInput();
      await publisherPage.fillFilterEmailInput();
      await publisherPage.clickFilterApplyChangesButton();
    
      await publisherPage.populatePublisherRowInTable();
      await publisherPage.clickPublisherRowInTable();
    
      const showPublisherPage = new ShowPublisherPagePOM(page);
      await showPublisherPage.deleteTestPublisher();
      console.log('1',publisherPage.successfulyDeletedText)
      await publisherPage.expectSuccessfulyDeletedText()
      console.log(page.url())
      expect(page.url()).toBe(`${baseURL}/admin/resources/Publisher`);

    
    // [uniqueId,uniqueIdAPI].map(async(id,index) => {
      
    // })
      
    }


  
  

  });
  
  teardown('delete data API', async ({ page,baseURL }) => {
    const testEnviroments = process.env.TESTS_RUNNING_IN_ENVIROMENTS.split(',')
    console.log(testEnviroments)
    console.log(process.env.TESTS_RUNNING_IN_ENVIROMENTS)
    console.log('unique id process.env.UNIQUE_ID_CHROME: ',process.env.UNIQUE_ID_CHROME)
    console.log('unique id process.env.UNIQUE_ID_FIREFOX: ',process.env.UNIQUE_ID_FIREFOX)
    console.log('unique id process.env.UNIQUE_ID_WEBKIT: ',process.env.UNIQUE_ID_WEBKIT)
  
    for(let testEnviroment of testEnviroments) {
      //Filter the posts to find the recently created one
      let uniqueId = 'api';
      if(testEnviroment === 'chromium' && process.env.UNIQUE_ID_CHROME){
          uniqueId += process.env.UNIQUE_ID_CHROME
      }
      if(testEnviroment === 'firefox' && process.env.UNIQUE_ID_FIREFOX){
          uniqueId += process.env.UNIQUE_ID_FIREFOX
      }
      if(testEnviroment === 'webkit' && process.env.UNIQUE_ID_WEBKIT){
          uniqueId += process.env.UNIQUE_ID_WEBKIT
      }
      const postPage = new PostPagePOM(page,uniqueId);
      await postPage.goto();
      await postPage.clickFilterMenuButton();
      await postPage.fillFilterTitleInput();
      await postPage.fillFilterContentInput();
      await postPage.fillFilterPublisherInput();
      await postPage.clickFilterApplyChangesButton();
      await postPage.sortPostsByIdDesc();
      await postPage.populatePostRowInTable();
      await postPage.clickPostRowInTable();
    
      const showPostPage = new ShowPostPagePOM(page);
      await showPostPage.deleteTestPost();
      
      //Filter the publishers to find recently created one
      const publisherPage = new PublisherPagePOM(page,uniqueId);
      await publisherPage.goto();
    
      await publisherPage.clickFilterMenuButton();
      await publisherPage.fillFilterNameInput();
      await publisherPage.fillFilterEmailInput();
      await publisherPage.clickFilterApplyChangesButton();
    
      await publisherPage.populatePublisherRowInTable();
      await publisherPage.clickPublisherRowInTable();
    
      const showPublisherPage = new ShowPublisherPagePOM(page);
      await showPublisherPage.deleteTestPublisher();
      console.log('1',publisherPage.successfulyDeletedText)
      await publisherPage.expectSuccessfulyDeletedText()
      console.log(page.url())
      expect(page.url()).toBe(`${baseURL}/admin/resources/Publisher`);

    }
  })