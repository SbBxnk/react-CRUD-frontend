import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPenToSquare, faPlus } from "@fortawesome/free-solid-svg-icons";
import PropTypes from 'prop-types';



const EmployeeAvatar = ({ employee }) => {
    const avatarStyle = {
        backgroundColor: '#f1f1f1',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        borderRadius: '50%',
        color: '#292929',
        fontSize: '20px',
        fontWeight: 'bold',
    };

    return (
        <div className="avatar flex justify-center items-center">
            <div className="w-10 lg:w-12 rounded-full">
                {employee.image ? (
                    <img src={`../../uploads/${employee.image}`} alt="Employee Avatar" />
                ) : (
                    <div style={avatarStyle}>
                        {employee.employee_name ? employee.employee_name.charAt(0).toUpperCase() : '?'}
                    </div>
                )}
            </div>
        </div>
    );
};

EmployeeAvatar.propTypes = {
    employee: PropTypes.shape({
        image: PropTypes.string,
        employee_name: PropTypes.string
    }).isRequired
};

export default function EmployeeList({ onSelect }) {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        GetEmployee();
    }, []);

    const GetEmployee = () => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/employee');
                if (!response.ok) {
                    throw new Error('Error fetching employees');
                }
                const data = await response.json();
                setEmployees(data.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchEmployees();
    };

    if (loading) return <p>กำลังโหลดข้อมูล...</p>;
    if (error) return <p>เกิดข้อผิดพลาด: {error.message}</p>;

    const handleDelete = (employee_id) => {
        if (window.confirm("Are you sure you want to delete this employee?")) {
            const requestOptions = {
                method: "DELETE",
                redirect: "follow"
            };

            fetch("http://localhost:3000/api/employee/delete/" + employee_id, requestOptions)
                .then((response) => response.text())
                .then((result) => {
                    if (result) {
                        alert('Delete employee successful');
                        GetEmployee();
                    }
                })
                .catch((error) => console.error(error));
        }
    };

    const handleEdit = (employee_id) => {
        onSelect('updateEmployee', employee_id);
    };

    return (
        <div className="p-0">
            <div className="flex justify-between items-center pb-5">
                <h2 className="text-lg lg:text-2xl ">Employee List</h2>
                <button
                    className="btn btn-outline text-green-600 border-green-600 text-[12px] lg:text-lg hover:text-white hover:bg-green-600 btn-sm "
                    onClick={() => onSelect('addEmployee')}
                >
                    Add Employee <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border px-4 w-[50px] whitespace-nowrap">No#</th>
                            <th className="border px-4 w-[50px] whitespace-nowrap">Action</th>
                            <th className="border px-4 whitespace-nowrap">Avatar</th>
                            <th className="border px-4 w-1/4 whitespace-nowrap">Name</th>
                            <th className="border px-4 whitespace-nowrap">Position</th>
                            <th className="border px-4 text-center whitespace-nowrap">Salary</th>
                            <th className="border px-4 whitespace-nowrap">Address</th>
                            <th className="border px-4 text-center whitespace-nowrap">Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee, i) => (
                            <tr key={employee.employee_id} className="hover:bg-gray-100">
                                <td className="border lg:text-sm text-[12px] text-center whitespace-nowrap">{i + 1}</td>
                                <td className="border px-4 py-2 whitespace-nowrap">
                                    <div className="flex justify-center items-center gap-0">
                                        <button
                                            onClick={() => handleEdit(employee.employee_id)}
                                            className="text-sm btn lg:text-sm text-[12px] btn-sm btn-ghost text-warning w-[35px] h-full">
                                            <FontAwesomeIcon icon={faPenToSquare} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(employee.employee_id)}
                                            className="text-sm btn lg:text-sm text-[12px] btn-sm btn-ghost text-red-600 w-[35px] h-full">
                                            <FontAwesomeIcon icon={faTrashCan} />
                                        </button>
                                    </div>
                                </td>
                                <td className="border text-[12px] lg:text-sm px-4 py-2 whitespace-nowrap">
                                    <EmployeeAvatar employee={employee} />
                                </td>
                                <td className="border text-[12px] lg:text-sm px-4 py-2 whitespace-nowrap">{employee.employee_name}</td>
                                <td className="border text-[12px] lg:text-sm px-4 py-2 whitespace-nowrap">{employee.position_name}</td>
                                <td className="border text-[12px] lg:text-sm px-4 py-2 whitespace-nowrap">{employee.salary}</td>
                                <td className="border text-[12px] lg:text-sm px-4 py-2 truncate max-w-xs">{employee.address}</td>
                                <td className="border text-[12px] lg:text-sm px-4 py-2 whitespace-nowrap">{employee.phone_number}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

EmployeeList.propTypes = {
    onSelect: PropTypes.func.isRequired,
};
