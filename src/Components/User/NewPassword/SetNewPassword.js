import React, {  useState } from 'react'
import axios from  "axios";
import {  useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Avatar, Grid,TextField,Button,Typography ,Link} from '@mui/material';
const SetNewPassword = () => {
    
    const [password,setPassword] = useState('')
    const [passwordError,setPasswordError] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [confirmPasswordError,setConfirmPasswordError] = useState('')
    const isPasswordValid = '^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$'

    const onchangePassword = (e) =>{
       
        setPassword(e.target.value)
        setPasswordError('')
        if(!(password.match(isPasswordValid))){
            setPasswordError("Password must be greater than 8 characters & contain minimum 1 special charater & number.")
        }
       
    } 
    const onchangeConfirmPassword = (e) =>{
        setConfirmPassword(e.target.value)
        setConfirmPasswordError('')
        
        if(password  !== (e.target.value) ){
            setConfirmPasswordError('Confirm password did not match')
        } 
        
    } 
   
   
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
    const buttonStyle = {
        margin:"8px 0px",
        backgroundColor:"#5d5de7",
        width:"350px"
    }
    const fieldStyle = {
        margin:"8px 0px",
        width:"350px"
    }
 

    // useEffect(() => {
    //     otpGenerate()
    // },[email,otpGenerate])
    //Submit
    const handleSubmit = async(e) =>{
        e.preventDefault()
        if(!password){
            setPasswordError("Please enter your password")
        }
        if(!confirmPassword){
            setConfirmPasswordError("Please enter confirm password")
        }
        if(confirmPassword !== password ){
            setConfirmPasswordError('Confirm password did not match')
        }
        if(confirmPassword === password ){
            alert("done")
        }
        // if(email){
        //     let result = await axios.post('http://localhost:5000/user/SetNewPassword',{
        //         email:email
        //     })
        //     .then(result =>{
        //         console.log(result);
        //         console.log(result.data.user)
        //         console.log(result.message)
        //         console.log(result.data.message)
        //         console.log(email)
        //         toast.success(result.data.message)
        //         otpGenerate()
        //         setTimeout(() => {
        //           navigate("/home")
        //         }, 7000);
        //     })
        //     .catch(err => {
        //         console.log(err.response.data)
        //         // setError(err.response.data.message)
        //         toast.error(err.response.data.message)
        //         setTimeout(() => {
        //         //   setError("")
        //         }, 5000);
                
        //     })
        // }

        // if(!emailError){
        //     otpGenerate()
        //     let o = document.querySelector("#otp")
        //     console.log(o);
        //     o.classList.remove('otpFieldHide')
        //     o.classList.add('otpFieldShow')
        //     o.style.display ="block"
        // }
        // if(email && !otp){
        //     otpGenerate()
        // }
        // if(otp && email){
        //     navigate('/home')
        // }
       
    }
  return (
    <Grid >
        <Grid elevation={10} style={paperStyle}>
            <Grid align='center'>
                <h3>Set New Password</h3>
            </Grid>
            <TextField 
                id="outlined-basic" 
                name='password'
                label="New Password" 
                placeholder="Enter your new password"
                variant="outlined"
                type='password'
                // fullWidth
                style={fieldStyle}
                onChange={onchangePassword}
                error={passwordError}
                helperText={passwordError}
            />
            <TextField 
                className='otpFieldHide'
                id="confirmPassword" 
                label="Confirm Password" 
                name='confirmpassword'
                type='password'
                placeholder="Pleases confirm your password"
                variant="outlined"
                // fullWidth
                style={fieldStyle}
                onChange={onchangeConfirmPassword}
                error={confirmPasswordError}
                helperText={confirmPasswordError}
            />

            <Button 
                type='submit'
                variant="contained"
                // color="primary"
                fullWidth
                style={buttonStyle}
                onClick={handleSubmit}
            >
            Login</Button>
        </Grid>
        <ToastContainer />
    </Grid>
  )
}

export default SetNewPassword;