import { useState, useRef } from "react";
import Navbar from "../component/navbar";

export default function Login() {
    const [showRegister, setShowRegister] = useState(false);
    const formRef = useRef(null);

    const handleRegisterToggle = () => {
        setShowRegister(true);
    };
    
    const handleBackToLogin = () => {
        setShowRegister(false);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const JsonData = {
            email: data.get("email"),
            password: data.get("password"),
        };

        fetch("http://localhost:3000/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(JsonData),
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'ok') {
                    alert('Login successful');
                    localStorage.setItem('token', data.token);
                    window.location.href = '/dashboard';
                } else {
                    alert('Login failed');
                }
            })
            .catch((error) => {
                console.error('Login failed:', error);
                alert('An error occurred. Please try again later.');
            });
    };

    const handleRegister = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const JsonData = {
            fname: data.get("fname"),
            email: data.get("email"),
            password: data.get("password"),
        };
        fetch("http://localhost:3000/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(JsonData),
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'ok') {
                    alert('Register successful');
                    formRef.current.reset(); 
                    setShowRegister(false)
                } else {
                    alert('Register failed');
                }
            })
            .catch((error) => {
                console.error('Registration failed:', error);
                alert('An error occurred. Please try again later.');
            });
    };

    return (
        <>
            <Navbar />
            <div className="hero lg:h-[615px] h-[600px]">
                <div className="hero-content flex-col gap-[60px] lg:flex-row-reverse">
                    <div className="text-center hidden lg:text-left lg:block">
                        <h1 className="text-5xl font-bold text-warning">Login now!</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                    </div>
                    <div className="card bg-white w-full max-w-sm shrink-0 shadow-2xl">
                        {!showRegister ? (
                            <div className="form-container transition-all duration-500 opacity-100">
                                <form className="card-body" onSubmit={handleLogin}>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-warning">Email</span>
                                        </label>
                                        <input name="email" type="email" placeholder="email" className="bg-white input input-bordered" required />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-warning">Password</span>
                                        </label>
                                        <input name="password" type="password" placeholder="password" className="bg-white input input-bordered" required />
                                        <label className="label">
                                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                        </label>
                                    </div>
                                    <div className="form-control mt-6">
                                        <button type="submit" className="btn btn-warning">Login</button>
                                    </div>
                                    <div className="form-control mt-3">
                                        <button type="button" className="btn btn-link" onClick={handleRegisterToggle}>Register</button>
                                    </div>
                                </form>
                            </div>
                        ) : (
                            <div className="form-container transition-all duration-500 opacity-100">
                                <form ref={formRef} className="card-body" onSubmit={handleRegister}>
                                    <div className="form-control" >
                                        <label className="label">
                                            <span className="label-text text-warning">Name</span>
                                        </label>
                                        <input name="fname" type="text" placeholder="name" className="bg-white input input-bordered" required />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-warning">Email</span>
                                        </label>
                                        <input name="email" type="email" placeholder="email" className="bg-white input input-bordered" required />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-warning">Password</span>
                                        </label>
                                        <input name="password" type="password" placeholder="password" className="bg-white input input-bordered" required />
                                    </div>
                                    <div className="form-control mt-6">
                                        <button type="submit" className="btn btn-warning">Register</button>
                                    </div>
                                    <div className="form-control mt-3">
                                        <button type="button" className="btn btn-link" onClick={handleBackToLogin}>Back to Login</button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
