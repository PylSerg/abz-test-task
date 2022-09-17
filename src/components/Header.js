import React from "react";
import logo from "../assets/Logo.svg";

export default function Heder() {
	return (
		<div className="header">
			<div className="header__rectangle"></div>

			<div className="header__main">
				<img className="header__logo" src={logo} alt="Logo" />

				<div className="header__buttons-block">
					<button className="button" type="button">
						Users
					</button>

					<button className="button" type="button">
						Sing up
					</button>
				</div>
			</div>
		</div>
	);
}
