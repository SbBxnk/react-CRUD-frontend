import Navbar from "../component/navbar";
import Footer from "../component/footer";
import Contact from '../component/contact'
import EmployeeList from "../component/emp_list";


export default function emplist() {
    return (
        <>
            <Navbar />
            <EmployeeList />
            <Contact />
            <Footer/>
        </>
    )
}