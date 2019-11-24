const ActivityCancelService = require('./activityCancelService');
const utilsRequest = require('./utils/request');

class ActivityCancelController {
    constructor() {
        this.activityCancelService = new ActivityCancelService();
    }

    cancel(req, res) {
        const id = req.params.id;
        utilsRequest(() => {
            this.activityCancelService.cancel(id, (response = {}) => {
                if(response.error) {
                    res.status(400).send({message: response.error});
                    return;
                }
                res.status(200).send({message: "Cancel successfully"});
            })
        }, res);
    }
}
 module.exports = ActivityCancelController;