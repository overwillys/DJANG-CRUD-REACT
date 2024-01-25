import { useEffect } from 'react';
import { useForm } from 'react-hook-form'
import { createTask, deleteTask, updateTask, getTask } from '../api/tasks.api';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast'

export function TaskFormPage() {
  // Useform tiene funciones y objectos, entonces quiero usar register
  // Usamos la funcion register para registrar inputs o textsAreas
  // para ver los valores q enviamos por form uso "handleSubmit"
  // para ver el estado del formulario ( para saber si me escribioerona algo)

  // validaciones mas complejas YUP y ZOD ahora no las usaremos.

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue

  } = useForm();

  // Donde redireccionar ? al crear un post:
  const navigate = useNavigate();
  const params = useParams();

  //console.log(params); // se obsera que, al hacer clic en un div, me trae el id. Entonces ya se si existe

  // creo una funcion con handreSumbit para ver los datos
  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      console.log(data);
      updateTask(params.id, data)

      toast.success('Tarea actualizada', {
        position: "botton-right",
        style: {
          background: "#101010",
          color: "#FFF"
        }
      }); // notificacion 

    } else {

      try {
        await createTask(data); // envío la tarea

        toast.success('Tarea creada', {
          position: "botton-right",
          style: {
            background: "#101010",
            color: "#FFF"
          }
        }); // notificacion 

      } catch (error) {
        console.error("Error en la solicitud:", error.response);
        // Manejar el error, mostrar mensajes de error, etc.
      }

    }

    navigate("/tasks/"); // siempre me redirecciona

  });


  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const { data: { title, description } } = await getTask(params.id);

        setValue('title', title);
        setValue('description', description);

      }
    }
    loadTask();
  }, []);


  return (
    <div className="max-w-xl mx-auto">
      <form onSubmit={onSubmit}>
        <input type="text"
          placeholder="Title"
          {...register("title", { required: true })}
          className="bg-zinc-700 p-3 roundlg-lg block w-full mb-3"
        />
        {errors.title && <span> Este campo es requerido </span>}
        <textarea
          rows="3"
          placeholder="Description"
          {...register("description", { required: true })}
          className="bg-zinc-700 p-3 roundlg-lg block w-full mb-3"
        ></textarea>
        {errors.description && <span> La descripcion es requerida  </span>}

        {/* Agrega el campo 'done' como un campo de entrada oculto */}
        <input type="hidden" {...register("done")} value={0} />

        <button className="bg-indigo-500 p-3 round-lg block w-full mt-3">Save</button>
      </form>
      {params.id && (
        <div className="flex justify-end">
          <button 
            className="bg-red-500 p-3 rounded-lg w-48 mt-3"
            onClick={async () => {
              const accept = window.confirm(`Are you sure ?`);
              if (accept) {
                await deleteTask(params.id);

                toast.success('Tarea elimninada', {
                  position: "botton-right",
                  style: {
                    background: "#101010",
                    color: "#FFF"
                  }
                }); // notificacion 

                navigate("/tasks");
              }

            }}>Delete
          </button>
        </div>

      )}
    </div>




  )
}