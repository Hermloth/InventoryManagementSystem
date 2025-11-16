// General nav Bar for Project
import { Link } from "react-router-dom"
import "./Navbar.css"
import logo from "./assets/AppLogo.jpg";
import SettingsIcon from "./assets/Settings.svg"
import HomeIcon from "./assets/Home.svg"
import { useState } from "react";
import expandIcon from "./assets/expandIcon.svg"
import collapseIcon from "./assets/collapseIcon.svg"
import productIcon from "./assets/productIcon.svg"
import salesIcon from "./assets/sales.svg"
import purchaseIcon from "./assets/purchase.svg"
import logoutIcon from "./assets/logout.svg"

function Navbar({ onLogout, user }){
    const [collapsed, setCollapsed] = useState(false);

    return (
        <>
            <nav className={`Navbar ${collapsed? "Collapsed" : "Expanded"}`}>
                <div className="HeaderBar">
                    {collapsed? (null):(<p className="Header">Inventory Manager</p>)}
                    
                    <button className="CollapseButton" onClick={()=>{
                    setCollapsed(!collapsed)
                    if(collapsed){
                        console.log("Menu Expanded")
                        
                    } else {
                        console.log("Menu Collapsed")
                    }
                    
                }}>
                    <img src={collapsed ? (expandIcon) : (collapseIcon)} alt="" />
                </button>

                </div>
                
                    {collapsed ? (null) : (<img src={logo} className="logoimage"></img>)}       
                <ul className="MenuList">
                    <li className="NoPad">
                        {collapsed? (<Link to="/">
                                                <div className="MenuLine">
                                                    <img className="MenuIcon" src={HomeIcon}></img>
                                                </div>
                                    </Link>):
                                    (<Link to="/">
                                                <div className="MenuLine">
                                                    <img className="MenuIcon" src={HomeIcon}></img>
                                                    <p className="MenuTitle LowPad">Home</p>
                                                </div>
                                    </Link>
                                    )}

                        
                    </li>
                    <li className="NoPad">
                        {collapsed? (<Link to="/products">
                                                <div className="MenuLine">
                                                    <img className="MenuIcon" src={productIcon}></img>
                                                </div>
                                    </Link>):
                                    (<Link to="/products">
                                                <div className="MenuLine">
                                                    <img className="MenuIcon" src={productIcon}></img>
                                                    <p className="MenuTitle LowPad">Products</p>
                                                </div>
                                    </Link>
                                    )}
                    </li>
                    <li className="NoPad">
                        {collapsed? (<Link to="/sales">
                                                <div className="MenuLine">
                                                    <img className="MenuIcon" src={salesIcon}></img>
                                                </div>
                                    </Link>):
                                    (<Link to="/sales">
                                                <div className="MenuLine">
                                                    <img className="MenuIcon" src={salesIcon}></img>
                                                    <p className="MenuTitle LowPad">Sales</p>
                                                </div>
                                    </Link>
                                    )}
                    </li>
                    <li className="NoPad">
                        {collapsed? (<Link to="/purchases">
                                        <div className="MenuLine">
                                            <img className="MenuIcon" src={purchaseIcon}></img>
                                        </div>
                                    </Link>):
                                    (<Link to="/purchases">
                                                <div className="MenuLine">
                                                    <img className="MenuIcon" src={purchaseIcon}></img>
                                                    <p className="MenuTitle LowPad">Purchases</p>
                                                </div>
                                        </Link>
                                    )}
                    </li>
                </ul>

                <ul className="AdminNav">
                    <li className="NoPad">
                        {collapsed? (<Link to="/settings">
                                        <div className="MenuLine">
                                            <img className="MenuIcon" src={SettingsIcon}></img>
                                        </div>
                                    </Link>):
                                    (<Link to="/settings">
                                                <div className="MenuLine">
                                                    <img className="MenuIcon" src={SettingsIcon}></img>
                                                    <p className="MenuTitle LowPad">Settings</p>
                                                </div>
                                        </Link>
                                    )}
                    </li>
                                        <li className="NoPad user-section">
                        {collapsed ? (
                            <button className="logout-button-collapsed" onClick={onLogout} title={`Logout ${user.username}`}>
                                <div className="MenuLine">
                                    <img className="MenuIcon" src={logoutIcon} alt="Logout"></img>
                                </div>
                            </button>
                        ) : (
                            <div className="user-info">
                                <p className="username">{user.username}</p>
                                <button className="logout-button" onClick={onLogout}>
                                    <img className="MenuIcon" src={logoutIcon} alt="Logout"></img>
                                    <span>Logout</span>
                                </button>
                            </div>
                        )}
                    </li>
                </ul>

                
            </nav>
        </>
    )
}

export default Navbar