import React from "react";
import photoCover from "../assets/photo-cover.svg";

export default function GETRequestBlock() {
	return (
		<div className="get-block">
			<h1>Working with GET request</h1>

			<ul className="get-block__users-list">
				<li className="get-block__user">
					<img className="get-block-user-avatar" src={photoCover} alt="User avatar" />
					<p className="get-block__user-name">User name is Jhon Spilberg and eschejhkjhkjhjk kto-to podobnyi</p>
					<p className="get-block__user-position">User position kjlfdjfk lgjljg kfldjglkfdjgk jdflgjlfdjgldfjg jf</p>
					<a href="mailto:fjkhgffj@ffgfg.fkjgfl" className="get-block__user-email" title="User email">
						User email dfh khhkjghfkjghkjfhgkjhfdgkjhfdkjhgfdkhgkjh
					</a>
					<a href="tel:+380682383696" className="get-block__user-phone">
						User phone number
					</a>
				</li>

				<li className="get-block__user">
					<img className="get-block-user-avatar" src={photoCover} alt="User avatar" />
					<p className="get-block__user-name">User name</p>
					<p className="get-block__user-position">User position</p>
					<a href="mailto:fjkhgffj@ffgfg.fkjgfl" className="get-block__user-email" title="User email">
						User email
					</a>
					<a href="tel:+380682383696" className="get-block__user-phone">
						User phone number
					</a>
				</li>
			</ul>
		</div>
	);
}
