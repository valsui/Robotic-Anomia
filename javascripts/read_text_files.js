import fs from 'fs';


export const getTrainingData = (directory) => {
    let data = [];
    debugger;
    fs.readdir(directory, (err, filenames) => {
        if(err) {
            onError(err);
            return;
        }
        filenames.forEach((file) => {
            fs.readFile(directory + file, 'utf-8', (err, content) => {
                if (err) {
                    onError(err);
                    return;
                }
                debugger;
                const letterData = [content];
                let data = data.concat(letterData);
                return data;
            })
        })
    } )
    return data;
}

