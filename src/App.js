import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import GETRequestBlock from "./components/GETRequestBlock";
import POSTRequestBlock from "./components/POSTRequestBlock";

import "./sass/style.scss";

function App() {
	return (
		<>
			<Header />
			<Hero />
			<GETRequestBlock />
			<POSTRequestBlock />
		</>
	);
}

export default App;
