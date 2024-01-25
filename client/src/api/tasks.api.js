import axios from 'axios'

// creaando un instancia para no repetir las direcciones:

const taskApi = axios.create({
    baseURL: 'http://localhost:8000/tasks/api/v1/tasks/'
})


export const getAllTasks = () => taskApi.get('/');

export const getTask = (id) => taskApi.get(`/${id}/`);

// recibe un objeto task y envio por axios
export const createTask = (task) => taskApi.post('/', task);

//tengo q esperar un id, para buscar y eliinar
export const deleteTask = (id) => taskApi.delete(`/${id}`);

// para actualizar nesecito el id y los datos
export const updateTask = (id, task) => taskApi.put(`/${id}/`, task);
