import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPen } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

export default function Employee_update({ employee_id, handleSelectBack }) {
    const [employee_name, setEmployee_name] = useState('');
    const [position_id, setPosition_id] = useState('');
    const [salary, setSalary] = useState('');
    const [address, setAddress] = useState('');
    const [phone_number, setPhone_number] = useState('');
    // const [image, setImage] = useState('');

    const [positions, setPositions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (employee_id) {
            const requestOptions = {
                method: "GET",
                redirect: "follow"
            };

            fetch(`http://localhost:3000/api/employee/${employee_id}`, requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    if (result.status) {
                        setEmployee_name(result.data.employee_name);
                        setPosition_id(result.data.position_id);
                        setSalary(result.data.salary);
                        setAddress(result.data.address);
                        setPhone_number(result.data.phone_number);
                        // setImage(result.data.image);
                    } else {
                        setError("Employee not found");
                    }
                    setLoading(false);
                })
                .catch((error) => {
                    console.error(error);
                    setError("Failed to fetch employee data");
                    setLoading(false);
                });
        }
    }, [employee_id]);



    useEffect(() => {
        const fetchPositions = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/position');
                if (!response.ok) {
                    throw new Error('Error fetching positions');
                }
                const data = await response.json();
                setPositions(data.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setError(error.message);
                setLoading(false);
            }
        };

        fetchPositions();
    }, []);


    if (loading) return <p>กำลังโหลดข้อมูล...</p>;
    if (error) return <p>เกิดข้อผิดพลาด: {error}</p>;

    const handleSubmit = (e) => {
        e.preventDefault();
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            employee_id,
            employee_name,
            position_id,
            salary,
            address,
            phone_number,
            // image
        });

        const requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch(`http://localhost:3000/api/employee/update/${employee_id}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.status) {
                    alert('Update employee successful');
                    handleSelectBack('employees');
                } else {
                    alert('Update employee failed: ' + result.message);
                }
            })

            .catch((error) => {
                console.error(error);
                alert('An error occurred during the update');
            });
    };


    return (
        <div className="z-10 container mx-auto max-w-[1200px]">
            <form onSubmit={handleSubmit}>
                <h2 className="text-2xl font-semibold leading-7 text-gray-900 lg:text-3xl">
                    Update Employee <FontAwesomeIcon icon={faUserPen} />
                </h2>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                        <label htmlFor="employee_name" className="block text-sm font-bold leading-6 text-gray-900">
                            FirstName-LastName
                        </label>
                        <div className="mt-2">
                            <input
                                value={employee_name}
                                onChange={(e) => setEmployee_name(e.target.value)}
                                required
                                placeholder="FirstName-LastName"
                                id="employee_name"
                                name="employee_name"
                                type="text"
                                autoComplete="employee_name"
                                className="block bg-white w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-3">
                        <label htmlFor="position_id" className="block text-sm font-bold leading-6 text-gray-900">
                            Position
                        </label>
                        <div className="mt-2">
                            <select
                                value={position_id}
                                onChange={(e) => setPosition_id(e.target.value)}
                                required
                                id="position_id"
                                name="position_id"
                                autoComplete="position_id"
                                className="block bg-white w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                <option value="" disabled>Select Position</option>
                                {positions.map((position) => (
                                    <option key={position.position_id} value={position.position_id}>
                                        {position.position_id} - {position.position_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="sm:col-span-3">
                        <label htmlFor="salary" className="block text-sm font-bold leading-6 text-gray-900">
                            Salary
                        </label>
                        <div className="mt-2">
                            <input
                                value={salary}
                                onChange={(e) => setSalary(e.target.value)}
                                required
                                placeholder="เงินเดือน"
                                id="salary"
                                name="salary"
                                type="text"
                                autoComplete="salary"
                                className="block bg-white w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-3">
                        <label htmlFor="phone_number" className="block text-sm font-bold leading-6 text-gray-900">
                            Phone Number
                        </label>
                        <div className="mt-2">
                            <input
                                value={phone_number}
                                onChange={(e) => setPhone_number(e.target.value)}
                                required
                                placeholder="Phone Number"
                                id="phone_number"
                                name="phone_number"
                                type="text"
                                autoComplete="phone_number"
                                className="block bg-white w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    {/* <div className="col-span-full">
                        <label htmlFor="image" className="font-bold block text-sm leading-6 text-gray-900">
                            Image
                        </label>
                        <div className="mt-2">
                            <input
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                                accept="image/*"
                                id="image"
                                name="image"
                                type="file"
                                autoComplete="image"
                                className="file-input file-input-bordered w-full file-input-sm"
                            />
                        </div>
                    </div> */}
                    <div className="col-span-full">
                        <label htmlFor="address" className="font-bold text-sm leading-6 text-gray-900">
                            Address
                        </label>
                        <div className="mt-2">
                            <textarea
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}

                                id="address"
                                name="address"
                                placeholder="Address"
                                rows={3}
                                className="block bg-white w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                </div>
                <hr className="mt-5" />
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}



Employee_update.propTypes = {
    employee_id: PropTypes.number.isRequired,
    handleSelectBack: PropTypes.func.isRequired,
};
