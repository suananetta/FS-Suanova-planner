import axios from 'axios';

const BASE_URL = 'https://planner.rdclr.ru/api';
// 'https://planner.rdclr.ru/api'
// 'http://localhost:1337/api';

const plannerApi = axios.create({
    baseURL: BASE_URL,
})

const plannerApiLoged = axios.create({
    baseURL: BASE_URL,
})

const plannerApiFiles = axios.create({
    baseURL: BASE_URL,
})

plannerApi.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json';
    return config;
});

plannerApiLoged.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json';
    config.headers.Accept = 'application/json';
    config.headers.Authorization = localStorage.getItem('token') !== null? `Bearer ${localStorage.getItem('token')}` : '';
    return config;
});

plannerApiFiles.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'multipart/form-data';
    config.headers.Accept = 'application/json';
    config.headers.Authorization = localStorage.getItem('token') !== null? `Bearer ${localStorage.getItem('token')}` : '';
    return config;
});

export const checkUserExistence = async (email) => {
    return plannerApi.get(`/taken-emails/${email}`, {email})
}

export const loginUser = async (identifier, password) => {
    return plannerApi.post('/auth/local', {identifier, password})
}

export const registerUser = async (username, email, password) => {
    return plannerApi.post('/auth/local/register', {username, email, password})
}

export const getUserInfo = async () => {
    return plannerApiLoged.get(`/users/me`)
}
export const getAllUsers = async () => {
    return plannerApiLoged.get(`/users`)
}

export const uploadFile = async (files) => {
    return plannerApiFiles.post(`/upload`, {files})
}

export const getFiles = async () => {
    return plannerApiLoged.get(`/upload/files`)
}

export const getFile = async (id) => {
    return plannerApi.get(`/upload/files/${id}`, {id})
}

export const createNewEvent = async (eventData) => {
    return plannerApiLoged.post(`events`, eventData)
}

export const updateNewEventWithPhotos = async (id, data) => {
    return plannerApiLoged.put(`events/${id}`, {id, data})
}

export const joinEvent = async (eventID) => {
    return plannerApiLoged.post(`/events/${eventID}/join`, {eventID})
}

export const leaveEvent = async (eventID) => {
    return plannerApiLoged.post(`/events/${eventID}/leave`, {eventID})
}

export const getEventsForPublic = async () => {
    return plannerApi.get('/events?populate=*&filter[date][$gte]=2022-10-14T14:00:00.000Z&filter[date][$lte]=2024-10-14T14:00:00.000Z')
}

export const getEventsForLogedUSer = async () => {
    return plannerApiLoged.get('/events?populate=*&filter[date][$gte]=2022-10-14T14:00:00.000Z&filter[date][$lte]=2024-10-14T14:00:00.000Z')
}

