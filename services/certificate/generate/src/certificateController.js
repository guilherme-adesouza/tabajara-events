const CertificateService = require('./certificateService');
const request = require('request');
const requestCustom = require('./utils/request');

const chave = 'certificado_bo_do_catarina';

const CHECKIN_URL = 'http://localhost:5003/api';
const ACTIVITY_CONSULT_URL = 'http://localhost:5011/api';

function formatDate(date, lang = 'pt-BR'){
    return new Date(date).toLocaleString(lang, { year: 'numeric', month: 'long', day: 'numeric' })
}

const templates = [
    {
        id: 'DEFAULT', 
        background_image: 'https://cdn130.picsart.com/286630835017211.png?r1024x1024', 
        signature: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Chris_Hemsworth_Signature.png'
    }
];

class CertificateController {
    constructor() {
        this.certificateService = new CertificateService();
    }

    create(req, res) {
        const eventCertificate = req.body;
        console.log(req.body)
        let checkin = undefined;
        const context = this;
        return request.get(CHECKIN_URL + `/${eventCertificate.id_activity_event}`, function(error, response, body) {
            console.log(response)
            if (response && response.statusCode === 200) {
                checkin = JSON.parse(body);
                return requestCustom(() => {
                    if(!!eventCertificate) {
                        return context.certificateService.create(eventCertificate, (props) => {
                           return res.status(201).send({message: `Certificado gerado com sucesso!`});
                        });
                    } else {
                        return res.status(400).send({message: 'Não há informações válidas'});
                    }
                }, res)
            } else {
                checkin = JSON.parse(body);
                return requestCustom(() => {
                    if(!!eventCertificate) {
                        return context.certificateService.create(eventCertificate, (props) => {
                           return res.status(201).send({message: `Certificado gerado com sucesso!`});
                        });
                    } else {
                        return res.status(400).send({message: 'Não há informações válidas'});
                    }
                }, res)
            }
        })
    }

    get(req, res, cb) {
        const id = req.params.id;
        const context = this;
        return request.get(ACTIVITY_CONSULT_URL + `/${id}`, function(error, response, body) {
            if (response && response.statusCode === 200) {
                const result = JSON.parse(body);
                return requestCustom(() => {
                    if(!!result) {
                        return context.certificateService.getByUserEventId(id, (certificate) => {
                            result.event.date = formatDate(result.event.date);
                            if(!!cb) {
                                cb({...result, certificate});
                                return;
                            }
                            res.status(200).send({...result, certificate});
                        })
                    } else {
                        return res.status(400).send({message: 'Não há informações válidas'});
                    }
                }, res)
            } else {
                console.log(response);
                return res.status(403).send({message: 'Não pode consultar certificado'});
            }
        })
    }

    getAll(req, res){
        this.certificateService.getAll((certificates) => {
            res.status(200).send(certificates);
        })
    }

    render(req, res) {
        this.get(req, res, ({certificate, event, client}) => {
            const template = templates.find(t => t.id = certificate.template) || templates[0];
            console.log(certificate, event, client)
            res.render('certificate', {certificate, event, user: client, template});
        });
    }
}
 module.exports = CertificateController;