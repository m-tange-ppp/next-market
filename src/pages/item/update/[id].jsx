import { useState } from "react";

function UpdateItem(props) {
    const [newItem, setNewItem] = useState({
        title: props.singleItem.title,
        price: props.singleItem.price,
        image: props.singleItem.image,
        description: props.singleItem.description
    });

    function handleChange(e) {
        setNewItem({
            ...newItem,
            [e.target.name]: e.target.value
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(props);
        try {
            const response = await fetch(`http://localhost:3000/api/item/update/${props.singleItem._id}`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    title: newItem.title,
                    price: newItem.price,
                    image: newItem.image,
                    description: newItem.description
                })
            })
            const jsonData = await response.json();
            alert(jsonData.message);
        } catch (error) {
            alert("アイテム編集失敗");
        }
    }

    return (
        <div>
            <h1>アイテム編集</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" id="title" placeholder="アイテム名" required onChange={handleChange} value={newItem.title} />
                <input type="text" name="price" id="price" placeholder="価格" required onChange={handleChange} value={newItem.price} />
                <input type="text" name="image" id="image" placeholder="画像" required onChange={handleChange} value={newItem.image} />
                <textarea name="description" id="description" rows={15} placeholder="商品説明" required onChange={handleChange} value={newItem.description} ></textarea>
                <button type="submit">編集</button>
            </form>
        </div>
    )
}

export default UpdateItem;

export async function getServerSideProps(context) {
    const response = await fetch(`http://localhost:3000/api/item/${context.query.id}`);
    const singleItem = await response.json();
    return {
        props: singleItem
    }
}