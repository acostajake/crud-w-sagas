import React from 'react';
import { connect } from 'react-redux';
import { Alert } from 'reactstrap';
import {
	getUsersRequest,
	createUserRequest,
	deleteUserRequest,
	usersError,
} from '../actions/users';
import UserList from './UserList';
import NewUserForm from './NewUser';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.props.getUsersRequest();
	}

	handleClose = () => {
		this.props.usersError({
			error: '',
		});
	};

	handleDeleteUserClick = (userId) => {
		this.props.deleteUserRequest(userId);
	};

	handleSubmit = ({ firstName, lastName }) => {
		this.props.createUserRequest({ firstName, lastName });
	};

	render() {
		const users = this.props.users;
		return (
			<div style={{ margin: '0 auto', padding: '20px', maxWidth: '600px' }}>
				<Alert
					color='danger'
					isOpen={!!this.props.users.error}
					toggle={this.hancleClose}
				>
					{this.props.users.error}
				</Alert>
				<NewUserForm onSubmit={this.handleSubmit} />
				<UserList
					users={users.items}
					handleDeleteUserClick={this.handleDeleteUserClick}
				/>
			</div>
		);
	}
}
export default connect(({ users }) => ({ users }), {
	getUsersRequest,
	createUserRequest,
	deleteUserRequest,
	usersError,
})(App);
