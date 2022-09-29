import React from "react";
import { goToForm } from "../js/anchor-crossing";

export default function Hero() {
	return (
		<div className="hero">
			<div className="hero__text">
				<h1 className="hero__title">Test assignment for front-end developer</h1>

				<p className="hero__subtitle">
					What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces
					with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.
				</p>
			</div>

			<button className="button hero__button" type="button" onClick={goToForm}>
				Sing up
			</button>
		</div>
	);
}
