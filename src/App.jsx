import "bootstrap/dist/css/bootstrap.min.css"
import "./assets/styles/App.scss"
import GamePage from "./pages/GamePage"
import HomePage from "./pages/HomePage"
import { Routes, Route } from "react-router-dom"

function App() {
	return (
		<div id="App">
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/gamepage" element={<GamePage />} />
			</Routes>
		</div>
	);
}

export default App;