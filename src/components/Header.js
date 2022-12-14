import React from "react";
import logo from "../assets/Logo.svg";
import { goToUsers, goToForm } from "../js/anchor-crossing";

export default function Heder() {
	return (
		<div className="header">
			<div className="header__rectangle"></div>

			<div className="header__block">
				<div className="header__navigation">
					<img className="header__logo" src={logo} alt="Logo" />

					<div className="header__buttons-block">
						<button className="button header__button" type="button" onClick={goToUsers}>
							Users
						</button>

						<button className="button header__button" type="button" onClick={goToForm}>
							Sing up
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
