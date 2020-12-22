import React, { Component } from "react";
import Spinner from "./../../components/UI/Spinner/Spinner";
import { Card, CardMedia, Button } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import axios from "./../../axios-products";
import Aux from "./../../hoc/AUXILLARY/Auxiliary";
import Modal from "./../../components/UI/Modal/Modal";
import ContactData from "../../containers/ContactData/ContactData";

class Details extends Component {
  state = {
    productName: null,
    productDetails: [],
    tabPathname: null,
    purchasing: false,
    loading: false,
    price : 0 
  };

  componentWillMount() {
    console.log(this.props.location.pathname);
    const query = new URLSearchParams(this.props.location.search);
    let productName = {};
    let price = 0 ;
    let thePathName = null;
    for (let param of query.entries()) {
      if (param[0] === "productName") {
        productName = param[1];
      }
      if (param[0] === "price") {
        price = param[1];
      }
      if (param[0] === "product") {
        thePathName = param[1];
      }
    }
    this.setState({ productName: productName, tabPathname: thePathName , price :price });
  }

  componentDidMount() {
    console.log(this.state.tabPathname);
    this.setState({ loading: true });
    if (this.state.tabPathname === "/bodysplash") {
      axios
        .get("/BodeSplashProducts.json")
        .then((response) => {
          console.log(response);
          const fetchedOrders = [];
          for (let key in response.data) {
            fetchedOrders.push({
              ...response.data[key],
              id: key,
            });
          }
          console.log(fetchedOrders);
          const updatedPosts = fetchedOrders.map((post) => {
            if (post.product_name === this.state.productName) {
              return {
                ...post,
              };
            }
          });
          console.log(updatedPosts);
          this.setState({
            productDetails: updatedPosts,
            loading: false,
          });
        })
        .catch((error) => {
          console.log(error);
          //this.setState({error: true});
        });
    } else {
      axios
        .get("/PerfumeOilProducts.json")
        .then((response) => {
          console.log(response);
          const fetchedOrders = [];
          for (let key in response.data) {
            fetchedOrders.push({
              ...response.data[key],
              id: key,
            });
          }
          console.log(fetchedOrders);
          const updatedPosts = fetchedOrders.map((post) => {
            if (post.product_name === this.state.productName) {
              return {
                ...post,
              };
            }
          });
          console.log(updatedPosts);
          this.setState({
            productDetails: updatedPosts,
            loading: false,
          });
        })
        .catch((error) => {
          console.log(error);
          //this.setState({error: true});
        });
    }
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  // getProduct = () =>{
  //     if(this.props.match.params.id){
  //         const res = this.context.products;
  //         const data = res.filter(item =>{
  //             return item._id === this.props.match.params.id
  //         })
  //         this.setState({product: data})
  //     }
  // };

  // componentDidMount(){
  //     this.getProduct();
  // }

  render() {
    let mainproduct = null;
    for (let key in this.state.productDetails) {
      if (this.state.productDetails[key]) {
        // mainproduct = this.state.productDetails[key];
        mainproduct = (
          <Card
            style={{
              textAlign: "center",
              width: "70%",
              margin: "auto",
              padding: "10px",
            }}
          >
            <div style={{ padding: "20px", maxWidth: "100%", height: "auto" }}>
              <CardMedia
                component="img"
                alt="products"
                image={this.state.productDetails[key].imageSrc}
                style={{
                  display: "block",
                  marginLeft: "auto",
                  marginRight: "auto",
                  width: "50%",
                }}
              />
            </div>
            <h2>{this.state.productDetails[key].product_name}</h2>
            <p style={{ padding: "10px", color: "#9e9e9e", fontSize: "15px" }}>
              {this.state.productDetails[key].description}
            </p>
            <h2 style={{ color: "#f4511e" }}>
              GHc{this.state.productDetails[key].price}
            </h2>
            <Rating value={5} name="unique-rating" />
            <Button
              onClick={this.purchaseHandler}
              style={{
                width: "100%",
                backgroundColor: "#e65100",
                color: "white",
                height: "50px",
              }}
              variant="contained"
            >
              PLACE ORDER
            </Button>
          </Card>
        );
      }
    }

    if (this.state.loading) {
      mainproduct = <Spinner />;
    }
    // console.log(mainproduct);

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          <ContactData totalPrice={this.state.price} productName = {this.state.productName}  />
        </Modal>
        {mainproduct}
      </Aux>
    );
  }
}

export default Details;
