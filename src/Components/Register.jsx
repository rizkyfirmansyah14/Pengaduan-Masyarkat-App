import React, {
    useState,
    useEffect
} from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function Login(props) {
    const MySwal = withReactContent(Swal)
    const URL_API = `http://localhost:8000`

    // Handle Add data pengaduan
  const handleSubmit = async e => {
    e.preventDefault();
    let formData = new FormData(e.target)
    try {
        const fetchApi = await fetch(`${URL_API}/register-user`, {
            method: 'POST',
            body: formData
        })
        const create = await fetchApi.json()
        console.log(create)
        if (create.success) {
            Swal.fire({
                icon: 'success',
                title: 'Succes Add Data complaint',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            }).then(function () {
                window.location.href = '/'
                window.$('#addModal').modal('hide')
                Swal.fire({
                    title: 'Loading...',
                    timer: 1000,
                    didOpen: () => {
                        Swal.showLoading()
                    },
                })
            })
        }
    } catch (error) {
        Swal.fire({
            icon: 'success',
            title: 'Succes Add Data complaint',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        }).then(function () {
            window.location.href = '/'
            window.$('#addModal').modal('hide')
            Swal.fire({
                title: 'Loading...',
                timer: 1000,
                didOpen: () => {
                    Swal.showLoading()
                },
            })
        })
    }
  }

    
    return(
        <>
        <main className="d-flex align-items-center min-vh-100 py-3 py-md-0 m-5">
            <div className="container">
                <div className="card login-card">
                <div className="row no-gutters">
                    <div className="col-md-5">
                    <img src="assets/images/login.jpg" alt="login" className="login-card-img" />
                    </div>
                    <div className="col-md-7">
                    <div className="card-body">
                        <div className="brand-wrapper">
                        <img src="assets/images/logo.svg" alt="logo" className="logo" />
                        </div>
                        <p className="login-card-description">Register into your account</p>
                        <form onSubmit={e => handleSubmit(e)}>
                        <div className="form-group">
                            <label htmlFor="email" className="sr-only">NIK</label>
                            <input 
                                type="text" 
                                name="nik" 
                                id="nik" 
                                className="form-control" 
                                placeholder="NIK" 
                                required
                                />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email" className="sr-only">Nama</label>
                            <input 
                                type="text" 
                                name="nama" 
                                id="nama" 
                                className="form-control" 
                                placeholder="Name" 
                                required
                                />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email" className="sr-only">Email</label>
                            <input 
                                type="email" 
                                name="email" 
                                id="email" 
                                className="form-control" 
                                placeholder="Email address" 
                                required
                                />
                        </div>
                        <div className="form-group mb-4">
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                type="password" 
                                name="password" 
                                id="password" 
                                className="form-control" 
                                placeholder="password" 
                                required
                                />
                        </div>
                        <input name="login" id="login" className="btn btn-block login-btn mb-4" type="submit" defaultValue="Login" />
                        </form>
                        <p className="login-card-footer-text">have an account? <a href="/" className="text-reset">Login here</a></p>
                        <nav className="login-card-footer-nav">
                        <a href="#!">Terms of use.</a>
                        <a href="#!">Privacy policy</a>
                        </nav>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </main>
        </>
    )
}

export default Login