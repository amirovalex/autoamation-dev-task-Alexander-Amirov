require('dotenv').config()

exports.UniqueIdUtils = class UniqueIdUtils {
    constructor(browserName, type) {
        this.uniqueId = this.grabUniqueIdByBrowserName(browserName,type)
    }
  
    grabUniqueIdByBrowserName(browserName,type) {
        if(browserName === 'chromium' && process.env.UNIQUE_ID_CHROME){
            console.log('defaultBrowserType is chromium')
            if (type === 'API') {
                return 'api' + process.env.UNIQUE_ID_CHROME
            } else {
                return process.env.UNIQUE_ID_CHROME
            }
        }
        if(browserName === 'firefox' && process.env.UNIQUE_ID_FIREFOX){
            console.log('defaultBrowserType is firefox')
            if (type === 'API') {
                return 'api' + process.env.UNIQUE_ID_FIREFOX
            } else {
                return process.env.UNIQUE_ID_FIREFOX
            }
        }
        if(browserName === 'webkit' && process.env.UNIQUE_ID_WEBKIT){
            console.log('defaultBrowserType is safari')
            if (type === 'API') {
                return 'api' + process.env.UNIQUE_ID_WEBKIT
            } else {
                return process.env.UNIQUE_ID_WEBKIT
            }
        }
    }
}