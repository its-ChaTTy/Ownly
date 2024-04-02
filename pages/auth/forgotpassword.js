const bcrypt = require("bcryptjs");
import { useRouter } from "next/router";
import { updatePassword, sendOtp } from "@/operations/auth.fetch";
import { useState } from "react";
import { Input, Button, FormControl, InputGroup, InputRightElement } from '@chakra-ui/react'
import {
    Modal, ModalOverlay,
    ModalContent,
    CloseButton
} from '@chakra-ui/react';
import { isPassword } from "@/utils/validator";


function forgotpassword() {

    const router = useRouter();
    const [email, setEmail] = useState("");
    const [id, setId] = useState("");
    const [otp, setOtp] = useState("");
    const [userOtp, setUserOtp] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showResetPassword, setShowResetPassword] = useState(false);
    const [showOtp, setShowOtp] = useState(false);

    const handleSendOtp = async () => {
        const data = { email };
        const response = await sendOtp(data);
        if (response.status === 200) {
            console.log("recieved otp: ", response.otp);
            setId(response.id);
            setOtp(response.otp);
            setShowOtp(true);
        }
        else {
            alert(response.message);
        }
    }

    const handleVerifyOtp = async () => {
        if (otp === "") {
            alert("Please enter OTP");
            return;
        }
        if (bcrypt.compareSync(userOtp, otp)) {
            setShowOtp(false);
            setShowResetPassword(true);
        }
        else {
            alert("Invalid OTP");
        }
    }


    const handleResetPassword = async () => {
        if (!isPassword(password)) {
            alert('Password must be at least 8 characters, contain at least 1 letter and 1 number')
            return
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        const data = { email, password, id };
        const response = await updatePassword(data);
        if (response.status === 200) {
            alert(response.message);
            router.push("/auth/login");
        }
        else {
            alert(response.message);
        }
    }

    return (
        <div>
            {showOtp ? (
                <Modal isOpen={showOtp} onClose={() => setShowOtp(false)} size={'sm'} isCentered>
                    <ModalOverlay />
                    <ModalContent textAlign={'center'}>
                        <CloseButton onClick={() => setShowOtp(false)} />
                        <h1>Enter OTP</h1>
                        <FormControl>
                            <Input
                                placeholder="OTP"
                                value={userOtp}
                                onChange={(e) => setUserOtp(e.target.value)}
                            />
                        </FormControl>
                        <Button onClick={handleVerifyOtp}>Verify OTP</Button>
                    </ModalContent>
                </Modal>
            ) : null}
            {
                showResetPassword ? (
                    <Modal isOpen={showResetPassword} onClose={() => setShowResetPassword(false)} size={'sm'} isCentered>
                        <ModalOverlay />
                        <ModalContent textAlign={'center'}>
                            <CloseButton onClick={() => setShowResetPassword(false)} />
                            <h1>Reset Password</h1>
                            <FormControl>
                                <Input
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </FormControl>
                            <FormControl>
                                <Input
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </FormControl>
                            <Button onClick={handleResetPassword}>Reset Password</Button>
                        </ModalContent>
                    </Modal>
                ) : null
            }
            <h1>Forgot Password</h1>
            <FormControl>
                <Input
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>
            <Button onClick={handleSendOtp}>Send OTP</Button>                
        </div>
    )
}

export default forgotpassword