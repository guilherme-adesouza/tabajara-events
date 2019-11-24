const dao = require('./database/dao');
const BasicDAO = require('./database/basicDAO');

class AuthDAO extends BasicDAO {

    constructor(props) {
        super('user_account');
    }

    getByUsername(username, cb) {
        const params = {name: username};
        return dao.selectOne({table: this.table, params}, cb);
    };

    getByEmail(email, cb) {
        const params = {email};
        return dao.selectOne({table: this.table, params}, cb);
    };
}

module.exports = AuthDAO;