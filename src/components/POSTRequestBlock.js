import { useState, useEffect, createRef } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { numbersArray, symbolsArray, specialSymbolsArray } from "../js/validation-symbols";
import successImage from "../assets/success-image.svg";

export default function POSTRequestBlock({ setUsers, setPage }) {
	const [newUser, setNewUser] = useState(true);
	const [validity, setValidity] = useState({ name: true, email: true, phone: true, photo: true });
	const [possibilityOfSending, setPossibilityOfSending] = useState({ name: false, email: false, phone: false, photo: false });
	const [positionsList, setPositionsList] = useState([]);
	const [photoName, setPhotoName] = useState("Upload your photo");

	const { register, handleSubmit, watch } = useForm();

	const nameError = createRef();
	const emailError = createRef();
	const phoneError = createRef();
	const photoError = createRef();

	const send = possibilityOfSending.name && possibilityOfSending.email && possibilityOfSending.phone && possibilityOfSending.photo;

	useEffect(() => {
		getPosition();
	}, []);

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

	function sendButtonStyle() {
		return send ? "button user-form__button" : "button user-form__button button--disabled";
	}

	function disabledSendButton() {
		if (send) return false;

		return true;
	}

	function uploadPhotoButtonStyle() {
		return validity.photo ? "user-form__upload-button" : "user-form__upload-button user-form__upload-button--error";
	}

	function uploadFieldStyle() {
		if (validity.photo) {
			if (watch("photo")?.[0]?.name) {
				return "user-form__field user-form__photo-name";
			}

			return "user-form__field user-form__photo-name user-form__photo-name--empty";
		}

		return "user-form__field user-form__field-error user-form__photo-name";
	}

	// Request for get positions
	async function getPosition() {
		const getPositions = await axios.get("https://frontend-test-assignment-api.abz.agency/api/v1/positions");
		setPositionsList(getPositions.data.positions);
	}

	// Make first position checked
	function checkPosition(id) {
		if (watch("position_id") === undefined) return id === positionsList[0].id ? true : null;

		return id === Number(watch("position_id")) ? true : null;
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
			setPossibilityOfSending({ ...possibilityOfSending, name: false });
		}

		setValidity({ ...validity, name: true });
		setPossibilityOfSending({ ...possibilityOfSending, name: true });

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
			setPossibilityOfSending({ ...possibilityOfSending, email: false });
		}

		setValidity({ ...validity, email: true });
		setPossibilityOfSending({ ...possibilityOfSending, email: true });

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
			setPossibilityOfSending({ ...possibilityOfSending, phone: false });
		}

		setValidity({ ...validity, phone: true });
		setPossibilityOfSending({ ...possibilityOfSending, phone: true });

		return true;
	}

	// Photo validation
	function photoValidator() {
		if (watch("photo")?.[0]?.type !== "image/jpeg" && watch("photo")?.[0]?.type !== undefined) {
			photoError.current.textContent = `Photo format must be only JPEG`;

			setValidity({ ...validity, photo: false });
			setPossibilityOfSending({ ...possibilityOfSending, photo: false });

			return false;
		}

		setValidity({ ...validity, photo: true });
		setPossibilityOfSending({ ...possibilityOfSending, photo: true });

		return true;
	}

	// Changes photo name
	function changePhotoName() {
		setPhotoName(watch("photo")[0]?.name);

		if (watch("photo")?.[0]?.name === undefined) setPhotoName("Upload your photo");
	}

	// Photo field controller
	function photoFieldController() {
		changePhotoName();
		photoValidator();
	}

	// Get token
	async function getToken() {
		const newToken = await axios.get("https://frontend-test-assignment-api.abz.agency/api/v1/token").then(resp => resp.data.token);

		return newToken;
	}

	// Submit function
	function onSubmit(data) {
		const formData = new FormData();
		const fileField = document.querySelector('input[type="file"]');

		formData.append("position_id", data.position_id);
		formData.append("name", data.name);
		formData.append("email", data.email);
		formData.append("phone", data.phone);
		formData.append("photo", fileField.files[0]);

		postRequest();

		async function postRequest() {
			const TOKEN = await getToken();

			await fetch("https://frontend-test-assignment-api.abz.agency/api/v1/users", {
				method: "POST",
				body: formData,
				headers: {
					Token: TOKEN,
				},
			})
				.then(function (response) {
					return response.json();
				})
				.then(function (data) {
					console.log(data);
					if (data.success) {
						setNewUser(false);
						setUsers([]);
						setPage(1);
					} else {
						// proccess server errors
					}
				})
				.catch(function (error) {
					// proccess network errors
				});
		}
	}

	return (
		<div className="post-block">
			<h1>Working with POST request</h1>

			{newUser && (
				<form className="user-form" encType="multipart/form-data" action="/upload/image" onSubmit={handleSubmit(onSubmit)}>
					{/*
					Contact block
				*/}
					<div>
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
					</div>

					{/*
					Position block
				*/}
					<div className="user-form__position-block">
						<p>Select your position</p>

						<ul className="user-form__radio-block">
							{positionsList.map(position => (
								<li className="user-form__radio-position" key={position.id}>
									<input type="radio" id={position.id} value={position.id} {...register("position_id")} checked={checkPosition(position.id)} />
									<label htmlFor={position.id} className="user-form__radio-label">
										{position.name}
									</label>
								</li>
							))}
						</ul>
					</div>

					{/*
					Upload image
				*/}
					<div className="user-form__photo-block">
						<input className="user-form__upload-photo" type="file" id="userPhoto" placeholder="Upload your photo" {...register("photo")} onBlur={photoFieldController} />

						<label className={uploadPhotoButtonStyle()} htmlFor="userPhoto">
							Upload
						</label>

						<div className={uploadFieldStyle()}>{photoName}</div>

						<span className={errorStyle("photo")} ref={photoError} />
					</div>

					{/*
					Submit form
				*/}
					<input className={sendButtonStyle()} type="submit" value="Sing up" disabled={disabledSendButton()} />
				</form>
			)}

			{!newUser && (
				<div className="user-registered">
					<h1>User successfully registered</h1>
					<img className="user-registered__image" src={successImage} alt="Successfully registered" />
				</div>
			)}
		</div>
	);
}
