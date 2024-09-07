import Link from "next/link";
import Image from "next/image";
import Head from "next/head";


function ReadAllItems(props) {
    return (
        <div>
            <Head><title>Next Market</title></Head>
            <div className="grid-container-in">
                {props.allItems.map(item =>
                    <Link href={`/item/${item._id}`} key={item._id} className="card">
                        <div className="texts-area">
                            <Image src={"/" + item.image} alt={item.image} width={1200} height={620} priority={true} />
                            <h2>\{item.price}</h2>
                            <h3>{item.title}</h3>
                            <p>{item.description.slice(0, 80)}…</p>
                        </div>
                    </Link>
                )}
            </div>
        </div>
    );
}

export default ReadAllItems;

export async function getServerSideProps() {
    const response = await fetch("https://next-market-orcin-ten.vercel.app//api/item/readall");
    const allItems = await response.json();

    return {
        props: allItems
    }
}