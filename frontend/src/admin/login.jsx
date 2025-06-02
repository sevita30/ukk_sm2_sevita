import React from "react";
import Swal from "sweetalert2";

const Login = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const fData = {};

    // Ambil data dari form
    for (let elm of event.target.elements) {
      if (elm.type === "email" || elm.type === "password") {
        fData[elm.name] = elm.value;
      }
    }

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fData),
      });

      if (response.status === 401) {
        Swal.fire({
          icon: "error",
          title: "Password Salah",
        });
        return;
      }

      if (response.status === 404) {
        Swal.fire({
          icon: "warning",
          title: "Email Tidak Ditemukan",
        });
        return;
      }

      if (!response.ok) {
        Swal.fire({
          icon: "error",
          title: "Terjadi kesalahan server",
        });
        return;
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      event.target.reset();
      window.location.href = "/admin";
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Gagal terhubung ke server",
      });
    }
  };

  return (
    <div className="us">
      <main style={{ maxWidth: 500, padding: "1rem" }} className="mt-3">
        <div className="card login">
          <div className="text-center">
            <h3>Login</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="form-control"
                  required
                />
              </div>
            </div>
            <div className="card-footer text-end">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Login;
