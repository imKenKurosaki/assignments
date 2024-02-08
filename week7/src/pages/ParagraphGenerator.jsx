import { useState } from "react"
import { wordGenerator } from "../components/paragraphGenerator/paragraphData"
import { generatedWordsAtom } from "../store/atoms/generatedWords";
import { useSetRecoilState } from "recoil";
import RenderGenerate from "../components/paragraphGenerator/RenderGenerate";

export default function ParagraphGenerator() {
    const [inputNumber, setInputNumber] = useState(0);
    const [type, setType] = useState("words");
    const setGeneratedWords = useSetRecoilState(generatedWordsAtom);

    const submitHandler = async () => {
        setGeneratedWords(await wordGenerator(type, inputNumber));
    }

    return <div className="flex justify-center w-full py-4">
        <div className="w-7/12 border-2 rounded-md border-gray-500 ">
            <div className="flex gap-5 p-5 border-b-2 border-gray-500">
                <input type="text" onChange={(e) => setInputNumber(e.target.value)} className="border-2 border-gray-500 px-2 rounded-md w-[3.5rem]" />
                <select onChange={(e) => setType(e.target.value)} className="uppercase border-2 border-gray-500 rounded-md py-2 px-6">
                    <option value="words">Words</option>
                    <option value="sentences">Sentences</option>
                    <option value="paragraphs">Paragraphs</option>
                </select>
                <button onClick={() => submitHandler()} className="uppercase border rounded-md bg-blue-700 py-2 px-6 text-slate-50">Generate!</button>
            </div>
            <RenderGenerate />
        </div>
    </div>
}