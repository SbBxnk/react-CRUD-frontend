import Navbar from "../component/navbar";
import { useState } from "react";

export default function CalGrade() {

    const [midterm, setMidterm] = useState("");
    const [final, setFinal] = useState("");
    const [total, getTotal] = useState("");
    const [grade, getGrade] = useState("");


    const CalTotal = (midterm, final) => {
        const sum = Number(midterm) + Number(final);
        return sum;
    }

    const calGrade = (sum) => {
        if (sum >= 80 ) {
            return "A";
        } else if (sum >=75) {
            return "B+";
        } else if (sum >=70) {
            return "B";
        } else if (sum >=65) {
            return "C+";
        } else if (sum >=60) {
            return "C";
        } else if (sum >=55) {
            return "D+";
        } else if (sum >=50) {
            return "D";
        } else if (sum < 50) {
            return "F";
        } else {
            return "เกรดไม่ถูกต้อง";
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault(); 
        const calculateTotal = CalTotal(midterm, final);
        getTotal(calculateTotal);
        
        const calculatedGrade = calGrade(calculateTotal); 
        getGrade(calculatedGrade);
    }

    return (
        <>
            <Navbar />
            <div className="container mx-auto max-w-[1200px] my-5">
                <h1 className="text-3xl text-center py-5 text-orange-300">คำนวณเกรด</h1>
                <hr />
                <div className="flex h-screen flex-col items-center mt-5">
                    <form onSubmit={handleSubmit}>
                        <label className="form-control w-full max-w-xs mb-5">
                            <div className="label">
                                <span className="text-[16px] label-text text-neutral">คะแนนสอบกลางภาค</span>
                            </div>
                            <input type="number" value={midterm} onChange={(e) => setMidterm(e.target.value)} placeholder="ป้อนคะแนนสอบกลางภาค" className="input input-bordered w-full max-w-xs bg-white" />
                        </label>
                        <label className="form-control w-full max-w-xs mb-5">
                            <div className="label">
                                <span className="text-[16px] label-text text-neutral">คะแนนสอบปลายภาค</span>
                            </div>
                            <input type="number" value={final} onChange={(e) => setFinal(e.target.value)} placeholder="ป้อนคะแนนสอบปลายภาค" className="input input-bordered w-full max-w-xs bg-white" />
                        </label>
                        <div className="flex justify-center items-center">
                            <button type="submit" className="btn btn-outline btn-warning py-0" 
                            onClick={() => document.getElementById("CalGrade").showModal()} >ยืนยัน</button>
                        </div>
                    </form>
                </div>
             
                <dialog id="CalGrade" className="modal">
                <div className="modal-box bg-white">
                    <h1 className="font-bold text-lg text-center mb-3">ผลลัพธ์</h1>
                    <hr />
                    <h1 className="text-[40px] text-center text-orange-300"> {<p>รวมคะแนน : {total} คะแนน <br/>เกรด: {grade}</p>}</h1>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>Close</button>
                </form>
            </dialog>
                
            </div>
        </>
    )
}
