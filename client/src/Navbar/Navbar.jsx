// General nav Bar for Project
import { Link } from "react-router"
import "./Navbar.css"
import logo from "../../images/MattASOP3.png";

function Navbar(){
    console.log("Navbar Loaded")
    return (
        <>
            <nav className="Navbar">
                <img src={logo} className="logoimage"></img>
                <ul>
                    <li> <Link to="/">Home</Link></li>
                    <li> <Link to="/products">Products</Link> </li>
                </ul>
            </nav>
        </>
    )
}

export default Navbar