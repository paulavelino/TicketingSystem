import { useEffect, useState } from "react";
import "./Dashboard.scss";
import ticketService from "../../services/ticketService";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
    const navigate = useNavigate();
    const [tickets, setTickets] = useState([]);
    const [statusFilter, setStatusFilter] = useState("All");
    const [priorityFilter, setPriorityFilter] = useState("All");

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

    const filteredTickets = tickets.filter((ticket) => {
        const matchesStatus = statusFilter === "All" || ticket.status === statusFilter;

        const matchesPriority = priorityFilter === "All" || ticket.priority === priorityFilter;

        return matchesStatus && matchesPriority;
    });

    return (
        <div className="dashboard">
            <div className="dashboard__header">
                <h1>Ticket Dashboard</h1>

                <button onClick={() => navigate(`/create`)}>Create Ticket</button>
            </div>

            <div className="dashboard__summary">

            </div>

            <div className="dashboard__filters">
                <div className="filter-group">
                    <label>Status</label>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="All">All</option>
                        <option value="Open">Open</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                    </select>
                </div>

                <div className="filter-group">
                    <label>Priority</label>
                    <select
                        value={priorityFilter}
                        onChange={(e) => setPriorityFilter(e.target.value)}
                    >
                        <option value="All">All</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                        <option value="Critical">Critical</option>
                    </select>
                </div>
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
                            {filteredTickets.length > 0 ? (
                                filteredTickets.map((ticket) => (
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
                                            <button onClick={() => navigate(`/ticket/${ticket.ticketId}`)}>View</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="9">
                                        No tickets found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;