import React, { Component } from "react";
import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	Form,
	FormGroup,
	Label,
	Input,
	NavLink,
	Alert
} from "reactstrap";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { register } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";

class RegisterModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: false,
			email: "",
			name: "",
			password: "",
			message: null
		};
		this.toggle = this.toggle.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	componentDidUpdate(prevProps) {
		const { error, isAuthenticated } = this.props;
		if (error !== prevProps.error) {
			// Check for register error
			if (error.id === "REGISTER_FAIL") {
				this.setState({ message: error.message });
			} else {
				this.setState({ message: null });
			}
		}

		// If authenticated, close modal
		if (this.state.modal && isAuthenticated) {
			this.toggle();
		}
	}

	toggle() {
		// Clear errors
		this.props.clearErrors();
		this.setState({
			modal: !this.state.modal
		});
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onSubmit(e) {
		e.preventDefault();

		const { email, password, name } = this.state;

		const user = {
			email,
			password,
			name
		};

		this.props.register(user);
	}

	render() {
		return (
			<div>
				<NavLink onClick={this.toggle} href="#">
					Register
				</NavLink>

				<Modal isOpen={this.state.modal} toggle={this.toggle}>
					<ModalHeader toggle={this.toggle}>Register</ModalHeader>
					<ModalBody>
						{this.state.message ? (
							<Alert color="danger">{this.state.message}</Alert>
						) : null}
						<Form onSubmit={this.onSubmit}>
							<FormGroup>
								<Label for="name">Name</Label>
								<Input
									type="text"
									name="name"
									id="name"
									placeholder="Your name"
									className="mb-3"
									onChange={this.onChange}
								/>

								<Label for="email">Email</Label>
								<Input
									type="email"
									name="email"
									id="email"
									placeholder="Email"
									className="mb-3"
									onChange={this.onChange}
								/>

								<Label for="password">Password</Label>
								<Input
									type="password"
									name="password"
									id="password"
									placeholder="Password"
									className="mb-3"
									onChange={this.onChange}
								/>
								<Button color="dark" style={{ marginTop: "2rem" }} block>
									Register Now
								</Button>
							</FormGroup>
						</Form>
					</ModalBody>
				</Modal>
			</div>
		);
	}
}

RegisterModal.propTypes = {
	isAuthenticated: PropTypes.bool,
	error: PropTypes.object.isRequired,
	register: PropTypes.func.isRequired,
	clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated,
	error: state.error
});

export default connect(
	mapStateToProps,
	{ register, clearErrors }
)(RegisterModal);
