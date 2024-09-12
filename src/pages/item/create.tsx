import { useState } from "react";
import useAuth from "../api/utils/useAuth"
import Head from "next/head";
import ImgInput from "../../components/imgInput";
import { NextPage } from "next";

const CreateItem: NextPage = () => {
    const loginUser = useAuth();

    const [newItem, setNewItem] = useState({
        title: "",
        price: "",
        description: ""
    });
    const [image, setImage] = useState("");

    function handleChange(e: React.ChangeEvent<HTMLElement>) {
        const target = e.target as HTMLInputElement;
        setNewItem({
            ...newItem,
            [target.name]: target.value
        });
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
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
                    image: image,
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
                <Head><title>アイテム作成</title></Head>
                <h1 className="page-title">アイテム作成</h1>
                <ImgInput setImage={setImage} />
                <form onSubmit={handleSubmit}>
                    <input type="text" name="title" id="title" placeholder="アイテム名" required onChange={handleChange} value={newItem.title} />
                    <input type="text" name="price" id="price" placeholder="価格" required onChange={handleChange} value={newItem.price} />
                    <input type="text" name="image" id="image" placeholder="画像" required value={image} readOnly/>
                    <textarea name="description" id="description" rows={15} placeholder="商品説明" required onChange={handleChange} value={newItem.description} ></textarea>
                    <button type="submit">作成</button>
                </form>
            </div>
        )
    }
}

export default CreateItem;