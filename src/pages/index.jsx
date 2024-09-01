import Link from "next/link";
import Image from "next/image";

function ReadAllItems(props) {
    return (
        <div>
            {props.allItems.map(item =>
                <Link href={`/item/${item._id}`} key={item._id}>
                    <Image src={"/" + item.image} alt={item.image} width={1200} height={620} priority={true} />
                    <h2>\{item.price}</h2>
                    <h3>{item.title}</h3>
                    <p>{item.description.slice(0, 80)}…</p>
                </Link>
            )}
        </div>
    );
}

export default ReadAllItems;

export async function getServerSideProps() {
    const response = await fetch("http://localhost:3000/api/item/readall");
    const allItems = await response.json();

    return {
        props: allItems
    }
}