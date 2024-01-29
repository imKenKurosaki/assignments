import React, { useEffect, useMemo, useState } from "react";

// In this assignment, you will create a component that renders a large list of sentences 
// and includes an input field for filtering these items. 
// The goal is to use useMemo to optimize the filtering process, ensuring the list 
// is only re-calculated when necessary (e.g., when the filter criteria changes).
// You will learn something new here, specifically how you have to pass more than one value 
// in the dependency array

const words = ["Banana", "Grape", "Apricot", "Avocado", "Mango", "Strawberries", "Oranges", "Coconut" ];
const TOTAL_LINES = 20;
const ALL_WORDS = [];
for (let i = 0; i < TOTAL_LINES; i++) {
    let sentence = "";
    let sentenceLength = Math.floor(Math.random() * (words.length  + 1))

    if(sentenceLength !== 0) {
        for (let j = 0; j < sentenceLength; j++) {
            sentence += (words[Math.floor((sentenceLength + 1) * Math.random())])
            sentence += " "
        }
        sentence += ` ===> Total fruits: ${sentenceLength}`
        ALL_WORDS.push(sentence);
    }
}

export function Assignment2() {
    const [sentences, setSentences] = useState(ALL_WORDS);
    const [filter, setFilter] = useState("");

    const filteredSentences = useMemo(() => {
        return sentences.filter((sentence) => sentence.includes(filter))
    },[filter])

    return <div>
        <input type="text" onChange={(e) => {
            setFilter(e.target.value)
        }}></input>
        {filteredSentences.map(word => <div>
            {word}    
        </div>)}
    </div>
}