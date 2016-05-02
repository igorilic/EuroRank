var express = require('express');

var routes = function (Team) {
    var teamRouter = express.Router();
    
    teamRouter.route('/teams')
        // POST /api/teams
        .post(function (req, res) {
            var team = new Team(req.body);
            
            team.save();
            res.status(201).send(team);
        })
        // GET /api/teams
        .get(function (req, res) {
            // Annotations
            var query = {};
            if (req.query.country || req.query.leagueName) {
                query.country = req.query.country;
                query.leagueName = req.query.leagueName;
            }
            
            Team.find(query, function (err, teams) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    var returnTeams = [];
                    teams.forEach(function (element, index, array) {
                        var newTeam = element.toJSON();
                        newTeam.links = {};
                        newTeam.links.self = 
                            'http://' + 
                            req.headers.host + 
                            '/api/teams/' + 
                            newTeam._id;
                        returnTeams.push(newTeam);                        
                    });
                    
                    res.json(returnTeams);
                }
            });
            
        });
    teamRouter.use('/teams/:id', function (req, res, next) {
        Team.findById(req.params.id, function (err, team) {
                if (err) {
                    res.status(500).send(err);
                } else  if (team) {
                    req.team = team;
                    next();
                } else {
                    res.status(404).send('no team found');
                }
            });
    });
    teamRouter.route('/teams/:id')
        .get(function (req, res) {
            res.json(req.team);
        })
        .put(function (req, res) {
            Team.findById(req.params.id, function (err, team) {
                req.team.name = req.body.name;
                req.team.town = req.body.town;
                req.team.country = req.body.country;
                req.team.sport = req.body.sport;
                req.team.leagueName = req.body.leagueName;
                req.team.leagueLevel = req.body.leagueLevel;
                req.team.competition = req.body.competition;
                req.team.active = req.body.active;
                req.team.schedule = req.body.schedule;
                req.team.save(function (err) {
                    if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(req.team);
                }
                });
            });
        })
        .patch(function (req, res) {
            if (req.body._id) {
                delete req.body._id;
            }
            for(var p in req.body) {
                req.team[p] = req.body[p];
            }
            req.team.save(function (err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(req.team);
                }
            });
        })
        .delete(function (req, res) {
           req.team.remove(function (err) {
               if (err) {
                   res.status(500).send(err);
               } else {
                   res.status(204).send('Team removed');
               }
           }); 
        });
     
     return teamRouter;
};

module.exports = routes;