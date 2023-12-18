import React from "react";
import "./Cart.scss";
import {
  Card,
  Select,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Image,
} from "@chakra-ui/react";
import { color } from "framer-motion";

function Cart() {
  return (
    <div className="Cart">
      <div className="Cart__left">
        <Card
          className="Cart__Left__Card"
          style={{
            border: "1.5px solid #E2E8F0",
            height: "100%",
          }}
        >
          <div className="Cart__left__Card__Header">
            <Image
              className="Cart__left__Card__Header__Image"
              src="Images/Assets/image59.png"
              alt="Dan Abramov"
            />
            <div className="Cart__left__Card__Header__Text">
              <h1 className="Cart__left__Card__Header__Text__Up">
                Electronics
              </h1>
              <p className="Cart__left__Card__Header__Text__Down">
                SONY XB10 Portable Speaker
              </p>
            </div>
          </div>
          <div className="Cart__left__Card__Hero">
            <div className="Cart__left__Card__Hero__T1">
              <h1>2 Days &nbsp;&nbsp; 2 Dec - 3 Dec</h1>
              <h1>Change</h1>
            </div>
            <hr />
            <div className="Cart__left__Card__Hero__T2">
              <h1 style={{ color: "#696969" }}>₹340 x 2 days</h1>
              <h1>₹680</h1>
            </div>

            <div className="Cart__left__Card__Hero__T3">
              <h1 style={{ color: "#696969" }}>Service fee</h1>
              <h1>₹34</h1>
            </div>
            <hr />
            <div className="Cart__left__Card__Hero__T4">
              <h1>Total</h1>
              <h1>₹714</h1>
            </div>
          </div>
        </Card>
      </div>
      <div className="Cart__right">
        <Card
          className="Cart__right__Card"
          style={{
            border: "1.5px solid #E2E8F0",
            height: "100%",
          }}
        >
          <h1 id="payment">Payment of ₹714</h1>
          <Image
            className="Cart__right__Card__Image"
            src="Images/Assets/qr.png"
            alt="Dan Abramov"
          />
          <h1 id="qr">Pay using the given QR code</h1>
          <FormControl id="images">
            <label htmlFor="upload" style={{ width: "100%" }}>
              <Button
                className="Cart__right__Card__ImageUpload"
                as="span"
                w="100%"
                h="100%"
              >
                <div className="upload-image">
                  <Image
                    boxSize="50px"
                    objectFit="cover"
                    src="/Images/Logos/image-upload.png"
                    alt="Upload Image"
                  />
                </div>
                <h1 className="text">
                  Click to upload or drag and <br />
                  drop the screenshot of the payment
                </h1>
              </Button>
              <Input
                id="upload"
                type="file"
                display="none"
                accept="image/*"
                onChange={(e) => {
                  // Handle file upload logic here
                }}
              />
            </label>
          </FormControl>
          <Button variant="solid" id="submit">
            Confirm Payment
          </Button>
        </Card>
      </div>
    </div>
  );
}

export default Cart;
