//Dependencies
const exceptionManager = require('../shared/exceptions.shared');

// Model
const RolModel = require('./roles.model');

// Controller
class RoleController {

    getAllRoles(request, result) {
        RolModel.find({}).exec((err, response) => {
            if (err) {
                exceptionManager.connectionErrorData(result, 'Role', err);
            }

            exceptionManager.doneData(result, 'Role', response);

        })
    }

    getRolById (request, result){
        const id = request.params.id;
        

        RolModel.find({
            id: id
        }).exec((err, matchUsers) => {
            const matchUser = matchUsers[0];

            if (err) {
                exceptionManager.connectionErrorData(result, 'role', err);
            }


            if (!matchUser) {
                exceptionManager.badRequestData(result, 'role');
            }

            exceptionManager.doneData(result, 'role', matchUser);
        })

    }

    registerRol(request, result) {
        const body = request.body;
        const newRol = new RolModel(body);

        newRol.save(
            (err) => {
                if (err) {
                    exceptionManager.connectionErrorData(result, 'Role', err);
                }
                exceptionManager.createdData(result, 'Role', err);
            }
        );
    }

    deleteRole(request, result) {

        const id = request.params.id;
        const body = request.body;

        RolModel.find({
            id: id
        }).exec((err, matchUsers) => {
            const matchUser = matchUsers[0];

            if (err) {
                exceptionManager.connectionErrorData(result, 'role', err);
            }


            if (!matchUser) {
                exceptionManager.badRequestData(result, 'role');
            }

            matchUser.deleteData(false);

            matchUser.save((saveErr, deleteUser) => {
                if (saveErr) {
                    exceptionManager.connectionErrorData(result, 'role', saveErr);
                }
                exceptionManager.doneData(result, 'role', deleteUser);
            })
            
        });
    }

    enableRole(request, result) {

        const id = request.params.id;
        const body = request.body;

        RolModel.find({
            id: id
        }).exec((err, matchUsers) => {
            const matchUser = matchUsers[0];

            if (err) {
                exceptionManager.connectionErrorData(result, 'role', err);
            }

            if (!matchUser) {
                exceptionManager.badRequestData(result, 'role');
            }

            matchUser.enableData(true);

            matchUser.save((saveErr, enableUser) => {
                if (saveErr) {
                    exceptionManager.connectionErrorData(result, 'role', saveErr);
                }
                exceptionManager.doneData(result, 'role', enableUser);
            })
        });
    }

}
//Export
const controller = new RoleController();
module.exports = controller;

