export const createArray = () => {
    let array = [];

    for (let i = 0; i < 50; i++) {
        let row = [];

        for (let j = 0; j < 50; j++) {
            row.push(0);
        }

        array.push(row);
    }

    return array;
}

export const reduce = (array) => {
    let newArr = [];

    for (let i = 0; i < array.length; i += 2) {
        let row = [];

        for (let j = 0; j < array[0].length; j += 2) {
            if (countNeighbors(array, i, j, 0) >= 2) {
                row.push(1);
            } else {
                row.push(0);
            }
        }

        newArr.push(row);
    }

    let top = 25;
    let bottom = 0;
    let left = 25;
    let right = 0;

    for (let i = 0; i < newArr.length; i++) {
        for (let j = 0; j < newArr[i].length; j++) {
            if (newArr[i][j] === 1) {
                if (i < top) {
                    top = i;
                }
                if (i > bottom) {
                    bottom = i;
                }
                if (j < left) {
                    left = j;
                }
                if (j > right) {
                    right = j
                }
            }
        }
    }

    let anotherArray = [];

    for (let i = top; i < bottom; i++) {
        anotherArray.push(newArr[i])
    }

    for (let i = 0; i < anotherArray.length; i++) {
        for (let j = 0; j < left; j++) {
            anotherArray[i].shift();
        }
        for (let k = right; k < 25; k++) {
            anotherArray[i].pop();
        }
    }

    let width = 25 - anotherArray[0].length;
    let height = 25 - anotherArray.length;
    addTopBottomPadding(height, anotherArray);
    setTimeout(addRightLeftPadding(width, anotherArray), 10000);
    console.log(anotherArray);
    console.log(anotherArray.toString());

    return anotherArray;
}

const addTopBottomPadding = (height, array) => {
    let tempArray = [];
    for (let i = 0; i < array[0].length; i++) {
        tempArray.push(0);
    }
    if (height % 2 === 0) {
        let padding = Math.floor(height / 2);

        for (let i = 0; i < padding; i++) {
            array.unshift(tempArray);
            array.push(tempArray);
        }
    } else {
        let paddingTop = Math.floor(height / 2);
        let paddingBottom = Math.floor(height / 2) + 1;
        for (let i = 0; i < paddingTop; i++) {
            array.unshift(tempArray);
        }
        for (let i = 0; i < paddingBottom; i++) {
            array.push(tempArray);
        }
    }
    return array;
}

const addRightLeftPadding = (width, array) => {
    if ( array.length !== 25 ) {
        return "error";
    }
    if (width % 2 === 0) {
        let padding = Math.floor(width / 2);
        for (let i = 0; i < 25; i++) {
            for (let j = 0; j < padding; j++) {
                array[i].unshift(0);
                array[i].push(0);
            }
        }
    } else {
        let paddingLeft = Math.floor(width / 2);
        let paddingRight = Math.floor(width / 2) + 1;
        for (let i = 0; i < 25; i++) {
            for (let j = 0; j < paddingLeft; j++) {
                if (array[i].length < 25) {
                    array[i].unshift(0);
                }
            }
            for (let j = 0; j < paddingRight; j++) {
                if (array[i].length < 25) {
                    array[i].push(0);
                }
            }
        }
    }
    return array;
}

export const doSimulationStep = (array) => {
    const birthLimit = 4;
    const deathLimit = 1;
    const newMap = [];

    for (let x = 0; x < array.length; x++) {
        newMap[x] = [];

        for (let y = 0; y < array[0].length; y++) {
            let neighbors = countNeighbors(array, x, y);
            let row = newMap[x];

            if (array[x][y] === 0) {
                if (neighbors < deathLimit) {
                    row.push(0);
                } else {
                    row.push(1);
                }
            } else {
                if (neighbors > birthLimit) {
                    row.push(0);
                } else {
                    row.push(1);
                }
            }
        }
    }

    return newMap;
}

const countNeighbors = (array, x, y, start = -1) => {
    let count = 0;

    for (let i = start; i < 2; i++) {
        for (let j = start; j < 2; j++) {
            let adjX = x + i;
            let adjY = y + j;

            if (i === 0 && y === 0) {
                continue;
            } else if (outOfBounds(array, adjX, adjY)) {
                count += 0;
            } else if (array[adjX][adjY] === 1) {
                count += 1;
            }
        }
    }

    return count;
}

const outOfBounds = (array, adjX, adjY) => {

    return adjX < 0 || adjX >= array[0].length || adjY < 0 || adjY >= array.length
}

export const download = (filename, text) => {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}