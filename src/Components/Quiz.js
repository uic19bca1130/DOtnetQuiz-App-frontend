import React, { useContext, useEffect, useState } from 'react'
import useStateContext from './hooks/useStateContext'
import { ENDPOINTS,createAPIEndpoint,BASE_URL } from '../api'
import { Card, CardContent, CardHeader, List, ListItemButton, Typography,LinearProgress, CardMedia} from '@mui/material'
import { getFormatedTime } from '../helper'
import { useNavigate } from 'react-router-dom'


export default function Quiz() {

 const[qns,setQns]=useState([])
 const [qnIndex, setQnIndex] = useState(0)
 const[timeTaken,setTimeTaken]=useState(0)
 const {context,setContext}=useStateContext()
 const navigate=useNavigate()
 let timer;

 const startTimer= () =>{
    timer= setInterval (()=>{
        setTimeTaken(prev => prev + 1)  
    }, [1000])
 }



    useEffect(()=>{
        setContext({
       timeTaken:0,
       selectedOptions:[]
        })
        createAPIEndpoint(ENDPOINTS.Question)
        .fetch()
        .then(res=>{
         setQns(res.data)
         startTimer()
        })
        .catch(err => { console.log(err); })

        return () => {clearInterval(timer) }

    },[])
    const updateAnswer=(qnId,optionIdx)=>{
        const temp=[...context.selectedOptions]
        context.selectedOptions.push({
            qnId,
            selected:optionIdx
        })

    
        if(qnIndex<4){
            setContext({selectedOptions:[...temp]})
            setQnIndex(qnIndex+1)
        }
       else{
        setContext({selectedOptions:[...temp]}) //select options
        navigate("/result") 
       }
    }
    
  return (
    qns.length!=0
    ?<Card
        sx={{maxWidth:640,mx:'auto',mt:5,
        '& .MuiCardHeader-action': { m: 0, alignSelf: 'center' }
    }}>
            <CardHeader
            title={'Question'+(qnIndex+1)+'of 5'} 
            action={<Typography>{getFormatedTime(timeTaken)}</Typography>} />     
           <box sx={{ width: '100%'}}>
            <LinearProgress variant="determinate" value={(qnIndex + 1) * 100/ 5} />
            </box>
            {qns[qnIndex].imageName !=null
            ? <CardMedia
             component="img"
             image={BASE_URL + 'images/' + qns[qnIndex].imageName}
             sx={{ width: 'auto', m: '10px auto' }} />   // image size
              : null}
        <CardContent>
            <Typography variant="h4">
            {qns[qnIndex].qnInWords}
            </Typography>
            <List>
            {qns[qnIndex].options.map((item,idx)=>
                  <ListItemButton key={idx} onClick={()=>updateAnswer(qns[qnIndex].qnId,idx)}>
                  
                   <div>
                   <b>{String.fromCharCode(65 + idx) + " . "}</b>{item}
                   </div>
                   </ListItemButton>
            )}
            </List>
        </CardContent>
    </Card>
    :null
  )
}
