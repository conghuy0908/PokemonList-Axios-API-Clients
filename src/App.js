
import React, { Component } from "react";
import axios from "axios";

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todolist: [],
      todo:'',
      loading: false
    };
  }

  componentDidMount() {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then(res => {
        this.setState({ todolist: res.data });
      })
      .catch(err => {
        throw err;
      });
  }
  handleChange = (event) => {
    this.settodo({
      ...this.todo,
      [event.target.name]: event.target.value
    });
  }
  handleSubmit() {
        axios
          .post("	https://jsonplaceholder.typicode.com/todos", this.state.todolist)
          .then(res => {
            alert("successfully!!!");
          })
          .catch(err => {
            throw err;
          });
}

  render() {
    const { todolist } = this.state;
    return (
      <div className="container">
        <h1>TodoList</h1>
        <input type='text' value={this.todo} onChange={this.handleChange}/>
        <button type="submit" onClick={this.handleSubmit}>Submit</button>
        <ul>
        {todolist.map(todo => (<li value={todo.id}>Todo {todo.id}</li>))};
        </ul>
      </div>
    );
  }
}

export default TodoList;