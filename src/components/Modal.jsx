import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectToDos } from "../redux/selectors/selectors";
import { toggleStatus } from "../redux/slices/toDoListSlice";

export default function Modal({ hideModal, toDoId }) {
	const dispatch = useDispatch();
	const toDos = useSelector(selectToDos);

	const onBackdropClick = (e) => {
		if (e.currentTarget !== e.target) {
			return;
		}
		hideModal();
	};

	useEffect(() => {
		const closeModal = (e) => {
			if (e.code === "Escape") {
				hideModal();
			}
		};

		window.addEventListener("keydown", closeModal);
		return () => {
			window.removeEventListener("keydown", closeModal);
		};
	}, [hideModal]);

	const [toDo] = toDos.filter((item) => Number(item.id) === Number(toDoId));
	const { title, description, status, id } = toDo;
	return (
		<div className="backdrop" onClick={onBackdropClick}>
			<div className="modal">
				<p>
					<strong>Title:</strong> {title}
				</p>
				<p>
					<strong>Description:</strong> {description}
				</p>
				<label>
					<strong>Status :</strong>
					<input
						type="checkbox"
						checked={status}
						onChange={() => dispatch(toggleStatus(id))}
					/>
				</label>
				<button type="button" onClick={hideModal}>
					Close
				</button>
			</div>
		</div>
	);
}
