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

const anyValue = (array) => {
  for(let i = 0; i < array.length; i++){
    if (array[i] !== 0){
      return true;
    }
  }
  return false;
}



const createBoxes = (array) => {
  let rowNumber = 0;
  let characterFound = 2;
  let boxes = [];
  let box = {};
  box.array = [];

  while ( rowNumber < array.length ){
    if ( characterFound < 2 ){
      if ( !anyValue(array[rowNumber]) ){
        characterFound += 1;
        if ( characterFound === 2 ) {
          boxes.push(box);
          box = Object.assign({});
          box.array = [];
          // draw the box
          // right border x = rowNumber
          // left border x = rowNumber - 25
        } else if ( !(rowNumber !== array.length - 1) ) {
        box.array.push( array[rowNumber] );
        }
      } else {
        // character detected
        if( box.array.length >= 25 ){
          // do nothing, just skipping due to too long width wise
        }else {
          box.array.push( array[rowNumber] );
        }
      }
    } else if(anyValue( array[rowNumber]) ){
      characterFound = 0;
      box.array.push (array[rowNumber] );
      box.left = rowNumber * 8;
      box.right = rowNumber * 8 + 100;
      box.bottom = 200;
      box.top = 0;
    }
    
    rowNumber++;
  }

  if ( box.array.length > 0 ) {
    boxes.push(box);
  }

  return boxes;
}

const findIndex = (array) =>{
  for(let i = 0; i < array.length; i++){
    if (array[i] !== 0){
      return i;
    }
  }
  return 0;
}

const pointExists = (array, i, j) => {
  return array[i] !== undefined ? (array[i][j] !== undefined ? array[i][j] : 0 ) : 0;
}

export const reduce = (array) => {
    let newArr = [];
    // reduces size from 50 x 50 to 25 x 25
    for (let i = 0; i < array.length; i += 2) {
        let row = [];
        for (let j = 0; j < array[0].length; j += 2) {
            if (countNeighbors(array, i, j, 0) >= 1) {
                let one = array[i][j];
                let two = pointExists(array, i + 1, j);
                let three = pointExists(array, i, j + 1);
                let four = pointExists(array, i + 1, j + 1);
                let five = pointExists(array, i + 1, j + 2);
                let six = pointExists(array, i + 2, j + 2);
                let seven = pointExists(array, i, j + 2);
                let eight = pointExists(array, i + 2, j);
                let nine = pointExists(array, i + 2, j + 1);

                row.push( ( one + two + three + four + five + six + seven + eight + nine ) / 9);
            } else {
                row.push(0);
            }
        }
        newArr.push(row);
    }



    let boxes = createBoxes(newArr);
    // cuts out the white space
    // let anotherArray = cutOut(JSON.parse(JSON.stringify(newArr)));
    let returnArray = boxes.map(box => {
      let cutOutBox = cutOut(box, JSON.parse(JSON.stringify(box.array)));
      let returnObject = Object.assign({}, box);
      returnObject.array = addPadding(25, cutOutBox, box);
      return returnObject;
    })
    // let returnArray = addPadding(25, anotherArray);
    return returnArray;
}

const cutOut = (box, array) => {
  let top  = array.length;
  let bottom = 0;
  let left = array.length;
  let right = 0;
  // This part finds the margins of the box in order to cut it out
  for(let i = 0; i < array.length; i++){
    for(let j = 0; j < array[i].length; j++){
      if(array[i][j] === 1){
        if(i < top){
          top = i;
        }
        if(i > bottom){
          bottom = i;
        }
        if(j < left){
          left = j;
        }
        if(j > right){
          right = j
        }
      }
    }
  }
  // box.top = box.top + top * 8;
  // box.bottom = box.bottom - (25 - (bottom - top));
  let anotherArray = [];
  for(let i = top; i < bottom; i++){
    anotherArray.push(array[i])
  }
  for(let i = 0; i < array.length; i++){
    for(let j = 0; j < left; j++){
      array[i].shift();
    }
    for(let k = right; k < 25; k++){
      array[i].pop();
    }
  }
  // console.log(array);
  return array;
}

const addPadding = (size, array, box) => {
  let width = size - array[0].length;
  let height = size - array.length;
  let returnArray = addTopBottomPadding(box, height, JSON.parse(JSON.stringify(array)));
  return addRightLeftPadding(width, JSON.parse(JSON.stringify(returnArray)));
}

const addTopBottomPadding = (box, height, array) => {
  let tempArray = [];
  for(let i = 0; i < array[0].length; i++){
    tempArray.push(0);
  }
  // In case of odd numbers, add extra padding to bottom.
  if(height % 2 !== 0){
   array.push(tempArray);
  }
  let padding = Math.floor(height / 2);
  // box.top = box.top - padding * 4;
  // box.bottom = box.bottom + padding * 4;
  for(let i = 0; i < padding; i++){
    array.unshift(tempArray);
    array.push(tempArray);
  }
  return array;
}

const addRightLeftPadding = (width, array) => {
  // Add extra padding at end in case of odd numbers
  if(width % 2 !== 0){
    for(let i = 0; i < 25; i++){
      array[i].push(0);
    }
  }
  let padding = Math.floor(width / 2);
  for(let i = 0; i < 25; i++){
    for(let j = 0; j < padding; j++){
      array[i].unshift(0);
      array[i].push(0);
    }
  }
  return array;
}

export const doSimulationStep = (array) => {
    const birthLimit = 1;
    const deathLimit = 1;
    const newMap = [];

    for (let x = 0; x < array.length; x++) {
        newMap[x] = [];

        for (let y = 0; y < array[0].length; y++) {
            let neighbors = countNeighbors(array, x, y);
            let row = newMap[x];

            if (array[x][y] === 1) {
              if (neighbors < deathLimit) {
                   row.push(0);
               } else {
                   row.push(1);
               }
            } else {
               if ( neighbors > birthLimit ) {
                 row.push(1)
               } else {
                 row.push(0);
               }
            }
        }
    }

    // console.log(newMap);
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

export const outOfBounds = (array, adjX, adjY) => {

    return adjX < 0 || adjX >= array.length || adjY < 0 || adjY >= array[0].length
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
