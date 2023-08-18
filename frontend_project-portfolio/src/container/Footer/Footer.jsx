import React, { useState } from "react";
import { Form, Input, TextArea, Button } from "semantic-ui-react";
import { images } from "../../constants";
import { AppWrap, MotionWrap } from "../../wrapper";
import emailjs from "emailjs-com";
import Swal from "sweetalert2";
import "./Footer.scss";

const PUBLIC_KEY = import.meta.env.VITE_REACT_APP__EMAILJS_PUBLIC_KEY;
const SERVICE_ID = import.meta.env.VITE_REACT_APP__EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_REACT_APP__EMAILJS_TEMPLATE_ID;

const Footer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target, PUBLIC_KEY).then(
      (result) => {
        console.log(result.text);
        Swal.fire({
          icon: "success",
          title: "Message Sent Successfully",
        });
      },
      (error) => {
        console.log(error.text);
        Swal.fire({
          icon: "error",
          title: "Ooops, something went wrong",
          text: error.text,
        });
      }
    );
    e.target.reset();
  };

  return (
    <>
      <h2 className="head-text">Take a coffee & chat with me</h2>
      <div className="app__footer-cards">
        <div className="app__footer-card ">
          <img src={images.email} alt="email" />
          <p className="p-text">patricklouisw@gmail.com</p>
        </div>
        <div className="app__footer-card">
          <img src={images.mobile} alt="phone" />
          <p className="p-text">+1 (437) 995-9888</p>
        </div>
      </div>

      <Form onSubmit={handleOnSubmit}>
        <Form.Field
          id="form-input-control-email"
          type="email"
          control={Input}
          label="Email"
          name="from_email"
          placeholder="Email…"
          required
          icon="mail"
          iconPosition="left"
        />
        <Form.Field
          id="form-input-control-last-name"
          control={Input}
          label="Name"
          name="from_name"
          placeholder="Name…"
          required
          icon="user circle"
          iconPosition="left"
        />
        <Form.Field
          id="form-textarea-control-opinion"
          control={TextArea}
          label="Message"
          name="from_message"
          placeholder="Message…"
          required
        />
        <Button type="submit" color="green">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default AppWrap(
  MotionWrap(Footer, "app__footer"),
  "contact",
  "app__primarybg"
);
