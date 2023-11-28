import ItemCard from '@/components/ItemCard/ItemCard'



export default function listingDashboard() {
    const item = {
        name: "name",
        price: "price",
        category: "category",
        imageURL: "/Images/Logos/image-upload.png"
    }
    return (
        <>
            <ItemCard item={item}/>
        </>
    )
}