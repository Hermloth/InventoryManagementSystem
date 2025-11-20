import "./UserLine.css"

function UserLine ({username, onDelete }) {
    return (
        <>
        <div className="user-line"> 
            <p className="user-name">{username}</p>
            <button className="user-delete-btn" onClick={() => onDelete(username)}>
                Delete
            </button>
        </div>
        </>
    )
}

export default UserLine;