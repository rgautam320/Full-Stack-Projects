import React, { useState } from "react";
import { useHistory } from "react-router";

const Form = () => {
	const [name, setName] = useState("");
	const [room, setRoom] = useState("");

	const history = useHistory();

	const onSubmit = (e) => {
		e.preventDefault();
		if (name && room) {
			history.push(`/chat?name=${name}&room=${room}`);
		}
	};
	return (
		<>
			<h1 className="text-center form__title">Join Any Room</h1>
			<div className="d-flex align-items-center justify-content-center">
				<div className="card p-3 form__card">
					<form onSubmit={onSubmit}>
						<div className="form-group">
							<input type="text" placeholder="Name" className="w-100 my-3 p-2 form__input" value={name} onChange={(e) => setName(e.target.value)} />
							<input type="text" placeholder="Room" className="w-100 my-3 p-2 form__input" value={room} onChange={(e) => setRoom(e.target.value)} />
							<button type="submit" className="form__btn">
								SUBMIT
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default Form;
