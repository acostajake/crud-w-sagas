import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class NewUserForm extends React.Component {
	state = {
		firstName: '',
		lastName: '',
	};

	handleChange = (e) => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	};

	handleSubmit = (e) => {
		e.preventDefault();
		const { firstName, lastName } = this.state;
		this.props.onSubmit({ firstName, lastName });
		this.setState({ firstName: '', lastName: '' });
	};

	render() {
		return (
			<Form onSubmit={this.handleSubmit}>
				<FormGroup>
					<Label>First Name</Label>
					<Input
						required
						placeholder='First name'
						name='firstName'
						onChange={this.handleChange}
						value={this.state.firstName}
					/>
				</FormGroup>
				<FormGroup>
					<Label>Last Name</Label>
					<Input
						required
						placeholder='Last name'
						name='lastName'
						onChange={this.handleChange}
						value={this.state.lastName}
					/>
				</FormGroup>
				<FormGroup>
					<Button block outline type='submit' color='primary'>
						Create User
					</Button>
				</FormGroup>
			</Form>
		);
	}
}

export default NewUserForm;
