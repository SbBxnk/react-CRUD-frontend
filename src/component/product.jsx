import { useState, useRef, useEffect } from 'react';
import colaup from '../assets/cola1.png';
import onionring from '../assets/onion1.png';
import burger from '../assets/burger1.png';
import chickendfried from '../assets/chicken.png';


const products = [
    { title: "Cola cup!", img: colaup, saleoff: "Sale!", description: "Refreshing cola in a cup", originalPrice: 89, salePrice: 1 },
    { title: "Onion ring!", img: onionring, saleoff: "Sale!", description: "Crispy onion rings", originalPrice: 89, salePrice: 1 },
    { title: "Hamburger!", img: burger, saleoff: "Sale!", description: "Juicy beef hamburger", originalPrice: 89, salePrice: 1 },
    { title: "Fried chicken!", img: chickendfried, saleoff: "Sale!", description: "Crispy fried chicken", originalPrice: 89, salePrice: 30 },
];

export default function PopularMenu() {
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollRef = useRef(null);
    const items = [...products, products[0]];

    const scrollToIndex = (index, instant = false) => {
        const offsetWidth = scrollRef.current.offsetWidth;
        scrollRef.current.scrollTo({
            left: index * offsetWidth,
            behavior: instant ? 'auto' : 'smooth',
        });
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex(prevIndex => {
                const nextIndex = prevIndex + 1;
                if (nextIndex === items.length) {
                    setTimeout(() => {
                        scrollToIndex(0, true);
                        setActiveIndex(0);
                    }, 5000);
                } else {
                    scrollToIndex(nextIndex);
                    return nextIndex;
                }
                return prevIndex;
            });
        }, 5000);

        return () => clearInterval(interval);
    }, [items.length]);

    useEffect(() => {
        if (activeIndex === items.length - 1) {
            setTimeout(() => {
                scrollRef.current.scrollTo({ left: 0, behavior: 'auto' });
                setActiveIndex(0);
            }, 850);
        }
    }, [activeIndex, items.length]);

    //countdown 
    const [timeRemaining, setTimeRemaining] = useState(224000);
    useEffect(() => {
        const interval = setInterval(() => {
            setTimeRemaining((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(interval);
    }, []);
    const formatTime = (seconds) => {
        const days = Math.floor(seconds / (3600 * 24));
        const hours = Math.floor((seconds % (3600 * 24)) / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return { days, hours, minutes, secs };
    };
    const { days, hours, minutes, secs } = formatTime(timeRemaining);


    return (
        <div className="container mx-auto max-w-[1200px] pt-[20px] pb-[20px]" id="menu">
            <div className="divider divider-neutral divider-start">
                <h1 className="text-3xl py-5 text-warning font-bold px-4 lg:px-0">Order</h1>
            </div>
            <h1 className="text-xl text-center py-3 text-black font-bold lg:text-4xl">Discount countdown</h1>
            <div className="items-center justify-center flex text-black">
                <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
                    <div className="flex flex-col">
                        <span className="countdown font-mono text-5xl">
                            <span style={{ "--value": days }}></span>
                        </span>
                        days
                    </div>
                    <div className="flex flex-col">
                        <span className="countdown font-mono text-5xl">
                            <span style={{ "--value": hours }}></span>
                        </span>
                        hours
                    </div>
                    <div className="flex flex-col">
                        <span className="countdown font-mono text-5xl">
                            <span style={{ "--value": minutes }}></span>
                        </span>
                        min
                    </div>
                    <div className="flex flex-col">
                        <span className="countdown font-mono text-5xl">
                            <span style={{ "--value": secs }}></span>
                        </span>
                        sec
                    </div>
                </div>
            </div>

            <div className="relative">
                <div className="flex">
                    <div
                        ref={scrollRef}
                        className="flex py-8 overflow-hidden snap-x snap-mandatory"
                    >
                        {items.map((product, index) => (
                            <div key={index} className="flex-shrink-0 w-full snap-center flex justify-center items-stretch">
                                <div className="glass rounded-lg shadow-xl p-6 w-64">
                                    <img src={product.img} className="w-full h-48 rounded-lg mb-3" />
                                    <div className="flex items-center gap-3">
                                        <h3 className="text-xl text-warning font-bold">{product.title}</h3>
                                        <h1 className="text-white rounded-sm px-2 text-sm w-fill bg-red-600">{product.saleoff}</h1>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <h2 className="text-base my-2 font-light line-through">${product.originalPrice}</h2>
                                        <h2 className="text-4xl text-red-600 my-2 font-bold ">${product.salePrice}</h2>
                                    </div>
                                    <button className="font-bold w-full py-2 bg-transparent border border-warning rounded text-warning hover:bg-warning hover:text-white">
                                        Add to cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}





