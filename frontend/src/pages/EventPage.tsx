// src/pages/EventPage.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import EventRegistration from "../components/EventRegistration";

interface Event {
	id: number;
	title: string;
	description: string;
	event_date: string;
	organizer: string;
}

const EventPage: React.FC = () => {
	const { eventId } = useParams<{ eventId: string }>();
	const [event, setEvent] = useState<Event | null>(null);
	const [error, setError] = useState<string>("");

	useEffect(() => {
		const fetchEvent = async () => {
			try {
				const response = await axios.get(
					`${process.env.REACT_APP_API_URL}/events/${eventId}`
				);
				setEvent(response.data);
			} catch (err) {
				setError("Не вдалося завантажити інформацію про подію");
			}
		};

		fetchEvent();
	}, [eventId]);

	if (error) return <p>{error}</p>;

	return (
		<div>
			{event ? (
				<>
					<h2>{event.title}</h2>
					<p>{event.description}</p>
					<p>
						<strong>Дата:</strong>{" "}
						{new Date(event.event_date).toLocaleDateString()}
					</p>
					<p>
						<strong>Організатор:</strong> {event.organizer}
					</p>

					<EventRegistration eventId={event.id} />
				</>
			) : (
				<p>Завантаження...</p>
			)}
		</div>
	);
};

export default EventPage;
