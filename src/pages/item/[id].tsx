import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { GetServerSideProps, NextPage } from "next";
import { ReadSingleDataType } from "../api/utils/types";

const ReadSingleItem: NextPage<ReadSingleDataType> = (props) => {
    return (
        <div className="grid-container-si">
            <Head><title>{props.singleItem.title} </title></Head>
            <div>
                <Image src={props.singleItem.image} width={1200} height={620} alt={props.singleItem.image} />
            </div>
            <div>
                <h1>{props.singleItem.title}</h1>
                <h2>\{props.singleItem.price}</h2>
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

export const getServerSideProps: GetServerSideProps<ReadSingleDataType> = async(context) => {
    const response = await fetch(`http://localhost:3000/api/item/${context.query.id}`);
    const singleItem = await response.json();
    return {
        props: singleItem
    }
}