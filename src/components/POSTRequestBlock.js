import React from "react";
import { useForm } from "react-hook-form";

export default function POSTRequestBlock() {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	return (
		<div className="post-block">
			<h1>Working with POST request</h1>

			<form className="user-form">
				<label className="user-form__label">
					<input className="user-form__field" type="text" placeholder=" " {...register} required />
					<span className="user-form__title">Your name</span>
				</label>

				<label className="user-form__label">
					<input className="user-form__field" type="email" placeholder=" " required />
					<span className="user-form__title">Email</span>
				</label>

				<label className="user-form__label">
					<input className="user-form__field" type="tel" pattern="[+][3][8][0-9]{10}" placeholder="+38" required />
					<span className="user-form__title">Phone</span>
				</label>

				<input type="submit" value="Sing up" />
			</form>
		</div>
	);
}
