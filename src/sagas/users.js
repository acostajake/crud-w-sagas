import {
	take,
	takeEvery,
	takeLatest,
	call,
	fork,
	put,
} from 'redux-saga/effects';
import * as actions from '../actions/users';
import * as api from '../api/users';

function* getUsers() {
	try {
		const result = yield call(api.getUsers);
		yield put(actions.getUsersSuccess({ items: result.data.data }));
	} catch (e) {
		yield put(
			actions.usersError({
				error: 'Could get users',
			})
		);
	}
}

function* watchGetUsersReq() {
	yield takeEvery(actions.Types.GET_USERS_REQUEST, getUsers);
}

function* createUser(action) {
	try {
		yield call(api.createUser, {
			firstName: action.payload.firstName,
			lastName: action.payload.lastName,
		});
		yield call(getUsers);
	} catch (e) {
		yield put(
			actions.usersError({
				error: 'Could not create a user',
			})
		);
	}
}

function* watchCreateUserRequest() {
	console.log('watch');
	yield takeLatest(actions.Types.CREATE_USER_REQUEST, createUser);
}

function* deleteUser({ userId }) {
	try {
		yield call(api.deleteUser, userId);
		yield call(getUsers);
	} catch (e) {
		yield put(
			actions.usersError({
				error: 'Could not delete user',
			})
		);
	}
}

function* watchDeleteUserRequest() {
	while (true) {
		const { payload } = yield take(actions.Types.DELETE_USER_REQUEST);
		yield call(deleteUser, { userId: payload.userId });
	}
}

const UsersSagas = [
	fork(watchGetUsersReq),
	fork(watchCreateUserRequest),
	fork(watchDeleteUserRequest),
];

export default UsersSagas;
