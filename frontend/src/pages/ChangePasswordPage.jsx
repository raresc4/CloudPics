import React, {useState, useEffect} from "react";
import { useNavigate,useParams } from "react-router-dom";
import ChangePasswordComponent from "../components/ChangePasswordComponent";
import Header2 from "../components/Header2";

export default function ChangePasswordPage() {
     const { username } = useParams();

    const [isAllowed, setIsAllowed] = useState(true);
    useEffect(() => {
        (async () => {
            const response = await fetch(`http://localhost:4949/api/jwt/getUsername`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });
            const content = await response.json();
            const token = content.data;
            if(token.username !== username || !token.username) {
                setIsAllowed(false);
                console.log("NOT ALLOWED");
            }
        })();
    }, []);
    return isAllowed ? (
        <>
            <Header2 />
            <ChangePasswordComponent />
        </>
    ) : (
        <div>NOT ALLOWED</div>
    )
}