import React from "react";
import { Outlet } from "react-router-dom";


const Index= () => {
    const logout=()=>{
        localStorage.clear('')
        window.location.href = '/login'
    }
    if (localStorage.getItem('token') != null){
        return(
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-secondary bgt">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">Navbar</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div className="navbar-nav">
                            <a className="nav-link active" href="/admin/home">Home</a>
                            <a className="nav-link " href="/admin/user">User</a>
                            </div>
                        </div>
                        <span className="d-flex">
                            <button onClick={logout} className="btn btn-primary" href="/logout">Logout</button>
                        </span>
                    </div>
                </nav>
                <div className="container mt-2">
                    <div className="row">
                        <div className="col">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>

        );
    }

}

export default Index;