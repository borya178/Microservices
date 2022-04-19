const { UserModel } = require('./models');
const { APIError, STATUS_CODES } = require('../app-errors')

class OperationWithUsers {

    /*
        email: String,
        password: String,
        salt: String,
        phoneNumber: String,
        firstName: String,
        lastName: String,
        age: Number,
        country: String,
        adress: String
    */ 

    async CreateUser({ email, password, salt, phoneNumber, firstName, lastName, age, country, adress }){
        try {
            const user = new UserModel({ email, password, salt, phoneNumber, firstName, lastName, age, country, adress });
            const userResult = await user.save();
            return userResult;
        } catch (error) {
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Create User');
        }
    }
    
    async FindUser({ email }){
        try {
            const user = await UserModel.findOne({ email: email });
            return user;
        } catch (error) {
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Find User');
        }
    }

    async FindUserById(id){
        try {
            const user = await UserModel.findById(id);
            return user;
        } catch (error) {
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Find User');
        }
    }
}

module.exports = OperationWithUsers;