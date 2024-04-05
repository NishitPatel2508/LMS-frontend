import React, { useEffect, useState } from 'react'
import axios from  "axios";
import {  useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Avatar, Grid,TextField,Button,Typography ,Link} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Login = () => {
    const [email ,setEmail] = useState("")
    const [password ,setPassword ] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [value,setValue] = useState()
    const navigate = useNavigate()

    //Style
    const paperStyle ={
        padding:20,
        height:'90vh',
        width:280,
        margin:"20px auto",
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        flexDirection:"column"

    }
    const avatarStyle = {
        backgroundColor: '#5d5de7'
    }
    const buttonStyle = {
        margin:"8px 0px",
        backgroundColor:"#5d5de7",
        width:"350px"
    }
    const fieldStyle = {
        margin:"8px 0px",
        width:"350px"
    }
    //Regex
    const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;
    //Input Field
    const onChangeEmail = (e) =>{
        setEmail(e.target.value)
        console.log(typeof(email));
        setEmailError('')
        if((!isValidEmail.test(email))){
          setEmailError("Please enter valid email.")
        }    
    }
    const onChangePassword = (e) =>{
        setPassword(e.target.value)
        setPasswordError("")
    }
    //Login Validation
    const validUser = []
   
    const checkEmailExistOrNot = (alldata) =>{
        alldata.map((singleField) =>{
            console.log(singleField.email);
            // if(singleField.email === email){
            //     setEmailError("")
                
            // } else{
            //     toast.error("Email doesn't match")
            //     // setEmailError("Email doesn't match")
            //     console.log("Email doesn't match");
            // }
            // if(singleField.password === password){
            //     setPasswordError("");
            //     alert("Valid Password")
                
            // }else{
            //     toast.error("Password doesn't match")
            //     // setPasswordError("Password doesn't match");
            //     console.log("Password doesn't match");
            // }
            if(singleField.email === email){
                validUser = singleField;
                console.log(validUser);
                if(validUser){
                    if(validUser.password === password){
                        toast.success("Login successfully !");
                    } else {
                        toast.error("Invalid Password!");
                    }
                } else {
                    toast.error("Please enter valid email id");
                }
               
                
            }else{
                toast.error("Invalid EmailId and Password")
                // setEmailError("Email doesn't match")
                console.log("Email doesn't match");
            }
        })
    }
    const handleSubmit = async(e) =>{
        e.preventDefault()
        if(!email){
            setEmailError("Email is required")
        }
        if(!password){
            setPasswordError("Password is required")
        }
        if(email && password){
            debugger
            const header = {"Access-control-Allow-Origin":"*"}
            let result = await axios.get('http://localhost:5000/users',{
                email:email,
                password:password
            })
            .then(result =>{
                console.log(result.data.user)
                checkEmailExistOrNot(result.data.user)
                console.log(email,password)
                setTimeout(() => {
                  navigate("/home")
                }, 7000);
            })
            .catch(err => {
                console.log(err.response.data)
                // setError(err.response.data.message)
                toast.error(err.response.data.message)
                setTimeout(() => {
                //   setError("")
                }, 5000);
                
            })
            
        }
    }
  return (
   
    <Grid >
        <Grid elevation={10} style={paperStyle}>
            <Grid align='center'>
                <Avatar style={avatarStyle}><AccountCircleIcon/></Avatar>
                <h3>Sign in</h3>
            </Grid>
            <TextField 
                id="outlined-basic" 
                name='email'
                label="Email" 
                placeholder="Enter your Email ID"
                variant="outlined"
                // fullWidth
                style={fieldStyle}
                onChange={onChangeEmail}
                error={emailError}
                helperText={emailError}
            />
            <TextField 
                id="outlined-basic" 
                label="Password" 
                name='password'
                type='password'
                placeholder="Enter your Password"
                variant="outlined"
                // fullWidth
                style={fieldStyle}
                onChange={onChangePassword}
                error={passwordError}
                helperText={passwordError}
            />
    
            <Button 
                type='submit'
                variant="contained"
                // color="primary"
                fullWidth
                style={buttonStyle}
                onClick={handleSubmit}
            >
            Sign in</Button>
            <Typography >
                <Link href="#" underline="none">Forgot password?</Link>
            </Typography>
            <Typography> 
                <Link href="#" underline="none">Create new account</Link>
            </Typography>
        </Grid>
        <ToastContainer />
    </Grid>
        
  )
}

export default Login