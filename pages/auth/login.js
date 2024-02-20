import { isEmail } from "@/utils/validator"
import { login } from "@/operations/auth.fetch"
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import '@/styles/routes/auth/login.scss'
import { useState } from "react";
import { Input, Button, InputGroup, InputRightElement } from '@chakra-ui/react' // Import InputGroup and InputRightElement
import { useRouter } from "next/router";

function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false) // Declare showPassword state
    const router = useRouter()

    const handleLogin = async () => {
        if (!isEmail(email)) {
            alert('Please enter a valid email')
            return
        }
        if (password.length < 8) {
            alert('Password must be at least 8 characters')
            return
        }
        const res = await login({ email, password });
        console.log(res);
        if (res.status === 200) {
            alert('Login successful')
            window.location.href = '/'
        } else {
            alert('Login failed, Please check your credentials')
        }
    }

    const handlePasswordVisibility = () => setShowPassword(!showPassword);

    return (
        <>
            <div className="Login">
                <div className="Login__icon" 
                    onClick={() => router.push('/')} style={
                        {
                            cursor: 'pointer'
                        }
                    }>
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
                    <InputGroup>
                        <Input
                            placeholder="Password"
                            type={showPassword ? "text" : "password"} // change type based on showPassword
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                color: '#737F95',
                                border: '1px solid #737F95',
                            }}
                        />
                        <InputRightElement onClick={handlePasswordVisibility}>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </InputRightElement>
                    </InputGroup>
                    <Button onClick={handleLogin} style={{
                        backgroundColor: '#113447',
                        color: 'white',
                        width: '100%',
                        marginTop: '1rem',
                        borderRadius: '7px'
                    }}>Login</Button>
                    <p style={{ textAlign: 'center', marginTop: '1rem' }}>Don't have an account? <span onClick={() => { router.push('/auth/register') }} style={{ color: '#113447', cursor: "pointer" }}>Sign Up</span></p>
                </div>

            </div>
        </>
    )
}

export default Login