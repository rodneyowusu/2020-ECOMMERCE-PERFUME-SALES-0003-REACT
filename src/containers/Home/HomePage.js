import React, { Component } from "react";
import axios from "./../../axios-products";
import withErrorHandler from "./../../hoc/withErrorHandler/withErrorHandler";
import Aux from "../../hoc/AUXILLARY/Auxiliary";
import MyCard from "./myCard";
import { Grid } from "@material-ui/core";
import Spinner from "./../../components/UI/Spinner/Spinner";

class HomePage extends Component {
  state = {
    items: [],
    thepathname: null,
    loading: false,
  };

  componentDidMount() {
    let pathName = this.props.location.pathname;
    this.setState({ loading: true });
    console.log(this.props);
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

        console.log(pathName);
        this.setState({
          items: [...fetchedOrders],
          thepathname: pathName,
          loading: false,
        });
      })
      .catch((error) => {
        console.log(error);
        // this.setState({error: true});
      });
  }

  postSelectedHandler(product) {
    console.log(product.product_name);
    const queryParams = [];
    queryParams.push("product=" + this.state.thepathname);
    queryParams.push("productName=" + product.product_name);
    queryParams.push("price=" + product.price);
    const queryString = queryParams.join("&");
    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString,
      data: this.state.thepathname,
    });
  }

  render() {
    let product_cards = (
      <Grid container spacing={5} style={{ margin: "auto", padding: "auto" }}>
        {this.state.items.map((data, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            key={index}
            style={{ margin: "auto", padding: "auto" }}
          >
            <MyCard
              productName={data.product_name}
              thePrice={data.price}
              description={data.description}
              image={data.imageSrc}
              purchase={this.postSelectedHandler.bind(this, data)}
            />
          </Grid>
        ))}
      </Grid>
    );

    if (this.state.loading) {
      product_cards = <Spinner />;
    }

    return <Aux>{product_cards}</Aux>;
  }
}

export default withErrorHandler(HomePage, axios);
