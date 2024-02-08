import { useState } from "react";
import { z } from "zod";
import { otpFlagAtom } from "../../store/atoms/otpLogin";
import { useSetRecoilState } from "recoil";

const phoneNumberValidate = z.number().int().nonnegative({
    message: "Invalid input mobile number"
});

export default function MobileNumber() {
    const [mobileNumber, setMobileNumber] = useState(0);
    const setFlagState = useSetRecoilState(otpFlagAtom);

    const submitHandler = () => {
        const result = phoneNumberValidate.safeParse(parseInt(mobileNumber));
        if (result.success) {
            setFlagState(true);
        }
    }

    return <>
        <input type="text" maxLength={10} placeholder="Enter your mobile number" onChange={(e) => setMobileNumber(e.target.value)} className="border-2 rounded-lg border-black px-4 py-2 text-lg" />
        <div className="px-7">
            <button onClick={() => submitHandler()} className="border border-black px-4 py-2 rounded-md bg-blue-700 text-white w-full">Send OTP</button>
        </div>
    </>
}