import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { subscribe } from 'sinkro'
import { countryISO$ } from '../../state/streams'
import './styles.css';

export class Player extends Component {
    static calculateWeight(weight) {
        const toKg = 1000

        return `${weight / toKg} kg`
    }

    static calculateHeight(height) {
        const toFeet = 30
        const calcHeight = height / toFeet
        const major = Math.floor(calcHeight)
        const minor = height - (major * toFeet)

        return `${major} ft${minor ? ` ${minor} cm` : ''}`
    }

    render() {
        const { player, countryList } = this.props

        if (!player || (!countryList || Object.keys(countryList).length === 0)) {
            return null;
        }

        return (
            <div className="player">
                <div className="picture">
                    <img src={player.picture} alt={`${player.firstname } ${ player.lastname }`} />
                </div>
                <div className="profile">
                    <table>
                        <tbody>
                        <tr>
                            <th>Name</th>
                            <td>{ player.firstname } { player.lastname }</td>
                        </tr>
                        <tr>
                            <th>Sex</th>
                            <td>{ player.sex === 'M' ? '♂' : '♀' } { player.sex === 'M' ? 'Male' : 'Female' }</td>
                        </tr>
                        <tr>
                            <th>Country</th>
                            <td>{ countryList[player.country.code] }</td>
                        </tr>
                        <tr>
                            <th>Age</th>
                            <td>{ player.data.age }</td>
                        </tr>
                        <tr>
                            <th>Weight</th>
                            <td>{ Player.calculateWeight(player.data.weight) }</td>
                        </tr>
                        <tr>
                            <th>Height</th>
                            <td>{ Player.calculateHeight(player.data.height) }</td>
                        </tr>
                        <tr>
                            <th>World ranking</th>
                            <td>{ player.data.rank }</td>
                        </tr>
                        <tr>
                            <th>Points</th>
                            <td>{ player.data.points }</td>
                        </tr>
                        <tr>
                            <th>Wins</th>
                            <td>{ player.data.last.reduce((a, i) => (a += i), 0) }</td>
                        </tr>
                        <tr>
                            <th>Loses</th>
                            <td>{ player.data.last.reduce((a, i) => (a -= i), player.data.last.length) }</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="picture">
                    <img src={player.country.picture} alt={countryList[player.country.code]} />
                </div>
            </div>
        )
    }
};

Player.propTypes = {
    player: PropTypes.object,
    countryList: PropTypes.object
}

export default subscribe({
    countryList: countryISO$
})(Player)
