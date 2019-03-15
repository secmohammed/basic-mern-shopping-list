import React, { Component } from "react";
import {
	Container,
	ListGroup,
	ListGroupItem,
	Button,
	Spinner
} from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getItems, deleteItem, addItem } from "../actions/itemActions";
import PropTypes from "prop-types";
class ShoppingList extends Component {
	componentDidMount() {
		this.props.getItems();
	}
	onAddingItem(name) {
		this.props.addItem(name);
	}
	onDeleteItem(id) {
		this.props.deleteItem(id);
	}
	render() {
		const { items } = this.props.store;

		if (this.props.store.loading) {
			return (
				<Container>
					<Spinner style={{ width: "3rem", height: "3rem" }} type="grow" />
				</Container>
			);
		} else {
			return (
				<Container>
					<ListGroup>
						<TransitionGroup className="shopping-list">
							{items.map(({ _id, name }) => (
								<CSSTransition key={_id} timeout={500} classNames="fade">
									<ListGroupItem>
										<Button
											className="remove-btn"
											color="danger"
											size="sm"
											onClick={this.onDeleteItem.bind(this, _id)}>
											&times;
										</Button>
										{name}
									</ListGroupItem>
								</CSSTransition>
							))}
						</TransitionGroup>
					</ListGroup>
				</Container>
			);
		}
	}
}
ShoppingList.propTypes = {
	getItems: PropTypes.func.isRequired,
	store: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
	store: state.item
});
export default connect(
	mapStateToProps,
	{ getItems, deleteItem, addItem }
)(ShoppingList);
