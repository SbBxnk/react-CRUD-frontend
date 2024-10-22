import Navbar from "../component/navbar";
import Menu from "../component/product";
import Footer from "../component/footer";
import Contact from '../component/contact'


export default function menu() {
    return (
        <>
            <Navbar />
            <Menu />
            <Contact />
            <Footer/>
        </>
    )
}