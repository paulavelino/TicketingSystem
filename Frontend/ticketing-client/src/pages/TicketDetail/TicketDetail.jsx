import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ticketService from "../../services/ticketService";
import commentService from "../../services/commentService";
import "./TicketDetail.scss";

const TicketDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [ticket, setTicket] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const agents = [
        "Paul",
        "Joanna",
        "Bob",
        "Alice",
        "Charlie",
    ];

    const formatDate = (date) => {
        return new Date(date).toLocaleString();
    };

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

    const handleSaveChanges = async () => {
        try {
            await ticketService.updateTicket(ticket.ticketId, {
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

            <button
                className="btn-back"
                onClick={() => navigate("/")}
            >
                ← Back to Dashboard
            </button>

            <div className="ticket-detail__card">

                <div className="ticket-detail__header">
                    <h1>Ticket Details</h1>
                    <p>
                        View and manage this support request.
                    </p>
                </div>

                <div className="ticket-info">

    <div className="info-grid">

        {/* LEFT COLUMN */}
        <div className="info-col">

            <div className="info-row">
                <span>Title</span>
                <strong>{ticket.title}</strong>
            </div>

            <div className="info-row">
                <span>Description</span>
                <strong>{ticket.description}</strong>
            </div>

            <div className="info-row">
                <span>Priority</span>
                <span className={`priority-badge ${ticket.priority.toLowerCase()}`}>
                    {ticket.priority}
                </span>
            </div>

            <div className="info-row">
                <span>Assigned To</span>

                <select
                    value={ticket.assignedTo || ""}
                    onChange={(e) =>
                        setTicket((prev) => ({
                            ...prev,
                            assignedTo: e.target.value
                        }))
                    }
                >
                    <option value="">Unassigned</option>
                    {agents.map((agent) => (
                        <option key={agent} value={agent}>
                            {agent}
                        </option>
                    ))}
                </select>

            </div>

        </div>

        {/* RIGHT COLUMN */}
        <div className="info-col">

            <div className="info-row">
                <span>Requester</span>
                <strong>{ticket.requesterName}</strong>
            </div>

            <div className="info-row">
                <span>Category</span>
                <strong>{ticket.category}</strong>
            </div>

            <div className="info-row">
                <span>Status</span>

                <select
                    value={ticket.status}
                    onChange={(e) =>
                        setTicket((prev) => ({
                            ...prev,
                            status: e.target.value
                        }))
                    }
                >
                    <option>Open</option>
                    <option>In Progress</option>
                    <option>Resolved</option>
                </select>

            </div>

            <div className="info-row">
                <span>Created</span>
                <strong>{formatDate(ticket.createdDate)}</strong>
            </div>

        </div>

    </div>

</div>

                <div className="ticket-actions">

                    <button
                        className="btn-primary"
                        onClick={handleSaveChanges}
                    >
                        Save Changes
                    </button>

                </div>

            </div>

            <div className="comments-card">

                <h2>Comments</h2>

                <div className="comment-form">

                    <textarea
                        rows="3"
                        placeholder="Write a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />

                    <button
                        className="btn-primary"
                        onClick={handleAddComment}
                    >
                        Add Comment
                    </button>

                </div>

                {comments.length === 0 ? (

                    <p className="empty-comments">
                        No comments yet.
                    </p>

                ) : (

                    comments.map(comment => (

                        <div
                            className="comment-card"
                            key={comment.id}
                        >
                            <p>{comment.message}</p>

                            <small>
                                {formatDate(comment.createdDate)}
                            </small>
                        </div>

                    ))

                )}

            </div>

        </div>
    );
};

export default TicketDetail;