const TodoListService = require('../todo-list-service');
const { UserAuth } = require('./middlewares/auth');

module.exports = (app) => {
    
    /*
        title: String,
        description: String,
        time: String,
        status: String,
        userId: String    
    */

    const service = new TodoListService();

    app.post('/todo-list/create', UserAuth, async (req, res, next) => {
        try {
            const { 
                title, 
                description, 
                time, 
                status 
            } = req.body;
            const {
                userId
            } = req.user._id;
            const { 
                data 
            } = await service.CreateTodoItem({ title, description, time, status, userId });
            return res.json(data);
        } catch (error) {
            next (error);    
        }
    });

    app.get('/todo-list-status/:type', UserAuth, async (req, res, next) => {
        const status = req.params.type;
        try {
            const { 
                data 
            } = await service.GetTodoListStatusList(status);
            return res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    });

    app.get('/:id', UserAuth, async (req, res, next) => { 
        const todoItemId = req.params.id;
        console.log(todoItemId);
        try {
            const { 
                data 
            } = await service.GetTodoItemById(todoItemId);
            return res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    });

     
    app.get('/', UserAuth, async (req, res, next) => {
        try {
            const { 
                data 
            } = await service.GetTodoList(req.user._id); 
            return res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    });
}