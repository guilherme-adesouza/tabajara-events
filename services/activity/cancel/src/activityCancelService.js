const ActivityCancelDAO = require('./activityCancelDAO');
const request = require('request');

class ActivityCancelService {

    constructor(props){
        this.activityCancelDAO = new ActivityCancelDAO();
        this.activityConsultURL = 'http://localhost:5011/api';
    };

    cancel(id, cb) {
        const params = {id};
        request.get(`${this.activityConsultURL}/${id}`, (error, response, body) => {
                if(!!response && response.statusCode >= 200 && response.statusCode < 300) {
                    const activity = JSON.parse(body);
                    const event = activity.event;
                    if(new Date(event.date) < Date.now()) {
                        this.activityCancelDAO.update({values: {status: 'C'}, params}, cb)
                    } else {
                        cb({error: `This inscription is closed for alterations. Reason: Finished`});
                    }
                } else {
                    cb({error: `Cannot process request. Error:\n${JSON.stringify(error)}`})
                }
            }
        );
    }
}

module.exports = ActivityCancelService;

