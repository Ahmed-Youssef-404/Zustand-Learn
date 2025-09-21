import { useState } from "react";
import { useStore } from "../store";
import "./Column.css";
import Task from "./Task";
import classNames from "classnames";


export default function Column({ state }) {
    const AllTasks = useStore((store) => store.tasks);
    const tasks = AllTasks.filter((task) => task.state === state)

    const [text, setText] = useState("")
    const [open, setOpen] = useState(false)
    const [drop, setDrop] = useState(false)

    const addTask = useStore((store) => store.addTask)
    const setDraggedTask = useStore((store) => store.setDraggedTask)
    const draggedTask = useStore((store) => store.draggedTask)
    const moveTask = useStore((store) => store.moveTask)

    // const numOfTasks = useStore((store) => store.tasks.length)

    const numOfTasks = useStore((store) => store.numOfTasks(store))


    // console.log(numOfTasks)

    return (
        <div className={classNames("column", { drop: drop })}
            onDragOver={(e) => {
                setDrop(true)
                e.preventDefault()
            }}
            onDragLeave={(e) => {
                setDrop(false)
                e.preventDefault()
            }}
            onDrop={e => {
                setDrop(false)
                moveTask(draggedTask, state)
                setDraggedTask(null)
            }}
        >
            <div className="titleWrapper">
                <p>{state}</p>
                <button onClick={() => { setOpen(true) }}>Add</button>
            </div>
            {tasks.map((task) => <Task title={task.title} key={task.title} />)}
            {open &&
                <div className="Modal" onClick={() => setOpen(false)}>
                    <div className="modalContent" onClick={(e) => e.stopPropagation()}>
                        <input
                            autoFocus
                            onChange={(e) => setText(e.target.value)}
                            value={text}
                            type="text"
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    addTask((text === "" ? "Task " + (numOfTasks + 1) : text), state);
                                    setText("");
                                    setOpen(false);
                                }
                            }}
                        />
                        <button onClick={() => {
                            addTask((text === "" ? "New Task" : text), state)
                            setText("")
                            setOpen(false)
                        }} >Submit</button>
                    </div>
                </div>
            }
        </div>
    )
}

