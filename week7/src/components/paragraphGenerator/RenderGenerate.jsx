import { useRecoilValue } from "recoil"
import { generatedWordsAtom } from "../../store/atoms/generatedWords"
import { memo, useRef } from "react";

const RenderGenerate = memo(function RenderGenerate() {
    const generatedWords = useRecoilValue(generatedWordsAtom).split("\n\n");
    const ref = useRef(0);

    return <div className="flex flex-col gap-4 p-9">
        {generatedWords.map((generated) => {
            ref.current++;
            return <p key={ref.current} className="text-lg">{generated}</p>
        })}
    </div>
});

export default RenderGenerate;