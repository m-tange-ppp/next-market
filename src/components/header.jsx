import Link from "next/link";

function Header() {
    return (
        <header>
            <Link href="/"><img src="../../../header.svg" alt="header.img" /></Link>
            <nav>
                <ul>
                    <li><Link href="/user/register">登録</Link></li>
                    <li><Link href="/user/login">ログイン</Link></li>
                    <li><Link href="/item/create">アイテム作成</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;