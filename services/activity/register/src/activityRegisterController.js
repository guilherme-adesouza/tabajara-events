const ActivityRegisterService = require('./activityRegisterService');
const utilsRequest = require('./utils/request');
const request = require('request');

class ActivityRegisterController {
    constructor() {
        this.activityRegisterService = new ActivityRegisterService();
        this.mailURL = 'http://localhost:5002/api';
        this.userURL = 'http://localhost:5002/api';
    }

    sendSubscriptionEmail(userId){
        request({
                url: this.userURL + `/${userId}`,
                method: 'GET'
            },
            function(error, response, body) {
                const fullUser = JSON.parse(response.body);
                request({
                        url: this.mailURL,
                        method: 'POST',
                        body: {
                            email: fullUser.email,
                            type: "SUBSCRIPTION"
                        },
                        json: true
                    },
                    function (error, response, body) {
                        console.log("MAIL REGISTER: ", response);
                    });
            }
        );
    }

    create(req, res) {
        const {user, event} = req.body;
        utilsRequest(() => {
            if(!!user && !!event) {
                this.activityRegisterService.create({
                    id_client: user,
                    id_event: event,
                    status: 'A'
                }, (props) => {
                    this.sendSubscriptionEmail(user);
                    res.status(201).send({message: `Activity has been created!`});
                });
            } else {
                return res.status(400).send({message: 'Not a valid request'});
            }
        }, res);
    }
}
 module.exports = ActivityRegisterController;