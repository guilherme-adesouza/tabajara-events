const dao = require('./database/dao');

class ActivityConsultDAO {

    constructor(props) {
        this.table = 'activity_event';
    }

    getById(params, cb) {
        return dao.selectOne({table: this.table, ...params}, cb);
    };

    getAll(params, cb) {
        return dao.selectMany({table: this.table, ...params}, cb);
    }

    getByUser(params, cb) {
        console.log(params);
        return dao.selectMany({table: this.table, ...params}, cb);
    };

}

module.exports = ActivityConsultDAO;