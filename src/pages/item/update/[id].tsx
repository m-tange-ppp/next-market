import { useState } from "react";
import useAuth from "../../api/utils/useAuth";
import Head from "next/head";
import { GetServerSideProps, NextPage } from "next";
import { ReadSingleDataType } from "../../api/utils/types";

const UpdateItem: NextPage<ReadSingleDataType> = (props) => {
    const [newItem, setNewItem] = useState({
        title: props.singleItem.title,
        price: props.singleItem.price,
        image: props.singleItem.image,
        description: props.singleItem.description
    });

    function handleChange(e: React.ChangeEvent<HTMLElement>) {
        const target = e.target as HTMLInputElement;
        setNewItem({
            ...newItem,
            [target.name]: target.value
        });
    }

    async function handleSubmit(e:React.FormEvent) {
        e.preventDefault();
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

    const loginUser = useAuth();

    if (loginUser === props.singleItem.email) {
        return (
            <div>
                <Head><title>アイテム編集</title></Head>
                <h1 className="page-title">アイテム編集</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="title" id="title" placeholder="アイテム名" required onChange={handleChange} value={newItem.title} />
                    <input type="text" name="price" id="price" placeholder="価格" required onChange={handleChange} value={newItem.price} />
                    <input type="text" name="image" id="image" placeholder="画像" required onChange={handleChange} value={newItem.image} />
                    <textarea name="description" id="description" rows={15} placeholder="商品説明" required onChange={handleChange} value={newItem.description} ></textarea>
                    <button type="submit">編集</button>
                </form>
            </div>
        )
    } else {
        return <h1>権限がありません</h1>
    }
}

export default UpdateItem;

export const getServerSideProps: GetServerSideProps<ReadSingleDataType> = async(context) => {
    const response = await fetch(`http://localhost:3000/api/item/${context.query.id}`);
    const singleItem = await response.json();
    return {
        props: singleItem
    }
}