import { Box, Button, Card,CardContent, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import Center from './Center'
import useForm from "./hooks/useForm";
import { ENDPOINTS, createAPIEndpoint } from "../api";

export default function Login() {
    const getFreshModel=()=>({
        name:'',
        email:''
    });

   
   const{  values,
         setValues,
         errors,
          setErrors,
          handleInputChange
        } = useForm(getFreshModel);  

        const login = e => {
            e.preventDefault();
            if (validate())
                createAPIEndpoint(ENDPOINTS.participant)
                    .post(values)
            .then(res => console.log(res))
            .catch(err => console.log(err))
            
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
        QuizApp
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
              Start
            </Button>
          </form>
        </Box>
      </CardContent> 
    </Card>
    </Center>
   
  );
}


