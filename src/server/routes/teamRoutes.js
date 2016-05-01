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
                query.leagueName = req.query.country;
            }
            
            Team.find(function (err, teams) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(teams);
                }
            });
            
        });
  
    teamRouter.route('/teams/:id')
        .get(function (req, res) {
            Team.findById(req.params.id, function (err, team) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(team);
                }
            })
        });
     
     return teamRouter;
};

module.exports = routes;