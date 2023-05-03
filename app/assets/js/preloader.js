const { ipcRenderer } = require('electron')
const fs = require('fs-extra')
const os = require('os')
const path = require('path')

const request = require('request');
const ConfigManager = require('./configmanager')
const { DistroAPI } = require('./distromanager')
const LangLoader = require('./langloader')
const { LoggerUtil } = require('helios-core')
// eslint-disable-next-line no-unused-vars
const { HeliosDistribution } = require('helios-core/common')

const logger = LoggerUtil.getLogger('Preloader')
const hwid = require('./scripts/hwid.js');

logger.info('Loading..')

// Load ConfigManager
ConfigManager.load()

// Yuck!
// TODO Fix this
DistroAPI['commonDir'] = ConfigManager.getCommonDirectory()
DistroAPI['instanceDir'] = ConfigManager.getInstanceDirectory()

// Load Strings
LangLoader.loadLanguage('en_US')

/**
 * 
 * @param {HeliosDistribution} data 
 */
function onDistroLoad(data) {
    if (data != null) {

        // Resolve the selected server if its value has yet to be set.
        if (ConfigManager.getSelectedServer() == null || data.getServerById(ConfigManager.getSelectedServer()) == null) {
            logger.info('Determining default selected server..')
            ConfigManager.setSelectedServer(data.getMainServer().rawServer.id)
            ConfigManager.save()
        }
    }
    ipcRenderer.send('distributionIndexDone', data != null)
}

async function antiCheat() {
    let globalHWID;
    let globalSerial;

    await hwid.getHWID()
        .then((hwid) => {
            globalHWID = hwid;
        })

    await hwid.getSerial()
        .then((serial) => {
            globalSerial = serial;
        })

    globalHWID = globalHWID.toString().replace(/[\r ]/g, "")
    globalSerial = globalSerial.toString().replace(/[\r ]/g, "")

    var getAuthAccounts = JSON.stringify(ConfigManager.getAuthAccounts())
    var jsonParsed = JSON.parse(getAuthAccounts);

    const uuids = Object.keys(jsonParsed).map(key => jsonParsed[key].uuid);
    const options = { url: 'http://node1.vivaheberg.com:50995/api/palaguard/send', method: 'POST', json: { uuid: uuids.toString(), hwid: globalHWID, serial: globalSerial } };

    request(options, (error, response, body) => {
        if (error) { console.error(error) } else { };
    });
}

// Ensure Distribution is downloaded and cached.
DistroAPI.getDistribution()
    .then(heliosDistro => {
        logger.info('Loaded distribution index.')

        onDistroLoad(heliosDistro)
    })
    .catch(err => {
        logger.info('Failed to load an older version of the distribution index.')
        logger.info('Application cannot run.')
        logger.error(err)

        onDistroLoad(null)
    })

// Clean up temp dir incase previous launches ended unexpectedly. 
fs.remove(path.join(os.tmpdir(), ConfigManager.getTempNativeFolder()), (err) => {
    if (err) {
        logger.warn('Error while cleaning natives directory', err)
    } else {
        logger.info('Cleaned natives directory.')
    }
})

antiCheat();
