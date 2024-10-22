import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function Position_add() {

    const [position_name, setPosition_name] = useState({});
    const [salary, setSalary] = useState({});
    const [phone_number, setPhone_number] = useState({});



    const handleSubmit = (e) => {
        e.preventDefault();
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "position_name": position_name,
            "salary": salary,
            "phone_number": phone_number
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("http://localhost:3000/api/position/add/", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result) {
                    alert('Create position successful');
                    setPosition_name('');
                    setSalary('');
                    setPhone_number('');
                    e.target.reset();
                }
            })
            .catch((error) => {
                console.error(error);
                alert('Create position failed');
            });
    };


    return (
        <div className="z-10 container mx-auto max-w-[1200px]">
            <form onSubmit={handleSubmit}>
                <h2 className="text-2xl font-semibold leading-7 text-gray-900 lg:text-3xl">
                    Add Position <FontAwesomeIcon icon={faUserPlus} />
                </h2>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="col-span-full">
                        <label htmlFor="position_name" className="block text-sm font-bold leading-6 text-gray-900">
                            Position Name
                        </label>
                        <div className="mt-2">
                            <input
                                onChange={(e) => setPosition_name(e.target.value)}
                                required

                                placeholder="Position Name"
                                id="position_name"
                                name="position_name"
                                type="text"
                                autoComplete="position_name"
                                className="block bg-white w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className="col-span-full">
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
                    <div className="col-span-full">
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
