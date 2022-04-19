const { OperationWithUsers } = require("./database");
const { FormateData } = require('./utils');
const { GeneratePassword, GenerateSalt, GenerateSignature, ValidatePassword } = require('./api/middlewares/auth');
const { APIError } = require('./app-errors')

class UserService {

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

    constructor() {
        this.repository = new OperationWithUsers();
    }

    async SignIn(userInputs) {
        const { 
            email, 
            password 
        } = userInputs;
        try {
            const user = await this.repository.FindUser({ email });
            if(user) {
                const validPassword = await ValidatePassword(password, user.password, user.salt);
                if(validPassword){
                    const token = GenerateSignature({ email: user.email, _id: user._id});
                    return FormateData({id: user._id, token });
                } 
            }
            return FormateData({message: 'Not Authorized'});
        } catch (error) {
            throw new APIError('Data Not found', error);
        }
    }

    async SignUp(userInputs) {
        const { 
            email, 
            password, 
            phoneNumber, 
            firstName, 
            lastName, 
            age, 
            country, 
            adress 
        } = userInputs;
        try {
            let salt = await GenerateSalt();
            let userPassword = await GeneratePassword(password, salt);
            const user = await this.repository.CreateUser({ email, password: userPassword, phoneNumber, salt, firstName, lastName, age, country, adress });
            const token = GenerateSignature({ email: email, _id: user._id});
            return FormateData({id: user._id, token });
        } catch (error) {
            throw new APIError('Data Not found', error)
        }
    }

    async GetProfile(id){
        try {
            const user = await this.repository.FindUserById(id);
            return FormateData(user);
        } catch (error) {
            throw new APIError('Data Not found', error);
        }
    }
}

module.exports = UserService;