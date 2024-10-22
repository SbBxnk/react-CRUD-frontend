import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faLocationDot } from "@fortawesome/free-solid-svg-icons";

export default function Contact() {
    return (
        <div className="bg-white h-auto lg:h-[550px]" id="contact">
            <div className="z-10 container mx-auto max-w-[1200px] pt-[40px] pb-[60px]">
                <div className="divider divider-neutral divider-end">
                    <h1 className="text-3xl text-center py-5 text-warning font-bold px-4">Contact</h1>
                </div>
                <div className="flex flex-col lg:flex-row h-auto lg:h-[400px] items-center justify-center gap-[30px] lg:gap-[60px] px-4">
                    <div className="w-full lg:w-1/2">
                        <h1 className="text-4xl lg:text-6xl font-bold text-black">
                            Get <span className="text-2xl lg:text-[40px] font-bold text-warning">in touch</span>
                        </h1>
                        <div className="contact py-5">
                            <div className="flex items-center gap-5 py-2">
                                <div className="text-xl w-10 h-10 bg-warning rounded-full flex justify-center items-center">
                                    <FontAwesomeIcon icon={faPhone} className='text-white' />
                                </div>
                                <p className='text-black'>065-4545XXXX</p>
                            </div>
                            <div className="flex items-center gap-5 py-2">
                                <div className="text-xl w-10 h-10 bg-warning rounded-full flex justify-center items-center">
                                    <FontAwesomeIcon icon={faEnvelope} className='text-white' />
                                </div>
                                <p className='text-black'>chayakorn_po65@live.rmutl.ac.th</p>
                            </div>
                            <div className="flex items-center gap-5 py-2">
                                <div className="text-xl w-10 h-10 bg-warning rounded-full flex justify-center items-center">
                                    <FontAwesomeIcon icon={faLocationDot} className='text-white' />
                                </div>
                                <p className='text-black'>Village No.4</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-[550px]">
                        <div className="bg-base-100 w-full max-w-sm shadow-xl bg-white">
                            <form className="card-body">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-black font-bold">Name</span>
                                    </label>
                                    <input type="text" placeholder="Your name..." className="input input-bordered bg-white" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-black font-bold">Email</span>
                                    </label>
                                    <input type="text" placeholder="Your email..." className="input input-bordered bg-white" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-black font-bold">Message</span>
                                    </label>
                                    <textarea className="textarea textarea-bordered bg-white" placeholder="Message..." required></textarea>
                                </div>
                                <div className="form-control mt-6">
                                    <button className="btn btn-warning">Send</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
