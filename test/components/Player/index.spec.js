import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import { Player } from '../../../src/components/Player';

const mockCountryList = { 'GBR': 'Great Britain' };
const mockPlayer = {
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
};

describe('<Player />', () => {
    describe('Will not render if props aren\'t defined', () => {
        it('Player will not render if no props defined', () => {
            const player = mount(<Player />);
            expect(player.html()).to.be.null;
        });

        it('Player will not render if player is not defined', () => {
            const player = mount(<Player countryList={mockCountryList} />);
            expect(player.html()).to.be.null;
        });

        it('Player will not render if countryList is not defined', () => {
            const player = mount(<Player player={mockPlayer} />);
            expect(player.html()).to.be.null;
        });

        it('Player will not render if countryList is empty', () => {
            const player = mount(<Player player={mockPlayer} countryList={{}} />);
            expect(player.html()).to.be.null;
        });
    });

    describe('Will render a Player with the supplied data', () => {
        it('Will render player and country picture and alternative text', () => {
            const player = mount(<Player player={mockPlayer} countryList={mockCountryList} />);
            expect(player.find('.picture')).to.have.length(2);

            expect(player.find('.picture img').at(0).prop('src')).to.equal(mockPlayer.picture);
            expect(player.find('.picture img').at(0).prop('alt')).to.equal(`${mockPlayer.firstname} ${mockPlayer.lastname}`);
            expect(player.find('.picture img').at(1).prop('src')).to.equal(mockPlayer.country.picture);
            expect(player.find('.picture img').at(1).prop('alt')).to.equal(mockCountryList[mockPlayer.country.code]);
        });

        describe('Will expect player stats to be rendered in the table', () => {
            describe('Will render unchanged data', () => {
                let player

                before(() => {
                    player = mount(<Player player={mockPlayer} countryList={mockCountryList} />);
                })

                it('Player name', () => {
                    expect(player.find('tr td').at(0).text()).to.equal(`${mockPlayer.firstname} ${mockPlayer.lastname}`);
                });

                it('Country', () => {
                    expect(player.find('tr td').at(2).text()).to.equal(mockCountryList[mockPlayer.country.code]);
                });

                it('Age', () => {
                    expect(+player.find('tr td').at(3).text()).to.equal(mockPlayer.data.age);
                });

                it('Rank', () => {
                    expect(+player.find('tr td').at(6).text()).to.equal(mockPlayer.data.rank);
                });

                it('Points', () => {
                    expect(+player.find('tr td').at(7).text()).to.equal(mockPlayer.data.points);
                });
            });

            describe('Will render changed data', () => {
                let player

                before(() => {
                    player = mount(<Player player={mockPlayer} countryList={mockCountryList} />);
                })

                it('Sex', () => {
                    expect(player.find('tr td').at(1).text()).to.equal(`${mockPlayer.sex === 'M' ? '♂' : '♀'} ${mockPlayer.sex === 'M' ? 'Male' : 'Female'}`);
                });

                it('Weight', () => {
                    expect(player.find('tr td').at(4).text()).to.equal(`${mockPlayer.data.weight / 1000} kg`);
                });

                it('Height', () => {
                    const mockPlayerHeight = mockPlayer.data.height / 30
                    const major = Math.floor(mockPlayerHeight)
                    const minor = mockPlayer.data.height - (major * 30)

                    expect(player.find('tr td').at(5).text()).to.equal(`${major} ft ${minor} cm`);
                });

                it('Wins', () => {
                    expect(+player.find('tr td').at(8).text()).to.equal(4);
                });

                it('Loses', () => {
                    expect(+player.find('tr td').at(9).text()).to.equal(1);
                });
            });
        });
    });
});