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
import { useEffect, useState } from "react";
import Images from "next/image";
import { listItem } from "@/operations/items.fetch";

function ListItem({ user, setDiscard }) {

	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [category, setCategory] = useState("");
	const [price, setPrice] = useState(0);
	const [images, setImages] = useState([]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!name || !description || !category || !price || !images) {
			alert("Please fill all the fields");
			return;
		}

		if (isNaN(price)) {
			alert("Price must be a number");
			return;
		}

		const product = {
			name,
			description,
			category,
			price: parseInt(price),
			images,
			userId: user.id,
		};

		const response = await listItem(product);
		if (response.status === 200) {
			alert("Product added successfully");
			window.location.reload();
		}
		else {
			alert("Error adding product, please try again");
		}

	}


	return (
		<>
			<div className="ListItem">
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
							<Input placeholder="Enter title" onChange={(e) => setName(e.target.value)} required />
						</FormControl>
						<FormControl id="description" className="form_label">
							<FormLabel>Product Description</FormLabel>
							<Textarea
								placeholder="Enter description"
								style={{
									resize: "none",
									height: "20vh",
								}}
								onChange={(e) => setDescription(e.target.value)}
							/>
						</FormControl>
						<FormControl id="category" className="form_label">
							<FormLabel>Product Category</FormLabel>
							<Select placeholder="Select category" onChange={(e) => setCategory(e.target.value)} required>
								<option value="ELECTRONICS">Electronics</option>
								<option value="FURNITURE">Furniture</option>
								<option value="CLOTHING">Clothing</option>
								<option value="OTHER">Other</option>
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
							<Input placeholder="Enter price" onChange={(e) => setPrice(e.target.value)} required />
						</FormControl>
						<div className="ListItem__pricing--card--buttons">
							<Button
								variant="solid"
								id="discard"
								// borderColor="#FEEAEA"
								// background="rgba(39, 124, 165, 0.10)"
								onClick={
									() => {
										setDiscard(false);
									}
								}>
								Discard
							</Button>
							<Button variant="solid" id="submit" onClick={handleSubmit}>
								Submit
							</Button>
						</div>
					</Card>
				</div >
			</div >
		</>
	);
}

export default ListItem;
