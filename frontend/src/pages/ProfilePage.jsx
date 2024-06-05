import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserProfile from "../components/UserProfile";

export default function ProfilePage() {
  const { username } = useParams();
  const [photoCount, setPhotoCount] = useState(0);
  const [dateOfLast, setDateOfLast] = useState('');
  const [accountCreation, setAccountCreation] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:4949/api/user/getUserAboutInfo', {
          method: 'POST',
          body: JSON.stringify({ username }),
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        setPhotoCount(responseData.data.nrOfPhotos);
        setDateOfLast(responseData.data.lastPhoto.slice(0, 10));
        setAccountCreation(responseData.data.accountCreationDate.slice(0, 10));
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUserData();
  }, [username]);

  return (
    <UserProfile 
      username={username} 
      photoNr={photoCount} 
      dateOfLast={dateOfLast} 
      accountCreation={accountCreation} 
    />
  );
}
