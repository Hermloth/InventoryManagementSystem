import { useEffect, useState } from "react";
import UserLine from "./UserLine";
import "./UserList.css"


function UserListComponent () {
    const [userList, setUserList] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [showAddForm, setShowAddForm] = useState(false)
    const [newUsername, setNewUsername] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [addError, setAddError] = useState("")


    useEffect(()=> {
        // implement get users and store in state
                async function fetchAllData(){
                    try{
                        // Fetch user data
                        const userResponse = await fetch(`/api/users` , {
                            credentials: 'include'
                            });

                        if (!userResponse.ok) {
                            throw new Error('Failed to fetch users');
                            }

                        const userData = await userResponse.json();
                        
                        if (Array.isArray(userData)) { // If array returned set in UserData
                            setUserList(userData);
                        } else {
                            // If it's a single object (Only one user), wrap it in an array
                            setUserList([userData]);
                        }
                    } catch (error) {
                        console.error("Error Fetching User Data", error);
                        setError("Failed to load users");
                    } finally {
                        setLoading(false)
                    }
                }

                fetchAllData();
    }, [])

    const handleDelete = async (username) => {
        if (!confirm(`Are you sure you want to delete user: ${username}?`)) {
            return;
        }

        try {
            const response = await fetch(`/api/users/${username}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Failed to delete user');
            }

            // Remove user from list
            setUserList(userList.filter(user => user.username !== username));
        } catch (error) {
            console.error("Error deleting user:", error);
            alert("Failed to delete user");
        }
    };


    const handleAddUser = async (e) => {
        e.preventDefault();
        setAddError("");

        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    username: newUsername.toLowerCase(),
                    password: newPassword
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to add user');
            }

            // Add new user to list
            setUserList([...userList, data.user]);
            
            // Reset form
            setNewUsername("");
            setNewPassword("");
            setShowAddForm(false);
        } catch (error) {
            console.error("Error adding user:", error);
            setAddError(error.message);
        }
    };

    if (loading) {
        return <div className="loading">Loading users...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <>
            <div className="user-list-header">
                <h1>User Management</h1>
                <div className="header-actions">
                    <button 
                        className="btn-add-user" 
                        onClick={() => setShowAddForm(!showAddForm)}
                    >
                        {showAddForm ? "Cancel" : "+ Add User"}
                    </button>
                </div>
            </div>

            {showAddForm && (
                <div className="add-user-form">
                    <h3>Add New User</h3>
                    <form onSubmit={handleAddUser}>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                value={newUsername}
                                onChange={(e) => setNewUsername(e.target.value.toLowerCase())}
                                placeholder="Enter username"
                                required
                                minLength={3}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Enter password"
                                required
                                minLength={6}
                            />
                        </div>
                        {addError && <div className="form-error">{addError}</div>}
                        <button type="submit" className="btn-submit">Create User</button>
                    </form>
                </div>
            )}

            <div className="user-list-container">
                {userList.length === 0 ? (
                    <p>No users found!</p>
                ) : (
                    <div className="user-list">
                        {userList.map((user) => (
                            <UserLine 
                                key={user.id} 
                                username={user.username} 
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}

export default UserListComponent;