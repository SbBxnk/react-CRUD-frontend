import { useState, useEffect } from "react";
import logo1 from '../assets/onion1.png';
import logo2 from '../assets/burger1.png';
import logo3 from '../assets/chicken.png';
import backgroundImage from "../assets/homecooking.jpg";

export default function Introduction() {
    const images = [logo1, logo2, logo3];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 800);

        return () => clearInterval(intervalId);
    }, [images.length]);

    return (
        <div className="relative w-full" id="home">
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5 lg:w-full"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            />
            <div className="relative z-10 container mx-auto max-w-[1200px] px-4 lg:px-0">
                <div className="flex flex-col-reverse lg:flex-row h-auto lg:h-[650px] items-center justify-center gap-[30px] lg:gap-[60px]">
                    <div className="w-full lg:w-1/2 slide-left">
                        <h1 className="text-[50px] text-center lg:text-start text-6xl font-bold text-warning mb-4">Chayakorn,</h1>
                        <h1 className="text-[23px] text-center lg:text-start text-[40px] font-bold mb-4 text-warning-300">Restaurant flavor for you</h1>
                        <p className="text-sm text-center lg:text-start text-lg text-black">
                            Our restaurant is dedicated to serving the finest burgers and fried foods in town. We take pride in using high-quality ingredients to ensure that every bite is packed with flavor and freshness. Our menu features a variety of options, from classic burgers to unique specialty creations, including choices for meat lovers and vegetarians alike.
                        </p>
                        <div className="flex justify-center gap-[20px] lg:justify-start gap-[20px] mt-3">
                            <a className="btn btn-sm btn-warning rounded-full w-[110px] lg:btn-md w-[130px]" href="#menu">View Product</a>
                            <button className="btn btn-sm btn-outline btn-warning rounded-full w-[110px] lg:btn-md w-[130px]">Contact</button>
                        </div>
                    </div>
                    <div className="w-full lg:w-[550px]">
                        <img
                            src={images[currentImageIndex]}
                            alt="Slideshow"
                            className="max-w-full h-auto slide-right"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
