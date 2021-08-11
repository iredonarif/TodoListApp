import React from "react";
import Swal from "sweetalert2";

class Task extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            theTask: this.props.task
        };

        this.handleCheck = this.handleCheck.bind(this);
        this.deleteConfirmation = this.deleteConfirmation.bind(this);
    }

    deleteConfirmation() {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                this.deleteTask();
                Swal.fire(
                    'Deleted!',
                    'Your task has been deleted.',
                    'success'
                )
            }
        })
    }

    deleteTask() {
        this.props.props.deleteTask(this.props.task);

        let newTasks = JSON.parse(localStorage.getItem("tasks")).filter(task => task.id !== this.props.task.id);
        localStorage.setItem("tasks", JSON.stringify(newTasks));
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
                               data-placement="bottom" title="Delete todo" onClick={this.deleteConfirmation} />
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

export default Task;