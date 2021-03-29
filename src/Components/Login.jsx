import React, {
    useState,
    useEffect
} from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const MySwal = withReactContent(Swal)

    const loginForm = async e => {
        e.preventDefault()
        let formData = new FormData(e.target)

        try {
            const fetchLogin = await fetch(`http://localhost:8000/login-user`, {
                method: 'POST',
                body: formData
            })
            const datalogin = await fetchLogin.json()
            console.log(datalogin)
            if (datalogin.code == 200) {
                localStorage.setItem('token', datalogin.result.token)
                localStorage.setItem('nama', datalogin.result.nama)
                props.setData({
                    loggedIn: true,
                    user: datalogin.result.token
                })
                MySwal.fire({
                    title: 'Loading...',
                    timer: 1000,
                    didOpen: () => {
                        MySwal.showLoading()
                    }
                })
                props.history.push('/dashboard')
            } else {
                MySwal.fire({
                    icon: 'error',
                    title: 'There is an error!',
                    text: 'Email or password is not correct!'
                })
            }
        } catch (error) {
            console.log(error)
            alert(error)
        }
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            props.history.push('/dashboard')
        }
    }, [props.history])

    
    return(
        <>
        <main className="d-flex align-items-center min-vh-100 py-3 py-md-0">
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
                        <p className="login-card-description">Sign into your account</p>
                        <form onSubmit={loginForm}>
                        <div className="form-group">
                            <label htmlFor="email" className="sr-only">Email</label>
                            <input 
                                type="email" 
                                name="email" 
                                id="email" 
                                className="form-control" 
                                placeholder="Email address" 
                                value={email}
                                onChange={e => setEmail(e.target.value)}
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
                                placeholder="***********" 
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                                />
                        </div>
                        <input name="login" id="login" className="btn btn-block login-btn mb-4" type="submit" defaultValue="Login" />
                        </form>
                        <a href="#!" className="forgot-password-link">Forgot password?</a>
                        <p className="login-card-footer-text">Don't have an account? <a href="/register" className="text-reset">Register here</a></p>
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