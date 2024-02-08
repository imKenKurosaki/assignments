import { useState } from "react"
import { bgColors } from "../components/backgroundColor/colorData"

export default function BackgroundChanger() {
    const [background, setBackground] = useState("bg-white");

    const submitBgChanger = (bgColor) => {
        setBackground(bgColor);
    }

    return <div className={`${background} h-screen w-full flex items-end justify-center`}>
        <div className="flex gap-4 mb-6 py-3 px-8 border rounded-sm shadow-lg">
            {bgColors.map((bgColor) => {
                return <button key={bgColor.id} onClick={() => submitBgChanger(bgColor.color)} className={`${bgColor.color} ${bgColor.textColor} border border-black rounded-lg px-4 py-1`}>
                    {bgColor.name}
                </button>
            })}
        </div>
    </div>
}