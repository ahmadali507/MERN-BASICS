import React from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
const SignIn = () => {

    const [response, setresponse] = useState(false); 
    const [showDialogue, setShowDialogue] = useState(''); 

    const [formdata, setformData] = useState({
        username: '',
        email: '',
        password: '',
    })
     
    const submitform = (e)=>{
        e.preventDefault(); 
        const requestUrl = 'http://localhost:3000/signIn';
        const reqData = formdata; 
        axios.post(requestUrl, reqData).then((res) =>{
            console.log(res)
            setresponse(true); 
            setShowDialogue("Logged In Successful"); 
            
        }).catch(err =>{
            console.log(err)
            setresponse(false);
            setShowDialogue(err.response?.data?.error)
        })
    }

    const handleChange = (e) =>{
        setformData({
         ...formdata, 
         [e.target.name] : e.target.value, 
        });
    }

    return (
        <div className='flex flex-row justify-center mt-[10rem]'>
            <form onSubmit={submitform}>

                <Card className="w-[30vw] justify-center text-center text-foreground  bg-slate-200">
                    <CardHeader>
                        <CardDescription className="text-center text-1xl font-bold">
                            SIGN IN
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className='flex flex-col justify-center gap-4'>
                            {
                                (response!==null) && <div className={(response) ? 'text-violet-500 ' : 'text-red-300'}>

                                    {showDialogue}

                                </div>
                            }
                            <div className='flex flex-col'>
                                <Label className=" text-1xl font-semibold">Email</Label>
                                <Input placeHolder="enter your email" onChange = {handleChange} className="bg-slate-100" name = 'email' value = {formdata.email}></Input>
                            </div>

                            <div className='flex flex-col  '>
                                <Label className=" text-1xl font-semibold">Password</Label>
                                <Input placeHolder="enter your password" onChange = {handleChange} className="bg-slate-100" name = 'password' value = {formdata.password}></Input>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col pb-16">
                        <Button className="w-[20vw] justify-center mt-4"> SIGN In </Button>
                    </CardFooter>
                   

                </Card>

            </form>
        </div>
    )
}

export default SignIn
