import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ticketService from "../../services/ticketService";
import commentService from "../../services/commentService";

const TicketDetail = () => {
    const { id } = useParams();
    const [ticket, setTicket] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        loadTicket();
        loadComments();
    }, []);

    const loadTicket = async () => {
        try {
            const data = await ticketService.getTicketById(id);
            console.log(data.data)
            setTicket(data.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSaveStatus = async () => {
        try {
            await ticketService.updateTicket(ticket.ticketId, {
                Title: ticket.title,
                Description: ticket.description,
                Priority: ticket.priority,
                Category: ticket.category,
                RequesterName: ticket.requesterName,
                Status: ticket.status,
                AssignedTo: ticket.assignedTo
            });

            alert("Ticket status updated successfully.");
        } catch (error) {
            console.error(error);
        }
    };

    const loadComments = async () => {
        try {
            const response = await commentService.getComments(id);
            setComments(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddComment = async () => {
        if (!newComment.trim()) {
            return;
        }

        try {
            await commentService.createComment({
                ticketId: Number(id),
                message: newComment
            });

            setNewComment("");

            await loadComments();
        } catch (error) {
            console.error(error);
        }
    };


    if (!ticket) {
        return <p>Loading...</p>;
    }

    return (
    <div className="ticket-detail">

        <h1>Ticket Detail</h1>

        <div>
            <strong>Title:</strong> {ticket.title}
        </div>

        <div>
            <strong>Description:</strong> {ticket.description}
        </div>

        <div>
            <strong>Requester:</strong> {ticket.requesterName}
        </div>

        <div>
            <strong>Category:</strong> {ticket.category}
        </div>

        <div>
            <strong>Priority:</strong> {ticket.priority}
        </div>

        <div>
            <strong>Status:</strong>
            <select
                value={ticket.status}
                onChange={(e) =>
                    setTicket((prev) => ({
                        ...prev,
                        status: e.target.value
                    }))
                }
            >
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
            </select>
        </div>

        <div>
            <strong>Assigned To:</strong> {ticket.assignedTo || "Unassigned"}
        </div>

        <div>
            <strong>Created At:</strong> {ticket.createdDate}
        </div>

        <button onClick={handleSaveStatus}>
            Save Status
        </button>

        <hr />

        <div className="comments-section">

            <h2>Comments</h2>

            <div className="comment-form">
                <textarea
                    rows="3"
                    placeholder="Write a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />

                <button onClick={handleAddComment}>
                    Add Comment
                </button>
            </div>

            {comments.length === 0 ? (
                <p>No comments yet.</p>
            ) : (
                comments.map((comment) => (
                    <div className="comment-card" key={comment.id}>
                        <p>{comment.message}</p>
                        <small>{comment.createdDate}</small>
                    </div>
                ))
            )}

        </div>

    </div>
);
};

export default TicketDetail;