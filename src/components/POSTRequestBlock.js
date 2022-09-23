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
	function nameValidator() {
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

	// Email validation
	function emailValidator() {
		const emailParts = watch("email").split("@");

		if (!watch("email")) {
			emailError.current.textContent = `Field can't be empty!`;
			setValidity({ ...validity, email: false });

			return false;
		}

		if (!watch("email").includes("@")) {
			emailError.current.textContent = `Email must contain "@"`;
			setValidity({ ...validity, email: false });

			return false;
		}

		if (!emailParts[0] || !emailParts[1]) {
			emailError.current.textContent = `Invalid email format!`;
			setValidity({ ...validity, email: false });

			return false;
		}

		if (!emailParts[1].includes(".")) {
			emailError.current.textContent = `Invalid domain format!`;
			setValidity({ ...validity, email: false });

			return false;
		}

		for (let i = 0; i <= specialSymbolsArray.length; i++) {
			if (emailParts[0].includes(specialSymbolsArray[i])) {
				emailError.current.textContent = `Email can't contain special symbols!`;

				setValidity({ ...validity, email: false });

				return false;
			}
		}

		setValidity({ ...validity, email: true });

		return true;
	}

	// Phone validation
	function phoneValidator() {
		const phoneFormat = watch("phone").split(" ").join("");
		let phoneValid = phoneFormat > 0;

		if (!watch("phone")) {
			phoneError.current.textContent = `Field can't be empty!`;
			setValidity({ ...validity, phone: false });

			return false;
		}

		if (!watch("phone").includes("+")) {
			phoneError.current.textContent = `Phone format must be +380XXXXXXXXX`;
			setValidity({ ...validity, phone: false });

			return false;
		}

		if (!phoneValid) {
			phoneError.current.textContent = `Phone number can contain only numbers and "+"`;
			setValidity({ ...validity, phone: false });

			return false;
		}

		if (phoneFormat.length !== 13) {
			phoneError.current.textContent = `Invalid phone number!`;
			setValidity({ ...validity, phone: false });

			return false;
		}

		setValidity({ ...validity, phone: true });

		return true;
	}

	// Submit function
	function onSubmit(data) {
		const phoneFormat = data.phone.split(" ").join("");

		const req = {
			id: genID(),
			...data,
			phone: phoneFormat,
			registration_timestamp: Date.now(),
		};

		console.log(req);

		reset();

		return console.log(`\x1b[32m Request status: OK`);
	}

	// Render
	return (
		<div className="post-block">
			<h1>Working with POST request</h1>

			<form className="user-form" onSubmit={handleSubmit(onSubmit)}>
				<label className="user-form__label">
					<input className={inputStyle("name")} placeholder=" " {...register("name")} onBlur={nameValidator} />
					<span className={titleStyle("name")}>Your name</span>
					<span className={errorStyle("name")} ref={nameError} />
				</label>

				<label className="user-form__label">
					<input className={inputStyle("email")} placeholder=" " {...register("email")} onBlur={emailValidator} />
					<span className={titleStyle("email")}>Email</span>
					<span className={errorStyle("email")} ref={emailError} />
				</label>

				<label className="user-form__label">
					<input className={inputStyle("phone")} placeholder="+38" {...register("phone")} onBlur={phoneValidator} />
					<span className={titleStyle("phone")}>Phone</span>
					<span className={errorStyle("phone")} ref={phoneError} />
				</label>

				<input className="button" type="submit" value="Sing up" />
			</form>
		</div>
	);
}
