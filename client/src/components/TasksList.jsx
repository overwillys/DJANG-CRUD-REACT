import { useEffect, useState } from "react"
import { getAllTasks } from "../api/tasks.api";
import { TaskCard } from "./TaskCard";


export function TasksList() {
    //defino un array para guardar los datos por medio de un useState
    // useState debe iniciar [] vacio
    const [tasks, setTasks] = useState([]);
    
    useEffect(() =>{

//declaro una funcion para recibir los datos 
    async function loadTasks(){
        const resp = await getAllTasks();        
        setTasks(resp.data);
    }
    loadTasks();

    },[]);

    


  return (
    <div className="grid grid-cols-3 gap-3">
        {/*recorrer las tareas con "map" */}
        {tasks.map(task => (
            <TaskCard key={task.id} task={task} />                
        ))}

    </div>
  )
}

