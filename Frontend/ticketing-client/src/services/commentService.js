import api from "../api/axios";

const CommentService = {
    getComments: (ticketId) => api.get(`/Comment/ticket/${ticketId}`),

    createComment: (data) => api.post("/Comment", data)
};

export default CommentService;