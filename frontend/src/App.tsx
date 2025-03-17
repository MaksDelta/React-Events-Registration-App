// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EventPage from "./pages/EventPage";
import EventList from "./components/EventList";

const App: React.FC = () => {
	return (
		<Router>
			<div className="App">
				<h1>Реєстрація на події</h1>
				<Routes>
					<Route path="/event" element={<EventPage />} />
					<Route path="/event-list" element={<EventList />} />
				</Routes>
			</div>
		</Router>
	);
};

export default App;
