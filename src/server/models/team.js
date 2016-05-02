var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Match = new Schema({
    finished: Boolean,
    competition: String,
    date: {
        type: Date,
        default: Date.now()
    },
    season: String,
    playoffs: Boolean,
    playoffsLevel: {
        type: String,
        enum: [
            '1/16',
            '1/8',
            '1/4',
            '1/2',
            'finals'
        ]
    },
    homeTeam: String,
    awayTeam: String,
    homeTeamPoints: Number,
    awayTeamPoints: Number,
    firstPeriodHomeTeamPoints: Number,
    secondPeriodHomeTeamPoints: Number,
    thirdPeriodHomeTeamPoints: Number,
    fourthPeriodHomeTeamPoints: Number,
    firstPeriodAwayTeamPoints: Number,
    secondPeriodAwayTeamPoints: Number,
    thirdPeriodAwayTeamPoints: Number,
    fourthPeriodAwayTeamPoints: Number
    
});

var Team = new Schema({
    name: {
        type: String
    },
    town: {
        type: String
    },
    sport: {
        type: String,
        default: 'Football'
    },
    country: {
        type: String
    },
    leagueName: {
        type: String
    },
    leagueLevel: {
        type: String
    },
    competition: {
        type: [String]
    },
    active: {
        type: Boolean,
        default: true
    },
    schedule: {
        type: [Match]
    }
});

module.exports = mongoose.model('Match', Match);
module.exports = mongoose.model('Team', Team);