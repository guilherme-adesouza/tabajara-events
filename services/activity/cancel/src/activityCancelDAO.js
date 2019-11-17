const BasicDAO = require('./database/basicDAO');

class ActivityCancelDAO extends BasicDAO {

    constructor(props) {
        super('activity_event');
    }
}

module.exports = ActivityCancelDAO;