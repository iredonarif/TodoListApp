import React from "react";

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
    }

    handleFilterChange(e) {
        this.setState({filterValue: e.target.value});
    }

    renderTaskList() {
        switch(this.state.filterValue) {
            case "all":
                return <TaskList tasks={this.state.tasks} title={"All Tasks"} />;
            case "completed":
                return <TaskList tasks={this.state.tasks.filter(task => task.completed)} title={"Completed Tasks"} />
            case "incomplete":
                return <TaskList tasks={this.state.tasks.filter(task => !task.completed)} title={"InCompleted Tasks"} />
            case "has-due-date":
                return <TaskList tasks={this.state.tasks.filter(task => task.dueDate)} title={"Tasks with due date"} />
            default:
                return <h2>Task not found</h2>
        }
    }

    handleChange(e) {
        this.setState({newTaskDescription: e.target.value});
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

class TaskList extends React.Component {
    render() {
        return (
            <div>
                <h2 className="text-center mt-5">{ this.props.title }</h2>
                {
                (this.props.tasks && this.props.tasks.length) ?
                    (
                        <div className="row mx-1 px-5 pb-3 w-80">
                            <div className="col mx-auto">
                                {this.props.tasks.map( task => <Task key={task.id} task={task} { ...this} />)}
                            </div>
                        </div>
                    ) :
                    <div className="alert alert-warning">
                        <p className="text-center"> <i className="fa fa-warning fa-lg"/> No Tasks</p>
                    </div>
                }
            </div>
        );
    }
}

class Task extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
          theTask: this.props.task
        };

        this.handleCheck = this.handleCheck.bind(this);
    }

    handleCheck(e) {
        const task = this.props.task;
        task.completed = !task.completed;
        this.setState({theTask: task});

        // Update tasks in local storage
        localStorage.setItem("tasks", JSON.stringify(this.props.props.tasks));
    }

    render() {
        const hasDueDate = this.props.task.dueDate;
        const isCompleted = this.props.task.completed;

        return (
            <div className="row px-3 align-items-center todo-item rounded">
                <div className="col-auto m-1 p-0 d-flex align-items-center">
                    <h2 className="m-0 p-0">
                        { isCompleted ? (
                            <i className="fa fa-check-square text-primary" onClick={this.handleCheck}
                               title="Mark as uncompleted"/>
                        ):
                            (<i className="fa fa-square-o text-primary" onClick={this.handleCheck}
                                title="Mark as completed" />)
                        }
                        {/*<i className={(isCompleted ? 'fa fa-check-square' : 'fa fa-square-o')  + 'text-primary'}/>*/}
                    </h2>
                </div>
                <div className="col px-1 m-1 d-flex align-items-center">
                    <input type="text"
                           className="form-control form-control-lg border-0 edit-todo-input bg-transparent rounded px-3"
                           readOnly defaultValue={this.props.task.description} title={this.props.task.description}/>
                    <input type="text"
                           className="form-control form-control-lg border-0 edit-todo-input rounded px-3 d-none"
                           defaultValue={this.props.task.description}/>
                </div>
                <div>
                    {
                        hasDueDate ? (
                            <div className="col-auto m-1 p-0 px-3">
                                <div className="row">
                                    <div
                                        className="col-auto d-flex align-items-center rounded bg-white border border-warning">
                                        <i className="fa fa-hourglass-2 my-2 px-2 text-warning btn"
                                           data-toggle="tooltip" data-placement="bottom" title=""
                                           data-original-title="Due on date"/>
                                        <h6 className="text my-2 pr-2">{this.props.task.dueDate}</h6>
                                    </div>
                                </div>
                            </div>
                        ) : null
                    }
                </div>
                <div className="col-auto m-1 p-0 todo-actions">
                    <div className="row d-flex align-items-center justify-content-end">
                        <h5 className="m-0 p-0 px-2">
                            <i className="fa fa-pencil text-info btn m-0 p-0" data-toggle="tooltip"
                               data-placement="bottom" title="Edit todo"/>
                        </h5>
                        <h5 className="m-0 p-0 px-2">
                            <i className="fa fa-trash-o text-danger btn m-0 p-0" data-toggle="tooltip"
                               data-placement="bottom" title="Delete todo"/>
                        </h5>
                    </div>
                    <div className="row todo-created-info">
                        <div className="col-auto d-flex align-items-center pr-2">
                            <i className="fa fa-info-circle my-2 px-2 text-black-50 btn"
                               data-toggle="tooltip" data-placement="bottom" title=""
                               data-original-title="Created date"/>
                            <label className="date-label my-2 text-black-50">{this.props.task.createdAt}</label>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;