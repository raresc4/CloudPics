import React from "react";
import { useNavigate } from "react-router-dom";
import ChangePasswordComponent from "../components/ChangePasswordComponent";
import Header2 from "../components/Header2";

export default function ChangePasswordPage() {
    return (
        <>
            <Header2 />
            <ChangePasswordComponent />
        </>
    )
}