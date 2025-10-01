// src/MyApp.jsx
import React, { useState } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
    const [characters, setCharacters] = useState([
        {
            name: "Charlie",
            job: "Janitor"
        },
        {
            name: "Mac",
            job: "Bouncer"
        },
        {
            name: "Dee",
            job: "Aspiring actress"
        },
        {
            name: "Dennis",
            job: "Bartender"
        }
    ]);
    // remove handler must live inside the component so it can access state
    const removeOneCharacter = (index) => {
        const updated = (characters || []).filter((_, i) => i !== index);
        setCharacters(updated);
    };
    return (
        <div className="container">
            <Table
            characterData={characters}
            removeCharacter={removeOneCharacter}
            />
            <Form />
        </div>
        );
}
export default MyApp;