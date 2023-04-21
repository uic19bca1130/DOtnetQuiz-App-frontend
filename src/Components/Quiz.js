import React, { useContext, useEffect, useState } from 'react'
import useStateContext from './hooks/useStateContext'
import { ENDPOINTS,createAPIEndpoint } from '../api'
import { Card, CardContent, CardHeader, List, ListItemButton, Typography,LinearProgress} from '@mui/material'
import { getFormatedTime } from '../helper'

export default function Quiz() {

 const[qns,setQns]=useState([])
 const [qnIndex, setQnIndex] = useState(0)
 const[timeTaken,setTimeTaken]=useState(0)
 const {context,setContext}=useStateContext()
 let timer;

 const startTimer= () =>{
    timer= setInterval (()=>{
        setTimeTaken(prev => prev + 1)  
    }, [1000])
 }



    useEffect(()=>{
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
