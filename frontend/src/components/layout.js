// Imports
import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// UI Imports
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

// App Imports
import UserButtonLogin from './user/button/login';
import UserButtonLogged from './user/button/logged';

class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerOpen: false
        };
    }

    handleDrawerToggle = () => this.setState({ drawerOpen: !this.state.drawerOpen });

    render() {
        const { isAuthenticated } = this.props.user;

        return (
            <div>
                <AppBar
                    title="Payment Manager"
                    onLeftIconButtonTouchTap={ this.handleDrawerToggle }
                    iconElementRight={ isAuthenticated ? <UserButtonLogged /> : <UserButtonLogin /> }
                />

                <Drawer
                    docked={false}
                    width={200}
                    open={ this.state.drawerOpen }
                    onRequestChange={(drawerOpen) => this.setState({ drawerOpen })}
                >
                    
                </Drawer>

                { this.props.children }
            </div>
        );
    }
}

Layout.propTypes = {
    user: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, {})(Layout);
