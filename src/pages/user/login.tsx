import { useState } from "react";
import Head from "next/head";

function Login() {
    const [newUser, setNewUser] = useState({
        email: "",
        password: ""
    });

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/api/user/login", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newUser)
            });
            const jsonData = await response.json();
            localStorage.setItem("token", jsonData.token);
            alert(jsonData.message);
        } catch (error) {
            alert("ログイン失敗");
        }
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value
        });
    }

    return (
        <div>
            <Head><title>ログイン</title></Head>
            <h1 className="page-title">ログイン</h1>

            <form onSubmit={handleSubmit}>
                <input value={newUser.email} onChange={handleChange} type="text" name="email" placeholder="メールアドレス" required />
                <input value={newUser.password} onChange={handleChange} type="password" name="password" placeholder="パスワード" required />
                <button type="submit">ログイン</button>
            </form>
        </div>
    );
}

export default Login;