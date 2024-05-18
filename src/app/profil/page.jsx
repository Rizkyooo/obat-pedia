
'use client'
import { Chip } from "@nextui-org/react";
import { Spinner } from "@nextui-org/react";
import { useState } from "react";

export default function Profil(){
    const [loading, setLoading] = useState(true);
    setInterval(() => {
        setLoading(false)
    }, 2000)
    return(
        <main className="min-h-screen flex justify-center items-center">

                {loading && <Spinner label="Loading" color="danger" size="xl" />}
                {!loading &&
                <Chip className=" animate-bounce" color="danger" size="lg">Coming Soon</Chip>
                } 
        </main>
    )
}