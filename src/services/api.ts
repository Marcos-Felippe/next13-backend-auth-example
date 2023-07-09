import axios from 'axios';

type SingIndata = {
    email: string;
    password: string;
}

type CreateProjectData = {
    title: string;
    description: string;
    token: string;
    userId: string;
}

type DeleteProjectData = {
    id: string;
    token: string;
    userId: string;
}

export const api = axios.create({
    baseURL: "http://localhost:8000",
});

export const createSession = async ({email, password}: SingIndata) => {
    return await api.post("/login", { email, password })
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            return {
                data: {
                    error: true,
                    message: error.response
                }
            }
        });
}

export const createProject = async ({title, description, token, userId}: CreateProjectData) => {
    return await api.post(`/user/${userId}/project`, { title, description, headers: {
        'Authorization': `Bearer ${token}` 
    }})
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            return {
                data: {
                    error: true,
                    message: error.response
                }
            }
        });
}

export const deleteProject = async ({id, token, userId}: DeleteProjectData) => {
    return await api.delete(`/user/${userId}/project/${id}`, { headers: {
        'Authorization': `Bearer ${token}`
    }})
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            return {
                data: {
                    error: true,
                    message: error.response
                }
            }
        });
}