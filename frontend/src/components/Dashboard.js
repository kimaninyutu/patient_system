import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPatientData, updatePatientData } from '../services/api';
import { logout } from '../store/authSlice';
import { useHistory } from 'react-router-dom';

const Dashboard = () => {
    const [patientData, setPatientData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState({});
    const [error, setError] = useState('');
    const { user, token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        const fetchPatientData = async () => {
            try {
                const response = await getPatientData(user.id);
                setPatientData(response.data);
                setEditedData(response.data);
            } catch (error) {
                console.error('Error fetching patient data:', error);
                setError('Failed to fetch patient data. Please try again.');
            }
        };

        if (user && user.id) {
            fetchPatientData();
        }
    }, [user]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleChange = (e) => {
        setEditedData({ ...editedData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await updatePatientData(user.id, editedData);
            setPatientData(response.data);
            setIsEditing(false);
            setError('');
        } catch (error) {
            console.error('Error updating patient data:', error);
            setError('Failed to update patient data. Please try again.');
        }
    };

    const handleLogout = () => {
        dispatch(logout());
        history.push('/login');
    };

    if (!patientData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <div className="max-w-md mx-auto">
                        <div>
                            <h1 className="text-2xl font-semibold">Patient Dashboard</h1>
                        </div>
                        <div className="divide-y divide-gray-200">
                            <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                {error && <p className="text-red-600">{error}</p>}
                                {isEditing ? (
                                    <form onSubmit={handleSubmit}>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Username</label>
                                                <input
                                                    type="text"
                                                    name="username"
                                                    value={editedData.username}
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={editedData.email}
                                                    disabled
                                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-100 sm:text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Phone</label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={editedData.phone}
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                />
                                            </div>
                                        </div>
                                        <div className="mt-6 flex items-center justify-end space-x-4">
                                            <button
                                                type="button"
                                                onClick={() => setIsEditing(false)}
                                                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            >
                                                Save Changes
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <div className="space-y-4">
                                        <p><strong>Username:</strong> {patientData.username}</p>
                                        <p><strong>Email:</strong> {patientData.email}</p>
                                        <p><strong>Phone:</strong> {patientData.phone}</p>
                                        <button
                                            onClick={handleEdit}
                                            className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Edit Profile
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="mt-8">
                            <button
                                onClick={handleLogout}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

