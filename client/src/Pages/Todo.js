import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import '../App.css';
import API from "../utils/API";
import Nav from "../components/Nav";
import Wrapper from "../components/Wrapper";
import TodoItem from '../components/TodoItem/TodoItem';
import TodoList from '../components/TodoList/TodoList';
import TodoForm from '../components/TodoForm/TodoForm';
import Footer from "../components/Footer";

class Todo extends Component {
  state = {
    todos: []
  };
  
  componentDidMount() {
    this.loadTodos();
  }

  loadTodos = () => {
    API.getTodos()
      .then(res => this.setState({ todos: res.data}))
      .catch(err => console.log(err));
  }

  removeTodo = id => {
    const todos = this.state.todos.filter(todo => todo._id != id);
    this.setState({ todos});
    API.deleteTodo(id)
      .then(res => this.loadTodos())
      .catch(err => console.log(err));

  };

  addTodo = ( queueTitle, description, dueDate ) => {
    let todos = this.state.todos; 
    let id = (new Date).getTime();
    let newTodo = {
      "queueTitle": queueTitle,
      "description": description,
      "dueDate": dueDate,
    }

    let self = this;
    API.saveTodo(newTodo)
      .then(function (response) {
        console.log(response);
        todos.push(response.data);
        self.setState({ todos}); 
      })
  }

  editTodo = ( id, queueTitle, description, dueDate ) => {
    const todos = this.state.todos.filter(todo => todo._id != id);
    let newTodo = {
      "id": id,
      "queueTitle": queueTitle,
      "description": description,
      "dueDate": dueDate,
    }

    let self = this;
    API.updateTodo(newTodo)
      .then(function (response) {
        console.log(response);
        todos.push(response.data);
        self.setState({ todos}); 
      })
  }

  render() {
    return (
      <div className="App">
        
        <Wrapper>
          <TodoForm 
            addTodo= { this.addTodo}
          />
           <TodoList 
              todo={this.state.todos} 
              updateTodo={ this.editTodo } 
              removeTodo={ this.removeTodo }
           /> 
        </Wrapper>
       
      </div>
    );
  }
}

export default Todo;
