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
              <h1>2 Days 2 Dec - 3 Dec</h1>
              <h1>Change</h1>
            </div>
            <hr />
            <div className="Cart__left__Card__Hero__T1">
              <h1>2 Days 2 Dec - 3 Dec</h1>
              <h1>Change</h1>
            </div>
            <hr />
            <div className="Cart__left__Card__Hero__T1">
              <h1>2 Days 2 Dec - 3 Dec</h1>
              <h1>Change</h1>
            </div>
            <hr />
            <div className="Cart__left__Card__Hero__T1">
              <h1>2 Days 2 Dec - 3 Dec</h1>
              <h1>Change</h1>
            </div>
            <hr />
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
          <h1>Payment of ₹714</h1>
          <Image
            className="Cart__right__Card__Image"
            src="Images/Assets/qr.png"
            alt="Dan Abramov"
          />
          <h1>Pay using the given QR code</h1>
          <FormControl id="images">
            <label htmlFor="upload" style={{ width: "100%" }}>
              <Button
                className="ListItem__images--card--button"
                as="span"
                w="100%"
                h="100%"
                borderRadius="11.462px" // Set border-radius
                borderWidth="0.955px"
                borderStyle="dashed"
                borderColor="#277CA5"
                background="rgba(39, 124, 165, 0.10)"
                display="flex"
                alignItems="center"
                justifyContent="center"
                cursor="pointer"
              >
                <div className="upload-image">
                  <Image
                    boxSize="50px"
                    objectFit="cover"
                    src="/Images/Logos/image-upload.png"
                    alt="Upload Image"
                  />
                </div>
                <h1>
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
          <Button variant="solid" id="submit" >
            Submit
          </Button>
        </Card>
      </div>
    </div>
  );
}

export default Cart;
