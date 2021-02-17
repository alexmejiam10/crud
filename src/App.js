
import React, {useState} from 'react'
import { isEmpty, size } from 'lodash'
import shortid from 'shortid'

function App() {
  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState([])
  const [editMode, setEditMode] =useState(false)
  const [id, setId] =useState("")
  const [error, setError] = useState(null)

  const validForm =() => {
    let isValid = true
    setError(null)

    if (isEmpty(task)) {
      setError("Debes ingresar una tarea")
      isValid = false
      
    }
    return isValid
   }

  const addTask = (e) => {
   e.preventDefault()//prevenir que nos recargue la pagina por el submit
    
if (!validForm()){
      return
   }
    const newTask = {
     id:shortid.generate(),
      name: task
   }
   setTasks([...tasks, newTask])//para aque no muestre solo la ultima sino que la agregue a las que ya teniamos
   setTask("")//poner para poder limpiar campo despues de enviar
  } 
  const saveTask = (e) => {
    e.preventDefault()//prevenir que nos recargue la pagina por el submit
    if (!validForm()){
      return
   }
    
    const editedTask = tasks.map(item => item.id === id ? {id, name: task} : item) //devielve un item y lo compara con el que devuelve y lo reemplaza por el que el usuario puso
    setTasks(editedTask)
    setEditMode(false)
    setTask("")//poner para poder limpiar campo despues de enviar
    setId("")
   } 
  const deleteTask = (id) =>{
   const filteredTasks = tasks.filter(task =>  task.id !== id)
   setTasks(filteredTasks)//settasks es el que me trae todas las tareas
  }
   const editTask = (theTask) => {
    setTask(theTask.name)
    setEditMode(true)
    setId(theTask.id)
  }
  return (
    <div className="container mt-5">

      <h1>Tareas</h1>--
      <hr/>
      <div className="row">
        <div className="col-8">
         <h4 className="text-center">Lista de Tareas</h4> 
          {
            size(tasks) === 0 ?( //operador unitario, es un condicional de una sola linea
           <li className="list-group-item">Aun no hay tareas programadas</li>
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

                  <button className ="btn btn-warning btn-sm float-right"
                  onClick={() => editTask(task)}
                  >
                  Editar
                  </button>
                </li>
                )
                )
              
              }
            </ul> 
            )
           }
        </div>

        <div className="col-4">
         <h4 className="text-center">{ editMode ? "Modificar Tarea" : "Agregar Tarea"}</h4>  
         <form onSubmit={ editMode ? saveTask : addTask}>
            {
             Error && <span className="text-danger mb-2">{error}</span>
            }
           <input
            type="text"
            className="form-control mb-2"
            placeholder="Ingrese la tarea..."
            onChange={(text) => setTask(text.target.value)}
            value={task} //poner para poder limpiar campo despues de enviar
            
           />
           
           <button 
            className={editMode ?"btn btn-warning btn-block" : "btn btn-dark btn-block" }
            type="submit"
            >
              {editMode ? "Guardar" : "Agregar"}
            </button>
         </form>
        </div>
      </div>
    </div>
  )
}

export default App
