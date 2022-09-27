import { useState, useEffect } from "react";
import axios from "axios";
import photoCover from "../assets/photo-cover.svg";

export default function GETRequestBlock() {
	const [users, setUsers] = useState([]);
	const [page, setPage] = useState(16);
	const [lastPage, setLastPage] = useState(false);

	useEffect(() => {
		getUsersList();
	}, [page]);

	// GET request
	async function getUsersList() {
		const newUsersList = [...users].sort((a, b) => b.registration_timestamp - a.registration_timestamp);

		const response = await axios.get(`https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${page}&count=6`);
		await response.data.users.map(user => newUsersList.push(user));

		setUsers(newUsersList);

		// Pre-request
		await axios.get(`https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${page + 1}&count=6`).catch(setLastPage(true));
	}

	// Go to next page
	function nextPage() {
		setPage(prevPage => prevPage + 1);
	}

	return (
		<div className="get-block">
			<h1>Working with GET request</h1>

			<ul className="get-block__users-list">
				{users.map(user => (
					<li className="get-block__user" key={user.id}>
						<img className="get-block-user-avatar" src={user?.photo || photoCover} alt={user?.name} />
						<p className="get-block__user-name">{user?.name || "No name"}</p>
						<p className="get-block__user-position">{user?.position || "No position"}</p>
						<a className="get-block__user-email" href={`mailto:${user?.email}`} title={user?.email}>
							{user?.email || "No email"}
						</a>
						<a className="get-block__user-phone" href={`tel:${user?.phone}`}>
							{user?.phone || "No phone"}
						</a>
					</li>
				))}
			</ul>

			<button className="button get-block__button" type="button" onClick={nextPage}>
				Show more
			</button>
		</div>
	);
}
