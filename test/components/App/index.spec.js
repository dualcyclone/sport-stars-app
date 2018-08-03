import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import { App } from '../../../src/components/App';

const mockPlayers = [
    {
        firstname: 'Stan',
        lastname: 'Wawrinka',
        shortname: 'S.WAW',
        sex: 'M',
        country: {
            picture: 'https://i.eurosport.com/_iss_/geo/country/flag/large/2213.png',
            code: 'GBR'
        },
        picture: 'https://i.eurosport.com/_iss_/person/pp_clubteam/large/325225.jpg',
        data: {
            rank: 21,
            points: 1784,
            weight: 81000,
            height: 183,
            age: 33,
            last: [1, 1, 1, 0, 1]
        }
    },
    {
        firstname: 'Stan',
        lastname: 'Wawrinka',
        shortname: 'S.WAW',
        sex: 'M',
        country: {
            picture: 'https://i.eurosport.com/_iss_/geo/country/flag/large/2213.png',
            code: 'GBR'
        },
        picture: 'https://i.eurosport.com/_iss_/person/pp_clubteam/large/325225.jpg',
        data: {
            rank: 21,
            points: 1784,
            weight: 81000,
            height: 183,
            age: 33,
            last: [1, 1, 1, 0, 1]
        }
    },
];

describe('<App />', () => {
    describe('Will not render if props aren\'t defined', () => {
        it('App will not render if no props defined', () => {
            const app = mount(<App/>);
            expect(app.find('.app').children().length).to.equal(0);
        });
    });

    it('Will render a list of Player components with the supplied data', () => {
        const app = mount(<App sportStars={mockPlayers}/>);
        expect(app.find('.app').children().length).to.equal(2);
    })
});
