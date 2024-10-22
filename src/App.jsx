import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/navbar';
import Home from './pages/Home';    
import Animals from './pages/Animals';
import GiftShop from './pages/GiftShop';
import Events from './pages/Events';
import Login from './components/login';
import Signup from './components/signup';
import Tickets from "./pages/Tickets";
import './App.css';

function App() {
    return (
        <div>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/animals" element={<Animals />} />
                    <Route path="/giftshop" element={<GiftShop />} />
                    <Route path="/events" element={<Events />} />
                    <Route path="/signup" element={<Signup/>} />
                    <Route path="/tickets" element={<Tickets />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
