import { isEmail, isName, isPassword } from "@/utils/validator"
import { register } from "@/operations/auth.fetch"
import { Input, Button, FormControl } from '@chakra-ui/react'
import { useState } from "react"
import '@/styles/routes/auth/register.scss'
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/router"

function Register() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()
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
            alert('Password must be at least 8 characters, contain at least 1 letter and 1 number')
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
            alert(res.message)
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
                    <FormControl>
                        <Input placeholder="Name" onChange={(e) => setName(e.target.value)} style={{
                            color: '#737F95',
                            border: '1px solid #737F95',
                            backgroundColor: 'white'
                        }} type="text" value={name} />
                    </FormControl>
                    <FormControl>
                        <Input placeholder="Email" onChange={(e) => setEmail(e.target.value)} style={{
                            color: '#737F95',
                            border: '1px solid #737F95',
                            backgroundColor: 'white'
                        }} type="email" value={email} />
                    </FormControl>
                    <FormControl>
                        <Input placeholder="Password" onChange={(e) => setPassword(e.target.value)} style={{
                            color: '#737F95',
                            border: '1px solid #737F95',
                        }} type="password" value={password} />
                    </FormControl>
                    <FormControl>
                        <Input placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} style={{
                            color: '#737F95',
                            border: '1px solid #737F95',
                        }} type="password" value={confirmPassword} />
                    </FormControl>
                    <Button onClick={handleRegister} style={{
                        backgroundColor: '#113447',
                        color: 'white',
                        width: '100%',
                        marginTop: '1rem',
                        borderRadius: '7px'
                    }}>Register</Button>
                    <p style={{ textAlign: 'center', marginTop: '1rem' }}>Already have an account? <span onClick={() => { router.push('/auth/login') }} style={{ color: '#113447', cursor: "pointer" }}>Login</span></p>
                </div>
            </div>
        </>
    )
}

export default Register