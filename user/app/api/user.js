const UserService = require('../users-service');
const { UserAuth } = require('./middlewares/auth');

module.exports = (app) => {  
    
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

    const service = new UserService();
    
    app.post('/signup', async (req, res, next) => {
        try {
            const { 
                email, 
                password, 
                phoneNumber, 
                firstName, 
                lastName, 
                age,
                country,
                adress
            } = req.body;
            const { 
                data 
            } = await service.SignUp({ email, password, phoneNumber, firstName, lastName, age, country, adress }); 
            return res.json(data);
        } catch (err) {
            next(err);
        }
    });

    app.post('/login', async (req, res, next) => {
        try {
            const { 
                email, 
                password 
            } = req.body;
            const { 
                data
            } = await service.SignIn({ email, password });
            return res.json(data);
        } catch (err) {
            next(err);
        }
    });

    app.get('/profile', UserAuth, async (req, res, next) => {
        try {
            const { 
                _id 
            } = req.user;
            const { 
                data 
            } = await service.GetProfile({ _id });
            return res.json(data);
        } catch (err) {
            next(err);
        }   
    });
}