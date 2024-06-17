# Automation Engineer Home Assignment

# Test Objective

Verify that the product works as expected and the described features are available.

Verify that the system allows for the creation, linking, editing, and status management of posts and publishers, ensuring that all associated functionalities work correctly and that changes are accurately reflected in the user interface.

This objective ensures that the entire workflow, from creating a publisher and post to editing and validating status changes, is thoroughly tested for consistency and correctness.

# Test Enviroment

NodeJs V20.14
Playwright V1.44

## Other Dependencies

Axios V1.7.2
Dotenv V16.4.5
Form-Data V4.0.0

# Prerequisites

Download the web app repo to your PC
Use the next docker command to deploy the web app locally:

```
docker-compose up -d
```

By default, the app will be available at `http://localhost:3000/admin`

```
Login Email: admin@example.com
Password: password
```

# Test Project Instructions

1.Download the project into a folder on your PC
2.Use `npm install` to install dependencies
3.Write a test run command specific to your needs like test projects to be runned and test browsers following this rules:
```
Specify Your Test Enviroment Browsers as: chromium, firefox, webkit
Specify The Projects to be runned as: e2e-chromium, e2e-firefox, e2e-webkit

Your run command should look like this if you are running the test in all 3 browsers:
TESTS_RUNNING_IN_ENVIROMENTS=chromium,firefox,webkit npx playwright test --project=e2e-chromium --project=e2e-firefox --project=e2e-webkit

Your run command should look like this if you are running the test in Chromium browser:
TESTS_RUNNING_IN_ENVIROMENTS=chromium npx playwright test --project=e2e-chromium
```
4.To open the test report run this command: `npx playwright show-report`
5.On failed tests a video and screenshot will be saved leting the tester to verify the steps that caused the fail

# Test Scenarios

### Test Scenario 1(UI)

Step 1: Create Publisher
Step 2: Create Post
Step 3: Link to the Publisher created( Status= Active, Published= True) 
Step 4: Edit Post - Change status to remove
Step 5: Save
Step 6: Validate post status was changed to Remove from the Post page

### Test Scenario 2(API)

Step 1: Create Publisher with API
Step 2: Create Post with API
Step 3: Link to the Publisher created( Status= Active, Published= True) 
Step 4: Edit Post - Change status to remove
Step 5: Save
Step 6: Validate post status was changed to Remove from the Post page