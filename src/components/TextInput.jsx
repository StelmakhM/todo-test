import { useState } from "react";

export default function TextInput({ name, onChange, value, id }) {
	const [validationMessage, setValidationMessage] = useState("");

	const onInvalid = (e) => {
		e.target.setCustomValidity("This field is empty");
		setValidationMessage(e.target.validationMessage);
	};

	const onBlur = (e) => {
		if (validationMessage) {
			setValidationMessage(e.target.validationMessage);
		}
	};

	return (
		<>
			<label htmlFor={id}>{name}</label>
			<input
				type="text"
				name={name}
				id={id}
				value={value}
				onChange={onChange}
				onInvalid={onInvalid}
				onBlur={onBlur}
				required
			/>
			{validationMessage && (
				<p className="validationMessage">{validationMessage}</p>
			)}
		</>
	);
}
