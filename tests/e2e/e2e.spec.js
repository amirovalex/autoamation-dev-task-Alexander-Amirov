// @ts-check
// const { test, expect } = require('@playwright/test');
const { PublisherPagePOM } = require('../../page-object-models/publisher-page');
const { NewPublisherPagePOM } = require('../../page-object-models/new-publisher-page');
const { PostPagePOM } = require('../../page-object-models/post-page');
const { NewPostPagePOM } = require('../../page-object-models/new-post-page');
const { EditPostPagePOM } = require('../../page-object-models/edit-post-page');
const { ShowPostPagePOM } = require('../../page-object-models/show-post-page');
const crypto = require('crypto');
const { test, expect } =  require('../../customFixtures.js')
const globalContext = require('../../global-context.js');
const { ApiUtils } = require('../../utils/apiUtils');

require('dotenv').config()

test('Check if a post can be created on a new publisher, and the publisher can change status to REMOVED', async ({ page, baseURL, browserName }) => {
    let uniqueId = '';
    if(browserName === 'chromium' && process.env.UNIQUE_ID_CHROME){
        console.log('defaultBrowserType is chromium')
        uniqueId = process.env.UNIQUE_ID_CHROME
    }
    if(browserName === 'firefox' && process.env.UNIQUE_ID_FIREFOX){
        console.log('defaultBrowserType is firefox')
        uniqueId = process.env.UNIQUE_ID_FIREFOX
    }
    if(browserName === 'webkit' && process.env.UNIQUE_ID_WEBKIT){
        console.log('defaultBrowserType is safari')
        uniqueId = process.env.UNIQUE_ID_WEBKIT
    }
    // Generate a short unique ID using crypto
    console.log('unique id process.env.UNIQUE_ID_CHROME: ',process.env.UNIQUE_ID_CHROME)
    
    console.log(uniqueId); // Example output: '9f74d2b3'
    
    const publisherPage = new PublisherPagePOM(page,uniqueId);
    await publisherPage.goto();

    await publisherPage.clickCreateNewPublisherButton();

    const newPublisherPage = new NewPublisherPagePOM(page,uniqueId);

    await newPublisherPage.fillNameInput();

    await newPublisherPage.fillEmailInput();

    await newPublisherPage.clickCreatePublisherButton();
    console.log(page.url())
    console.log(baseURL)
    await expect(page).toHaveURL(/.*admin\/resources\/Publisher/);
    
    const postPage = new PostPagePOM(page,uniqueId);
    await postPage.goto()

    await postPage.clickCreateNewPostButton();

    const newPostPage = new NewPostPagePOM(page,uniqueId);
    
    await newPostPage.fillTitleInput();
    await newPostPage.fillContentInput();
    await newPostPage.clickAddJSONData();
    await newPostPage.fillSomeJSONNumber();
    await newPostPage.fillSomeJSONString();
    await newPostPage.clickSomeJSONBoolean();
    // await newPostPage.fillJSONData();
    await newPostPage.fillStatusInput();
    await newPostPage.checkPublishedInput();
    await newPostPage.fillPublisherInput();

    await newPostPage.clickCreatePostButton();
    await expect(page).toHaveURL(/.*admin\/resources\/Post/);

    await postPage.clickFilterMenuButton();
    await postPage.fillFilterTitleInput();
    await postPage.fillFilterContentInput();
    await postPage.fillFilterPublisherInput();
    await postPage.clickFilterApplyChangesButton();
    await postPage.sortPostsByIdDesc();
    await postPage.populatePostRowInTable();
    await postPage.clickPostRowInTable();

    const showPostPage = new ShowPostPagePOM(page);
    await showPostPage.clickEditPostButton();
    const editPostPage = new EditPostPagePOM(page);
    await editPostPage.changeStatusToRemove();
    await editPostPage.clickSavePostEditButton();

    await postPage.clickFilterMenuButton();
    await postPage.fillFilterTitleInput();
    await postPage.fillFilterContentInput();
    await postPage.fillFilterPublisherInput();
    await postPage.clickFilterApplyChangesButton();
    await postPage.sortPostsByIdDesc();
    await postPage.populatePostRowInTable();
    await postPage.clickPostRowInTable();

    await expect(showPostPage.postStatus).toHaveText("REMOVED")
})

test('Check if after a publisher and a post were created with API, the publisher can change status to REMOVED on the newly created post', async ({ page, baseURL, browserName }) => {
    let uniqueId = 'api';
    if(browserName === 'chromium' && process.env.UNIQUE_ID_CHROME){
        console.log('defaultBrowserType is chromium')
        uniqueId += process.env.UNIQUE_ID_CHROME
    }
    if(browserName === 'firefox' && process.env.UNIQUE_ID_FIREFOX){
        console.log('defaultBrowserType is firefox')
        uniqueId += process.env.UNIQUE_ID_FIREFOX
    }
    if(browserName === 'webkit' && process.env.UNIQUE_ID_WEBKIT){
        console.log('defaultBrowserType is safari')
        uniqueId += process.env.UNIQUE_ID_WEBKIT
    }
    const api = new ApiUtils('http://localhost:3000',await page.context().cookies());

    // const loginResp = await api.login();
    // console.log('loginResp: ',loginResp)

    // Create Publisher using API
    const publisher = await api.createPublisher('Test Publisher ' + uniqueId, `testemail${uniqueId}@example.com`);
    console.log(publisher)
    //Create Post using API
    const post = await api.createPost({title:'Test Post Title ' + uniqueId, content:'Test Post Content ' + uniqueId, someJsonNumber:'123', someJsonString:'Some JSON String', someJsonBoolean:'true', status:'ACTIVE', published:'true' });
    console.log(post)

    // if(browserName === 'webkit') {
    //     console.log('publisher: ',publisher)
    // }
    // Create Post using API

//     title: Test Publisher Title
// content: Test Publisher Content
// someJson.0.number: 123
// someJson.0.string: Some JSON String
// someJson.0.boolean: true
// status: ACTIVE
// published: true
// publisher: 238


    // Generate a short unique ID using crypto
    // console.log('unique id process.env.UNIQUE_ID_CHROME: ',process.env.UNIQUE_ID_CHROME)
    
    // console.log(uniqueId); // Example output: '9f74d2b3'
    
    // const publisherPage = new PublisherPagePOM(page,uniqueId);
    // await publisherPage.goto();

    // await publisherPage.clickCreateNewPublisherButton();

    // const newPublisherPage = new NewPublisherPagePOM(page,uniqueId);

    // await newPublisherPage.fillNameInput();

    // await newPublisherPage.fillEmailInput();

    // await newPublisherPage.clickCreatePublisherButton();
    // console.log(page.url())
    // console.log(baseURL)
    // await expect(page).toHaveURL(/.*admin\/resources\/Publisher/);
    
    // const postPage = new PostPagePOM(page,uniqueId);
    // await postPage.goto()

    // await postPage.clickCreateNewPostButton();

    // const newPostPage = new NewPostPagePOM(page,uniqueId);
    
    // await newPostPage.fillTitleInput();
    // await newPostPage.fillContentInput();
    // await newPostPage.clickAddJSONData();
    // await newPostPage.fillSomeJSONNumber();
    // await newPostPage.fillSomeJSONString();
    // await newPostPage.clickSomeJSONBoolean();
    // // await newPostPage.fillJSONData();
    // await newPostPage.fillStatusInput();
    // await newPostPage.checkPublishedInput();
    // await newPostPage.fillPublisherInput();

    // await newPostPage.clickCreatePostButton();
    // await expect(page).toHaveURL(/.*admin\/resources\/Post/);

    // await postPage.clickFilterMenuButton();
    // await postPage.fillFilterTitleInput();
    // await postPage.fillFilterContentInput();
    // await postPage.fillFilterPublisherInput();
    // await postPage.clickFilterApplyChangesButton();
    // await postPage.sortPostsByIdDesc();
    // await postPage.populatePostRowInTable();
    // await postPage.clickPostRowInTable();

    // const showPostPage = new ShowPostPagePOM(page);
    // await showPostPage.clickEditPostButton();
    // const editPostPage = new EditPostPagePOM(page);
    // await editPostPage.changeStatusToRemove();
    // await editPostPage.clickSavePostEditButton();

    // await postPage.clickFilterMenuButton();
    // await postPage.fillFilterTitleInput();
    // await postPage.fillFilterContentInput();
    // await postPage.fillFilterPublisherInput();
    // await postPage.clickFilterApplyChangesButton();
    // await postPage.sortPostsByIdDesc();
    // await postPage.populatePostRowInTable();
    // await postPage.clickPostRowInTable();

    // await expect(showPostPage.postStatus).toHaveText("REMOVED")
})