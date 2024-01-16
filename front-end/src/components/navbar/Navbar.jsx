import React from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { Avatar, Button } from "@mui/material";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import MenuIcon from '@mui/icons-material/Menu';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import WorkspacesOutlinedIcon from '@mui/icons-material/WorkspacesOutlined';
import ForwardToInboxOutlinedIcon from '@mui/icons-material/ForwardToInboxOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import StreamIcon from '@mui/icons-material/Stream';
import Logo from '../images/user-profile-img.png';

export default function Navbar() {
    return (
        <React.Fragment>
            <div className="navbar-container">
                <nav className="navbar">
                    <div className="left">
                        <ul className="li-container">
                            <li className="items">
                                <Link to="/" style={{ textDecoration: 'none', textTransform: 'capitalize' }}>
                                    <Button sx={{ color: 'black', borderRadius: '15px', fontSize: '17px', cursor: 'pointer', textTransform: 'capitalize', padding: '5px' }} >
                                        <p>Home</p>
                                    </Button>
                                </Link>
                            </li>
                            <li className="items">
                                <Link to="/About-Us" style={{ textDecoration: 'none', textTransform: 'capitalize' }}>
                                    <Button sx={{ color: 'black', borderRadius: '15px', fontSize: '17px', cursor: 'pointer', textTransform: 'capitalize', padding: '5px' }} >
                                        <p>About Us</p>
                                    </Button>
                                </Link>
                            </li>
                            <li className="items">
                                <Link to="/Portfolio" style={{ textDecoration: 'none', textTransform: 'capitalize' }}>
                                    <Button sx={{ color: 'black', borderRadius: '15px', fontSize: '17px', cursor: 'pointer', textTransform: 'capitalize', padding: '5px' }} >
                                        <p>Portfolio</p>
                                    </Button>
                                </Link>
                            </li>
                        </ul>
                        {/* --- Mobile --- */}
                        <div className="dropdown">
                            <PopupState variant="popover" popupId="demo-popup-menu">
                                {(popupState) => (
                                    <React.Fragment>
                                        <Button  {...bindTrigger(popupState)} sx={{ color: 'black' }}>
                                            <MenuIcon></MenuIcon>
                                        </Button>
                                        <Menu {...bindMenu(popupState)}>
                                            <MenuItem className="dropdown-items" onClick={popupState.close}><HomeOutlinedIcon></HomeOutlinedIcon><Link to="/" style={{ color: 'black', textDecoration: 'none' }}>Home</Link></MenuItem>
                                            <MenuItem className="dropdown-items" onClick={popupState.close}><WorkspacesOutlinedIcon></WorkspacesOutlinedIcon><Link to="/About-Us" style={{ color: 'black', textDecoration: 'none' }}>About Us</Link></MenuItem>
                                            <MenuItem className="dropdown-items" onClick={popupState.close}><StreamIcon></StreamIcon><Link to="/Portfolio" style={{ color: 'black', textDecoration: 'none' }}>Portfolio</Link></MenuItem>
                                            <MenuItem className="dropdown-items" onClick={popupState.close}><ForwardToInboxOutlinedIcon></ForwardToInboxOutlinedIcon><Link to="/Contact-Us" style={{ color: 'black', textDecoration: 'none' }}>Contact Us</Link></MenuItem>
                                            <MenuItem className="dropdown-items" onClick={popupState.close}><ArticleOutlinedIcon></ArticleOutlinedIcon><Link to="/Newsletter" style={{ color: 'black', textDecoration: 'none' }}>Newsletter</Link></MenuItem>
                                            <MenuItem className="dropdown-items" onClick={popupState.close}><AutoStoriesOutlinedIcon></AutoStoriesOutlinedIcon><Link to="/Book-Now" style={{ color: 'black', textDecoration: 'none' }}>Book Now</Link></MenuItem>
                                        </Menu>
                                    </React.Fragment>
                                )}
                            </PopupState>
                        </div>
                        {/* --- !Mobile! --- */}
                    </div>
                    <div className="middle">
                        <Button sx={{ borderRadius: "15px", fontSize: "17px", cursor: "pointer", textTransform: 'capitalize', padding: '5px' }} >
                            <Avatar src={Logo} sx={{ width: 60, height: 60, borderRadius: '5px' }}></Avatar>
                        </Button>
                    </div>
                    <div className="right">
                        <ul className="li-container">
                            <li className="items">
                                <Link to="/Contact-Us" style={{ textDecoration: 'none', textTransform: 'capitalize' }}>
                                    <Button sx={{ color: 'black', borderRadius: '15px', fontSize: '17px', cursor: 'pointer', textTransform: 'capitalize', padding: '5px' }} >
                                        <p>Contact Us</p>
                                    </Button>
                                </Link>
                            </li>
                            <li className="items">
                                <Link to="/Newsletter" style={{ textDecoration: 'none', textTransform: 'capitalize' }}>
                                    <Button sx={{ color: 'black', borderRadius: '15px', fontSize: '17px', cursor: 'pointer', textTransform: 'capitalize', padding: '5px' }} >
                                        <p>Newsletter</p>
                                    </Button>
                                </Link>
                            </li>
                            <li className="items">
                                <Link to="/Book-Now" style={{ textDecoration: 'none', textTransform: 'capitalize' }}>
                                    <Button sx={{ color: 'black', borderRadius: '15px', fontSize: '17px', cursor: 'pointer', textTransform: 'capitalize', padding: '5px' }} >
                                        <p>Book Now</p>
                                    </Button>
                                </Link>
                            </li>

                        </ul>
                    </div>
                </nav>
            </div>
        </React.Fragment>
    );
}
