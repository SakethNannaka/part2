import React, { Component } from "react";
import Navbar from "./navbar1.component";
import "./profile.css";
import Axios from "axios";
import {Button} from "react-bootstrap"

const paymentHandler = async (e) => {
  const API_URL = "https://localhost:5000/order";
  e.preventDefault();
  const orderUrl = `${API_URL}`;
  console.log(orderUrl);
  const response = await Axios.get(orderUrl);
  console.log(response);

  const { data } = response;

  const options = {
    key: "rzp_test_emOLmEoveDJMNM",
    name: "MSIT PROGRAM",
    description: "Some Description",
    order_id: data.id,
    handler: async (response) => {
      try {
        const paymentId = response.razorpay_payment_id;
        const url = `${API_URL}capture/${paymentId}`;
        const captureResponse = await Axios.post(url, {});
        console.log(captureResponse.data);
      } catch (err) {
        console.log(err);
      }
    },
    theme: {
      color: "#686CFD",
    },
  };

  const rzp1 = new window.Razorpay(options);
  rzp1.open();
};

class Payments extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Button
          variant="outline-primary"
          style={{ width: "10%" }}
          onClick={paymentHandler}
        >
          Pay Now
        </Button>
      </div>
    );
  }
}
export default Payments;
