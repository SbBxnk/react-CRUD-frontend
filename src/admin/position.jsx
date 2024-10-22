import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan ,faPlus} from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

export default function PositionList({ onSelect }) {
    const [positions, setPositions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        GetPosition()
    }, []);

    const GetPosition = () => {

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
    }



    if (loading) return <p>กำลังโหลดข้อมูล...</p>;
    if (error) return <p>เกิดข้อผิดพลาด: {error.message}</p>;

    const handleDelete = (position_id) => {
        if (window.confirm("Are you sure you want to delete this position?")) {
            const requestOptions = {
                method: "DELETE",
                redirect: "follow"
            };

            fetch("http://localhost:3000/api/position/delete/" + position_id, requestOptions)
                .then((response) => response.text())
                .then((result) => {
                    if (result) {
                        alert('Delete position successful');
                        GetPosition();
                    }
                })
                .catch((error) => console.error(error));
        }
    };

    const handleEdit = (position_id) => {
        onSelect('updatePosition', position_id);
        // alert(position_id)
    }

    return (
        <div className="p-0">
            <div className="flex justify-between items-center pb-5">
                <h2 className="text-lg lg:text-2xl ">Position List</h2>
                <button
                    className="btn btn-outline text-green-600 border-green-600 text-[12px] lg:text-lg hover:text-white hover:bg-green-600 btn-sm "
                    onClick={() => onSelect('addPosition')}
                >
                    Add Position <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border px-4 w-[50px]">No.</th>
                            <th className="border px-4 w-[50px]">Action</th>
                            <th className="border px-4 w-1/4">Position</th>
                            <th className="border px-4">Salary</th>
                            <th className="border px-4">Phone number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {positions.map((position, i) => (
                            <tr key={position.id} className="hover:bg-gray-100">
                                <td className="border text-center whitespace-nowrap">{i + 1}</td>
                                <td className="border px-4 py-2 whitespace-nowrap">
                                    <div className="flex justify-center items-center gap-0">
                                        <button
                                            onClick={() => handleEdit(position.position_id)}
                                            className="text-sm btn btn-sm btn-ghost text-warning w-[35px] h-full">
                                            <FontAwesomeIcon icon={faPenToSquare} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(position.position_id)}
                                            className="text-sm btn btn-sm btn-ghost text-red-600 w-[35px] h-full">
                                            <FontAwesomeIcon icon={faTrashCan} />
                                        </button>
                                    </div>
                                </td>
                                <td className="border text-sm px-4 py-2 whitespace-nowrap">{position.position_name}</td>
                                <td className="border text-sm px-4 py-2 whitespace-nowrap">{position.salary}</td>
                                <td className="border text-sm px-4 py-2 whitespace-nowrap">{position.phone_number}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
PositionList.propTypes = {
    onSelect: PropTypes.func.isRequired,
};
