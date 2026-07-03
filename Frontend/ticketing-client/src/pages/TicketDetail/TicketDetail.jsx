import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ticketService from "../../services/ticketService";

const TicketDetail = () => {
    const { id } = useParams();

    const [ticket, setTicket] = useState(null);

    useEffect(() => {
        loadTicket();
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

    </div>
);
};

export default TicketDetail;