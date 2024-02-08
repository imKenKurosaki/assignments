export default function Audience({ audience, count }) {
    return <div className="border p-3 rounded-md w-[8rem] text-start">
        <p className="font-medium text-lg">{count/1000}K</p>        
        <p className="font-normal text-gray-500 text-xs text-inherit">{audience}</p>
    </div>
}