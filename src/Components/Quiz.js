import React, { useContext, useEffect, useState } from 'react'
import useStateContext from './hooks/useStateContext'
import { ENDPOINTS,createAPIEndpoint } from '../api'
import { Card, CardContent, List, ListItemButton, Typography } from '@mui/material'

export default function Quiz() {

 const[qns,setQns]=useState([])
 const [qnIndex, setQnIndex] = useState(0)


    useEffect(()=>{
        createAPIEndpoint(ENDPOINTS.Question)
        .fetch()
        .then(res=>{
         setQns(res.data)
         console.log (res.data)
        })
        .catch(err => { console.log(err); })

    },[])
  return (
    qns.length!=0
    ?<Card>
        {/* sx={{maxWidth:640,}} */}
        <CardContent>
            <Typography variant="h6">
          {qns[qnIndex].qnInWords}
            </Typography>
            <List>
                {qns[qnIndex].options.map((item,idx)=>{
                    <ListItemButton key={idx}
                   disappleRipple>
                    <div>
                       <b> {String.fromCharCode(65+idx) + "."}</b> {item}
                    </div>
                    </ListItemButton>
                })}
              
            </List>
        </CardContent>
    </Card>
    :null
  )
}
