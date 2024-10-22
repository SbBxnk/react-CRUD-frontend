import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef } from "react";

export default function Employee_add() {
    const [employee_name, setEmployee_name] = useState('');
    const [position_id, setPosition_id] = useState('');
    const [salary, setSalary] = useState('');
    const [phone_number, setPhone_number] = useState('');
    const [address, setAddress] = useState('');
    const [positions, setPositions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fileInput = useRef(null);

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
                setError(error);
                setLoading(false);
            }
        };

        fetchPositions();
    }, []);

    if (loading) return <p>กำลังโหลดข้อมูล...</p>;
    if (error) return <p>เกิดข้อผิดพลาด: {error.message}</p>;

    const handleSubmit = (e) => {
        e.preventDefault();

        const formdata = new FormData();
        formdata.append("employee_name", employee_name);
        formdata.append("position_id", position_id);
        formdata.append("salary", salary);
        formdata.append("phone_number", phone_number);
        formdata.append("address", address);

        // Adding file input via useRef
        if (fileInput.current.files[0]) {
            formdata.append("image", fileInput.current.files[0]);
        }

        const requestOptions = {
            method: "POST",
            body: formdata,
            redirect: "follow"
        };

        fetch("http://localhost:3000/api/employee/add/", requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to add employee');
                }
                return response.json();
            })
            .then((result) => {
                if (result) {
                    alert('Add employee successful');
                    setEmployee_name('');
                    setPosition_id('');
                    setSalary('');
                    setAddress('');
                    setPhone_number('');
                    fileInput.current.value = ''; // Reset the file input
                    e.target.reset();
                }
            })
            .catch((error) => {
                console.error(error);
                alert('Add employee failed: ' + error.message);
            });
    };

    return (
        <div className="z-10 container mx-auto max-w-[1200px]">
            <form onSubmit={handleSubmit}>
                <h2 className="text-2xl font-semibold leading-7 text-gray-900 lg:text-3xl">
                    Add Employee <FontAwesomeIcon icon={faUserPlus} />
                </h2>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                        <label htmlFor="employee_name" className="block text-sm font-bold leading-6 text-gray-900">
                            FirstName - LastName
                        </label>
                        <div className="mt-2">
                            <input
                                onChange={(e) => setEmployee_name(e.target.value)}
                                required
                                placeholder="FirstName - LastName"
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
                                placeholder="Position"
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
                                onChange={(e) => setSalary(e.target.value)}
                                required
                                placeholder="Salary"
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
                            Phone number
                        </label>
                        <div className="mt-2">
                            <input
                                onChange={(e) => setPhone_number(e.target.value)}
                                required
                                placeholder="Phone number"
                                id="phone_number"
                                name="phone_number"
                                type="text"
                                autoComplete="phone_number"
                                className="block bg-white w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className="col-span-full">
                        <label htmlFor="image" className="font-bold block text-sm leading-6 text-gray-900">
                            Image
                        </label>
                        <div className="mt-2">
                            <input
                                ref={fileInput}
                                accept="image/*"
                                id="image"
                                name="image"
                                type="file"
                                autoComplete="image"
                                className="file-input file-input-bordered w-full file-input-sm"
                            />
                        </div>
                    </div>
                    <div className="col-span-full">
                        <label htmlFor="address" className="font-bold block text-sm leading-6 text-gray-900">
                            Address
                        </label>
                        <div className="mt-2">
                            <textarea
                                onChange={(e) => setAddress(e.target.value)}
                                required
                                placeholder="Address"
                                id="address"
                                name="address"
                                autoComplete="address"
                                className="block bg-white w-full h-[80px] rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                </div>
                <hr className="mt-5" />
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                        type="button"
                        className="text-sm font-semibold leading-6 text-gray-900"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="inline-block rounded-lg bg-indigo-600 px-4 py-2 text-white"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}
