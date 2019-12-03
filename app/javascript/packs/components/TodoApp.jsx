import React from 'react'
import ReactDOM from 'react-dom'

import TodoForm from './TodoForm'
import TodoItem from './TodoItem'
import { throws } from 'assert';
class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        todoItems: [],
    };
    this.addTodoItem = this.addTodoItem.bind(this);
  }

  componentDidMount() {
    this.getToDoItems();
  }

  async getToDoItems() {
    try {
      const response = await fetch('/api/v1/todo_items');
      const todoItems = await response.json();
      this.setState({todoItems})
    } catch (error) {
      console.log(error);
    }
  }

  addTodoItem(todoItem) {
    // TODO: Update sort order
    const todoItems = [todoItem, ...this.state.todoItems]
    this.setState({todoItems})
  }

  updateTodoItem(todoItem) {
    console.log(todoItem)
  }

  render() {
    return (
      <>
        <TodoForm addTodoItem={this.addTodoItem} />
        { this.state.todoItems.map( todoItem => <TodoItem key={todoItem.id} todoItem={todoItem} updateTodoItem={this.updateTodoItem} />) }
      </>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <TodoApp />,
    document.getElementById('todo-app')
  )
})