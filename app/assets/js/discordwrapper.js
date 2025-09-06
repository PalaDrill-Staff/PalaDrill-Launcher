// Work in progress
const { LoggerUtil } = require('helios-core')

const logger = LoggerUtil.getLogger('DiscordWrapper')

const { Client } = require('discord-rpc-patch')

let client
let activity

exports.initRPC = function () {
    client = new Client({ transport: 'ipc' })

    activity = {
        startTimestamp: new Date().getTime(),
        largeImageKey: 'paladrill',
        smallImageKey: 'online',
        instance: false
    }

    client.on('ready', () => {
        logger.info('Discord RPC Connected')
        client.setActivity(activity)
    })

    client.login({ clientId: '1413636046008225802' }).catch(error => {
        if (error.message.includes('ENOENT')) {
            logger.info('Unable to initialize Discord Rich Presence, no client detected.')
        } else {
            logger.info('Unable to initialize Discord Rich Presence: ' + error.message, error)
        }
    })
}

exports.updateDetails = function (details) {
    activity.details = details
    client.setActivity(activity)
}

exports.shutdownRPC = function () {
    if (!client) return
    client.clearActivity()
    client.destroy()
    client = null
    activity = null
}