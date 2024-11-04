import React from 'react';
import { useParams } from 'react-router-dom';
import InputPhoto from '../components/InputPhoto';
import Header from '../components/Header';
import { useEffect,useState } from 'react';
import Gallery from '../components/Gallery';

export default function UserPage() {
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
            <Header />
                <div>
                    <Gallery />
                </div>
        </>
      ) : (
        <div>NOT ALLOWED</div>
      );
}