const ActivityConsultService = require('./activityConsultService');
const utilsRequest = require('./utils/request');
const request = require('request');

function populateUserInfo(activity, client) {
    delete activity.id_client;
    activity.client = client;
}

function populateEventInfo(activity, event) {
    delete activity.id_event;
    activity.event = event;
}

class ActivityConsultController {
    constructor() {
        this.activityConsultService = new ActivityConsultService();
        this.eventsURL = 'http://localhost:5004/api/';
    }

    getById(req, res) {
        const id = req.params.id;
        utilsRequest(()=> {
            this.activityConsultService.getById(id, (activity) => {
                if(!!activity) {
                    this.getAdditionalInfo(activity, res, () => {
                        res.status(200).send(activity);
                    })
                } else {
                    res.status(404).send({message: `Activity with id ${id} not found`})
                }
            })
        }, res);
    }

    getAll(req, res) {
        utilsRequest(()=> {
            this.activityConsultService.getAll((activityList) => {
                for (const activity of activityList) {
                    this.getAdditionalInfo(activity, res, () => {});
                }
                //MIAUUUUUUUUUUUUUUUUU
                setTimeout(function() {
                    res.status(200).send(activityList);
                }, 1000)
            })
        }, res);
    }

    getByUser(req, res) {
        const context = this;
        const userId = req.params.userId;
        utilsRequest( ()=> {
            this.activityConsultService.getByUser(parseInt(userId), (activityList) => {
                for (const activity of activityList) {
                    this.getAdditionalInfo(activity, res, () => {});
                }
                //MIAUUUUUUUUUUUUUUUUU
                setTimeout(function() {
                    res.status(200).send(activityList);
                }, 1000)
            })
        });
    }

    getAdditionalInfo(activity, res, cb) {
        this.activityConsultService.getEventInfo(activity.id_event, (error, response, body) => {
            if (response && response.statusCode >= 200 && response.statusCode < 300) {
                populateEventInfo(activity, JSON.parse(body));
                this.activityConsultService.getUserInfo(activity.id_client, (error, response, body) => {
                    if (response && response.statusCode >= 200 && response.statusCode < 300) {
                        populateUserInfo(activity, JSON.parse(body));
                        cb();
                    } else {
                        console.log('user: ', error);
                        res.status(500).send({message: "An error as occur on this request. Please, try later"});
                    }
                });
            } else {
                console.log('event: ', error);
                res.status(500).send({message: "An error as occur on this request. Please, try later"});
            }
        });
    }
}
 module.exports = ActivityConsultController;