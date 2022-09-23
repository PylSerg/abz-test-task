import { useState, createRef } from "react";
import { useForm } from "react-hook-form";
import { generate as genID } from "shortid";
import { numbersArray, symbolsArray, specialSymbolsArray } from "../js/validation-symbols";

export default function POSTRequestBlock() {
	const [validity, setValidity] = useState({ name: true, email: true, phone: true });
	const [fieldReadyToSend, setFieldReadyToSend] = useState({ name: false, email: false, phone: false });
	const { register, handleSubmit, watch, reset } = useForm();

	const nameError = createRef();
	const emailError = createRef();
	const phoneError = createRef();

	const send = fieldReadyToSend.name && fieldReadyToSend.email && fieldReadyToSend.phone;

	// Dynamic styles
	function inputStyle(el) {
		return validity[el] ? "user-form__field" : "user-form__field user-form__field-error";
	}

	function titleStyle(el) {
		return validity[el] ? "user-form__title" : "user-form__title user-form__title-error";
	}

	function errorStyle(el) {
		return validity[el] ? "user-form__error user-form__error--hidden" : "user-form__error";
	}

	function buttonStyle() {
		return send ? "button" : "button button--disabled";
	}

	function disabledButton() {
		if (send) return false;

		return true;
	}

	// Name validation
	function nameValidator() {
		const arrayExceptionForName = numbersArray + symbolsArray + specialSymbolsArray;

		if (!watch("name")) {
			nameError.current.textContent = `Field can't be empty!`;
			makeNameInvalid();

			return false;
		}

		for (let i = 0; i <= arrayExceptionForName.length; i++) {
			if (watch("name").includes(arrayExceptionForName[i])) {
				nameError.current.textContent = `Name can contain only letters or "-"`;

				makeNameInvalid();

				return false;
			}
		}

		function makeNameInvalid() {
			setValidity({ ...validity, name: false });
			setFieldReadyToSend({ ...fieldReadyToSend, name: false });
		}

		setValidity({ ...validity, name: true });
		setFieldReadyToSend({ ...fieldReadyToSend, name: true });

		return true;
	}

	// Email validation
	function emailValidator() {
		const emailParts = watch("email").split("@");

		if (!watch("email")) {
			emailError.current.textContent = `Field can't be empty!`;

			makeEmailInvalid();

			return false;
		}

		if (!watch("email").includes("@")) {
			emailError.current.textContent = `Email must contain "@"`;

			makeEmailInvalid();

			return false;
		}

		if (!emailParts[0] || !emailParts[1]) {
			emailError.current.textContent = `Invalid email format!`;

			makeEmailInvalid();

			return false;
		}

		if (!emailParts[1].includes(".")) {
			emailError.current.textContent = `Invalid domain format!`;

			makeEmailInvalid();

			return false;
		}

		for (let i = 0; i <= specialSymbolsArray.length; i++) {
			if (emailParts[0].includes(specialSymbolsArray[i])) {
				emailError.current.textContent = `Email can't contain special symbols!`;

				makeEmailInvalid();

				return false;
			}
		}

		function makeEmailInvalid() {
			setValidity({ ...validity, email: false });
			setFieldReadyToSend({ ...fieldReadyToSend, email: false });
		}

		setValidity({ ...validity, email: true });
		setFieldReadyToSend({ ...fieldReadyToSend, email: true });

		return true;
	}

	// Phone validation
	function phoneValidator() {
		const phoneFormat = watch("phone").split(" ").join("");
		let phoneValid = phoneFormat > 0;

		if (!watch("phone")) {
			phoneError.current.textContent = `Field can't be empty!`;

			makePhoneInvalid();

			return false;
		}

		if (!watch("phone").includes("+")) {
			phoneError.current.textContent = `Phone format must be +380XXXXXXXXX`;

			makePhoneInvalid();

			return false;
		}

		if (!phoneValid) {
			phoneError.current.textContent = `Phone number can contain only numbers and "+"`;

			makePhoneInvalid();

			return false;
		}

		if (phoneFormat.length !== 13) {
			phoneError.current.textContent = `Invalid phone number!`;

			makePhoneInvalid();

			return false;
		}

		function makePhoneInvalid() {
			setValidity({ ...validity, phone: false });
			setFieldReadyToSend({ ...fieldReadyToSend, phone: false });
		}

		setValidity({ ...validity, phone: true });
		setFieldReadyToSend({ ...fieldReadyToSend, phone: true });

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
					<input className={inputStyle("name")} autoComplete="none" placeholder=" " {...register("name")} onBlur={nameValidator} />
					<span className={titleStyle("name")}>Your name</span>
					<span className={errorStyle("name")} ref={nameError} />
				</label>

				<label className="user-form__label">
					<input className={inputStyle("email")} autoComplete="none" placeholder=" " {...register("email")} onBlur={emailValidator} />
					<span className={titleStyle("email")}>Email</span>
					<span className={errorStyle("email")} ref={emailError} />
				</label>

				<label className="user-form__label">
					<input className={inputStyle("phone")} autoComplete="none" placeholder="+38" {...register("phone")} onBlur={phoneValidator} />
					<span className={titleStyle("phone")}>Phone</span>
					<span className={errorStyle("phone")} ref={phoneError} />
				</label>

				<input className={buttonStyle()} type="submit" value="Sing up" disabled={disabledButton()} />
			</form>
		</div>
	);
}
