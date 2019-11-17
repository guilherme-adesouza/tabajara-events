const BasicDAO = require('./database/basicDAO');

class ActivityRegisterDAO extends BasicDAO {

    constructor(props) {
        super('activity_event');
    }
}

module.exports = ActivityRegisterDAO;