import { useState } from "react";
import { useStore } from "../store";
import "./Column.css";
import Task from "./Task";


export default function Column({ state }) {
    const AllTasks = useStore((store) => store.tasks);
    const tasks = AllTasks.filter((task) => task.state === state)

    const [text, setText] = useState("")
    const [open, setOpen] = useState(false)

    const addTask = useStore((store) => store.addTask)

    return (
        <div className="column"
            onDragOver={(e) => {
                e.preventDefault()
            }}
            onDrop={e => {
                console.log("Dropped")
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
                        <input onChange={(e) => setText(e.target.value)} value={text} type="text" />
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

