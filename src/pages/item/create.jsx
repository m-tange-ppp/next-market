import { useState } from "react";
import useAuth from "../api/utils/useAuth"

function CreateItem() {
    const loginUser = useAuth();

    const [newItem, setNewItem] = useState({
        title: "",
        price: "",
        image: "",
        description: ""
    });

    function handleChange(e) {
        setNewItem({
            ...newItem,
            [e.target.name]: e.target.value
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/api/item/create", {
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
            alert("アイテム作成失敗");
        }
    }

    if (loginUser) {

        return (
            <div>
                <h1>アイテム作成</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="title" id="title" placeholder="アイテム名" required onChange={handleChange} value={newItem.title} />
                    <input type="text" name="price" id="price" placeholder="価格" required onChange={handleChange} value={newItem.price} />
                    <input type="text" name="image" id="image" placeholder="画像" required onChange={handleChange} value={newItem.image} />
                    <textarea name="description" id="description" rows={15} placeholder="商品説明" required onChange={handleChange} value={newItem.description} ></textarea>
                    <button type="submit">作成</button>
                </form>
            </div>
        )
    }
}

export default CreateItem;