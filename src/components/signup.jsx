import React from 'react';
import { useState, useEffect } from 'react';
//import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const {url} = require("../config.json")[process.env.NODE_ENV];

function Signup() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        username: "",
        password: "",
        date_of_birth: "",
        address: "",
        memberType: 0, // Default to Regular
        memberTerm: 0  // Default to 1 month
    });
    const [birthday, setBirthday] = useState('');
    const [address, setAddress] = useState({
        street: '',
        city: '',
        state: '',
        zip: ''
    });

    // useEffect(() => {
    //     const storedToken = Cookies.get('token');
    //     if (storedToken) {
    //         console.log("Stored token (test):", storedToken);
    //         setIsLoggedIn(true);
    //     }
    // }, []);

    const handleSubmitForm = async (formData) => {
        try {
            const {first_name, last_name, email, phone_number, username, password, date_of_birth, memberType, memberTerm} = formData;
            const {street, city, state, zip} = address;
            const today = new Date().toISOString().split('T')[0]; // Format as YYYY-MM-DD

            const memberData = {
                address: `${street}, ${city}, ${state}, ${zip}`,
                memberBirthday: birthday,
                memberEmail: email,
                memberPhone: phone_number,
                memberFName: first_name,
                memberLName: last_name,
                memberType: memberType, // Add selected membership type
                memberTerm: memberTerm,  // Add selected membership term
                subscribed_on: today
            }

            const newMember = await axios.post(`${url}/members/new/member`, memberData);

            const accountData = {
                memberEmail: email, 
                memberPassword: password,
                memberID: newMember.data.insertId,
            }

            await axios.post(`${url}/members/new/login`, accountData);
            navigate('/login');
            alert(`Successfully created account`);

        } catch (error) {
            console.log(error);
            console.error("Error submitting sign-up form:", error);
            // Handle error as needed
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleSubmitForm(formData); // Call the handleSubmitForm function with the form data
        // window.location.href = '/login';
    };

    return (
        <main className="flex items-center justify-center h-screen bg-[#165e229e]">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full mx-24 h-3/4 overflow-auto">
                <button className="relative top-4 left-4">
                    <a href="/login">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="h-6 w-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 19l-7-7m0 0l7-7m-7 7h18"
                            />
                        </svg>
                    </a>
                </button>
                <h2 className="text-2xl font-bold mb-6 text-center text-[#333]">
                    Sign up
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-row">
                        <div className="flex flex-col w-full">
                            <label htmlFor="firstname" className="block text-sm text-gray-600">First Name</label>
                            <input
                                type="text"
                                className="w-full p-2 mb-4 mr-2 border border-[#165e229e]  rounded"
                                value={formData.first_name}
                                onChange={(e) =>
                                    setFormData({ ...formData, first_name: e.target.value })
                                }
                            />
                        </div>
                        <div className="flex flex-col w-full">
                            <label htmlFor="lastname" className="block text-sm text-gray-600">Last Name</label>
                            <input
                                type="text"
                                className="w-full p-2 mb-4 ml-2 border border-[#165e229e]  rounded"
                                value={formData.last_name}
                                onChange={(e) =>
                                    setFormData({ ...formData, last_name: e.target.value })
                                }
                            />
                        </div>
                    </div>
                    <label htmlFor="email" className="block text-sm text-gray-600">Email</label>
                    <input
                        type="email"
                        className="w-full p-2 mb-4 border border-[#165e229e]  rounded"
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                        }
                    />
                    <label htmlFor="phonenumber" className="block text-sm text-gray-600">Phone Number</label>
                        <input
                        type="tel"
                        className="w-full p-2 mb-4 border border-[#165e229e]  rounded"
                        value={formData.phone_number}
                        onChange={(e) =>
                            setFormData({ ...formData, phone_number: e.target.value })
                        }
                        maxLength={10}
                        minLength={10}
                        pattern="\d*"
                        />
                    <label htmlFor="username" className="block text-sm text-gray-600">Username</label>
                    <input
                        type="text"
                        className="w-full p-2 mb-4 border border-[#165e229e]  rounded"
                        value={formData.username}
                        onChange={(e) =>
                            setFormData({ ...formData, username: e.target.value })
                        }
                    />
                    <label htmlFor="password" className="block text-sm text-gray-600">Password</label>
                    <input
                        type="password"
                        className="w-full p-2 mb-4 border border-[#165e229e] rounded"
                        value={formData.password}
                        onChange={(e) =>
                            setFormData({ ...formData, password: e.target.value })
                        }
                    />
                    <label htmlFor="confirmpassword" className="block text-sm text-gray-600">Confirm Password</label>
                    <input
                        type="password"
                        className="w-full p-2 mb-4 border border-[#165e229e]  rounded"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <label htmlFor="memberType" className="block text-sm text-gray-600">Membership Type</label>
                    <select
                        className="w-full p-2 mb-4 border border-[#165e229e] rounded"
                        value={formData.memberType}
                        onChange={(e) => setFormData({ ...formData, memberType: parseInt(e.target.value) })}
                    >
                        <option value={0}>Regular</option>
                        <option value={1}>Student</option>
                        <option value={2}>Veteran</option>
                        <option value={3}>Military</option>
                    </select>

                    <label htmlFor="memberTerm" className="block text-sm text-gray-600">Membership Term</label>
                    <select
                        className="w-full p-2 mb-4 border border-[#165e229e] rounded"
                        value={formData.memberTerm}
                        onChange={(e) => setFormData({ ...formData, memberTerm: parseInt(e.target.value) })}
                    >
                        <option value={0}>1 month</option>
                        <option value={1}>6 months</option>
                        <option value={2}>12 months</option>
                        <option value={3}>24 months</option>
                    </select>
                    <label htmlFor="birthday" className="block text-sm text-gray-600">Birthday</label>
                    <input
                        type="date"
                        id="birthday"
                        className="w-full p-2 mb-4 border border-[#165e229e]  rounded"
                        value={formData.birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                        max={new Date().toISOString().split('T')[0]}
                    />
                    <label htmlFor="address" className="block text-sm text-gray-600">Street Address</label>
                    <input
                        type="text"
                        className="w-full p-2 mb-4 border border-[#165e229e] rounded"
                        value={address.street}
                        onChange={(e) => setAddress({ ...address, street: e.target.value })}
                    />
                    <label htmlFor="city" className="block text-sm text-gray-600">City</label>
                    <input
                        type="text"
                        className="w-full p-2 mb-4 border border-[#165e229e] rounded"
                        value={address.city}
                        onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    />
                    <label htmlFor="state" className="block text-sm text-gray-600">State</label>
                    <select
                        className="w-full p-2 mb-4 border border-[#165e229e]  rounded"
                        value={address.state}
                        onChange={(e) => setAddress({ ...address, state: e.target.value })}
                    >
                        <option value="">Select State</option>
                        <option value="">Select State</option>
                        <option value="AL">Alabama</option>
                        <option value="AK">Alaska</option>
                        <option value="AZ">Arizona</option>
                        <option value="AR">Arkansas</option>
                        <option value="CA">California</option>
                        <option value="CO">Colorado</option>
                        <option value="CT">Connecticut</option>
                        <option value="DE">Delaware</option>
                        <option value="FL">Florida</option>
                        <option value="GA">Georgia</option>
                        <option value="HI">Hawaii</option>
                        <option value="ID">Idaho</option>
                        <option value="IL">Illinois</option>
                        <option value="IN">Indiana</option>
                        <option value="IA">Iowa</option>
                        <option value="KS">Kansas</option>
                        <option value="KY">Kentucky</option>
                        <option value="LA">Louisiana</option>
                        <option value="ME">Maine</option>
                        <option value="MD">Maryland</option>
                        <option value="MA">Massachusetts</option>
                        <option value="MI">Michigan</option>
                        <option value="MN">Minnesota</option>
                        <option value="MS">Mississippi</option>
                        <option value="MO">Missouri</option>
                        <option value="MT">Montana</option>
                        <option value="NE">Nebraska</option>
                        <option value="NV">Nevada</option>
                        <option value="NH">New Hampshire</option>
                        <option value="NJ">New Jersey</option>
                        <option value="NM">New Mexico</option>
                        <option value="NY">New York</option>
                        <option value="NC">North Carolina</option>
                        <option value="ND">North Dakota</option>
                        <option value="OH">Ohio</option>
                        <option value="OK">Oklahoma</option>
                        <option value="OR">Oregon</option>
                        <option value="PA">Pennsylvania</option>
                        <option value="RI">Rhode Island</option>
                        <option value="SC">South Carolina</option>
                        <option value="SD">South Dakota</option>
                        <option value="TN">Tennessee</option>
                        <option value="TX">Texas</option>
                        <option value="UT">Utah</option>
                        <option value="VT">Vermont</option>
                        <option value="VA">Virginia</option>
                        <option value="WA">Washington</option>
                        <option value="WV">West Virginia</option>
                        <option value="WI">Wisconsin</option>
                        <option value="WY">Wyoming</option>
                    </select>
                    <label htmlFor="zipcode" className="block text-sm text-gray-600">Zip/Postal Code</label>
                    <input
                        type="text"
                        className="w-full p-2 mb-6 border border-[#165e229e]  rounded"
                        value={address.zip}
                        onChange={(e) => setAddress({ ...address, zip: e.target.value })}
                        maxLength="5"
                        minLength="5"
                        pattern="\d*"
                    />
                    {formData.password.length < 6 || formData.password !== confirmPassword ? (
                        <p className="text-red-500 text-xs -mt-4">
                            * Password must be at least 6 characters and match the confirm password
                        </p>
                    ) : (
                        <button
                            type="submit"
                            className="w-full py-2 px-4 border-[#165e229e]  text-black rounded hover:bg-[#165e229e] "
                        >
                            Sign up
                        </button>
                    )}

                </form>
            </div>
        </main>
    );
}

export default Signup;