// src/MyApp.jsx
import React, {useState, useEffect} from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
    const [characters, setCharacters] = useState([]);

    // Delete user on backend by id, then update frontend state on success
    async function deleteUser(id) {
        try {
            const res = await fetch(`http://localhost:8000/users/${id}`, { method: 'DELETE' });
            if (res.status === 204) {
                setCharacters(prev => prev.filter(u => u.id !== id));
            } else if (res.status === 404) {
                console.warn('Delete failed: resource not found', id);
            } else {
                console.warn('Unexpected response from DELETE', res.status);
            }
        } catch (err) {
            console.error('Failed to delete user', err);
        }
    }

    const removeOneCharacter = (index) => {
        const user = characters[index];
        if (!user) return;
        deleteUser(user.id);
    };

    function updateList(person) {
        postUser(person)
        .then((res) => {
            if (res.status === 201) return res.json();
            throw new Error('Failed to create user: ' + res.status);
        })
        .then((created) => setCharacters(prev => [...prev, created]))
        .catch((error) => { console.log(error); });
    };

    function fetchUsers() {
        const promise = fetch("http://localhost:8000/users");
        return promise;
    }

    function postUser(person) {
        const promise = fetch("http://localhost:8000/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(person),
        });

        return promise;
    }

    useEffect(() => {
        fetchUsers()
            .then((res) => res.json())
            .then((json) => setCharacters(json["users_list"]))
            .catch((error) => { console.log(error); });
        }, [] );

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