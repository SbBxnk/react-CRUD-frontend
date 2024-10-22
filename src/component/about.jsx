import restaurant from '../assets/restaurant.png'

export default function About() {
    return (
        <div className="bg-warning h-auto lg:h-[550px]" id="about">
            <div className="z-10 container mx-auto max-w-[1200px] pt-[40px] pb-[20px]">
                <div className="divider divider-neutral divider-end">
                    <h1 className="text-3xl text-center py-5 text-white font-bold px-4 lg:px-0">About Us</h1>
                </div>
                <div className="px-3 flex flex-col lg:flex-row-reverse h-auto lg:h-[400px] items-center justify-center gap-[30px] lg:gap-[60px]">
                    <div className="w-full lg:w-1/2 slide-left">
                        <div className="flex justify-center gap-3 items-center lg:block">
                            <h1 className="text-4xl pb-6 font-bold text-black lg:text-6xl lg:pb-0">About</h1>
                            <h1 className="text-[20px] font-bold mb-4 text-white lg:text-[40px] text-center">Chayakorn Restaurant</h1>
                        </div>
                        <p className="text-md text-center lg:text-lg lg:text-start text-white">
                            In addition to our delicious burgers, we offer a selection of crispy fried favorites that complement our dishes perfectly. The ambiance of our restaurant is warm and inviting, making it the perfect spot to relax with friends or enjoy a meal with family. We believe in creating a memorable dining experience for all our guests, and we can’t wait to welcome you!
                        </p>
                        <div className="flex justify-center gap-[20px] lg:justify-start">
                            <button className="btn btn-sm btn-outline rounded-full mt-3 w-[130px] text-black hover:bg-black hover:text-warning lg:btn-md">Location</button>
                        </div>
                    </div>
                    <div className="w-full lg:w-[550px] flex-col lg:flex-row-reverse">
                        <img
                            src={restaurant}
                            alt="Restaurant"
                            className="max-w-full h-auto slide-right"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
