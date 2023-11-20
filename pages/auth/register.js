import { isEmail, isName, isPassword } from "@/utils/validator"
import { register } from "@/operations/auth.fetch"
import { Input, Button } from '@chakra-ui/react'
import { useState } from "react"
import '@/styles/routes/auth/register.scss'
import { FaArrowLeft } from "react-icons/fa";



function Register() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleRegister = async () => {
        if (!isEmail(email)) {
            alert('Please enter a valid email')
            return
        }
        if (!isName(name)) {
            alert('Please enter a valid name')
            return
        }
        if (!isPassword(password)) {
            alert('Password must be at least 8 characters')
            return
        }
        if (password !== confirmPassword) {
            alert('Passwords do not match')
            return
        }
        const res = await register({ email, password, name })
        if (res.status === 200) {
            alert('Registration successful')
            window.location.href = '/'
        } else {
            alert('Registration failed, Please check your credentials')
        }
    }


    return (
        <>
            <div className="Register">
                <div className="Register__icon">
                    <FaArrowLeft />
                </div>
                <div className="Register__sideimg">
                </div>
                <div className="Register__form">
                    <h1>Hello User</h1>
                    <p>Sign up to create an account.</p>
                    <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} style={{
                        color: '#737F95',
                        border: '1px solid #737F95',
                        backgroundColor: 'white'
                    }} />
                    <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={{
                        color: '#737F95',
                        border: '1px solid #737F95',
                        backgroundColor: 'white'
                    }} />
                    <Input placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={{
                        color: '#737F95',
                        border: '1px solid #737F95',
                    }} />
                    <Input placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} style={{
                        color: '#737F95',
                        border: '1px solid #737F95',
                    }} />
                    <Button onClick={handleRegister} style={{
                        backgroundColor: '#113447',
                        color: 'white',
                        width: '100%',
                        marginTop: '1rem',
                        borderRadius: '7px'
                    }}>Register</Button>
                    <p style={{ textAlign: 'center', marginTop: '1rem' }}>Already have an account? <span style={{ color: '#113447' }}>Login</span></p>
                </div>
            </div>
        </>
    )
}

export default Register