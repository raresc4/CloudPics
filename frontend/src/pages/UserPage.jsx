import React from 'react';
import { useParams } from 'react-router-dom';
import InputPhoto from '../components/InputPhoto';
import Header from '../components/Header';
import { useEffect } from 'react';
import Gallery from '../components/Gallery';

export default function UserPage() {
    const { username } = useParams();
    return (
        <>
            <Header />
                <div>
                    <Gallery />
                </div>
        </>
      );
}