function handleRequest({response, error, res}, fn) {
    if(!!response && response.statusCode >= 200 && response.statusCode < 300) {
        fn();
    } else {
        const status = !!response ? response.statusCode : 500;
        if(!error && !!response) {
            res.status(status).render('error-api', {error: {status, stack: JSON.parse(response.body).message}, message: "Esse erro eu sei tratar!"});
            return;
        }
        res.status(status).render('error', {error, message: "Ops, deu CREPS!"});
    }
}

module.exports = {
    handleRequest
};
