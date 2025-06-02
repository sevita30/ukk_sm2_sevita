import React, { useState, useEffect} from "react";
import Swal from "sweetalert2";

const User = () =>{
    const [currentPage, setCurrentPage] = useState(1);
    const [dataPerPage] = useState(5); 
    const [dataUser,setUsers] = useState([])
    const token=localStorage.getItem('token')
    
    const tampildata = async ()=>{
        const response = await fetch("http://localhost:3000/api/users", {
            headers: {
                Authorization:`Bearer ${token}`,
            }
        })
        const data = await response.json()
        setUsers(data)
    }

    useEffect(()=> {
        tampildata();
    }, [])

    const handleDelete = (id) => {
        Swal.fire({
            title: "yakin mau di hapus?",
            showCancelButton: true,
            confirmButtonText:"yakin",
            denyButtonText:"batal"
            }).then((result) => {
                if (result.isConfirmed) {
                    fetch("http://localhost:3000/api/users/" +id,{
                        method: 'DELETE',
                        headers: {
                            Authorization:`Bearer ${token}`,
                        }
                    })
                    .then(response => response.json())
                    .then(res => {
                        window.location.reload();
                    })
                }
            })
            
    } 
    
    const indexOfLastData = currentPage * dataPerPage;
    const indexOfFirstData = indexOfLastData - dataPerPage;
    const currentData = dataUser.slice(indexOfFirstData, indexOfLastData);

    const handleNextPage = () => {
        if (currentPage < Math.ceil(dataUser.length / dataPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return(
        <div style={{
            backgroundImage:`url:("src/assets/circles-background-dark-tones_60389-166.avif")`
        }}>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <a href="/admin/adduser" className="btn btn-primary">Tambah User</a>
                        <table className="table table-striped table-bordered white">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Nama</th>
                                    <th>Email</th>
                                    <th>Edit</th>
                                    <th>hapus</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentData.length>0?(
                                    currentData.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.nama}</td>
                                            <td>{item.email}</td>
                                            <td>
                                                <a href={`/admin/edituser/${item.id}`} className="btn btn-danger">Edit</a>
                                            </td>
                                            <td>
                                                <button onClick={()=>handleDelete(item.id)} className="btn btn-danger">hapus</button>
                                            </td>
                                        </tr>
                                    ))
                                ):(
                                    <tr>
                                        <td colSpan="5">Data Kosong</td>
                                    </tr>
                                )
                                }
                            </tbody>
                        </table>
                        <div className="d-flex justify-content-between mt-3">
                        <button 
                            onClick={handlePrevPage} 
                            className="btn btn-primary"
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        <span>Page {currentPage} of {Math.ceil(dataUser.length / dataPerPage)}</span>
                        <button 
                            onClick={handleNextPage} 
                            className="btn btn-primary"
                            disabled={currentPage === Math.ceil(dataUser.length / dataPerPage)}
                        >
                            Next
                        </button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default User