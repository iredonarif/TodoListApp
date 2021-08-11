import React from "react";
import Task from "./task";

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

export default TaskList;