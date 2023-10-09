import axios from 'axios';

import { model as authModel } from '../_store/auth';

const BASE_URL = 'http://localhost:1337/api';

const plannerApi = axios.create({
    baseURL: BASE_URL,
})

const plannerApiLoged = axios.create({
    baseURL: BASE_URL,
})

plannerApi.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json';
    return config;
});

plannerApiLoged.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json';
    config.headers.Accept = 'application/json';
    config.headers.Authorization = localStorage.getItem('token') != null? `Bearer ${JSON.parse(localStorage.getItem('token'))}` : '';
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

export const getEventsForPublic = async () => {
    return plannerApi.get('/events?populate=*&filter[date][$gte]=2022-10-14T14:00:00.000Z&filter[date][$lte]=2024-10-14T14:00:00.000Z')
}

