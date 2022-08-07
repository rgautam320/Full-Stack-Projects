import React from "react";

const Users = ({ users, room }) => {
	return (
		<div className="col-md-5 col-12">
			<h1 className="chat__title">Users in {room}</h1>
			<div className="users__users card py-5">
				{users?.map((val, ind) => {
					return (
						<>
							<li key={ind} className="text-start ps-4">
								<h3 className="d-inline">{val.name}</h3>
							</li>
						</>
					);
				})}
			</div>
		</div>
	);
};

export default Users;
