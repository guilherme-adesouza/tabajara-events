const Security = require('./security');
const AuthService = require('./authService');


class AuthController {
    static login(req, res){
        const authService = new AuthService();
        const credentials = req.body;

        if (credentials.username.includes('@')) {
            authService.emailLogin(credentials, res);
        } else {
            authService.usernameLogin(credentials, res);
        }
    }

    static logout(res){
        res.clearCookie(Security.jwt_name);
        res.sendStatus(200);
    }
}
 module.exports = AuthController;