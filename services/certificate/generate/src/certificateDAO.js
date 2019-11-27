const dao = require('./database/dao');
const BasicDAO = require('./database/basicDAO');

class CertificateDAO extends BasicDAO {

    constructor(props) {
        super('certification');
    }
}

module.exports = CertificateDAO;