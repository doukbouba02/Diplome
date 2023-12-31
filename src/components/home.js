import React, { Component } from 'react';
import { Route, Routes, Link, BrowserRouter, Navigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import UserList from './UserList';
import AddDiplome from './AddDiplome';
import Diplome from "./diplome";
import GenererDiplome from "./GenererDiplome";
import Formulaire from "./formulaire";
import UserProfile from '../userProfile/UserProfile';
import Home2 from "./Home2";


export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: "Accueil",
            Admin: false,
            show: false,
            delayComplete: false, // Flag to track if the delay has completed
            count: 0,
        };
    }

    
    onLogOut = () => {
        this.setState({ active: "Accueil" });
        //console.log("Active state: " + this.state.active);
        //this.props.onLogOut();
       
    };
    handleActive = (event) => {
        this.setState({
            active: event.target.text.trim(),
        });
    };
    componentDidMount() {
        console.log('infos user: ' + UserProfile.getName() +"\n"+ UserProfile.getProfile());
        console.log("Active: " + this.state.active);
        
        

        // Adding a delay of 3 seconds before completing the delay
        setTimeout(() => {
            this.setState({
                delayComplete: true,
            });
            if (UserProfile.getProfile().trim() === "Administrateur") {
                this.setState({
                    Admin: true,
                });
                console.log('Admin status: ' + this.state.Admin);
                console.log("Yes admin");
            }
            else {
                console.log("User not Administrator");
            }
        }, 3000);
    }

    
    render() {
        if (!this.state.delayComplete) {
            return (<> 
                <div style={loadingScreenStyle}>
                    <img src='/images/Loading1.gif' alt="Loading" />
                </div>
            </>)
        }

        return (
            <>
                    <div className="hold-transition layout-top-nav">
                        <div className="wrapper">
                            <nav className="main-header navbar navbar-expand-md navbar-light navbar-white">
                                <div className="container">
                                    <div className="navbar-brand">
                                        <img
                                            src="/images/diplome2.jpeg"
                                            alt="AdminLTE Logo"
                                            className="brand-image img-circle elevation-3"
                                            style={{ opacity: ".8", marginTop: "5px" }}
                                        />
                                        <span
                                            className="brand-text font-weight-light"
                                            style={{ marginTop: "5px", marginLeft: "5px" }}
                                        >
                                            Diplome numérique
                                        </span>
                                    </div>
                                    <div className=" navbar-collapse order-3" id="navbarCollapse">
                                        <ul className="navbar-nav">
                                            <li className="nav-item">
                                                <Link
                                                    className={
                                                        this.state.active === "Accueil"
                                                            ? "nav-link active"
                                                            : "nav-link"
                                                    }
                                                    to="/Home2"
                                                    onClick={this.handleActive}
                                                >
                                                    <i className="bi bi-house"></i> Acceuil
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link
                                                    className={
                                                        this.state.active === "Diplome"
                                                            ? "nav-link active"
                                                            : "nav-link"
                                                    }
                                                    to="/diplome"
                                                    onClick={this.handleActive}
                                                >
                                                    <i className="bi bi-file-text"></i> Diplome
                                                </Link>
                                            </li>
                                            {this.state.Admin ? (
                                                <li className="nav-item">
                                                    <Link
                                                        className={
                                                            this.state.active === "Administrateur"
                                                                ? "nav-link active"
                                                                : "nav-link"
                                                        }
                                                        to="/userlist"
                                                        onClick={this.handleActive}
                                                    >
                                                        <i className="bi bi-person-circle"></i> Utilisateurs
                                                    </Link>
                                                </li>
                                            ) : null}
                                            <Button
                                                className="btn  btn-danger btn-sm"
                                                onClick={this.onLogOut}
                                            >
                                                <i className="bi bi-box-arrow-in-left"></i>
                                                Déconnexion
                                            </Button>
                                        </ul>
                                    </div>
                                </div>
                            </nav>
                            <div className="content-wrapper">
                                <Routes>
                                    {/* Diplome routes */}
                                    <Route path="/" element={<Home2 />} ></Route>
                                    <Route path="/Home2" element={<Home2 />} ></Route>
                                    <Route path="/diplome" element={<Diplome />} ></Route>
                                    <Route path="/addDiplome" element={<AddDiplome />} ></Route>
                                    <Route path="voir/:id" element={<GenererDiplome />} ></Route>

                                    {/* User routes */}
                                    <Route path='/userList' element={<UserList />} ></Route>

                                    {/* Other routes */}
                                    {/* <Route path="/home" element={<Home />} ></Route> */}
                                    <Route path="/formulaire" element={<Formulaire />} ></Route>
                                    {/* <Route path="/popup" element={<Popup />} ></Route> */}
                                </Routes>
                            </div>
                            <footer className="main-footer">
                                <div className="float-right d-none d-sm-block">
                                    <b>Version</b> 1.0.0
                                </div>
                                <strong>
                                    Copyright &copy; 2021-2022{" "}
                                    {/* <a href="https://github.com/doucoure05/Dou-ka6fa">DounKaFa</a>
                                    . */}
                                </strong>{" "}
                                All rights reserved.
                            </footer>
                        </div>
                    </div>
            </>
        );
    }
}

const loadingScreenStyle = {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%', 
    height: '100%',
    backgroundColor: '#EEEEEE',
    display: 'flex',
    justifyContent: 'center', /* Horizontally center content */
    alignItems: 'center', /* Vertically center content */
    zIndex: '9999', /* Ensure it's on top of everything */
};