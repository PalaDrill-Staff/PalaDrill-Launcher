//nodejs get windows hwid
var exec = require('child_process').exec;
const { any } = require('async');
const { time } = require('console');
var os = require('os');
const { queryJS } = require('../langloader');
var osType = os.type();
var sleep = require('deasync').sleep;
//detect acutal os

//check if os is windows
async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function getHWID() {
    return new Promise((resolve, reject) => {
        exec('wmic csproduct get uuid', (error, stdout, stderr) => {
            if (error) {
                reject(error);
            } else {
                const hwid = stdout.trim().split('\n')[1].trim();
                resolve(hwid);
            }
        });
    });
}

//check if is running as main or as module
module.exports = {
    getHWID: function () {
        return getHWID();
    }
};

