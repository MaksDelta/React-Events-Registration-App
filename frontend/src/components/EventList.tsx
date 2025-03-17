import React, { useEffect, useState } from "react";
import axios from "axios";

interface Event {
	id: number;
	title: string;
	description: string;
	event_date: string;
	organizer: string;
}

const EventList: React.FC = () => {
	const [events, setEvents] = useState<Event[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string>("");

	useEffect(() => {
		const fetchEvents = async () => {
			try {
				const response = await axios.get(
					`${process.env.REACT_APP_API_URL}/events`
				);
				setEvents(response.data);
			} catch (err) {
				setError("Не вдалося завантажити події");
			} finally {
				setLoading(false);
			}
		};

		fetchEvents();
	}, []);

	if (loading) return <p>Завантаження...</p>;
	if (error) return <p>{error}</p>;

	return (
		<div>
			<h2>Список подій</h2>
			<ul>
				{events.map((event) => (
					<li key={event.id}>
						<h3>{event.title}</h3>
						<p>{event.description}</p>
						<p>
							<strong>Дата:</strong>{" "}
							{new Date(event.event_date).toLocaleDateString()}
						</p>
						<p>
							<strong>Організатор:</strong> {event.organizer}
						</p>
					</li>
				))}
			</ul>
		</div>
	);
};

export default EventList;
