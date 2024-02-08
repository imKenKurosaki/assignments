import { useState } from "react"
import { githubProfileAtom } from "../store/atoms/githubProfile"
import { useSetRecoilState } from "recoil";
import axios from "axios";
import { ProfileCard } from "../components/githubProfile/ProfileCard";

export default function GithubProfile() {
    const [github, setGithub] = useState("");
    const setGithubProfile = useSetRecoilState(githubProfileAtom);

    const submitHandler = async () => {
        try {
            const response = await axios.get(`https://api.github.com/users/${github}`);
            const { login, avatar_url, followers, following, public_repos } = response.data;

            setGithubProfile({
                login,
                avatar_url,
                followers,
                following,
                public_repos
            });
        } catch (error) {
            setGithubProfile(error.response.data);
        }
    }

    return <div className="h-screen flex flex-col gap-4 justify-center items-center">
        <h1 className="font-bold text-2xl">Github Profile Card</h1>
        <div className="flex gap-4">
            <input type="text" placeholder="Github Username" onChange={(e) => setGithub(e.target.value)} className="border-2 rounded-md px-3 py-2 border-black"/>
            <button onClick={() => submitHandler()} className="border border-black rounded-md px-3 py-2 bg-blue-950 text-white ">Generate Profile Card</button>
        </div>
        <ProfileCard />
    </div>
}