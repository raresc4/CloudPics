import { upload } from "@testing-library/user-event/dist/upload";
import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

export default function InputPhoto() {
  const { username } = useParams();
  const [imageSelected, setImageSelected] = useState(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://upload-widget.cloudinary.com/latest/global/all.js";
    script.async = true;
    script.onload = () => {
      console.log('Script loaded!');
    };
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
    const uploadImage = async (e) => {
      e.preventDefault();
      if (!imageSelected) {
        alert('Please select an image');
        return;
      }
        const formData = new FormData();
        formData.append('file', imageSelected);
        formData.append('upload_preset', 'daxzvfv5');
        formData.append('tags', String(username));
        try {
          const response = await fetch('https://api.cloudinary.com/v1_1/dgtngxdlp/image/upload', {
            method: 'POST',
            body: formData
          });
          const data = await response.json();
          console.log('Upload successful:', data);
        } catch (error) {
          console.error('Error uploading image:', error);
        }
        try {
          const response = await fetch('http://localhost:4949/api/user/incrementPhotoCount', {
            method : 'PUT',
            body : JSON.stringify({username}),
            headers: {
                'Content-Type': 'application/json'
              }
          });
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const responseData = await response.json();
          const message = responseData.message;
          console.log(message);
        } catch (error) {
          console.error("Error:", error);
        }
    };

    return (
      <>
        <div class="max-w-sm">
          <form>
            <label class="flex items-center space-x-2">  
              <input type="file" class="block w-full text-sm text-gray-500
                file:me-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-600 file:text-white
                hover:file:bg-blue-700
                file:disabled:opacity-50 file:disabled:pointer-events-none
                dark:text-neutral-500
                dark:file:bg-blue-500
                dark:hover:file:bg-blue-400
              " onChange={(event) => setImageSelected(event.target.files[0])} />
              <button onClick={uploadImage} class="bg-blue-600 text-white hover:bg-blue-700 py-2 px-4 rounded-lg font-semibold">Upload</button>  {/* Added styles */}
            </label>
          </form>
        </div>
      </>
    );
}