import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectToDos } from "../redux/selectors/selectors";
import { addTodo } from "../redux/slices/toDoListSlice";
import TextInput from "./TextInput";

export default function Form() {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const dispatch = useDispatch();
	const toDos = useSelector(selectToDos);
	const btnEl = useRef(null);

	const resetForm = () => {
		setTitle("");
		setDescription("");
	};

	const onFormSubmit = (e) => {
		e.preventDefault();

		const formElement = e.target;
		const isValid = formElement.checkValidity();
		formElement.classList.add("submitted");
		const firstInvalidField = formElement.querySelector(":invalid");
		firstInvalidField?.focus();
		if (!isValid) {
			return;
		}

		const toDo = {
			title,
			description,
			status: false,
			id: toDos.length + 1,
		};
		dispatch(addTodo(toDo));
		formElement.classList.remove("submitted");
		btnEl.current.focus();
		resetForm();
	};

	return (
		<form onSubmit={onFormSubmit} noValidate>
			<TextInput
				name="title"
				id="title"
				onChange={(e) => {
					setTitle(e.target.value);
					e.target.setCustomValidity("");
				}}
				value={title}
			/>
			<TextInput
				name="description"
				id="description"
				onChange={(e) => {
					setDescription(e.target.value);
					e.target.setCustomValidity("");
				}}
				value={description}
			/>
			<button type="submit" ref={btnEl}>
				Create
			</button>
		</form>
	);
}
