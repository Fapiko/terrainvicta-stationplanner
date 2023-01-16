const SharingLink                                          = require('./sharingLink');
const {getHabsList, generateSharingSlug, parseSharingLink} = require('./sharingLink');

test('populates hab list correctly', () => {
    const habsList = [
        {dataName: 'FusionCore'},
        {dataName: 'FusionCore'},
        {dataName: 'FusionArray'},
    ]

    const expectedHabsList = {
        FusionCore:  2,
        FusionArray: 1,
    }

    expect(getHabsList(habsList)).toEqual(expectedHabsList);
});

test('correctly base64 encodes sharing link', () => {
    const body            = 'Earth';
    const habs            = [
        {dataName: 'FusionCore'},
        {dataName: 'FusionCore'},
        {dataName: 'FusionArray'},
    ];
    const defensesPowered = true;

    const sharingLink = generateSharingSlug(body, habs, defensesPowered);
    expect(sharingLink)
        .toEqual(
            'eyJib2R5IjoiRWFydGgiLCJoYWJzIjp7IkZ1c2lvbkNvcmUiOjIsIkZ1c2lvbkFycmF5IjoxfSwiZGVmZW5zZXNQb3dlcmVkIjp0cnVlfQ==');
});

test('correctly parses sharing link', () => {
    const sharingLink = 'eyJib2R5IjoiRWFydGgiLCJoYWJzIjp7IkZ1c2lvbkNvcmUiOjIsIkZ1c2lvbkFycmF5IjoxfSwiZGVmZW5zZXNQb3dlcmVkIjp0cnVlfQ==';

    const expectedBody = {
        body:            'Earth',
        habs:            {
            FusionCore:  2,
            FusionArray: 1,
        },
        defensesPowered: true,
    }

    expect(parseSharingLink(sharingLink)).toEqual(expectedBody);
});