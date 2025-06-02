import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'

import Login from "./admin/login";
import User from "./admin/user";
import TambahUser from "./admin/tambah_user";
import EditUser from "./admin/edit_user";
import Index from "./admin";
import Home from "./admin/home"
function App() {
  return(
    <BrowserRouter>
              <Routes>
                <Route path='/' element={<Login />} /> 
                <Route path='/admin' element={<Index />} > 
                  <Route path='/admin/home' element={<Home />}/>
                  <Route path='/admin/user' element={<User />} /> 
                  <Route path='/admin/adduser' element={<TambahUser />} /> 
                  <Route path='/admin/edituser/:id' element={<EditUser />} /> 
                </Route>
              </Routes>
    </BrowserRouter>

  );
}
export default App