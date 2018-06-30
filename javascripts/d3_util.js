
// function to shuffle dataset
export const shuffleData = (data) => {
    let currentIdx = data.length;
    let tempVal, randomIdx;

    while (0 !== currentIdx) {
        //Pick random idx
        randomIdx = Math.floor(Math.random() * currentIdx);
        currentIdx -= 1;

        //swap with current element
        tempVal = data[currentIdx];
        data[currentIdx] = data[randomIdx];
        data[randomIdx] = tempVal;
    }
    return data
}