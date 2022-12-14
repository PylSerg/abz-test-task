import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./Loading";
import photoCover from "../assets/photo-cover.svg";

export default function GETRequestBlock({ users, page, setUsers, setPage }) {
	const [isLoading, setIsLoading] = useState(true);
	const [lastPage, setLastPage] = useState(false);

	useEffect(() => {
		getUsersList();
	}, [page]);

	useEffect(() => {
		if (users.length === 0) {
			setIsLoading(true);
			getUsersList();
		}
	}, [users]);

	// GET request
	async function getUsersList() {
		const newUsersList = [...users].sort((a, b) => b.registration_timestamp - a.registration_timestamp);

		const response = await axios.get(`https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${page}&count=6`);
		await response.data.users.map(user => newUsersList.push(user));

		await setUsers(newUsersList);

		setIsLoading(false);

		// Pre-request
		await axios.get(`https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${page + 1}&count=6`).catch(() => setLastPage(true));
	}

	// Go to next page
	function nextPage() {
		setPage(prevPage => prevPage + 1);

		setIsLoading(true);
	}

	// Button dynamic style
	function buttonStyle() {
		return lastPage ? "hidden-element" : "button get-block__button";
	}

	return (
		<section className="get-block" id="users">
			<h1>Working with GET request</h1>

			<ul className="get-block__users-list">
				{users.map(user => (
					<li className="get-block__user" key={user.id}>
						<img
							className="get-block-user-avatar"
							src={user?.photo !== "https://frontend-test-assignment-api.abz.agency/images/placeholders/placeholder.png" ? user?.photo : photoCover || photoCover}
							alt={user?.name}
							loading="lazy"
						/>
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

			{isLoading && <Loading />}

			<button className={buttonStyle()} type="button" onClick={nextPage}>
				Show more
			</button>
		</section>
	);
}
