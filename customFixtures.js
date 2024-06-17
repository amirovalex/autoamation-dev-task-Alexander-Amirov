const { test:base, expect } = require('@playwright/test');
const crypto = require('crypto');
const  globalContext = require('./global-context.js');
// const uniqueIdChrome = crypto.randomBytes(4).toString('hex'),
// const uniqueIdFirefox = crypto.randomBytes(4).toString('hex'),
// const uniqueIdSafari = crypto.randomBytes(4).toString('hex'),

exports.expect = expect;
exports.test = base.test.extend({
    uniqueIdChrome: async({}, use) => {
        await use(globalContext.uniqueIdChrome);},
    uniqueIdFirefox: async({}, use) => {
        await use(globalContext.uniqueIdFirefox);},
    uniqueIdSafari: async({}, use) => {
        await use(globalContext.uniqueIdSafari);},
})