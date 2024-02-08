import Button from "../components/Button"

export default function Home() {
    return <div className="h-screen w-full flex justify-center items-center">
        <div className="w-[600px] text-center">
            <p className="text-6xl font-extralight">Welcome to week 7 assignment</p>
            <div className="mt-6 text-white flex gap-3 flex-wrap">
                <Button link={"/profile"}>Hands-on 1</Button>
                <Button link={"/backgroundChanger"}>Hands-on 2</Button>
                <Button link={"/*"}>Hands-on 3</Button>
                <Button link={"/paragraphGenerator"}>Hands-on 4</Button>
                <Button link={"/githubProfile"}>Hands-on 5</Button>
                <Button link={"/otpLogin"}>Hands-on 6</Button>
                <Button link={"/*"}>Hands-on 7</Button>
            </div>
        </div>
    </div>
}