import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import { graphql } from 'react-apollo';
import { logoutMutation } from '../../mutation/mutations';

import {
    Collapse, Navbar, NavbarToggler,
    Nav, NavItem, NavLink, Spinner
} from 'reactstrap';

class NavbarPage extends Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            email: ''
        };
    }

    handleLogout = () => {
        cookie.remove('cookie', { path: '/' });
        this.props.logoutMutation({
            variables: {
                email: this.state.email
            }
        });
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        let main = null;
        if (cookie.load('cookie') === 'owner') {
            main = (
                <div>
                    <Navbar color="light" light expand="md">
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink tag={Link} to="/ownerhome">Homepage</NavLink>
                            </NavItem>
                        </Nav>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <NavLink tag={Link} to="/profile">Profile</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} to="/" onClick={this.handleLogout}>Logout</NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Navbar>
                </div>
            );
        } else if (cookie.load('cookie') === 'buyer') {
            main = (
                <div>
                    <Navbar color="light" light expand="md">
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink tag={Link} to="/buyerhome">Homepage</NavLink>
                            </NavItem>
                        </Nav>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <NavLink tag={Link} to="/profile">Profile</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} to="/" onClick={this.handleLogout}>Logout</NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Navbar>
                </div>
            );
        } else {
            main = (
                <div>
                    <Navbar color="light" light expand="md">
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink tag={Link} to="/">Lab3 </NavLink>
                            </NavItem>
                        </Nav>
                        <div>
                            <Spinner type="grow" color="primary" />
                            <Spinner type="grow" color="secondary" />
                            <Spinner type="grow" color="success" />
                            <Spinner type="grow" color="danger" />
                            <Spinner type="grow" color="warning" />
                            <Spinner type="grow" color="info" />
                            <Spinner type="grow" color="light" />
                            <Spinner type="grow" color="dark" />
                            <Spinner color="primary" />
                            <Spinner color="secondary" />
                            <Spinner color="success" />
                            <Spinner color="danger" />
                            <Spinner color="warning" />
                            <Spinner color="info" />
                            <Spinner color="light" />
                            <Spinner color="dark" />
                        </div>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <NavLink tag={Link} to="/login">Login </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} to="/register">Register</NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Navbar>
                </div>
            )
        }
        let redirectVar = null;
        if (cookie.load('cookie') === 'owner') {
            redirectVar = <Redirect to="/ownerhome" />
        } else if (cookie.load('cookie') === 'buyer') {
            redirectVar = <Redirect to="/buyerhome" />
        }
        return (
            <div>
                {main}
                {redirectVar}
            </div>
        )
    }
}

export default graphql(logoutMutation, { name: "logoutMutation" })(NavbarPage);