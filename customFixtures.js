const { test:base, expect } = require('@playwright/test');
const crypto = require('crypto');
const  globalContext = require('./global-context.js');
// const uniqueIdChrome = crypto.randomBytes(4).toString('hex'),
// const uniqueIdFirefox = crypto.randomBytes(4).toString('hex'),
// const uniqueIdSafari = crypto.randomBytes(4).toString('hex'),

exports.expect = expect;
exports.test = base.test.extend({
    uniqueIdChrome: async({}, use) => {
        console.log('Accessing uniqueIdChrome in fixture:', globalContext.uniqueIdChrome); // Add this line for debugging
        await use(globalContext.uniqueIdChrome);},
    uniqueIdFirefox: async({}, use) => {
        console.log('Accessing uniqueIdFirefox in fixture:', globalContext.uniqueIdFirefox); // Add this line for debugging
        await use(globalContext.uniqueIdFirefox);},
    uniqueIdSafari: async({}, use) => {
        console.log('Accessing uniqueIdSafari in fixture:', globalContext.uniqueIdSafari); // Add this line for debugging
        await use(globalContext.uniqueIdSafari);},
})