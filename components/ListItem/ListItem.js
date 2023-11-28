import "./ListItem.scss";
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
import Images from "next/image";
import { FaArrowLeft } from "react-icons/fa6";

function ListItem() {
  
  return (
    <>
      <div className="ListItem">
        <div className="ListItem__top">
          <Button
            className="ListItem__top--back"
            leftIcon={<FaArrowLeft />}
            variant="ghost"
          ></Button>
          <div className="ListItem__top--content">
            <p>Back to home</p>
            <h1>Add New Product</h1>
          </div>
        </div>
        <div className="ListItem__description">
          <h1>Description</h1>
          <Card
            className="ListItem__description--card"
            style={{
              border: "1.5px solid #E2E8F0",
              height: "100%",
            }}
          >
            <FormControl id="title" className="form_label">
              <FormLabel>Product Name</FormLabel>
              <Input placeholder="Enter title" />
            </FormControl>
            <FormControl id="description" className="form_label">
              <FormLabel>Product Description</FormLabel>
              <Textarea
                placeholder="Enter description"
                style={{
                  resize: "none",
                  height: "20vh",
                }}
              />
            </FormControl>
            <FormControl id="category" className="form_label">
              <FormLabel>Product Category</FormLabel>
              <Select placeholder="Select category">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
              </Select>
            </FormControl>
          </Card>
        </div>
        <div className="ListItem__images">
          <h1>Product Images</h1>
          <Card
            className="ListItem__images--card"
            style={{
              border: "1.5px solid #E2E8F0",
              height: "100%",
            }}
          >
            <FormControl id="images">
              <label htmlFor="upload" style={{ width: "100%" }}>
                <Button
                  className="ListItem__images--card--button"
                  as="span"
                  w="50%"
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
          </Card>
        </div>
        
        <div className="ListItem__pricing">
          <h1>Pricing</h1>
          <Card
            className="ListItem__pricing--card"
            style={{
              border: "1.5px solid #E2E8F0",
              height: "100%",
            }}
          >
            <FormControl id="price">
              <FormLabel color={"#636363"}>Price</FormLabel>
              <Input placeholder="Enter price" />
            </FormControl>
            <div className="ListItem__pricing--card--buttons">
              <Button
                variant="solid"
                id="discard"
                // borderColor="#FEEAEA"
                // background="rgba(39, 124, 165, 0.10)"
              >
                Discard
              </Button>
              <Button variant="solid" id="submit">
                Submit
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}

export default ListItem;
