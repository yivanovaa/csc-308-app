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

    async function submitForm() {
        try {
            const res = await fetch('http://localhost:8000/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(person)
            });
            if (res.status === 201) {
                const created = await res.json();
                props.handleSubmit(created);
                setPerson({ name: "", job: "" });
            } else {
                console.warn('Expected 201, got', res.status);
            }
        } catch (err) {
            console.error('Submit failed', err);
        }
    };

    return (
        <form>
            <label htmlFor="name">Name</label>
            <input
            type="text"
            name="name"
            id="name"
            value={person.name}
            onChange={handleChange}
            />
            <label htmlFor="job">Job</label>
            <input
            type="text"
            name="job"
            id="job"
            value={person.job}
            onChange={handleChange}
            />
            <input type="button" value="Submit" onClick={submitForm} />
        </form>
        );
}


export default Form;