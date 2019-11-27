const CertificateService = require('./certificateService');

class CertificateController {

    constructor() {
        this.certificateService = new CertificateService();
    }

    validate(req, res){
        const token = req.query.token;
        if(!token) {
            res.status(400).send({message: "Need a token man!"});
        }
        this.certificateService.getByToken(token, (certificate) => {
            CertificateService.validate({id: certificate.id_activity_event, token}, (isValid) => {
                if(!isValid) {
                    res.status(400).send({message: "Certificate is NOT valid"});
                    return;
                }
                res.status(200).send({message: "Certificate is valid"});
            })
        });
    }
}
 module.exports = CertificateController;