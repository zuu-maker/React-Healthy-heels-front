import { FormControl, MenuItem, Select, TableCell, TableRow } from '@mui/material'
import React from 'react'
import { db } from '../../firebase'
import firebase from 'firebase'

const enuma = [
    {
        title:"Not Processing",
        status:"Not Processed"
    },
    {
        title:"Delivered",
        status:"Delivered"
    },
    {
        title:"Cancel",
        status:"Cancelled"
    },
    {
        title:"Process",
        status:"Processing"
    },
  ]

function AdminOrder({order}) {

    const [user, setUser] = React.useState("")
    const [status,setStatus] = React.useState("");

    React.useEffect(() => {

        setStatus(order.data.orderStatus)
        db.collection("Users").where("email","==",order.data.orderedBy)
        .get()
        .then((res) => {
            setUser( res.docs[0].data() )
        }).catch((err) => {
            console.log(err);
        })

      // eslint-disable-next-line
    },[])

    const handleStatus = (e) => {

        const { value } = e.target

        setStatus()
        db.collection("Order").doc(order.id)
        .update({orderStatus: value, lastUpdatedAt: firebase.firestore.FieldValue.serverTimestamp() })
        .then(() => {
            setStatus(value)
        })
        .catch((err) => {
            console.log(err);
            alert("Error Updating")
        })
    
      }

  return (
    <TableRow
        key={order.id}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
        <TableCell component="th" scope="row">
        {order.id}
        </TableCell>
        <TableCell align="right">{order.data.orderedBy}</TableCell>
        <TableCell align="right">{user.address?.city}</TableCell>
        <TableCell align="right">{user?.phone}</TableCell>
        <TableCell align="right">{user.address?.detailedAddress}</TableCell>
        <TableCell align="right">
        <FormControl variant="standard" fullWidth>
          
            <Select
                value={status}
                onChange={handleStatus}
            > 
              {
              // eslint-disable-next-line 
              enuma.map((i,index) => <MenuItem key={index} value={i.status}>{i.title}</MenuItem>)}
            </Select>
            </FormControl>
            </TableCell>
        <TableCell>K{(order.data.paymentIntent.amount/100).toFixed(2)}</TableCell>
        <TableCell>{order.data.paymentIntent.payment_method_types[0]}</TableCell>
  </TableRow>
  )
}

export default AdminOrder