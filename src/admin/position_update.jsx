import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPen } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";


export default function Position_update({ position_id , handleSelectBack }) {
    const [position_name, setPosition_name] = useState('');
    const [salary, setSalary] = useState('');
    const [phone_number, setPhone_number] = useState('');

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (position_id) {
            const requestOptions = {
                method: "GET",
                redirect: "follow"
            };

            fetch(`http://localhost:3000/api/position/${position_id}`, requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    if (result.status) {
                        setPosition_name(result.data.position_name);
                        setSalary(result.data.salary);
                        setPhone_number(result.data.phone_number);
                    } else {
                        setError("position not found");
                    }
                    setLoading(false);
                })
                .catch((error) => {
                    console.error(error);
                    setError("Failed to fetch position data");
                    setLoading(false);
                });
            }
    }, [position_id]);

    console.log(position_id);


    if (loading) return <p>กำลังโหลดข้อมูล...</p>;
    if (error) return <p>เกิดข้อผิดพลาด: {error}</p>;

    const handleSubmit = (e) => {
        e.preventDefault();
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        const raw = JSON.stringify({
            position_id,
            position_name,
            salary,
            phone_number
        });
    
        const requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };
    
        fetch(`http://localhost:3000/api/position/update/${position_id}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            if (result.status) {
                alert('Update position successful');
                handleSelectBack('positions');
            } else {
                alert('Update position failed: ' + result.message);
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
                   Update Position <FontAwesomeIcon icon={faUserPen} />
                </h2>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                        <label htmlFor="position_name" className="block text-sm font-bold leading-6 text-gray-900">
                            Position name
                        </label>
                        <div className="mt-2">
                            <input
                                value={position_name}
                                onChange={(e) => setPosition_name(e.target.value)}
                                required
                                placeholder="ชื่อ-สกุล"
                                id="position_name"
                                name="position_name"
                                type="text"
                                autoComplete="position_name"
                                className="block bg-white w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
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
                            phone number
                        </label>
                        <div className="mt-2">
                            <input
                                value={phone_number}
                                onChange={(e) => setPhone_number(e.target.value)}
                                required
                                placeholder="เบอร์ติดต่อ"
                                id="phone_number"
                                name="phone_number"
                                type="text"
                                autoComplete="phone_number"
                                className="block bg-white w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                </div>
                <hr className="mt-5"/>
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
    )
}

Position_update.propTypes = {
    position_id: PropTypes.number.isRequired,
    handleSelectBack: PropTypes.func.isRequired,
};
