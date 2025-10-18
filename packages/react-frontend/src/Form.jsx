// src/Form.jsx
import React, { useState } from "react";

function Form(props) {
    function handleChange(event) {
        const { name, value } = event.target;
        setPerson(prev => ({ ...prev, [name]: value }));
        }

    const [person, setPerson] = useState({
        name: "",
        job: ""
    });

    async function submitForm(e) {
        e.preventDefault(); // Prevent default form submission
        try {
            await props.handleSubmit(person);
            // Clear the form after successful submission
            setPerson({ name: "", job: "" });
        } catch (error) {
            // Error is already handled in the parent component
            console.error('Form submission error:', error);
        }
    };

    return (
        <form onSubmit={submitForm}>
            <div>
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={person.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="job">Job</label>
                <input
                    type="text"
                    name="job"
                    id="job"
                    value={person.job}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
}

export default Form;