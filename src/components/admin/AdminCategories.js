import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import React from 'react';
import { db } from '../../firebase';
import { DataGrid } from '@mui/x-data-grid';
import { useHistory } from 'react-router-dom';

function AdminCategories() {

    const [categories, setCategories] = React.useState([]);
    let history = useHistory();

    const handleDelete = (id) => {
      console.log(id);
      if(window.confirm('Are you sure you want to delete')) db.collection('Category').doc(id).delete();
      
    }

    const handleUpdate = (id) => {
      history.push("/admin/category/"+id);
    }

    const columns = [
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'name', headerName: 'Category Name', width: 130 },
      { field: 'slug', headerName: 'Category Slug', width: 130 },
      { 
        field: 'delete', 
        headerName: 'Delete', 
        width: 100,
        renderCell: (params) => (
          <DeleteIcon color="error" onClick={() => handleDelete(params.row.ID)} />
        )
    },
    { 
      field: 'update', 
      headerName: 'Update', 
      width: 100,
      renderCell: (params) => (
        <ModeEditIcon color="success" onClick={() => handleUpdate(params.row.ID)} />
      )
    },
    ];

      React.useEffect(() => {
        const unsubscribe = db.collection("Category")
        .onSnapshot((snapshot) => {
            let i = 1
            setCategories(
                snapshot.docs.map(doc => (
                {
                    id:i++,
                    name: doc.data().name,
                    slug: doc.data().slug,
                    ID:doc.id
                }
                )))
        })

        return () => unsubscribe();
    },[])

  return (
    <div style={{ height: 400, width: '100%',padding: '20px 10px 5px' }}>
    <DataGrid
        rows={categories}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        // checkboxSelection
        disableSelectionOnClick
    />
    </div>
  );
}

export default AdminCategories;
