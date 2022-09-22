import { useState, createRef } from "react";
import { useForm } from "react-hook-form";
import { generate as genID } from "shortid";
import { numbersArray, symbolsArray, specialSymbolsArray } from "../js/validation-symbols";

export default function POSTRequestBlock() {
	const [validity, setValidity] = useState({ name: true, email: true, phone: true });
	const { register, handleSubmit, watch, reset } = useForm();

	const nameError = createRef();
	const emailError = createRef();
	const phoneError = createRef();

	// Styles
	function inputStyle(el) {
		return validity[el] ? "user-form__field" : "user-form__field user-form__field-error";
	}

	function titleStyle(el) {
		return validity[el] ? "user-form__title" : "user-form__title user-form__title-error";
	}

	function errorStyle(el) {
		return validity[el] ? "user-form__error user-form__error--hidden" : "user-form__error";
	}

	// Name validation
	function nameValidation() {
		const arrayExceptionForName = numbersArray + symbolsArray + specialSymbolsArray;

		if (!watch("name")) {
			nameError.current.textContent = `Field can't be empty!`;
			setValidity({ ...validity, name: false });

			return false;
		}

		for (let i = 0; i <= arrayExceptionForName.length; i++) {
			if (watch("name").includes(arrayExceptionForName[i])) {
				nameError.current.textContent = `Name can contain only letters or "-"`;

				setValidity({ ...validity, name: false });

				return false;
			}
		}

		setValidity({ ...validity, name: true });

		return true;
	}

	// Submit function
	function onSubmit(data) {
		if (!nameValidation()) return console.log(`\x1b[31m Request failed: Name is invalid!`);

		const res = { id: genID(), ...data, registration_timestamp: Date.now() };

		console.log(res);

		reset();

		return console.log(`\x1b[32m Request status: OK`);
	}

	// Render
	return (
		<div className="post-block">
			<h1>Working with POST request</h1>

			<form className="user-form" onSubmit={handleSubmit(onSubmit)}>
				<label className="user-form__label">
					<input className={inputStyle("name")} placeholder=" " {...register("name")} onBlur={nameValidation} />
					<span className={titleStyle("name")}>Your name</span>
					<span className={errorStyle("name")} ref={nameError} />
				</label>

				<label className="user-form__label">
					<input className={inputStyle("email")} placeholder=" " {...register("email")} />
					<span className={titleStyle("email")}>Email</span>
					<span className={errorStyle("email")} ref={emailError} />
				</label>

				<label className="user-form__label">
					<input className={inputStyle("phone")} placeholder="+38" {...register("phone")} />
					<span className={titleStyle("phone")}>Phone</span>
					<span className={errorStyle("phone")} ref={phoneError} />
				</label>

				<input className="button" type="submit" value="Sing up" />
			</form>
		</div>
	);
}
