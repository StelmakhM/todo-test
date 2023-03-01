import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectToDos } from "../redux/selectors/selectors";
import { toggleStatus } from "../redux/slices/toDoListSlice";
import Modal from "./Modal";

export default function ToDoList() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [toDoId, setToDoId] = useState("");
	const toDos = useSelector(selectToDos);
	const dispatch = useDispatch();

	const hideModal = (e) => {
		setIsModalOpen(false);
	};

	const onToDoClick = (e) => {
		if (e.target.tagName !== "TD") return;
		const { id } = e.target.closest("tr").dataset;
		setToDoId(id);
		setIsModalOpen(true);
	};

	return (
		<>
			<table onClick={onToDoClick}>
				<thead>
					<tr>
						<th>ID</th>
						<th>Title</th>
						<th>Description</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
					{toDos.map(({ id, title, description, status }) => (
						<tr key={id} data-id={id}>
							<td>{id}</td>
							<td>{title}</td>
							<td>{description}</td>
							<td>
								<input
									type="checkbox"
									checked={status}
									onChange={() => dispatch(toggleStatus(id))}
								/>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			{isModalOpen && <Modal hideModal={hideModal} toDoId={toDoId} />}
		</>
	);
}
