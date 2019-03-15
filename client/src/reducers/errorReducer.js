import { GET_ERRORS, CLEAR_ERRORS } from "../actions/types";

const initialState = {
	message: null,
	status: null,
	id: null
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_ERRORS:
			return {
				message: action.payload.message,
				status: action.payload.status,
				id: action.payload.id
			};
		case CLEAR_ERRORS:
			return {
				message: null,
				status: null,
				id: null
			};
		default:
			return state;
	}
}
