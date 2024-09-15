import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { GetServerSideProps, NextPage } from "next";
import { ReadAllDataType } from "./api/utils/types";


const ReadAllItems: NextPage<ReadAllDataType> = (props) => {
    return (
        <div>
            <Head><title>Next Market</title></Head>
            <div className="grid-container-in">
                {props.allItems.map(item =>
                    <Link href={`/item/${item._id}`} key={item._id} className="card">
                        <div className="texts-area">
                            <Image src={item.image} alt={item.image} width={1200} height={620} priority={true} />
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

export const getServerSideProps: GetServerSideProps = async() => {
    const response = await fetch("http://localhost:3000/api/item/readall");
    const allItems = await response.json();

    return {
        props: allItems
    }
}