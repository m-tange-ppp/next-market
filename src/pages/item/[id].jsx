import Image from "next/image";
import Link from "next/link";

function ReadSingleItem(props) {
    return (
        <div>
            <div>
                <Image src={"/" + props.singleItem.image} width={1200} height={620} alt={props.singleItem.image} />
            </div>
            <div>
                <h1>{props.singleItem.title}</h1>
                <h2>{props.singleItem.price}</h2>
                <hr />
                <p>{props.singleItem.description}</p>
                <div>
                    <Link href={`/item/update/${props.singleItem._id}`}>アイテム編集</Link>
                    <Link href={`/item/delete/${props.singleItem._id}`}>アイテム削除</Link>
                </div>
            </div>

        </div>
    );
}

export default ReadSingleItem;

export async function getServerSideProps(context) {
    const response = await fetch(`http://localhost:3000/api/item/${context.query.id}`);
    const singleItem = await response.json();
    return {
        props: singleItem
    }
}