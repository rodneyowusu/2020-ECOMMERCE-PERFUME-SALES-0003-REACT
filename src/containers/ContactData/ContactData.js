import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Button from "../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from "../../axios-products";
import Input from "../../components/UI/Input/Input";
import Spinner from "./../../components/UI/Spinner/Spinner";
import emailjs from "emailjs-com";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        name: "name",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      location: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Location",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      mobileNumber: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Mobile Number Eg.(0244....)",
        },
        value: "",
        validation: {
          required: true,
          minLength: 10,
          maxLength: 10,
          isNumeric: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: "input",
        name: "email",
        elementConfig: {
          type: "email",
          placeholder: "Your E-Mail",
        },
        value: "",
        validation: {},
        valid: true,
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "", displayValue: "SELECT DELIVERY METHOD" },
            { value: "fastest", displayValue: "Fastest" },
            { value: "standard", displayValue: "Standard" },
          ],
        },
        value: "",
        validation: {},
        valid: true,
      },
    },
    formIsValid: false,
    loading: false,
  };

  sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_4zfjvp7",
        "template_2072qe4",
        e.target,
        "user_Nm1DBhqhPHIu7KhH3x0DZ"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
  };

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    }
    const order = {
      orderData: formData,
      itemOrdered: this.props.productName,
      itemPrice: this.props.totalPrice,
    };
    this.sendEmail(event);
    axios
      .post("/orders.json", order)
      .then((response) => {
        this.setState({ loading: false });

        alert(
          "Your Order Has Been Placed Successfully . We'll Contact You As Soon As Possible . Don't Hesitate To Interact With Us On Our Social Media Platforms . Various Links Can Be Found Below "
        );
        this.props.history.push("/");
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  };

  checkValidity(value, rules) {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.orderForm,
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier],
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map((formElement) => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => this.inputChangedHandler(event, formElement.id)}
          />
        ))}
        <Button btnType="Success" disabled={!this.state.formIsValid}>
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter Your Delivery Information</h4>
        {form}
      </div>
    );
  }
}

export default withRouter(ContactData);
