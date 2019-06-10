import React, {Component} from "react";
import TodoDataService from "../../api/todo/TodoDataService.js"
import AuthenticationService from "./AuthenticationService";

class ListTodosComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            todos: [],
            message:null
        }
        this.deleteTodoClicked = this.deleteTodoClicked.bind(this)
        this.updateTodoClicked = this.updateTodoClicked.bind(this)
        this.refreshTodos = this.refreshTodos.bind(this)
    }

    componentDidMount() {
        this.refreshTodos();
    }

    refreshTodos(){
        let username = AuthenticationService.getUsername()
        TodoDataService.retrieveAllTodos(username)
            .then(
                response => {
                    // console.log(response)

                    this.setState({
                        todos: response.data
                    })

                }
            )
    }

    updateTodoClicked(id){
        // let username = AuthenticationService.getUsername()
        // console.log("update " + id )
        this.props.history.push(`/todos/${id}`)
        // TodoDataService.deleteTodo(username, id)
        //     .then(
        //         response => {
        //             this.setState({message:`Delete of todo ${id} successful`})
        //             this.refreshTodos()
        //         }
        //     )

    }

    deleteTodoClicked(id){
        let username = AuthenticationService.getUsername()
        // console.log(id + " " + username)
        TodoDataService.deleteTodo(username, id)
            .then(
                response => {
                    this.setState({message:`Delete of todo ${id} successful`})
                    this.refreshTodos()
                }
            )

    }

    render() {
        return (
            <div>
                <h1>List Todos</h1>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>description</th>
                            <th>done</th>
                            <th>target date</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.todos.map(
                                todo =>
                                    <tr key={todo.id}>
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td>{todo.targetDate.toString()}</td>
                                        <td><button className="btn btn-success" onClick={() => this.updateTodoClicked(todo.id)}>Update</button></td>
                                        <td><button className="btn btn-warning" onClick={() => this.deleteTodoClicked(todo.id)}>Delete</button></td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

}

export default ListTodosComponent
