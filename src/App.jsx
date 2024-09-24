import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/navbar';
import Home from './pages/Home';    
import Animals from './pages/Animals';
import GiftShop from './pages/GiftShop';
import Attractions from './pages/Attractions';
import Login from './components/login';
import Signup from './components/signup';
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
                    <Route path="/attractions" element={<Attractions />} />
                    <Route path="/signup" element={<Signup/>} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
