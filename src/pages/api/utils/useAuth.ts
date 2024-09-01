import { useRouter } from "next/router";
import { useState, useEffect } from "react";

function useAuth() {
    const [loginUser, setLoginUser] = useState("");
    const router = useRouter();

    useEffect(() => {
        async function fetchData(options: RequestInit = {}) {
            try {
                const token = await localStorage.getItem("token");
        
                const headers = {
                    ...options.headers,
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                };
                
                const response = await fetch("/api/utils/validateToken", {
                    ...options,
                    headers
                });
    
                if (response.ok) {
                    const data = await response.json();
                    setLoginUser(data.email);
                } else {
                    router.push("/user/login");
                }
            } catch (error) {
                router.push("/user/login");
            }
        }
            fetchData();
        }, [router]);

        return loginUser;
    }

export default useAuth;