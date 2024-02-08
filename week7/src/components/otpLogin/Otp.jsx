import { useEffect, useRef, useState } from "react";

export default function Otp() {
    const inputRef = useRef();

    useEffect(() => {
        inputRef.current.querySelectorAll("div > input")[0].focus();
    }, []);

    const submitHandler = (e, number) => {
        const inputValue = e.target.value;
        if (e.key === "Backspace" && number > 0 && inputValue === "") {
            inputRef.current.querySelectorAll("div > input")[number - 1].focus();
            return;
        }

        if (number >= 0 && number < 3 && e.key !== "Backspace" && inputValue !== "") {
            inputRef.current.querySelectorAll("div > input")[number + 1].focus();
        }
    }

    return <>
        <div ref={inputRef} className="flex gap-4 justify-between">
            <input type="text" maxLength={1} onKeyUp={(e) => submitHandler(e, 0)} className="border-2 rounded-lg border-black px-4 py-2 text-lg w-12"/>
            <input type="text" maxLength={1} onKeyUp={(e) => submitHandler(e, 1)} className="border-2 rounded-lg border-black px-4 py-2 text-lg w-12"/>
            <input type="text" maxLength={1} onKeyUp={(e) => submitHandler(e, 2)} className="border-2 rounded-lg border-black px-4 py-2 text-lg w-12"/>
            <input type="text" maxLength={1} onKeyUp={(e) => submitHandler(e, 3)} className="border-2 rounded-lg border-black px-4 py-2 text-lg w-12"/>
        </div>
        <div className="px-7">
            <button className="border border-black px-4 py-2 rounded-md bg-blue-700 text-white w-full">Login</button>
        </div>
    </>
}