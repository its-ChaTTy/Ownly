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
import { generate } from "random-words";
import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { listItem, updateItem } from "@/operations/items.fetch";
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';

import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://ejemahwsmspobcfvofxe.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY

function ListItem({ user }) {

    const { setAddModal, editItem } = useAuth();
	const [item, setItem] = useState(editItem);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setItem(editItem);
	}, [editItem])

	const [imageUrls, setImageUrls] = item ? useState(item.imageURL) : useState([]);
	const [name, setName] = item ? useState(item.name) : useState("");
	const [description, setDescription] = item ? useState(item.description) : useState("");
	const [category, setCategory] = item ? useState(item.category) : useState("");
	const [price, setPrice] = item ? useState(item.price) : useState("");

	const supabase = createClient(supabaseUrl, supabaseKey)

	async function uploadFile(file, file_path) {
		setIsLoading(true);
		const { data, error } = await supabase.storage.from('ownly-images').upload(file_path, file)
		const res = supabase.storage.from('ownly-images').getPublicUrl(file_path);
		if (error) {
			console.log(error)
		} else {
			setImageUrls([...imageUrls, res['data'].publicUrl])
		}
		setIsLoading(false);
	}

	const uploadImages = async (file) => {
		const file_path = generate();
		if (file.size > 1024 * 1024 * 3) {
			alert('File is larger than 3MB');
			return;
		}
		await uploadFile(file, file_path);
	}

	const removeImage = async (index) => {
		const imageUrlsCopy = [...imageUrls];
		const imageUrl = imageUrlsCopy[index];
		const match = imageUrl.match(/\/([^\/]+)$/);

		const { data, error } = await supabase.storage.from('ownly-images').remove([`${match[1]}`])
		if (error) {
			console.log(error)
		} else {
			alert("Image removed successfully");
		}
		imageUrlsCopy.splice(index, 1);
		setImageUrls(imageUrlsCopy);
	}

	const handleCreate = async (e) => {
		e.preventDefault();


		if (!name || !description || !category || !price || !imageUrls) {
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
			imageURL: imageUrls,
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


	const handleUpdate = async (e) => {
		e.preventDefault();

		if (!name || !description || !category || !price || !imageUrls) {
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
			imageURL: imageUrls,
			userId: user.id,
			id: item.id
		};

		const response = await updateItem(product);
		if (response.status === 200) {
			alert("Product updated successfully");
			window.location.reload();
		}
		else {
			alert("Error updating product, please try again");
		}

	}




	return (
		<>
			{isLoading && <LoadingSpinner />}
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
							<Input placeholder="Enter title" onChange={(e) => setName(e.target.value)} required {...(item && { defaultValue: item.name })} />
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
								required
								{...(item && { defaultValue: item.description })}
							/>
						</FormControl>
						<FormControl id="category" className="form_label">
							<FormLabel>Product Category</FormLabel>
							<Select placeholder="Select category" onChange={(e) => setCategory(e.target.value)} required {...(item && { defaultValue: item.category })}>
								<option value="ELECTRONICS">Electronics</option>
								<option value="FURNITURE">Furniture</option>
								<option value="CLOTHING">Clothing</option>
								<option value="STATIONARY">Stationary</option>
								<option value="FITNESS">Fitness</option>
								<option value="FASHION">Fashion</option>
								<option value="APPAREL">Apparel</option>
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
						direction={{ base: 'column', sm: 'row' }}
						alignItems={"center"}
						justifyContent={"space-between"}
						overflow='hidden'
						variant='outline'
					>
						<FormControl id="images" width={"15vw"}>
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
											src="/Images/Logos/image-upload.webp"
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
										if (imageUrls.length <= 2)
											uploadImages(e.target.files[0])
										else alert("You can only upload 3 images")
									}}
								/>
							</label>
						</FormControl>
						{
							imageUrls.length > 0 && imageUrls.map((item, index) => {
								return (
									<div className="ListItem__images--card--image" key={index}>
										<p onClick={() => removeImage(index)}
											className="ListItem__images--card--image--cross"> &nbsp;X&nbsp; </p>
										<Image
											boxSize="130px"
											objectFit="cover"
											src={item}
											alt="Uploading Image"
										/>
									</div>
								)
							})
						}
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
							<Input placeholder="Enter price" onChange={(e) => setPrice(e.target.value)} required {...(item && { defaultValue: item.price })} />
						</FormControl>
						<div className="ListItem__pricing--card--buttons">
							<Button
								variant="solid"
								id="discard"
								// borderColor="#FEEAEA"
								// background="rgba(39, 124, 165, 0.10)"
								onClick={
									() => {
										setAddModal(false);
									}
								}>
								Discard
							</Button>
							{
								item ?
									<Button variant="solid" id="submit" onClick={handleUpdate}>
										Update
									</Button>
									:
									<Button variant="solid" id="submit" onClick={handleCreate}>
										Submit
									</Button>
							}

						</div>
					</Card>
				</div >
			</div >
		</>
	);
}

export default ListItem;
