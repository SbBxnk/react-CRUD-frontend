import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faHouse, faUser, faArrowRightFromBracket, faGear, faBars, faCaretDown, faBriefcase } from "@fortawesome/free-solid-svg-icons";

import Employee from './employee';
import Employee_add from './employee_add';
import Employee_update from './employee_update';
import Position from './position';
import Positios_add from './position_add';
import Position_update from './position_update';

import Home from './home';

const Sidebar = ({ isOpen, toggleSidebar, onSelect, activeContent }) => {
    const [employeesDropdownOpen, setEmployeesDropdownOpen] = useState(false);
    const toggleEmployeesDropdown = () => {
        setEmployeesDropdownOpen(!employeesDropdownOpen);
    };

    const [positionsDropdownOpen, setPositionsDropdownOpen] = useState(false);
    const togglePositionsDropdown = () => {
        setPositionsDropdownOpen(!positionsDropdownOpen);
    };

    return (
        <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-white transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
            <div className="h-full flex flex-col">
                <div className="flex items-center justify-between h-16 px-6 bg-warning border-b">
                    <span className="text-center w-full lg:text-2xl text-lg font-semibold text-white">Dashboard Menu</span>
                    <button onClick={toggleSidebar} className="lg:hidden text-gray-600 hover:text-gray-800">
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                </div>
                <nav className="flex-1 overflow-y-auto">
                    <ul className="p-4 space-y-2">
                        {[
                            { icon: <FontAwesomeIcon icon={faHouse} />, label: 'Dashboard', route: 'dashboard' },
                            { icon: <FontAwesomeIcon icon={faUser} />, label: 'Users', route: 'users' },
                            { icon: <FontAwesomeIcon icon={faGear} />, label: 'Settings', route: 'settings' },
                        ].map(({ icon, label, route }) => (
                            <li key={label}>
                                <button
                                    onClick={() => onSelect(route)}
                                    className={`flex items-center px-4 py-2 rounded-md transition-colors duration-150 w-full text-left 
                                        ${activeContent === route ? 'text-warning bg-yellow-100' : 'text-gray-700 hover:bg-gray-100'}`}>
                                    <span className="mr-3 text-xl">{icon}</span>
                                    {label}
                                </button>
                            </li>
                        ))}
                        <li>
                            <button
                                onClick={toggleEmployeesDropdown}
                                className={`flex items-center justify-between px-4 py-2 rounded-md transition-colors duration-150 w-full text-left 
                                    ${employeesDropdownOpen ? 'bg-yellow-100' : 'hover:bg-gray-100'}`}>
                                <span className="flex items-center">
                                    <span className="mr-3 text-xl"><FontAwesomeIcon icon={faUser} /></span>
                                    Employee
                                </span>
                                <FontAwesomeIcon icon={faCaretDown} className={`transition-transform duration-200 ${employeesDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {employeesDropdownOpen && (
                                <ul className="mt-2 space-y-2 pl-6">
                                    <li>
                                        <button onClick={() => onSelect('employees')} className={`w-full text-left px-4 py-2 rounded-md 
                                            ${activeContent === 'employees' ? 'text-warning bg-yellow-100' : 'text-gray-700 hover:bg-gray-100'}`}>
                                            Emplopyee List
                                        </button>
                                    </li>
                                    <li>
                                        <button onClick={() => onSelect('addEmployee')} className={`w-full text-left px-4 py-2 rounded-md 
                                            ${activeContent === 'addEmployee' ? 'text-warning bg-yellow-100' : 'text-gray-700 hover:bg-gray-100'}`}>
                                            Add Employee
                                        </button>
                                    </li>
                                </ul>
                            )}
                        </li>
                        <li>
                            <button
                                onClick={togglePositionsDropdown}
                                className={`flex items-center justify-between px-4 py-2 rounded-md transition-colors duration-150 w-full text-left 
                                    ${positionsDropdownOpen ? 'bg-yellow-100' : 'hover:bg-gray-100'}`}>
                                <span className="flex items-center">
                                    <span className="mr-3 text-xl"><FontAwesomeIcon icon={faBriefcase} /></span>
                                    Position
                                </span>
                                <FontAwesomeIcon icon={faCaretDown} className={`transition-transform duration-200 ${positionsDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {positionsDropdownOpen && (
                                <ul className="mt-2 space-y-2 pl-6">
                                    <li>
                                        <button onClick={() => onSelect('positions')} className={`w-full text-left px-4 py-2 rounded-md 
                                            ${activeContent === 'positions' ? 'text-warning bg-yellow-100' : 'text-gray-700 hover:bg-gray-100'}`}>
                                            Position List
                                        </button>
                                    </li>
                                    <li>
                                        <button onClick={() => onSelect('addPosition')} className={`w-full text-left px-4 py-2 rounded-md 
                                            ${activeContent === 'addPosition' ? 'text-warning bg-yellow-100' : 'text-gray-700 hover:bg-gray-100'}`}>
                                            Add Position
                                        </button>
                                    </li>
                                </ul>
                            )}
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

Sidebar.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggleSidebar: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    activeContent: PropTypes.string.isRequired
};

const Topbar = ({ toggleSidebar }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <header className="bg-white shadow-md">
            <div className="flex items-center justify-between w-full h-16 px-6">
                <button onClick={toggleSidebar} className="lg:hidden text-gray-600 hover:text-gray-800">
                    <FontAwesomeIcon icon={faBars} />
                </button>
                <div className="flex items-center w-full">
                    <div className="flex justify-between items-center w-full lg:justify-between">
                        <h1 className="mx-4 lg:block">System Admin Dashboard Management</h1>
                        <button className="btn btn-sm btn-outline bg-warning text-white border-white hover:text-red-600 hover:border-red-600 hover:bg-white" onClick={handleLogout}>
                            <FontAwesomeIcon icon={faArrowRightFromBracket} /> Logout
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

Topbar.propTypes = {
    toggleSidebar: PropTypes.func.isRequired
};

export default function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeContent, setActiveContent] = useState('dashboard');
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('No token found. Redirecting to login.');
            navigate('/login');
            return;
        }

        fetch("http://localhost:3000/api/auth", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token,
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data.status !== 'ok') {
                    alert('Authentication failed');
                    localStorage.removeItem('token');
                    navigate('/login');
                }
            })
            .catch((error) => {
                console.error('Login failed:', error);
                alert('An error occurred. Please try again later.');
                navigate('/login');
            });
    }, [navigate]);
    
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
    const handleSelectEmployee = (route, employee_id = null) => {
        setActiveContent(route);
        if (employee_id) {
            setSelectedEmployeeId(employee_id);
        }
    };
    
    const [selectedPositionId, setSelectedPositionId] = useState(null);

    const handleSelectPosition = (route, position_id = null) => {
        setActiveContent(route);
        if (position_id) {
            setSelectedPositionId(position_id);
            console.log('Selected Position ID:', position_id);
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} onSelect={(handleSelectEmployee,handleSelectPosition)} activeContent={activeContent} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Topbar toggleSidebar={toggleSidebar} />
                <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-warning">Admin Dashboard</h1>
                    <div className="bg-white rounded-lg p-6 shadow-md border-2 border-warning">
                        {activeContent === 'dashboard' && <Home />}
                        {activeContent === 'employees' && <Employee onSelect={handleSelectEmployee} />}
                        {activeContent === 'addEmployee' && <Employee_add />}
                        {activeContent === 'updateEmployee' && (<Employee_update employee_id={selectedEmployeeId} handleSelectBack={handleSelectEmployee} />)}
                        {activeContent === 'positions' && <Position onSelect={handleSelectPosition} />}
                        {activeContent === 'addPosition' && <Positios_add />}
                        {activeContent === 'updatePosition' && (<Position_update position_id={selectedPositionId} handleSelectBack={handleSelectPosition} />)}

                    </div>
                </main>
            </div>
        </div>
    );
}

