// Imports
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// UI Imports
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

// App Imports
import { userLogout } from '../../../actions/user';

class UserButtonLogged extends Component {
    constructor() {
        super();

        this.state = {
            notification: false,
            loggedOut: false
        };
    }

    logout(event) {
        event.preventDefault();

        this.props.userLogout();
    }

    render() {
      // <MenuItem
      // primaryText="Sign out" onClick={ this.logout.bind(this) }/>
        return (
            <IconMenu
                iconButtonElement={
                    <IconButton><MoreVertIcon color="white"/></IconButton>
                }
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >
                <Link to="/add/transaction"><MenuItem primaryText="Add payment"/></Link>
                <Link to="/report"><MenuItem primaryText="Reports"/></Link>
                <Link to="/user/login"><MenuItem primaryText="Sign Out"/></Link>

            </IconMenu>
        );
    }
}

UserButtonLogged.propTypes = {
    userLogout: PropTypes.func.isRequired,
};

export default connect(null, { userLogout })(UserButtonLogged);
