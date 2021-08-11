import React from "react";
import TaskList from "./tasklist.js";

class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            filterValue: 'all',

            newTaskDescription: '',
            tasks: JSON.parse(localStorage.getItem("tasks")),
        };

        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addTask = this.addTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
    }

    handleFilterChange(e) {
        this.setState({filterValue: e.target.value});
    }

    renderTaskList() {
        switch(this.state.filterValue) {
            case "all":
                return <TaskList tasks={this.state.tasks} title={"All Tasks"} deleteTask={this.deleteTask} />;

            case "completed":
                return <TaskList tasks={this.state.tasks.filter(task => task.completed)}
                     title={"Completed Tasks"} deleteTask={this.deleteTask} />

            case "incomplete":
                return <TaskList tasks={this.state.tasks.filter(task => !task.completed)}
                     title={"InCompleted Tasks"} deleteTask={this.deleteTask} />

            case "has-due-date":
                return <TaskList tasks={this.state.tasks.filter(task => task.dueDate)}
                     title={"Tasks with due date"} deleteTask={this.deleteTask} />

            default:
                return <h2>Task not found</h2>
        }
    }

    handleChange(e) {
        this.setState({newTaskDescription: e.target.value});
    }

    deleteTask(theTask) {
        this.setState( {tasks: this.state.tasks.filter(task => task.id !== theTask.id )} )
    }

    addTask(e) {
        e.preventDefault();

        let tasks = localStorage.getItem("tasks");
        let newTaskId = 1;
        if (tasks !== null) {
            tasks = JSON.parse(tasks)
            newTaskId = tasks.length + 1;
        }
        else tasks = [];

        const newTask = {
            id: newTaskId,
            description: this.state.newTaskDescription,
            completed: false,
            createdAt: new Date().toLocaleDateString()
        }
        let newTasks = tasks.concat(newTask);
        localStorage.setItem("tasks", JSON.stringify(newTasks));

        this.setState({newTaskDescription: '', tasks: newTasks});
    }

    render() {
         return (
             <div>
                 <div className="container m-5 p-2 rounded mx-auto bg-light shadow">

                     <div className="row m-1 p-4">
                         <div className="col">
                             <div className="p-1 h1 text-primary text-center mx-auto display-inline-block">
                                 <i className="fa fa-tasks bg-primary text-white rounded p-2"/>
                                 <u>TodoList App</u>
                             </div>
                         </div>
                     </div>

                     <form onSubmit={this.addTask}>
                        <div className="row m-1 p-3">
                            <div className="col col-11 mx-auto">
                             <div className="row bg-white rounded shadow-sm p-2 add-todo-wrapper align-items-center justify-content-center">
                                 <div className="col">
                                     <input
                                         className="form-control form-control-lg border-0 add-todo-input bg-transparent rounded" required
                                         type="text" value={this.state.newTaskDescription} onChange={this.handleChange} placeholder="Add new task .."/>
                                 </div>
                                 <div className="col-auto m-0 px-2 d-flex align-items-center">
                                     <label
                                         className="text-secondary my-2 p-0 px-1 view-opt-label due-date-label d-none">Due
                                         date not set</label>
                                     <i className="fa fa-calendar my-2 px-1 text-primary btn due-date-button"
                                        data-toggle="tooltip" data-placement="bottom" title="Set a Due date"/>

                                     <i className="fa fa-calendar-times-o my-2 px-1 text-danger btn clear-due-date-button d-none"
                                        data-toggle="tooltip" data-placement="bottom" title="Clear Due date"/>
                                 </div>

                                 <div className="col-auto px-0 mx-0 mr-2">
                                     <input type="submit" className="btn btn-primary" value="Add"/>
                                 </div>
                             </div>
                         </div>
                     </div>
                     </form>

                     <div className="p-2 mx-4 border-black-25 border-bottom"/>

                     <div className="row m-1 p-3 px-5 justify-content-end">
                         <div className="col-auto d-flex align-items-center">
                             <label className="text-secondary my-2 pr-2 view-opt-label">Filter</label>
                             <select className="custom-select custom-select-sm btn my-2" value={this.state.filterValue} onChange={this.handleFilterChange}>
                                 <option value="all">All</option>
                                 <option value="completed">Completed</option>
                                 <option value="incomplete">Incomplete</option>
                                 <option value="has-due-date">Has due date</option>
                             </select>
                         </div>

                         <div className="col-auto d-flex align-items-center px-1 pr-3">
                             <label className="text-secondary my-2 pr-2 view-opt-label">Sort</label>
                             <select className="custom-select custom-select-sm btn my-2">
                                 <option defaultValue="added-date-asc">Added date</option>
                                 <option defaultValue="due-date-desc">Due date</option>
                             </select>
                             <i className="fa fa fa-sort-amount-asc text-info btn mx-0 px-0 pl-1" data-toggle="tooltip"
                                data-placement="bottom" title="Ascending"/>

                             <i className="fa fa fa-sort-amount-desc text-info btn mx-0 px-0 pl-1 d-none"
                                data-toggle="tooltip" data-placement="bottom" title="Descending"/>
                         </div>
                     </div>

                     { this.renderTaskList() }
                 </div>
            </div>
         );
    }
}

export default Home;