import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CalGrade from './workshop/calgrade'
import Home from './workshop/home'
import Calage from './workshop/calage'
import Login from './workshop/login'
import About from './workshop/about';
import Menu from './workshop/menu';
import Contact from './workshop/contact';
import Dashboard from './admin/dashboard';
import EmployeeList from './workshop/emplist';


export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path='home' element={<Home />}></Route>
          <Route path='about' element={<About />}></Route>
          <Route path='menu' element={<Menu />}></Route>
          <Route path='contact' element={<Contact />}></Route>
          <Route path='login' element={<Login />}></Route>

          {/* login active */}
          <Route path='dashboard' element={<Dashboard />}></Route>


          {/* workshop */}
          <Route path='calgrade' element={<CalGrade />}></Route>
          <Route path='calage' element={<Calage />}></Route>
          <Route path='emplist' element={<EmployeeList />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
