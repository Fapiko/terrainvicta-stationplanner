import {Buffer} from 'buffer';

export function parseSharingLink(link) {
    const decoded = Buffer.from(link, 'base64').toString('utf8');
    return JSON.parse(decoded);
}

export function generateSharingSlug(baseName, body, habs, defensesPowered) {
    const sharingObj = {
        baseName:        baseName,
        body:            body,
        habs:            getHabsList(habs),
        defensesPowered: defensesPowered,
    }

    return Buffer.from(JSON.stringify(sharingObj)).toString('base64');
}

export function generateSharingLink(baseName, orbitalBody, habs, defensesPowered) {
    const sharingSlug = generateSharingSlug(baseName, orbitalBody, habs, defensesPowered);
    const url         = new URL(window.location.href);
    return url.origin + url.pathname + '#share/' + sharingSlug;
}

export function getHabsList(habs) {
    const habsList = {};

    habs.forEach(hab => {
        habsList[hab.dataName] = hab.quantity;
    });

    return habsList;
}