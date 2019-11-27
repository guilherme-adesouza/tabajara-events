const bcrypt = require('bcrypt');
const CertificateDAO = require('./certificateDAO');

const chave = 'certificado_bo_do_catarina';

class CertificateService {

    constructor(props){
        this.certificateDAO = new CertificateDAO();
    };

    static encrypt(string) {
        return bcrypt.hashSync(chave + string, 10);
    }

    static validate({id, token}, cb){
        if(!!id && !!token) {
            const isValid = bcrypt.compareSync(chave + id, token);
            cb(isValid);
            return;
        }
        cb(false);
    }

    getByToken(token, cb) {
        this.certificateDAO.getByToken({params: {authentication: token}}, cb);
    };

}

module.exports = CertificateService;

