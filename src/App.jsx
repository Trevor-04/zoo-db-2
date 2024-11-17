import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from './components/navbar';
import Home from './pages/Home';    
import Animals from './pages/Animals';
import AnimalPage from './components/AnimalPage';
import GiftShop from './pages/GiftShop';
import Events from './pages/Events';
import Login from './components/login';
import AdminLogin from './components/AdminLogin';
import Signup from './components/signup';
import Payment from "./components/payment";
import Tickets from "./pages/Tickets";
//import Donate from "./pages/Donate"
//import DonatePage from "./pages/donatePage";
import ProductPage from './components/ProductPage';
import Admin from './pages/AdminPage';
import Member from './pages/MemberPage';
import SettingsPage from "./components/SettingsPage";

import TotalReport from "./components/totalReport"; 
import EmployeeTable from "./components/employeeTable";
import AnimalTable from "./components/animalTables";
import FeedingReport from './components/feedingReport';

import './App.css';

function App() {
    return (
        <div>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/AdminLogin" element={<AdminLogin />} />
                    <Route path="/animals" element={<Animals />} />
                    <Route path="/animal/:name" element={<AnimalPage />} />
                    <Route path="/member/:memberId/animals" element={<Animals />} />
                    <Route path="/giftshop" element={<GiftShop />} />
                    <Route path="/product/:name" element={<ProductPage />} />
                    <Route path="/events" element={<Events />} />
                    <Route path="/member/:memberId/events" element={<Events />} /> 
                    <Route path="/Admin/:employeeId/events" element={<Events />} /> 
                    <Route path="/signup" element={<Signup/>} />
                    <Route path="/tickets" element={<Tickets />} />
                    <Route path="member/:memberId/tickets" element={<Tickets />} />
                    <Route path="/payment" element={<Payment />} /> 
                    <Route path="/member/:memberId/payment" element={<Payment />} />
                   {/* <Route path="/Donate" element={<Donate />} /> */}
                   {/* <Route path="/DonatePage" element={<DonatePage/>} />  */}
                   <Route path="/donatePage" element={<Navigate to="/donatePage.html" />} />
                   <Route path ="/Admin" element={<Admin />} />
                   <Route path="/Admin/:employeeID" element={<Admin />} />
                   {/* <Route path ="/Member" element={<Member />} /> */}
                     <Route path="/member/:memberId" element={<Member />} /> 
                   {/* <Route path="/settings" element={<SettingsPage />} />  */}
                   <Route path="/member/:memberId/settings" element={<SettingsPage />} />

                    <Route path="/totalReport" element={<TotalReport />} />
                    <Route path="Admin/:employeeID/totalReport" element={<TotalReport />} />
                    <Route path="Admin/:employeeID/employeeTable" element={<EmployeeTable />} />
                    <Route path="Admin/:employeeID/animalTable" element={<AnimalTable />} />
                    <Route path="Admin/:employeeID/feedingSchedule" element={<FeedingReport />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
