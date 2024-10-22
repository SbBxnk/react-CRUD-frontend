import Navbar from "../component/navbar";
import Introduction from "../component/banner";
import Product from "../component/product";
import About from "../component/about";
import Footer from "../component/footer";
import Contact from '../component/contact'


export default function home() {
    return (
        <>
            <Navbar />
            <Introduction/>
            <About />
            <Product />
            <Contact />
            <Footer/>
        </>
    )
}