import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import GETRequestBlock from "./components/GETRequestBlock";
import POSTRequestBlock from "./components/POSTRequestBlock";

import "./sass/style.scss";

export default function App() {
	const [users, setUsers] = useState([]);
	const [page, setPage] = useState(1);

	return (
		<>
			<Header />
			<Hero />
			<GETRequestBlock users={users} page={page} setUsers={setUsers} setPage={setPage} />
			<POSTRequestBlock setUsers={setUsers} setPage={setPage} />
		</>
	);
}
