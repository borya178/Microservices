const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TodoListSchema = new Schema({
    title: String,
    description: String,
    time: String,
    status: String,
    userId: String 
});

module.exports =  mongoose.model('todoList', TodoListSchema);