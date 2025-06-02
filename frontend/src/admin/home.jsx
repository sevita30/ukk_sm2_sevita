import React, { useState, useEffect } from 'react';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [bukutamuData, setBukutamuData] = useState([]);
 

  const getToken = () => {
    return localStorage.getItem('token'); 
  };

  useEffect(() => {
    const token = getToken();
    if (token) {
      fetchData(token);
    }
  }, []); 

  const fetchData = async (token) => {
    try {
      const userResponse = await fetch('http://localhost:3000/api/users', {
        headers: {
          'Authorization': `Bearer ${token}` 
        }
      });
      const userData = await userResponse.json();
      setUsers(userData);    

      const bukutamuResponse = await fetch('http://localhost:3000/api/bukutamu', {
        headers: {
          'Authorization': `Bearer ${token}` 
        }
      });
      const bukutamuData = await bukutamuResponse.json();
      setBukutamuData(bukutamuData);
   
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };



  return (
    <div>
      <div className="container">
        <div className='col-md-12 text-center'>
          <h1>Selamat Datang <br />
            Di Aplikasi Buku Tamu
          </h1>
        </div>
        <div className="row justify-content-center">
            <div className="col-md-4 text-center white mx-3">
                <h5>Di database <a href="/admin/user">Users</a><br /> terdapat <span className='red'>{users.length}</span> data</h5>
            </div>
        </div>

        </div>
      </div>
    
  );
};

export default Home;