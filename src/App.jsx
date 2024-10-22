import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/navbar';
import Home from './pages/Home';    
import Animals from './pages/Animals';
import GiftShop from './pages/GiftShop';
import Events from './pages/Events';
import Login from './components/login';
import Signup from './components/signup';
<<<<<<< HEAD
import Tickets from "./pages/tickets";
=======
import Payment from "./components/payment";
import Tickets from "./pages/Tickets";
>>>>>>> 1da44945735aa9d3d1e5701126f7ff1f77887b9b
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
                    <Route path="/payment" element={<Payment />} /> 
                </Routes>
            </Router>
        </div>
    );
}

export default App;
