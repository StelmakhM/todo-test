import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
	key: "toDos",
	version: 1,
	storage,
};

const initialState = {
	items: [],
};

const toDoSlice = createSlice({
	name: "toDos",
	initialState,
	reducers: {
		addTodo: (state, { payload }) => {
			state.items.push(payload);
		},
		toggleStatus: (state, { payload }) => {
			state.items.forEach((item) => {
				if (item.id === payload) {
					item.status = !item.status;
				}
			});
		},
	},
});

const toDoReducer = toDoSlice.reducer;
export const { addTodo, toggleStatus } = toDoSlice.actions;
export const persistedToDoReducer = persistReducer(persistConfig, toDoReducer);
