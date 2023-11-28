import { isEmail } from "@/utils/validator"
import { login } from "@/operations/auth.fetch"
import { FaArrowLeft } from "react-icons/fa";
import '@/styles/routes/auth/login.scss'
import { useState } from "react";
import { Input, Button } from '@chakra-ui/react'



function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async () => {
        if (!isEmail(email)) {
            alert('Please enter a valid email')
            return
        }
        if (password.length < 8) {
            alert('Password must be at least 8 characters')
            return
        }
        const res = await login({ email, password })
        if (res.status === 200) {
            alert('Login successful')
            window.location.href = '/'
        } else {
            alert('Login failed, Please check your credentials')
        }
    }

    return (
        <>
            <div className="Login">
                <div className="Login__icon">
                    <FaArrowLeft />
                </div>
                <div className="Login__sideimg">
                </div>
                <div className="Login__form">
                    <h1>Hello User</h1>
                    <p>Sign in to your account to access a world of convenience.</p>
                    <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={{
                        color: '#737F95',
                        border: '1px solid #737F95',
                        backgroundColor: 'white'
                    }} />
                    <Input placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={{
                        color: '#737F95',
                        border: '1px solid #737F95',
                    }} />
                    <Button onClick={handleLogin} style={{
                        backgroundColor: '#113447',
                        color: 'white',
                        width: '100%',
                        marginTop: '1rem',
                        borderRadius: '7px'
                    }}>Login</Button>
                    <p style={{ textAlign: 'center', marginTop: '1rem' }}>Don't have an account? <span style={{ color: '#113447' }}>Sign Up</span></p>
                </div>

            </div>
        </>
    )
}

export default Login