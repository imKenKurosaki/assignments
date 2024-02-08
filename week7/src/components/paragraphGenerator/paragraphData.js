const sentence = "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Maecenas ultricies mi eget mauris pharetra et ultrices neque Eu volutpat odio facilisis mauris sit amet Sollicitudin tempor id eu nisl nunc Non quam lacus suspendisse faucibus interdum posuere lorem Sit amet volutpat consequat mauris nunc congue nisi vitae Ac tincidunt vitae semper quis lectus nulla at volutpat Nec tincidunt praesent semper feugiat Gravida rutrum quisque non tellus orci Sed augue lacus viverra vitae Diam maecenas ultricies mi eget mauris pharetra Convallis posuere morbi leo urna molestie at elementum eu facilisis At ultrices mi tempus imperdiet nulla malesuada pellentesque elit eget Dolor morbi non arcu risus quis varius quam quisque id Consectetur adipiscing elit pellentesque habitant morbi tristique Quam pellentesque nec nam aliquam"
const wordsArray = sentence.toLowerCase().split(" ")

export async function wordGenerator(type, inputNumber) {
    if(type === "words") {
        return await generateWords(inputNumber);
    } else if(type === "sentences") {
        return await generateSentences(inputNumber);
    } 
    return await generateParagraph(inputNumber);
}

function generateWords(numberOfWords) {
    return new Promise((resolve) => {
        let words = wordsArray[Math.floor(Math.random() * 132)];
        for (let i = 0; i < (numberOfWords - 1); i++) {
            let randomNumber = Math.floor(Math.random() * 132);
            words += ` ${wordsArray[randomNumber]}`;
        }
        resolve(words);
    });
}

async function generateSentences(numberOfSentence) {
    let numberOfWords = 19;
    let sentences = "";
    for (let i = 0; i < numberOfSentence; i++) {
        const words = await generateWords(numberOfWords);
        sentences += `${capitalizeFirstLetter(words)}. `;
        numberOfWords = Math.floor(Math.random() * 6) + 5;
    }
    return sentences;
}

async function generateParagraph(numberOfParagraph) {
    let paragraph = "";
    for (let i = 0; i < numberOfParagraph; i++) {
        let numberOfSentences = Math.floor(Math.random() * 11) + 10;
        paragraph += await generateSentences(numberOfSentences);
        
        if(i !== numberOfParagraph-1) paragraph += "\n\n";
    }
    return paragraph;
}

function capitalizeFirstLetter(words) {
    return words.charAt(0).toUpperCase() + words.slice(1);
}