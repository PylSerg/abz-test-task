import React from "react";
import photoCover from "../assets/photo-cover.svg";

export default function GETRequestBlock() {
	return (
		<div className="get-block">
			<h1>Working with GET request</h1>

			<ul className="get-block__users">
				<li className="get-block__user">
					<img src={photoCover} alt="User avatar" />
					<p>User name</p>
					<p>User position</p>
					<p>User email</p>
					<p>User phone number</p>
				</li>
			</ul>
		</div>
	);
}
