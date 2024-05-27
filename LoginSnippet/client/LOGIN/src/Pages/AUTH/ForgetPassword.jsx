import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ForgetPassword = () => {
    const navigate = useNavigate(); 
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        newPass: '',
        ConfirPass: '', // Fixing the typo in field name (if any backend issue occurs)
    });
    const [response, setResponse] = useState(null);
    const [showDialogue, setShowDialogue] = useState('');

    const submitForm = (e) => {
        e.preventDefault(); // Prevent form from reloading the page

        const requestUrl = 'http://localhost:3000/forget-password'; // Ensure this matches the backend route
        const requestData = formData;
        axios.post(requestUrl, requestData)
            .then((res) => {
                console.log(res.data);
                setResponse(true);
                setShowDialogue('Password has been reset successfully');
                navigate('/signIn')
            })
            .catch((err) => {
                setShowDialogue(err.response?.data?.error || 'An error occurred');
                setResponse(false);
            });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className='flex flex-row justify-center mt-[8rem]'>
            <form onSubmit={submitForm}>
                <Card className="w-[30vw] justify-center text-center text-foreground bg-slate-200">
                    <CardHeader>
                        <CardDescription className="text-center text-1xl font-bold">
                            Change Your Password
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className='flex flex-col justify-center gap-4'>
                            {response !== null && (
                                <div className={response ? 'text-violet-300' : 'text-red-300'}>
                                    {showDialogue}
                                </div>
                            )}
                            <div className='flex flex-col'>
                                <Label className="text-1xl font-semibold">Username</Label>
                                <Input
                                    placeholder="Enter your username"
                                    onChange={handleChange}
                                    className="bg-slate-100"
                                    value={formData.username}
                                    name="username"
                                />
                            </div>

                            <div className='flex flex-col'>
                                <Label className="text-1xl font-semibold">Email</Label>
                                <Input
                                    placeholder="Enter your email"
                                    onChange={handleChange}
                                    className="bg-slate-100"
                                    value={formData.email}
                                    name="email"
                                />
                            </div>

                            <div className='flex flex-col'>
                                <Label className="text-1xl font-semibold">New Password</Label> {/* Update the label */}
                                <Input
                                    placeholder="Enter your new password" /* Update the placeholder */
                                    onChange={handleChange}
                                    className="bg-slate-100"
                                    value={formData.newPass}
                                    name="newPass"
                                    type="password"
                                />
                            </div>
                            <div className='flex flex-col'>
                                <Label className="text-1xl font-semibold">Confirm Password</Label> {/* Update the label */}
                                <Input
                                    placeholder="Confirm your new password" /* Update the placeholder */
                                    onChange={handleChange}
                                    className="bg-slate-100"
                                    value={formData.ConfirPass}
                                    name="ConfirPass"
                                    type="password"
                                />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col">
                        <Button className="w-[20vw] justify-center" type="submit">Change Password</Button>
                    </CardFooter>
                    <CardFooter className="flex flex-col">
                        <Button>
                            <Link to='/signIn' className='text-blue-400'>Sign In</Link>
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </div>
    );
};

export default ForgetPassword;
