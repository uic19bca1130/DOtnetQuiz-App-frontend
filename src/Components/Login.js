import { Box, Button, Card,CardContent, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import Center from './Center'
import useForm from "./hooks/useForm";
import { ENDPOINTS, createAPIEndpoint } from "../api";
import useStateContext from "./hooks/useStateContext";
import { useNavigate } from "react-router";

const getFreshModel=()=>({
    name:'',
    email:''
})


export default function Login() {
 
  const { context, setContext} = useStateContext();
    const navigate = useNavigate()

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange
    } = useForm(getFreshModel);

  //   useEffect(() => {
  //     resetContext()
  // }, [])
        const login = e => {
            e.preventDefault();
            if (validate())
                createAPIEndpoint(ENDPOINTS.participant)
                    .post(values)
            .then(res =>{
                setContext({participantId:res.data.participantId}) 
                navigate('/quiz')   //call the function and pass an object with update participantId and data return to the server//and access with the property data                               
                console.log(context);                    //check the value inside the contact api lets print
            })
            .catch(err => console.log(err));
            
          }

        const validate = () => {
            let temp = {}
            temp.email = (/\S+@\S+\.\S+/).test(values.email) ? "" : "Email is not valid."//validations
            temp.name = values.name != "" ? "" : "This field is required."
            setErrors(temp)
            return Object.values(temp).every(x => x == "")
        }

  return (
    
    <Center>
      <Card sx={{ width: 400 }}>
      <CardContent sx={{textAlign:'Center'}}>
        <Typography variant="h3" sx={{my:3}}>
        Quiz App😎
        </Typography>
        <Box
          sx={{
            "& .MuiTextField-root": {
              m: 1,
              width: "90%",
            },
          }}
        >
          <form noValidate autoComplete="off" onSubmit={login}>
            <TextField label="Email" name="email" value={values.email} onChange={handleInputChange} variant="outlined" 
             {...(errors.email && { error: true, helperText: errors.email })} /> 
            <TextField label="Name" name="name" value={values.name} onChange={handleInputChange} variant="outlined" 
             {...(errors.name && { error: true, helperText: errors.name })} />
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{ width: '100' }}
            >
              Start👉
            </Button>
          </form>
        </Box>
      </CardContent> 
    </Card>
    </Center>

  );
}


