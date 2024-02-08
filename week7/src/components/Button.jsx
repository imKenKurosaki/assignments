import { useNavigate } from "react-router-dom";

export default function Button({children, link}) {
    const navigate = useNavigate();

    return <button onClick={() => navigate(link)} className="border rounded-md bg-blue-700 py-2 px-3">
        {children}
    </button>
}