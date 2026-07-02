import { useEffect, useState } from "react";
import "./Dashboard.scss";
import ticketService from "../../services/ticketService";

const Dashboard = () => {

    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        loadTickets();
    }, []);

    const loadTickets = async () => {
        try {
            const response = await ticketService.getAllTickets();
            console.log(response.data)
            setTickets(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="dashboard">
            <div className="dashboard__header">
                <h1>Ticket Dashboard</h1>

                <button>Create Ticket</button>
            </div>

            <div className="dashboard__summary">

            </div>

            <div className="dashboard__table">
                <div className="dashboard__table">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Requester</th>
                                <th>Category</th>
                                <th>Priority</th>
                                <th>Status</th>
                                <th>Assigned To</th>
                                <th>Created At</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {tickets.map((ticket) => (
                                <tr key={ticket.ticketId}>
                                    <td>{ticket.ticketId}</td>
                                    <td>{ticket.title}</td>
                                    <td>{ticket.requesterName}</td>
                                    <td>{ticket.category}</td>
                                    <td>{ticket.priority}</td>
                                    <td>{ticket.status}</td>
                                    <td>{ticket.assignedTo || "-"}</td>
                                    <td>
                                        {new Date(ticket.createdDate).toLocaleDateString()}
                                    </td>
                                    <td>
                                        <button>View</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;