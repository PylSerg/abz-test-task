import React from "react";
import heroBackground from "../assets/background-image.jpg";

export default function Hero() {
	return (
		<div>
			<img src={heroBackground} alt="Background" />

			<h1>Test assignment for front-end developer</h1>

			<p>
				What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with
				accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.
			</p>

			<button className="button" type="button">
				Sing up
			</button>
		</div>
	);
}
