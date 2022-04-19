const { OperationWithTodoList } = require("./database");
const { FormateData } = require("./utils");
const { APIError } = require('./app-errors');

class TodoListService {

    constructor(){
        this.repository = new OperationWithTodoList();
    }

    async CreateTodoItem(itemInputs){
        try{
            const itemResult = await this.repository.CreateTodoItem(itemInputs);
            return FormateData(itemResult);
        } catch (error){
            throw new APIError('Data Not found');
        }
    }
    
    async GetTodoList(userId){
        try {
            const todoList = await this.repository.TodoList(userId);
            return FormateData({ todoList });
        } catch (error) {
            throw new APIError('Data Not found');
        }
    }

    async GetTodoItemById(id){
        try {
            const todoItem = await this.repository.FindById(id);
            return FormateData(todoItem);
        } catch (err) {
            throw new APIError('Data Not found');
        }
    }

    async GetTodoListStatusList(status){
        try {
            const list = await this.repository.FindByStatus(status);
            return FormateData(list);
        } catch (error) {
            throw new APIError('Data Not found');
        }
    }
}

module.exports = TodoListService;