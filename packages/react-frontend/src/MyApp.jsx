// src/MyApp.jsx
import React, {useState, useEffect} from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
    const [characters, setCharacters] = useState([]);

    async function deleteUser(userId) {
        try {
            const response = await fetch(`http://localhost:8000/users/${userId}`, {
                method: 'DELETE'
            });
            
            if (response.status === 200 || response.status === 204) {
                
                setCharacters(prev => prev.filter(user => user._id !== userId));
                return true;
            } else if (response.status === 404) {
                const error = await response.json();
                throw new Error(error.error || 'User not found');
            } else {
                throw new Error('Failed to delete user');
            }
        } catch (error) {
            console.error('Delete error:', error);
            alert(error.message);
            return false;
        }
    }

    const removeOneCharacter = async (index) => {
        const user = characters[index];
        if (!user) return;
        
        if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
            await deleteUser(user._id);
        }
    };

    async function updateList(person) {
        try {
            const response = await postUser(person);
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to add user');
            }
            const newUser = await response.json();
            setCharacters(prev => [...prev, newUser]);
        } catch (error) {
            console.error('Error adding user:', error);
            alert(error.message);
        }
    };

    async function postUser(person) {
        return fetch("http://localhost:8000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(person),
        });
    }

    function fetchUsers() {
        const promise = fetch("http://localhost:8000/users");
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
