import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('No token found. Redirecting to login.');
            navigate('/login');
            return;
        }

        fetch("http://localhost:3000/auth", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token,
            },
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'ok') {
                alert('Authentication successful');
            } else {
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

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login'); 
    };

    return (
        <div className="flex min-h-screen">
            <aside className="w-64 bg-base-200 p-4">
                <ul className="menu">
                    <li><a href="#">Dashboard</a></li>
                    <li><a href="#">Users</a></li>
                    <li><a href="#">Settings</a></li>
                    <li><button className="btn btn-error mt-4" onClick={handleLogout}>Logout</button></li>
                </ul>
            </aside>
            <main className="flex-1 p-6 bg-base-100">
                <nav className="navbar bg-base-300">
                    <div className="navbar-start">
                        <a href="#" className="text-lg font-bold">Admin Dashboard</a>
                    </div>
                    <div className="navbar-end">
                        <button className="btn btn-warning" onClick={handleLogout}>Logout</button> 
                    </div>
                </nav>

                {/* Content */}
                <section className="py-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="card shadow-md bg-primary text-primary-content">
                            <div className="card-body">
                                <h2 className="card-title">Users</h2>
                                <p>Number of active users</p>
                            </div>
                        </div>
                        <div className="card shadow-md bg-secondary text-secondary-content">
                            <div className="card-body">
                                <h2 className="card-title">Revenue</h2>
                                <p>Total revenue generated</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
