const Config = require('./utils/config');
const server = require('./server');

const {NAME, PORT} = Config.APP;
server.listen(PORT, () => {
    console.info(`Listening on port ${PORT}...`);
    console.info(`Tabajara Events ${NAME} Server started!`)
});