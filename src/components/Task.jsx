import classNames from "classnames"
import "./Task.css"
import { useStore } from "../store"
import trash from "../assets/trash-can-svgrepo-com.svg"


const Task = ({ title }) => {

    const task = useStore((store =>
        store.tasks.find((task) => task.title === title)
    ))

    const deleteTask = useStore((store) => store.deleteTask)

    return (
        <div className="task" draggable={true}>
            <div>{task.title}</div>
            <div className="bottomWrappe">
                <div><img src={trash} onClick={() => { deleteTask(task.title) }} /></div>
                <div className={classNames("status", task.state)}>{task.state}</div>
            </div>
        </div>
    )
}

export default Task
