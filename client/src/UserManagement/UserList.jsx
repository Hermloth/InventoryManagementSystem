import { useEffect, useState } from "react";
import "./UserList.css"

function UserListComponent () {
    const [userList, setUserList] = useState(null)
    const [loading, setLoading] = useState(true)


    useEffect(()=> {
        // implement get users and store in state

    })

    //TODO: Implement user display and user Line jsx

    return <h1>Hello User List</h1>
}

export default UserListComponent;