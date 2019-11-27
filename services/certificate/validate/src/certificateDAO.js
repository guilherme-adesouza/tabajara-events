const dao = require('./database/dao');
const BasicDAO = require('./database/basicDAO');

class CertificateDAO extends BasicDAO {

    constructor(props) {
        super('certification');
    }

    getByToken(params, cb){
        return dao.selectOne({table: this.table, ...params}, cb);
    }
}

module.exports = CertificateDAO;