import React, {Component} from 'react';
import LStorageUser from "../../services/LStorageUser";
import api from "../../services/api/Api";

import Navbar from "./Navbar";

export default class NavbarContainer extends Component {
    state = {
        isAdmin: false
    }

    componentDidMount() {
        const user = LStorageUser.getUser();
        if (user) {
            this.setState({
                isAdmin: user?.roles.includes("ROLE_MODERATOR"),
            });
        }
    }

    logOut() {
        api.get('auth/logout')
        .then(response => {
            console.log(response)
        }).catch(error =>{
            console.error(error)
        }).finally(() => {
            LStorageUser.remove();
            window.location.reload();
        })
    }

    render() {
        const { isAdmin } = this.state;

        return (
            <Navbar isAdmin={isAdmin} logOut={this.logOut}/>
        );
    }
}
