const { TodoListModel } = require("./models");
const { APIError } = require('../app-errors')

class OperationWithTodoList {

    /*    
        title: String,
        description: String,
        time: String,
        status: String,
        userId: String 
    */

    async CreateTodoItem({ title, description, time, status, userId }){
        try {
            const item = new TodoListModel({ title, description, time, status, userId });
            const itemResult = await item.save();
            return itemResult;
        } catch (error) {
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Create TodoItem');
        }
    }

    async TodoList({ userId }){
        try {
            return await TodoListModel.find({ userId: userId });
        } catch (error) {
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Get User TodoList');
        }
    }
   
    async FindById(id){
        try{
            return await TodoListModel.findById(id);
        } catch(error) {
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Find TodoItem');
        }
    }

    async FindByStatus(status){
        try {
            const todoList = await TodoListModel.find({ status: status});
            return todoList;  
        } catch (err) {
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Find Status');
        }
    }
}

module.exports = OperationWithTodoList;