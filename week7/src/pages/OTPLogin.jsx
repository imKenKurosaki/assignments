import MobileNumber from "../components/otpLogin/MobileNumber";
import Otp from "../components/otpLogin/Otp";
import { useRecoilValue } from "recoil";
import { otpFlagAtom } from "../store/atoms/otpLogin";

export default function OTPLogin() {
    const flag = useRecoilValue(otpFlagAtom);

    return <div className="flex flex-col gap-8 h-screen justify-center items-center">
            <h1 className="text-5xl font-light">Login via OTP</h1>
            <div className="flex flex-col gap-4 w-80">
                
            {flag ? <Otp /> : <MobileNumber />}
            </div>
    </div>
}