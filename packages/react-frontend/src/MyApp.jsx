// src/MyApp.jsx
import React, { useState } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
    // initialize with an empty array (or sample data)
    const [characters, setCharacters] = useState([
        { name: "Charlie", job: "Janitor" },
        { name: "Mac", job: "Bouncer" },
        { name: "Dee", job: "Aspiring actress" },
        { name: "Dennis", job: "Bartender" }
    ]);

    const removeOneCharacter = (index) => {
        setCharacters(prev => prev.filter((_, i) => i !== index));
    };

    function updateList(person) {
        setCharacters(prev => [...prev, person]);
    };

    return (
        <div className="container">
            <Table
            characterData={characters}
            removeCharacter={removeOneCharacter}
            />
            <Form handleSubmit={updateList} />
        </div>
        );
}
export default MyApp;