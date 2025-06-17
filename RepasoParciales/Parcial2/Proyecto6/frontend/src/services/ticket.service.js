// frontend/src/services/ticket.service.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/tickets';

export const getTickets = () => axios.get(API_URL);

export const createTicket = (ticket) => axios.post(API_URL, ticket);
