import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { db, storageBucket } from "../../firebase";
import { Link } from "react-router-dom";

export default function AdminProductCard({ item }) {
  const [sizes, setSizes] = React.useState([]);
  const product = item.data;

  React.useEffect(() => {
    db.collection("Product")
      .doc(item.id)
      .collection("sizes")
      .orderBy("size")
      .get()
      .then((querySnap) => {
        setSizes(
          querySnap.docs.map((i) => ({
            data: i.data(),
          }))
        );
      });
  }, [item.id]);

  const handleRemove = (id) => {
    // alert(id)
    if (window.confirm("Are you sure you want to delete")) {
      db.collection("Product")
        .doc(id)
        .delete()
        .then(() => {
          product.images.map((image) => {
            let storageRef = storageBucket.ref(image.ref);

            return storageRef.delete();
          });
        });
    }
  };

  return (
    <Card sx={{ marginLeft: 1, maxWidth: 280 }}>
      {/* {JSON.stringify(product)} */}
      <CardMedia
        component="img"
        height="150"
        // src={product?.images[0]}
        image={product?.images[0]?.url}
        alt={product?.images[0]?.ref}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {/* {JSON.stringify(product?.images[0])} */}
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product?.description?.substring(0, 20)}
        </Typography>
        <Typography variant="body1" color="text.primary">
          sizes:{" "}
          {sizes.map((s) => (
            <span>{s.data.size + " "}</span>
          ))}
        </Typography>
      </CardContent>
      <CardActions disableSpacing={true}>
        <Link
          style={{ textDecoration: "none" }}
          to={"/admin/product/" + product.slug}
        >
          <Button color="success" size="large">
            Update
          </Button>
        </Link>
        <Button
          color="success"
          size="large"
          onClick={() => handleRemove(item.id)}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
