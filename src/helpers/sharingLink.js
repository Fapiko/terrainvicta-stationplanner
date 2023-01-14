import {Buffer} from 'buffer';

export function parseSharingLink(link) {
    const decoded = Buffer.from(link, 'base64').toString('utf8');
    return JSON.parse(decoded);
}

export function generateSharingLink(body, habs, defensesPowered) {
    const sharingObj = {
        body:            body,
        habs:            getHabsList(habs),
        defensesPowered: defensesPowered,
    }

    return Buffer.from(JSON.stringify(sharingObj)).toString('base64');
}

export function getHabsList(habs) {
    const habsList = {};

    habs.forEach(hab => {
        if (!(hab.dataName in habsList)) {
            habsList[hab.dataName] = 1;
        } else {
            habsList[hab.dataName]++;
        }
    });

    return habsList;
}