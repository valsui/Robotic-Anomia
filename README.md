# Robotic Anomia

[Robotic-Anomia Live!](https://valsui.github.io/Robotic-Anomia)

## Background and Overview

### Robotic Anomia is a project that aims to create a lightweight javascript front-end application that is able to recognize text written on a canvas and offer the user the ability to correct errors in recognition real time.  It also allows the user to train their own neural network models to recognize their own handwriting and load these models to train them further.

## Functionality
Users can train their models or play with our existing trained model.  Robotic Anomia will make a prediction of the word that is drawn on the canvas.  Users can then tell it if it is correct or incorrect, and it will adjust itself accordingly.  Furthermore, users have the option of creating their own handwriting recognition machine from scratch, and train it to recognize their own handwriting fairly robustly.  They can then download this model to keep it, and reupload it if they want to train it further.

## Technologies
Frontend: React/ Redux JavaScript 
Libraries: brain.js, d3

## Features

### Handwriting Recognition

In order to implement a lightweight machine with training data that can be manipulated and that can persist in a redux store, we created a canvas that could map coordinates into an array that was rougly 1/4th of the size of the canvas.  Upon drawing, we augmented the data so that it would fill in the empty spaces, and then we mapped the pixels in a 3x3 square to one pixel.  

```javascript
const reduce = (array) => {
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
}
```

After the canvas, we draw boxes around the characters to cut out the white space.  Finally, we pad the letters to send them back through the machine for training.

```javascript
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
```


### Visualizing the Results

Using this data, we can train or test our neural network.  In order to test the network, we had to take each letter and place the top 3 choices for the canvas drawing into an array of length n, with n being the number of letters drawn on the canvas.  The number of possible choices is k^n, where k is 3 and n is the number of letters.  We accomplished this using the following functions:

```javascript
 getPercentages() {
        const { outputs } = this.props;
        // console.log(outputs);

        let outputArray = outputs.map (( output ) => {
            let subArray = [];

            // adds all the key value pairs as nested arrays
            for ( let key in output ) {
                subArray.push([key, output[key]])
            }

            subArray = subArray.sort( (arr1, arr2) => arr2[1] - arr1[1] );

            // returns only the top three values for each canvas character
            return subArray.slice(0,3);
        })

        // outputArray = [["a", .99], ["b", .98]]
       return outputArray;
    }
```

 For the `outputArray`, we then run this function: 

 ```javascript
 recursiveParse(words) {
        if  ( words.length <= 1 ) {
            let arr = [];
            words[0].forEach ((letter) => {
                arr.push([[letter[0]], letter[1]]);
            })

            return arr;
        };

        let prevWords = this.recursiveParse(words.slice(1));
        let newWords = []
        words[0].forEach ((letter) => {
            prevWords.forEach ((innerWord) => {
                newWords.push([[letter[0]].concat(innerWord[0]), letter[1] + innerWord[1]]);
            })
        })

        return newWords;
    }
 ```

 We then visualize this data using d3.


 ### Training the Network

 To train the network, we initialized the network to recognize the 26 lower case letters.  We then trained multiple sets of a-z to create a baseline for the network to recognize letters.  After that, we trained it in recognizing letters that were less discernable from each other, such as "hkb", "nh", "aos", etc.  The result was a fairly robust base network.  We were then able to fine tune it based on different styles of handwriting.

 To save the network, we implemented a `downloadMachine` feature that allowed the user to download the machine in the version of a stringified JSON.  We then replaced our machine file and used `brain.js`'s ability to initialize a machine from a JSON.

 ```javascript
 const createMachine = (data) => {
  download(data, 'machine.txt', 'text/plain');
}

const download = (content, fileName, contentType) => {
  let a = document.createElement("a");
  let file = new Blob([content], {type: contentType});
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}
 ```

 To download the machine as a JSON.

```javascript
 let rawFile = new XMLHttpRequest();

rawFile.open("GET",  "https://raw.githubusercontent.com/valsui/Robotic-Anomia/master/public/machine.txt", true);
rawFile.onreadystatechange = () => {
  if(rawFile.readyState === 4){
    if(rawFile.status === 200 || rawFile.status == 0){
        net.fromJSON(JSON.parse(rawFile.responseText));
      }
    }
  }
rawFile.send(null);
```

To load the machine.

## Testing Demo
Users can test the trained neural network by drawing letters on the canvas and correcting the network.

![testing](https://media.giphy.com/media/dgjT0qJXesSPSEhr19/giphy.gif)

## Training Demo
Users can add training data to the network or create their own network to train.



## Future Objectives

* Implement the ability for users to login and persist their machines in a database.
* Explore more robust neural network types and a more robust canvas.
