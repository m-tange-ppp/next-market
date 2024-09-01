import Image from "next/image";

function DeleteItem(props) {
    async function handleSubmit(e) {
        e.preventDefault();
        console.log(props);
        try {
            const response = await fetch(`http://localhost:3000/api/item/delete/${props.singleItem._id}`, {
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

    return (
        <div>
            <h1>アイテム削除</h1>
            <form onSubmit={handleSubmit}>
                <h2>{props.singleItem.title}</h2>
                <Image src={"/" + props.singleItem.image} width={1200} height={620} alt={props.singleItem.image} />
                <h3>\{props.singleItem.price}</h3>
                <p>{props.singleItem.description}</p>
                <button type="submit">削除</button>
            </form>
        </div>
    )
}

export default DeleteItem;

export async function getServerSideProps(context) {
    const response = await fetch(`http://localhost:3000/api/item/${context.query.id}`);
    const singleItem = await response.json();
    return {
        props: singleItem
    }
}