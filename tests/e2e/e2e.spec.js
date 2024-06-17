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
const { UniqueIdUtils } = require('../../utils/uniqueIdUtils');

require('dotenv').config()

test('Check if a post can be created on a new publisher, and the publisher can change status to REMOVED', async ({ page, baseURL, browserName }) => {
    //Grab the unique ID of the browser
    let uniqueId = new UniqueIdUtils(browserName,"UI").uniqueId; // Example output: '9f74d2b3'

    //Step 1: Create Publisher
    const publisherPage = new PublisherPagePOM(page,uniqueId);
    await publisherPage.goto();
    await publisherPage.clickCreateNewPublisherButton();
    
    
    const newPublisherPage = new NewPublisherPagePOM(page,uniqueId);
    await newPublisherPage.fillPublisherForm();
    await newPublisherPage.clickCreatePublisherButton();
    
    //Assert Publisher was created
    await publisherPage.assertSuccessfulyCreatedTextIsVisible()
    
    //Step 2: Create Post + Step 3: Link to the Publisher created( Status= Active, Published= True)
    const postPage = new PostPagePOM(page,uniqueId);
    await postPage.goto()
    await postPage.clickCreateNewPostButton();

    const newPostPage = new NewPostPagePOM(page,uniqueId);
    await newPostPage.fillNewPostData();
    await newPostPage.clickCreatePostButton();

    //Assert Post was created
    await postPage.assertSuccessfulyCreatedTextIsVisible()

    //Filter the posts to find the recently created one
    await postPage.filterPostsByPostData()
    await postPage.findPostRowInTable();
    
    //Assert Post is visible in the table 
    await postPage.assertPostIsVisibleInTable();
    //Assert Post is linked to the Publisher created
    await postPage.clickPostRowInTable();
    const showPostPage = new ShowPostPagePOM(page,uniqueId);
    await showPostPage.assertPostIsLinkedToPublisher();
    //Assert Post status is active
    await showPostPage.assertPostStatusIsActive();
    
    //Step 4: Edit Post - Change status to remove
    await showPostPage.clickEditPostButton();
    const editPostPage = new EditPostPagePOM(page);
    await editPostPage.changeStatusToRemove();
    
    //Step 5: Save changes
    await editPostPage.clickSavePostEditButton();

    //Assert Post was updated
    await postPage.assertSuccessfulyUpdatedTextIsVisible()

    //Step 6: Validate post status was changed to Remove from the Post page
    await postPage.filterPostsByPostData()
    await postPage.findPostRowInTable()
    await postPage.clickPostRowInTable();

    //Assert Post status is removed
    await showPostPage.assertPostStatusIsRemoved();
})

test('Check if after a publisher and a post were created with API, the publisher can change status to REMOVED on the newly created post', async ({ page, baseURL, browserName }) => {
    //Grab the unique ID of the browser
    let uniqueId = new UniqueIdUtils(browserName,'API').uniqueId; // Example output: '9f74d2b3'
    console.log('uniqueId: ',uniqueId)
    console.log('browserName: ',browserName)
    //Declare the API utils with auth cookies
    const api = new ApiUtils('http://localhost:3000',await page.context().cookies());

    //Step 1:  Create Publisher using API
    await api.createPublisher('Test Publisher ' + uniqueId, `testemail${uniqueId}@example.com`);

    //Assert Publisher was created
    await expect(api.publisherId).toBeTruthy();

    //Step 2: Create Post using API + Step 3: Link to the Publisher created( Status= Active, Published= True)
    await api.createPost({title:'Test Post Title ' + uniqueId, content:'Test Post Content ' + uniqueId, someJsonNumber:'123', someJsonString:'Some JSON String', someJsonBoolean:'true', status:'ACTIVE', published:'true' });

    //Assert Post was created
    await expect(api.postId).toBeTruthy();

    const postPage = new PostPagePOM(page,uniqueId);
    await postPage.goto()
    // await postPage.filterPostsByPostData();
    await postPage.filterPostsByPostId(api.postId);
    await postPage.findPostRowInTable();
    await postPage.clickPostRowInTable();

    //Assert Post is linked to the Publisher created
    const showPostPage = new ShowPostPagePOM(page,uniqueId);
    await showPostPage.assertPostIsLinkedToPublisher();
    //Assert Post status is active
    await showPostPage.assertPostStatusIsActive();

    //Step 4: Edit Post - Change status to remove
    await showPostPage.clickEditPostButton();
    const editPostPage = new EditPostPagePOM(page);
    await editPostPage.changeStatusToRemove();

    //Step 5: Save changes
    await editPostPage.clickSavePostEditButton();

    //Step 6: Validate post status was changed to Remove from the Post page
    await postPage.filterPostsByPostId(api.postId);
    await postPage.findPostRowInTable()
    await postPage.clickPostRowInTable();

    //Assert Post status is removed
    await showPostPage.assertPostStatusIsRemoved();    
})