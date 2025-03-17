import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface RegistrationForm {
	fullName: string;
	email: string;
	dob: string;
	howDidYouHear: string;
}

interface Props {
	eventId: number; // Ідентифікатор події
}

const EventRegistration: React.FC<Props> = ({ eventId }) => {
	const [form, setForm] = useState<RegistrationForm>({
		fullName: "",
		email: "",
		dob: "",
		howDidYouHear: "",
	});
	const [error, setError] = useState<string>("");
	const [successMessage, setSuccessMessage] = useState<string>("");

	const navigate = useNavigate(); // Ініціалізуємо useNavigate

	// Обробка зміни значень полів форми
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setForm({ ...form, [name]: value });
	};

	// Обробка відправки форми
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setSuccessMessage("");

		try {
			await axios.post(
				`${process.env.REACT_APP_API_URL}/events/${eventId}/register`,
				form
			);
			setSuccessMessage("Ви успішно зареєстровані на подію!");

			setTimeout(() => {
				navigate(`/events/${eventId}`); // Перехід на сторінку події після реєстрації
			}, 2000);
		} catch (err) {
			setError("Не вдалося зареєструватися. Спробуйте ще раз.");
		}
	};

	return (
		<div>
			<h2>Реєстрація на подію</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label>Повне ім'я:</label>
					<input
						type="text"
						name="fullName"
						value={form.fullName}
						onChange={handleChange}
						required
					/>
				</div>

				<div>
					<label>Email:</label>
					<input
						type="email"
						name="email"
						value={form.email}
						onChange={handleChange}
						required
					/>
				</div>

				<div>
					<label>Дата народження:</label>
					<input
						type="date"
						name="dob"
						value={form.dob}
						onChange={handleChange}
						required
					/>
				</div>

				<div>
					<label>Як ви дізналися про цю подію?</label>
					<input
						type="text"
						name="howDidYouHear"
						value={form.howDidYouHear}
						onChange={handleChange}
						required
					/>
				</div>

				<button type="submit">Зареєструватися</button>
			</form>

			{error && <p style={{ color: "red" }}>{error}</p>}
			{successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
		</div>
	);
};

export default EventRegistration;
