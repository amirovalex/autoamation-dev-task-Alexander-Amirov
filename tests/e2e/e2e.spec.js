// @ts-check
// const { test, expect } = require('@playwright/test');
const { PublisherPagePOM } = require('../../page-object-models/publisher-page');
const { NewPublisherPagePOM } = require('../../page-object-models/new-publisher-page');
const { PostPagePOM } = require('../../page-object-models/post-page');
const { LoginPagePOM } = require('../../page-object-models/login-page');
const { NewPostPagePOM } = require('../../page-object-models/new-post-page');
const { EditPostPagePOM } = require('../../page-object-models/edit-post-page');
const { ShowPostPagePOM } = require('../../page-object-models/show-post-page');
const crypto = require('crypto');
const { test, expect } =  require('../../customFixtures.js')
const globalContext = require('../../global-context.js');
const { ApiUtils } = require('../../utils/apiUtils');
const { UniqueIdUtils } = require('../../utils/uniqueIdUtils');
const { HomePagePOM } = require('../../page-object-models/home-page.js');

test.describe.configure({ mode: 'serial' });

/** @type {import('@playwright/test').Page} */
let page;

const uniqueIDs = {
    chromium: crypto.randomBytes(4).toString('hex'),
    firefox: crypto.randomBytes(4).toString('hex'),
    webkit: crypto.randomBytes(4).toString('hex')
}
const idPublisherAPIList = []
const idPostAPIList = []

test.beforeAll('Setup', async ({browser}) => {
    page = await browser.newPage();
    //Go to the login page
    const loginPage = new LoginPagePOM(page);
    await loginPage.loginToThePage()
});

test('Check if a post can be created on a new publisher, and the publisher can change status to REMOVED', async ({ baseURL, browserName }) => {
    //Grab the unique ID of the browser
    let uniqueId = uniqueIDs[browserName] // Example output: '9f74d2b3'

    //Step 1: Create Publisher
    const publisherPage = new PublisherPagePOM(page,uniqueId);
    await publisherPage.createNewPublisher()
    
    //Step 2: Create Post + Step 3: Link to the Publisher created( Status= Active, Published= True)
    const postPage = new PostPagePOM(page,uniqueId);
    await postPage.createNewPost()

    //Step 4: Edit Post - Change status to remove
    await postPage.changePostStatusToRemoved()
    
    //Step 6: Validate post status was changed to Remove
    await postPage.validatePostStatusChanedToRemoved()
})

test('Check if after a publisher and a post were created with API, the publisher can change status to REMOVED on the newly created post', async ({ baseURL, browserName }) => {
    //Grab the unique ID of the browser
    let uniqueId = 'api' + uniqueIDs[browserName] // Example output: '9f74d2b3'
    console.log('uniqueId: ',uniqueId)
    console.log('browserName: ',browserName)
    console.log('page context cookies:' ,await page.context().cookies())
    //Declare the API utils with auth cookies
    const api = new ApiUtils('http://localhost:3000',await page.context().cookies());

    //Step 1:  Create Publisher using API
    await api.createPublisher('Test Publisher ' + uniqueId, `testemail${uniqueId}@example.com`);

    idPublisherAPIList.push(api.publisherId)
    
    //Step 2: Create Post using API + Step 3: Link to the Publisher created( Status= Active, Published= True)
    await api.createPost({title:'Test Post Title ' + uniqueId, content:'Test Post Content ' + uniqueId, someJsonNumber:'123', someJsonString:'Some JSON String', someJsonBoolean:'true', status:'ACTIVE', published:'true' });
    
    idPostAPIList.push(api.postId)

    const postPage = new PostPagePOM(page,uniqueId);
    //Step 4: Edit Post - Change status to remove
    await postPage.changePostStatusToRemoved()
    
    //Step 6: Validate post status was changed to Remove
    await postPage.validatePostStatusChanedToRemoved() 
})

test.afterAll('Teardown', async () => {
    const api = new ApiUtils('http://localhost:3000',await page.context().cookies());

    for(let x = idPostAPIList.length; x > 0; x--) {
        await api.deletePost(idPostAPIList.pop())
        await api.deletePublisher(idPublisherAPIList.pop())
    }
})