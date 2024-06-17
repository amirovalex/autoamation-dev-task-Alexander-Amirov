import { test as teardown } from '../../customFixtures.js';
import exp from 'constants';
const { expect } = require('@playwright/test');
const { PublisherPagePOM } = require('../../page-object-models/publisher-page.js');
const { ShowPublisherPagePOM } = require('../../page-object-models/show-publisher-page.js');
const { PostPagePOM } = require('../../page-object-models/post-page.js');
const { ShowPostPagePOM } = require('../../page-object-models/show-post-page.js');
const { UniqueIdUtils } = require('../../utils/uniqueIdUtils.js');
require('dotenv').config()

teardown('delete data', async ({ page,baseURL }) => {
  const testEnviroments = process.env.TESTS_RUNNING_IN_ENVIROMENTS.split(',')

  for(let testEnviroment of testEnviroments) {
      const uniqueId = new UniqueIdUtils(testEnviroment,"UI").uniqueId;

      //Filter the posts to find the recently created one
      const postPage = new PostPagePOM(page,uniqueId);
      await postPage.goto();
      await postPage.filterPostsByPostData();
      await postPage.findPostRowInTable();
      await postPage.clickPostRowInTable();
    
      //Delete the recently created post
      const showPostPage = new ShowPostPagePOM(page);
      await showPostPage.deleteTestPost();
      
      //Filter the publishers to find recently created one
      const publisherPage = new PublisherPagePOM(page,uniqueId);
      await publisherPage.goto();
      await publisherPage.filterPublisher();
      await publisherPage.findPublisherRowInTable();
      await publisherPage.clickPublisherRowInTable();

      //Delete the recently created publisher
      const showPublisherPage = new ShowPublisherPagePOM(page);
      await showPublisherPage.deleteTestPublisher();

      //Assert the successfully deleted message is present
      await publisherPage.assertSuccessfulyDeletedTextIsVisible()
    }
  });
  
  teardown('delete data API', async ({ page,baseURL }) => {
    const testEnviroments = process.env.TESTS_RUNNING_IN_ENVIROMENTS.split(',')
  
    for(let testEnviroment of testEnviroments) {
      const uniqueId = new UniqueIdUtils(testEnviroment,"API").uniqueId;
      
      //Filter the posts to find the recently created one
      const postPage = new PostPagePOM(page,uniqueId);
      await postPage.goto();
      await postPage.filterPostsByPostData();
      await postPage.findPostRowInTable();
      await postPage.clickPostRowInTable();
    
      //Delete the recently created post
      const showPostPage = new ShowPostPagePOM(page);
      await showPostPage.deleteTestPost();
      
      //Filter the publishers to find recently created one
      const publisherPage = new PublisherPagePOM(page,uniqueId);
      await publisherPage.goto();
      await publisherPage.filterPublisher();
      await publisherPage.findPublisherRowInTable();
      await publisherPage.clickPublisherRowInTable();
    
      //Delete the recently created publisher
      const showPublisherPage = new ShowPublisherPagePOM(page);
      await showPublisherPage.deleteTestPublisher();

      //Assert the successfully deleted message is present
      await publisherPage.assertSuccessfulyDeletedTextIsVisible()
    }
  })