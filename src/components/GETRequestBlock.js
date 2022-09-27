import { useState, useEffect } from "react";
import axios from "axios";
import photoCover from "../assets/photo-cover.svg";

export default function GETRequestBlock() {
	const [users, setUsers] = useState([]);
	console.log(users);

	useEffect(() => {
		getUsersList();
	}, []);

	async function getUsersList() {
		const response = await axios.get(`https://frontend-test-assignment-api.abz.agency/api/v1/users?page=3&count=6`);

		const newUsersList = [...users].sort((a, b) => b.registration_timestamp - a.registration_timestamp);

		response.data.users.map(user => newUsersList.push(user));

		setUsers(newUsersList);
	}

	return (
		<div className="get-block">
			<h1>Working with GET request</h1>

			<ul className="get-block__users-list">
				{users.map(user => (
					<li className="get-block__user" key={user.id}>
						<img className="get-block-user-avatar" src={user?.photo} alt={user?.name} />
						<p className="get-block__user-name">{user?.name}</p>
						<p className="get-block__user-position">{user?.position}</p>
						<a className="get-block__user-email" href={`mailto:${user?.email}`} title={user?.email}>
							{user?.email}
						</a>
						<a className="get-block__user-phone" href={`tel:${user?.phone}`}>
							{user?.phone}
						</a>
					</li>
				))}
			</ul>

			<button className="button get-block__button" type="button">
				Show more
			</button>
		</div>
	);
}
