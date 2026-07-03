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
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: ""
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = "Title is required.";
        }

        if (!formData.description.trim()) {
            newErrors.description = "Description is required.";
        }

        if (!formData.requesterName.trim()) {
            newErrors.requesterName = "Requester name is required.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            await ticketService.createTicket(formData);

            navigate("/");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="create-ticket">
            <button className="btn-back" onClick={() => navigate("/")} >
                ← Back to Dashboard
            </button>

            <div className="create-ticket__card">

                <div className="create-ticket__header">
                    <h1>Create New Ticket</h1>
                    <p>Submit a new internal support request.</p>
                </div>

                <form className="create-ticket__form" onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label>Title</label>
                        <input type="text" name="title" placeholder="Enter ticket title" value={formData.title} onChange={handleChange}/>
                            {errors.title && (
                                <span className="error-message">
                                    {errors.title}
                                </span>
                            )}
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea rows="5" name="description" placeholder="Describe the issue..." value={formData.description} onChange={handleChange}></textarea>
                        {errors.description && (
                            <span className="error-message">
                                {errors.description}
                            </span>
                        )}
                    </div>

                    <div className="form-row">
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
                    </div>
                   

                    <div className="form-group">
                        <label>Requester Name</label>
                        <input type="text" name="requesterName" placeholder="Enter requester's name" value={formData.requesterName} onChange={handleChange}/>
                        {errors.requesterName && (
                            <span className="error-message">
                                {errors.requesterName}
                            </span>
                        )}
                    </div>

                    <button type="submit" className="btn-primary" >
                        Create Ticket
                    </button>

                </form>
            </div>
            

        </div>
    );
};

export default CreateTicket;