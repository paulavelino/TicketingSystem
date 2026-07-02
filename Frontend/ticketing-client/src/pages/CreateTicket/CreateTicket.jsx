import { useState } from "react";
import "./CreateTicket.scss";
import { useNavigate } from "react-router-dom";
import ticketService from "../../services/ticketService";

const CreateTicket = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        priority: "Low",
        category: "IT",
        requesterName: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await ticketService.createTicket(formData);

            navigate("/");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="create-ticket">

                <div className="create-ticket__header">
                <h1>Create Ticket</h1>
                <p>Create a new internal support request.</p>
            </div>

            <form className="create-ticket__form" onSubmit={handleSubmit}>

                <div className="form-group">
                    <label>Title</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange}/>
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea rows="5" name="description" value={formData.description} onChange={handleChange}></textarea>
                </div>

                <div className="form-group">
                    <label>Priority</label>

                    <select name="priority" value={formData.priority} onChange={handleChange}>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                        <option value="Critical">Critical</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Category</label>

                    <select name="category" value={formData.category} onChange={handleChange}>
                        <option value="IT">IT</option>
                        <option value="HR">HR</option>
                        <option value="Facilities">Facilities</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Requester Name</label>
                    <input type="text" name="requesterName" value={formData.requesterName} onChange={handleChange}/>
                </div>

                <button type="submit">
                    Create Ticket
                </button>

            </form>

        </div>
    );
};

export default CreateTicket;