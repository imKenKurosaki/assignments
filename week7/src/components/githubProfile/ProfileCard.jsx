import { useRecoilValue } from "recoil"
import { githubProfileAtom } from "../../store/atoms/githubProfile";
import { memo } from "react";

export const ProfileCard = memo(function ProfileCard() {
    const githubProfile = useRecoilValue(githubProfileAtom);

    return <div className="border rounded-md p-4 bg-blue-950 w-96 flex flex-col gap-4">
        <div className="bg-black border rounded-lg h-28 flex justify-center items-center">
            <img src={`${githubProfile.avatar_url}`} alt="avatar" className="w-20 h-20 rounded-full border-2 border-white" />
        </div>
        <p className={`text-center text-lg ${githubProfile.login ? "text-white" : "text-red-600 uppercase font-semibold"}`}>{githubProfile.login || "USER NOT FOUND"}</p>
        <div className="flex justify-between gap-4 text-center text-white px-5 mt-3">
            <div>
                <p>Followers</p>
                <p className="text-sm font-light">{githubProfile.followers || 0}</p>
            </div>
            <div>
                <p>Following</p>
                <p className="text-sm font-light">{githubProfile.following || 0}</p>
            </div>
            <div>
                <p>Repos</p>
                <p className="text-sm font-light">{githubProfile.public_repos || 0}</p>
            </div>
        </div>
    </div>
})

