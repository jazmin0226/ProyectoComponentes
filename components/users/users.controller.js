//Dependencies
const exceptionManager = require('../shared/exceptions.shared');

// Model
const UserModel = require('./users.model');

// Controller
class UserController {

    getAllUsers(request, result) {
        UserModel.find({
            role: '5faa0c4592ed0f1dd893df26',
            state: true
        },'-_id -password -state -__v -role').exec((err, response) => {
            if (err) {
                exceptionManager.connectionErrorData(result, 'User', err);
            }

            exceptionManager.doneData(result, 'User', response);

        })
    }
    
    getUserById (request, result){
        const id = request.params.id;

        UserModel.find({
            id: id
        }).exec((err, matchUsers) => {
            const matchUser = matchUsers[0];

            if (err) {
                exceptionManager.connectionErrorData(result, 'user', err);
            }


            if (!matchUser) {
                exceptionManager.badRequestData(result, 'user');
            }

            exceptionManager.doneData(result, 'user', matchUser);
        })

    }

    getUserByObjectId (request, result){
        const id = request.params.object;

        UserModel.findById({
            _id: id
        }).exec((err, matchUser) => {
            if (err) {
                exceptionManager.connectionErrorData(result, 'user', err);
            }


            if (!matchUser) {
                exceptionManager.badRequestData(result, 'user');
            }

            exceptionManager.doneData(result, 'user', matchUser);
        })

    }

    registerUser(request, result) {
        const body = request.body;
        const newUser = new UserModel(
            body
        );

        newUser.save(
            (err) => {
                if (err) {
                    exceptionManager.connectionErrorData(result, 'User', err);
                }
                exceptionManager.createdData(result, 'User', err);
            }
        );
    }

    updateUser(request, result) {

        const id = request.params.id;
        const body = request.body;

        UserModel.find({
            id: id
        }).exec((err, matchUsers) => {
            console.log(body);
           
            const matchUser = matchUsers[0];
            console.log(matchUser);

            if (err) {
                exceptionManager.connectionErrorData(result, 'user', err);
            }


            if (!matchUser) {
                exceptionManager.badRequestData(result, 'user');
            }

            matchUser.updateData(body);

            matchUser.save((saveErr, updateUser) => {
                if (saveErr) {
                    exceptionManager.connectionErrorData(result, 'user', saveErr);
                }
                exceptionManager.doneData(result, 'user', updateUser);
            })
        });


    }


    deleteUser(request, result) {

        const id = request.params.id;
        const body = request.body;

        UserModel.find({
            id: id
        }).exec((err, matchUsers) => {
            const matchUser = matchUsers[0];

            if (err) {
                exceptionManager.connectionErrorData(result, 'user', err);
            }


            if (!matchUser) {
                exceptionManager.badRequestData(result, 'user');
            }

            matchUser.deleteData(false);

            matchUser.save((saveErr, deleteUser) => {
                if (saveErr) {
                    exceptionManager.connectionErrorData(result, 'user', saveErr);
                }
                exceptionManager.doneData(result, 'user', deleteUser);
            })
            
        });
    }

    enableUser(request, result) {

        const id = request.params.id;
        const body = request.body;

        UserModel.find({
            id: id
        }).exec((err, matchUsers) => {
            const matchUser = matchUsers[0];

            if (err) {
                exceptionManager.connectionErrorData(result, 'user', err);
            }

            if (!matchUser) {
                exceptionManager.badRequestData(result, 'user');
            }

            matchUser.enableData(true);

            matchUser.save((saveErr, enableUser) => {
                if (saveErr) {
                    exceptionManager.connectionErrorData(result, 'user', saveErr);
                }
                exceptionManager.doneData(result, 'user', enableUser);
            })
        });
    }
}


//Export
const controller = new UserController();
module.exports = controller;