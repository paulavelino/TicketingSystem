import api from "../api/axios";

const ticketService = {
    getAllTickets: () => api.get("/Ticket"),

    getTicketById: (id) => api.get(`/Ticket/${id}`),

    createTicket: (data) => api.post("/Ticket", data),

    updateTicket: (id, data) => api.put(`/Ticket/${id}`, data)

};

export default ticketService;