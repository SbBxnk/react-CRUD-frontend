import Navbar from "../component/navbar";
import { useState } from "react";


export default function CalAge() {
    const [age, setAge] = useState("");
    const [result, setResult] = useState("");

    const determineAgeGroup = (age) => {
        const numericAge = parseInt(age,0);
        if (numericAge > 0 && numericAge <= 10) {
            return "กลุ่มเด็ก (Children)";
        } else if (numericAge >= 11 && numericAge <= 20) {
            return "กลุ่มวัยรุ่น (Teenage)";
        } else if (numericAge >= 21 && numericAge <= 35) {
            return "กลุ่มวัยทำงาน (Adult)";
        } else if (numericAge >= 36 && numericAge <= 55) {
            return "กลุ่มวัยกลางคน (Middle age)";
        } else if (numericAge >= 56) {
            return "กลุ่มสูงวัย (Old age)";
        } else {
            return "อายุไม่ถูกต้อง";
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const ageGroup = determineAgeGroup(age);
        setResult(ageGroup);
    };


return (
    <>
        <Navbar />
        <div className="container  mx-auto max-w-[1200px] my-5">
           
            <div className="divider divider-neutral py-5"> <h1 className="text-3xl text-center py-5 text-orange-300">คำนวณกลุ่มอายุ</h1></div>
         

            <div className="flex h-screen flex-col items-center mt-5">
                <form onSubmit={handleSubmit}>
                    <label className="form-control w-full max-w-xs mb-5">
                        <div className="label">
                            <span className="text-[16px] label-text text-neutral">ป้อนอายุ</span>
                        </div>
                        <input type="number" placeholder="ป้อนอายุ" className="input input-bordered w-full max-w-xs bg-white" value={age} onChange={(e) => setAge(e.target.value)} required/>
                    </label>
                    <div className="flex justify-center items-center">
                        <button type="submit" className="btn btn-outline btn-warning py-0" 
                        onClick={() => document.getElementById("CalAge").showModal()}>ยืนยัน</button>
                    </div>
                </form>
               
            </div>

            <dialog id="CalAge" className="modal">
                <div className="modal-box bg-white">
                    <h1 className="font-bold text-lg text-center mb-3">ผลลัพธ์</h1>
                    <hr />
                    <h1 className="text-[40px] text-center text-orange-300"> {<p>อายุ: {age} ปี <br/>{result}</p>}</h1>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>Close</button>
                </form>
            </dialog>
        </div>


    </>
)
}
