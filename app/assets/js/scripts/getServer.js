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
    const servStat = await getServerStatus(47, "play.paladrill.ovh", "25565")
    return servStat;
}

module.exports = {
    refreshServerStatus4Index
};
