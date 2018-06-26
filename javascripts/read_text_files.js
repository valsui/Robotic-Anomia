const fs = require('fs');


const getTrainingData = (directory) => {
    let allData = [];
    console.log(allData);
    fs.readdir(directory, (err, filenames) => {
        // console.log(directory);
        // console.log(filenames)
        filenames.forEach((file) => {
            fs.readFile(directory + file, (err, content) => {
                // debugger;
                console.log(directory + "/" + file)
                const letterData = [content];
                console.log(content);
                allData = allData.concat(letterData);
            })
        })
    } )
    return allData;
}

let data = getTrainingData('/Users/appacademyaccount/Desktop/RoboticAnomia/training_data');

console.log(data);