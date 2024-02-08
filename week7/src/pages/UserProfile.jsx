import harkiratInfo from "../components/profile/userData"
import Audience from "../components/profile/Audience"

export default function UserProfile() {
    return <div className="flex justify-center h-screen">
        <div className="w-6/12 flex flex-col gap-7 border p-12">
            <div className="flex gap-5">
                <img src={harkiratInfo.profilePic} alt="harkirat.png" className="w-36 h-36" />
                <div>
                    <div>
                        <p className="text-2xl">{harkiratInfo.firstName} {harkiratInfo.lastName}</p>
                        <p className="text-gray-500 tracking-widest">{harkiratInfo.country}</p>
                    </div>
                    <p className="text-gray-500 mt-3">{harkiratInfo.description}</p>
                </div>
            </div>
            <div className="flex gap-10">
                {harkiratInfo.fans.map((fan) => {
                    return <Audience key={fan.id} audience={fan.audience} count={fan.count} />
                })}
            </div>
        </div>
    </div>
}