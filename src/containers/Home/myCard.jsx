import { Card, CardMedia, Button } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import React from "react";
import Box from "@material-ui/core/Box";

export default function MyCard(props) {
  return (
    <div>
      <Card style={{ textAlign: "center", width: "90%", marginTop: "10px" }}>
        <div style={{ padding: "20px" }}>
          <CardMedia
            component="img"
            alt="products"
            image={props.image}
            style={{ height: "180px" }}
          />
        </div>
        <h2>{props.productName}</h2>
        <div style={{ whiteSpace: "nowrap" }}>
          <Box
            component="p"
            my={2}
            textOverflow="ellipsis"
            overflow="hidden"
            bgcolor="background.paper"
            whiteSpace="nowrap"
            style={{ height: "50px" }}
          >
            {props.description}
          </Box>
        </div>
        <h2 style={{ color: "#f4511e" }}>GHc{props.thePrice}</h2>
        <Rating value={3} name="unique-rating" />
        <Button
          onClick={props.purchase}
          style={{
            width: "100%",
            backgroundColor: "#e65100",
            color: "white",
            height: "50px",
          }}
          variant="contained"
        >
          Purchase
        </Button>
      </Card>
    </div>
  );
}
