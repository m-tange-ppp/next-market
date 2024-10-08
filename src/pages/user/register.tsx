import { useState } from "react";
import Head from "next/head";
import { NextPage } from "next";

const Register: NextPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        let jsonData;
        try {
            const response = await fetch("http://localhost:3000/api/user/register", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                })
            });
            jsonData = await response.json();
            alert(jsonData.message);
        } catch (error) {
            alert(jsonData.message);
        }
    }

    return (
        <div>
            <Head><title>ユーザー登録</title></Head>
            <h1 className="page-title">ユーザー登録</h1>

            <form onSubmit={handleSubmit}>
                <input value={name} onChange={(e) => setName(e.target.value)} type="text" name="name" placeholder="名前" required />
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" name="email" placeholder="メールアドレス" required />
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" placeholder="パスワード" required />
                <button type="submit">登録</button>
            </form>
        </div>
    );
}

export default Register;