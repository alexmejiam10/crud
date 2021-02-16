
import React, {useState} from 'react'
import { isEmpty, size } from 'lodash'
import shortid from 'shortid'

function App() {
  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState([])

  const addTask = (e) => {
   e.preventDefault()//prevenir que nos recargue la pagina por el submit
   if (isEmpty(task)) {
     console.log("Task empty")
     return
   }
    const newTask = {
     id:shortid.generate(),
      name: task
   }
   setTasks([...tasks, newTask])//para aque no muestre solo la ultima sino que la agregue a las que ya teniamos
   setTask("")//poner para poder limpiar campo despues de enviar
  } 

  const deleteTask = (id) =>{
   const filteredTasks = tasks.filter(task =>  task.id !== id)
   setTasks(filteredTasks)//settasks es el que me trae todas las tareas
  }
  return (
    <div className="container mt-5">

      <h1>Tareas</h1>
      <hr/>
      <div className="row">
        <div className="col-8">
         <h4 className="text-center">Lista de Tareas</h4> 
          {
            size(tasks) == 0 ?(
           <h5 className="text-center">Aun no hay tareas programadas</h5>
            ):
            (
            <ul className="list-group">
              {
                // es para crear la lista de tareas
                tasks.map((task) => ( // el map nos sirve para iterar
                  <li className="list-group-item" key={task.id}>
                  <span className="lead">{task.name}</span>

                  <button 
                    className ="btn btn-danger btn-sm float-right mx-2"
                    onClick={() => deleteTask(task.id)}//nos sirve para decir que el boton realizo una accion
                    >
                    Eliminar
                  </button>

                  <button className ="btn btn-warning btn-sm float-right">Editar</button>
                </li>
                )
                )
              
              }
            </ul> 
            )
           }
        </div>

        <div className="col-4">
         <h4 className="text-center">Formulario</h4>  
         <form onSubmit={addTask}>
           <input
            type="text"
            className="form-control mb-2"
            placeholder="Ingrese la tarea..."
            onChange={(text) => setTask(text.target.value)}
            value={task} //poner para poder limpiar campo despues de enviar
           />
           <button 
            className="btn btn-dark btn-block"
            type="submit"
            >
              Agregar
            </button>
         </form>
        </div>
      </div>
    </div>
  )
}

export default App
