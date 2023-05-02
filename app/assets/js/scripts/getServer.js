/**
 * Script for landing.ejs
 */
// Requirements
const cp                      = require('child_process')
const crypto                  = require('crypto')
const { URL }                 = require('url')
const {
    MojangRestAPI,
    getServerStatus
}                             = require('helios-core/mojang')

const refreshServerStatus4Index = async (fade = false) => {
    const servStat = await getServerStatus(47, "node1.vivaheberg.com", "25908")
    return servStat;
}

module.exports = {
    refreshServerStatus4Index
};
