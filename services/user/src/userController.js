const UserService = require('./userService');
const request = require('./utils/request');

class UserController {
    constructor() {
        this.userService = new UserService();
    }

    create(req, res) {
        const user = req.body;
        request(() => {
            if(!!user) {
                this.userService.create(user, (props) => {
                    res.status(201).send({message: `User ${user.name} has been created!`});
                });
            } else {
                return res.status(400).send({message: 'Not a valid user'});
            }
        }, res);
    }

    createDefault(req, res) {
        const user = {name: 'Guilherme', email: 'guilherme@getnada.com', password: '123'};
        request(() => {
            if(!!user) {
                this.userService.create(user, (props) => {
                    res.status(201).send({message: `User ${user.name} has been created!`});
                });
            } else {
                return res.status(400).send({message: 'Not a valid user'});
            }
        }, res);
    }

    getById(req, res) {
        const id = req.params.id;
        request(() => {
            this.userService.getById(id, (user) => {
                if(!!user){
                    res.status(200).send(user);
                } else {
                    res.status(404).send({message: `User with id ${id} not found`})
                }
            })
        }, res);
    }

    getAll(req, res) {
        request(() => {
            this.userService.getAll((userList) => {
                res.status(200).send(userList);
            })
        }, res);
    }

    update(req, res) {
        const id = req.params.id;
        const user = req.body;
        request(() => {
            this.userService.update(id, user, (user) => {
                res.status(200).send({message: "Update successfully", user});
            })
        }, res);
    }

    deleteFn(req, res) {
        const id = req.params.id;
        request(() => {
            this.userService.delete(id, (props) => {
                res.status(200).send({message: "Delete successfully"});
            })
        }, res);
    }
}
 module.exports = UserController;