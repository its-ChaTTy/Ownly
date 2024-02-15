import { isEmail, isName, isPassword } from "@/utils/validator"
import { register } from "@/operations/auth.fetch"
import { Input, Button, FormControl, InputGroup, InputRightElement } from '@chakra-ui/react'
import { useState } from "react"
import '@/styles/routes/auth/register.scss'
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/router"

function Register() {

    const router = useRouter();
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [location, setLocation] = useState('');
    const [name, setName] = useState('');

    const handleRegister = async () => {
        if (!isEmail(email)) {
            alert('Please enter a valid email')
            return;
        }
        if (!isName(name)) {
            alert('Please enter a valid name')
            return;
        }
        if (!isPassword(password)) {
            alert('Password must be at least 8 characters, contain at least 1 letter and 1 number')
            return
        }
        if (password !== confirmPassword) {
            alert('Passwords do not match')
            return
        }
        const res = await register({ email, password, name, phone: parseInt(phoneNumber), address, location })
        if (res.status === 200) {
            alert('Registration successful')
            window.location.href = '/'
        } else {
            alert(res.message)
        }
    }

    const handlePasswordVisibility = async () => setShowPassword(!showPassword);
    const handleConfirmPasswordVisibility = async () => setShowConfirmPassword(!showConfirmPassword);

    return (
        <>
            <div className="Register">
                <div className="Register__icon"
                    onClick={() => router.push('/')}
                    style={
                        {
                            cursor: 'pointer'
                        }
                    }>

                    <FaArrowLeft />
                </div>
                <div className="Register__sideimg">
                </div>
                <div className="Register__form">
                    <h1>Hello User</h1>
                    <p>Sign up to create an account.</p>
                    <FormControl>
                        <Input placeholder="Name" onChange={(e) => setName(e.target.value)} type="text" value={name} />
                    </FormControl>
                    <FormControl>
                        <Input placeholder="Email (SNU Id)" onChange={(e) => setEmail(e.target.value)} type="email" value={email} />
                    </FormControl>
                    <FormControl>

                        <InputGroup>
                            <Input
                                placeholder="Password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <InputRightElement onClick={handlePasswordVisibility}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>
                    <FormControl>
                        <InputGroup>
                            <Input
                                placeholder="Confirm Password"
                                type={showConfirmPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}

                            />
                            <InputRightElement onClick={handleConfirmPasswordVisibility}>
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>
                    <FormControl>
                        <Input placeholder="Phone Number" onChange={(e) => setPhoneNumber(e.target.value)} type="number"
                            value={phoneNumber} />
                    </FormControl>
                    <FormControl>
                        <Input placeholder="Address (Hostel Name & Room No.)" onChange={(e) => setAddress(e.target.value)} type="text" value={address} />
                    </FormControl>
                    <FormControl>
                        <Input placeholder="Location" onChange={(e) => setLocation(e.target.value)} type="text" value={location} />
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