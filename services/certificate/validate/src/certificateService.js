const bcrypt = require('bcrypt');

const chave = 'certificado_bo_do_catarina';

class CertificateService {

    static encrypt(string) {
        return bcrypt.hashSync(chave + string, 10);
    }

    static validate({id, token}, cb){
        if(!!id && !!token) {
            const isValid = bcrypt.compareSync(chave + id, token);
            cb(isValid);
        }
        cb(false);
    }
}

module.exports = CertificateService;

