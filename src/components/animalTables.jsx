import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import "../index.css";

const { url } = require('../config.json')[process.env.NODE_ENV];
const itemsPerPage = 10;

function AnimalTable() {
    const [animalData, setAnimalData] = useState([]);
    const [sortField, setSortField] = useState(null);
    const [sortDirection, setSortDirection] = useState("asc");
    const [currentPage, setCurrentPage] = useState(1);
    const [animalSearchTerm, setAnimalSearchTerm] = useState("");

    // Modal states
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedAnimal, setSelectedAnimal] = useState(null);

    // Form fields
    const [newName, setName] = useState('');
    const [newSex, setSex] = useState('');
    const [newDateAcquired, setDateAcquired] = useState('');
    const [newDateBorn, setDateBorn] = useState('');
    const [newDateDied, setDateDied] = useState('');
    const [newSpecies, setSpecies] = useState('');
    const [newClassification, setClassification] = useState('');
    const [newEnclosureID, setEnclosureID] = useState('');

    // Fetch animal data
    useEffect(() => {
        fetchAnimalData();
    }, []);

    const fetchAnimalData = async () => {
        try {
            const response = await axios.get(`${url}/animals/`);
            if (response.status !== 200) throw new Error("Failed to fetch animal data");
            setAnimalData(response.data);
        } catch (error) {
            console.error("Error fetching animal data:", error);
        }
    };
    const handlePageChange = (page) => setCurrentPage(page);
    // Clear form fields
    const clearForm = () => {
        setName('');
        setSex('');
        setDateAcquired('');
        setDateBorn('');
        setDateDied('');
        setSpecies('');
        setClassification('');
        setEnclosureID('');
    };

    // Add new animal
    const handleAddAnimal = async (e) => {
        e.preventDefault();
        
        const newAnimal = {
            name: newName,
            sex: newSex === "Male" ? 0 : 1,
            date_acquired: newDateAcquired,
            date_born: newDateBorn || null,
            date_died: newDateDied || null,
            species: newSpecies,
            classification: newClassification,
            enclosureID: newEnclosureID || null,
        };

        try {
            await axios.post(`${url}/animals/add`, newAnimal);
            clearForm();
            setIsAddModalOpen(false);
            fetchAnimalData();
        } catch (error) {
            console.error("Error adding animal:", error);
            alert("Failed to add animal.");
        }
    };

    useEffect(() => {
    if (selectedAnimal) {
        setName(selectedAnimal.name || '');
        setSex(selectedAnimal.sex === 0 ? "Male" : "Female" || '');
        setDateAcquired(selectedAnimal.date_acquired ? new Date(selectedAnimal.date_acquired).toISOString().split("T")[0] :'');
        setDateBorn(selectedAnimal.date_born ? new Date(selectedAnimal.date_born).toISOString().split("T")[0] : '');
        setDateDied(selectedAnimal.date_died ? new Date(selectedAnimal.date_died).toISOString().split("T")[0] : '');
        setSpecies(selectedAnimal.species || '');
        setClassification(selectedAnimal.classification || '');
        setEnclosureID(selectedAnimal.enclosureID || '');
    }
}, [selectedAnimal]);

    // Delete animal
    const deleteAnimal = async (animalID) => {
        if (!window.confirm("Are you sure you want to delete this animal?")) return;

        try {
            await axios.delete(`${url}/animals/${animalID}`);
            alert("Animal deleted successfully.");
            fetchAnimalData();
        } catch (error) {
            console.error("Error deleting animal:", error);
            alert("Failed to delete animal.");
        }
    };

    // Sort data
    const handleHeaderClick = (field) => {
        setSortField(field);
        setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    };

    // Handle Edit Modal
    const handleEditAnimalOptions = async (animalID) => {
        try {
            const response = await axios.get(`${url}/animals/${animalID}`);
            setSelectedAnimal(response.data);
            setIsEditModalOpen(true);
        } catch (error) {
            console.error("Error fetching animal details:", error);
        }
    };

    const handleEditAnimal = async (e) => {
        console.log(newSex === "Male" ? 0 : 1)
        e.preventDefault();
        const updatedAnimal = {
            animalID: selectedAnimal.animalID,
            name: newName,
            sex: newSex === "Male" ? 0 : 1,
            date_acquired: newDateAcquired,
            date_born: newDateBorn || null,
            date_died: newDateDied || null,
            species: newSpecies,
            classification: newClassification,
            enclosureID: newEnclosureID || null,
        };
    
        try {
            await axios.put(`${url}/animals/edit`, updatedAnimal);
            clearForm();
            setIsEditModalOpen(false);
            fetchAnimalData();
            alert("Animal updated successfully!");
        } catch (error) {
            console.error("Error editing animal:", error);
            alert("Failed to edit animal.");
        }
    };

    // Sorting logic
    const sortedData = React.useMemo(() => {
        if (!sortField) return animalData;
        const sorted = [...animalData].sort((a, b) => {
            if (a[sortField] < b[sortField]) return -1;
            if (a[sortField] > b[sortField]) return 1;
            return 0;
        });
        return sortDirection === "asc" ? sorted : sorted.reverse();
    }, [animalData, sortField, sortDirection]);

    // Filtered and paginated data
    const filteredData = sortedData.filter((animal) =>
        animal.name.toLowerCase().includes(animalSearchTerm.toLowerCase())
    );
    const totalItems = filteredData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <main className="min-h-screen bg-[#EFEDE5] w-screen flex justify-center">
            <div className="container mx-auto p-6">
                <h1 className="text-4xl text-center mb-6 mt-24 text-[#313639]">Animal Table</h1>
                <div className="flex justify-center my-4">
                    <input
                        type="text"
                        className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                        value={animalSearchTerm}
                        onChange={(e) => setAnimalSearchTerm(e.target.value)}
                        placeholder="Search by animal name"
                    />
                </div>
                    <div className="flex justify-center my-4">
                        <button
                            className="ml-4 px-4 py-2 bg-[#8AA686] text-white rounded"
                            onClick={() => setIsAddModalOpen(true)}
                        >
                            Add Animal
                        </button>
                    </div>

                <table className="divide-y divide-gray-300 mb-6 w-full text-center bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-50">
                        <tr>
                            <th onClick={() => handleHeaderClick("name")}>Name</th>
                            <th onClick={() => handleHeaderClick("species")}>Species</th>
                            <th onClick={() => handleHeaderClick("classification")}>Classification</th>
                            <th onClick={() => handleHeaderClick("enclosureName")}>Enclosure</th>
                            <th>Manage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((animal) => (
                            <tr key={animal.animalID}>
                                <td>{animal.name}</td>
                                <td>{animal.species}</td>
                                <td>{animal.classification}</td>
                                <td>{animal.enclosureName}</td>
                                <td>
                                    <button className="bg-[#8AA686] text-white py-2 px-4 rounded mx-1"
                                        onClick={() => handleEditAnimalOptions(animal.animalID)}>
                                        Edit
                                    </button>
                                    <button className="bg-[#8AA686] text-white py-2 px-4 rounded mx-1"
                                        onClick={() => deleteAnimal(animal.animalID)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* Pagination */}
                <div className="flex justify-center mt-4 space-x-2">
                    <button
                        onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                        className={`px-3 py-1 border rounded-md ${
                            currentPage === 1 ? "bg-[#8AA686] text-white opacity-50" : "bg-[#8AA686] text-white hover:bg-[#6C8A5E]"
                        }`}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i}
                            onClick={() => handlePageChange(i + 1)}
                            className={`px-3 py-1 border rounded-md ${
                                currentPage === i + 1
                                    ? "bg-[#8AA686] text-white"
                                    : "bg-[#8AA686] text-white hover:bg-[#6C8A5E]"
                            }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                        className={`px-3 py-1 border rounded-md ${
                            currentPage === totalPages
                                ? "bg-[#8AA686] text-white opacity-50"
                                : "bg-[#8AA686] text-white hover:bg-[#6C8A5E]"
                        }`}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>

                {isAddModalOpen && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-2xl font-semibold mb-4">Add New Animal</h2>
            <form onSubmit={handleAddAnimal}>
                <div className="mb-4">
                    <label className="block text-sm font-medium">Name</label>
                    <input
                        type="text"
                        value={newName}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="border w-full px-3 py-2 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium">Sex</label>
                    <select
                        value={newSex}
                        onChange={(e) => setSex(e.target.value)}
                        required
                        className="border w-full px-3 py-2 rounded"
                    >
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium">Date Acquired</label>
                    <input
                        type="date"
                        value={newDateAcquired}
                        onChange={(e) => setDateAcquired(e.target.value)}
                        required
                        className="border w-full px-3 py-2 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium">Date Born (Optional)</label>
                    <input
                        type="date"
                        value={newDateBorn}
                        onChange={(e) => setDateBorn(e.target.value)}
                        className="border w-full px-3 py-2 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium">Date Died (Optional)</label>
                    <input
                        type="date"
                        value={newDateDied}
                        onChange={(e) => setDateDied(e.target.value)}
                        className="border w-full px-3 py-2 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium">Species</label>
                    <input
                        type="text"
                        value={newSpecies}
                        onChange={(e) => setSpecies(e.target.value)}
                        required
                        className="border w-full px-3 py-2 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium">Classification</label>
                    <input
                        type="text"
                        value={newClassification}
                        onChange={(e) => setClassification(e.target.value)}
                        required
                        className="border w-full px-3 py-2 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium">Enclosure ID </label>
                    <input
                        type="number"
                        value={newEnclosureID}
                        onChange={(e) => setEnclosureID(e.target.value)}
                        className="border w-full px-3 py-2 rounded"
                    />
                </div>
                <div className="flex justify-end space-x-2">
                    <button
                        type="button"
                        onClick={() => setIsAddModalOpen(false)}
                        className="bg-gray-500 text-white px-4 py-2 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-[#8AA686] text-white px-4 py-2 rounded"
                    >
                        Add Animal
                    </button>
                </div>
            </form>
        </div>
    </div>
)}

                {isEditModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-lg w-96">
                            <h2 className="text-2xl font-semibold mb-4">Edit Animal</h2>
                            <form onSubmit={handleEditAnimal}>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium">Name</label>
                                    <input
                                        type="text"
                                        value={newName}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        className="border w-full px-3 py-2 rounded"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium">Sex</label>
                                    <select
                                        value={newSex}
                                        onChange={(e) => setSex(e.target.value)}
                                        required
                                        className="border w-full px-3 py-2 rounded"
                                    >
                                        <option value="">Select</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium">Date Acquired</label>
                                    <input
                                        type="date"
                                        value={newDateAcquired}
                                        onChange={(e) => setDateAcquired(e.target.value)}
                                        required
                                        className="border w-full px-3 py-2 rounded"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium">Date Born (Optional)</label>
                                    <input
                                        type="date"
                                        value={newDateBorn}
                                        onChange={(e) => setDateBorn(e.target.value)}
                                        className="border w-full px-3 py-2 rounded"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium">Date Died (Optional)</label>
                                    <input
                                        type="date"
                                        value={newDateDied}
                                        onChange={(e) => setDateDied(e.target.value)}
                                        className="border w-full px-3 py-2 rounded"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium">Species</label>
                                    <input
                                        type="text"
                                        value={newSpecies}
                                        onChange={(e) => setSpecies(e.target.value)}
                                        required
                                        className="border w-full px-3 py-2 rounded"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium">Classification</label>
                                    <input
                                        type="text"
                                        value={newClassification}
                                        onChange={(e) => setClassification(e.target.value)}
                                        required
                                        className="border w-full px-3 py-2 rounded"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium">Enclosure ID (Optional)</label>
                                    <input
                                        type="number"
                                        value={newEnclosureID}
                                        onChange={(e) => setEnclosureID(e.target.value)}
                                        className="border w-full px-3 py-2 rounded"
                                    />
                                </div>
                                <div className="flex justify-end space-x-2">
                                    <button
                                        type="button"
                                        onClick={() => setIsEditModalOpen(false)}
                                        className="bg-gray-500 text-white px-4 py-2 rounded"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white px-4 py-2 rounded"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

            </div>
        </main>
    );
}

export default AnimalTable;