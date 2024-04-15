"use client"

import Link from "next/link"
import { useState } from "react"

const Appbar = () => {
    const [route, setRoute] = useState("home");

    return <div className="flex justify-center pt-20">
        <div className="flex gap-4">
            <Link
                onClick={() => { setRoute("home") }} href={"/"}
                className={`${route === "home" && "bg-gray-500"} px-4 py-2 border border-black rounded-lg`}>
                Home
            </Link>
            <Link
                onClick={() => { setRoute("static") }} href={"/static-route"}
                className={`${route === "static" && "bg-gray-500"} px-4 py-2 border border-black rounded-lg`}>
                Static Route
            </Link>
            <Link
                onClick={() => { setRoute("interactive") }} href={"/interactive-route"}
                className={`${route === "interactive" && "bg-gray-500"}  px-4 py-2 border border-black rounded-lg`}>
                Interactive Route
            </Link>
        </div>
    </div>
}

export default Appbar;