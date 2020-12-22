import React from "react";
import Footer from "../components/UI/Footer";
import Icon from "../components/UI/Icons";

export function FooterContainer() {
  return (
    <Footer>
      <Footer.Wrapper>
        <Footer.Row>
          <Footer.Column>
            <Footer.Title>About Us</Footer.Title>
            <Footer.Linker href="#">Story</Footer.Linker>
            <Footer.Linker href="#">Clients</Footer.Linker>
            <Footer.Linker href="#">Testimonials</Footer.Linker>
          </Footer.Column>
          <Footer.Column>
            <Footer.Title>Services</Footer.Title>
            <Footer.Linker href="#">Marketing</Footer.Linker>
            <Footer.Linker href="#">Consulting</Footer.Linker>
            <Footer.Linker href="#">Development</Footer.Linker>
            <Footer.Linker href="#">Design</Footer.Linker>
          </Footer.Column>
          <Footer.Column>
            <Footer.Title>Contact Us</Footer.Title>
            <Footer.Linker href="#">United States</Footer.Linker>
            <Footer.Linker href="#">United Kingdom</Footer.Linker>
            <Footer.Linker href="#">Australia</Footer.Linker>
            <Footer.Linker href="#">Support</Footer.Linker>
          </Footer.Column>
          <Footer.Column>
            <Footer.Title>Social</Footer.Title>
            <Footer.Link href="https://www.facebook.com/100perscent-Fragrance-OILS-103840481618817/">
              <Icon className="fab fa-facebook-f" />
              Facebook
            </Footer.Link>
            <Footer.Link href="https://instagram.com/100perscent_fragranceoils?igshid=wghxz2b59y8s">
              <Icon className="fab fa-instagram" />
              Instagram
            </Footer.Link>
            <Footer.Link href="#">
              <Icon className="fab fa-youtube" />
              Youtube
            </Footer.Link>
            <Footer.Link href="#">
              <Icon className="fab fa-twitter" />
              Twitter
            </Footer.Link>
          </Footer.Column>
        </Footer.Row>
      </Footer.Wrapper>
      <Footer.Wrapper>
        <footer
          style={{
            paddingTop: "50px",
            left: "0",
            bottom: "0",
            width: "100%",
            textAlign: "center",
          }}
        >
          &copy; Copyright 2020 RoddyTECH ACCRA,GHANA . All rights reserved.
        </footer>
      </Footer.Wrapper>
    </Footer>
  );
}
