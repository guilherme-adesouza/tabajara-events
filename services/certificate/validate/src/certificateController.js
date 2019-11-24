const CertificateService = require('./certificateService');

class CertificateController {

    validate(req, res){
        const id = req.params.id;
        const token = req.query.token;
        CertificateService.validate({id, token}, (isValid) => {
            if(isValid) {
                res.status(200).send({message: "Certificate is valid"})
            } else {
                res.status(400).send({message: "Certificate is NOT valid"})
            }
        })
    }
}
 module.exports = CertificateController;