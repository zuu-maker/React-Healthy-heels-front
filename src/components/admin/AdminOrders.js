import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AdminOrder from './AdminOrder';

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

export default function AdminOrders({orders}) {

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell>Customer Email</TableCell>
            <TableCell align="right">City</TableCell>
            <TableCell align="right">Phone Number</TableCell>
            <TableCell align="right">Detailed Address</TableCell>
            <TableCell align="right">Order Status</TableCell>
            <TableCell align="right">Total Amount</TableCell>
            <TableCell align="right">Payment Method</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
              <AdminOrder key={order.id} order={order} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
