import axios from 'axios';
const API='/api';
export const getEvents = () => axios.get(`${API}/events`);
export const addEvent = (payload) => axios.post(`${API}/events`, payload);
export const updateEvent = (id, payload) => axios.put(`${API}/events/${id}`, payload);
export const deleteEvent = (id) => axios.delete(`${API}/events/${id}`);
