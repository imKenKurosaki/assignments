"use client"

import { useState } from "react";

const InteractiveRoute = () => {
    const [count, setCount] = useState(0);

    return <div className="mt-5 flex justify-center">
        <div>
            <div>
                <p className=" font-bold text-xl">Welcome to Home Page</p>
                <div className="text-sm">
                    <p>Client Page: Interactive client-side rendering in action.</p>
                    <p>Server Page: Optimized static content for SEO.</p>
                </div>
            </div>
            <button onClick={() => { setCount((count) => count + 1) }}
                className="px-4 py-2 border rounded-lg border-black mt-3"
            >
                count is {count}
            </button>
        </div>
    </div>
}

export default InteractiveRoute;