import Image from "next/image";
import useAuth from "../../api/utils/useAuth";
import Head from "next/head";


function DeleteItem(props) {
    async function handleSubmit(e) {
        e.preventDefault();
        console.log(props);
        try {
            const response = await fetch(`https://next-market-orcin-ten.vercel.app/api/item/delete/${props.singleItem._id}`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${localStorage.getItem("token")}`,
                }
            });
            const jsonData = await response.json();
            alert(jsonData.message);
        } catch (error) {
            alert("アイテム削除失敗");
        }
    }

    const loginUser = useAuth();

    if (loginUser === props.singleItem.email) {
        return (
            <div className="delete-page">
                <Head><title>アイテム削除</title></Head>
                <h1 className="page-title">アイテム削除</h1>
                <form onSubmit={handleSubmit}>
                    <h2>{props.singleItem.title}</h2>
                    <Image src={"/" + props.singleItem.image} width={1200} height={620} alt={props.singleItem.image} />
                    <h3>\{props.singleItem.price}</h3>
                    <p>{props.singleItem.description}</p>
                    <button type="submit">削除</button>
                </form>
            </div>
        )
    } else {
        return <h1>権限がありません</h1>
    }
}

export default DeleteItem;

export async function getServerSideProps(context) {
    const response = await fetch(`https://next-market-orcin-ten.vercel.app/api/item/${context.query.id}`);
    const singleItem = await response.json();
    return {
        props: singleItem
    }
}