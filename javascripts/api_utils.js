export const createMachine = (data) => {
  download(data, 'machine.txt', 'text/plain');
}

const download = (content, fileName, contentType) => {
  let a = document.createElement("a");
  let file = new Blob([content], {type: contentType});
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}

const readTextFromFile = (file) => {
  let rawFile = new XMLHttpRequest();
  rawFile.open("GET", file, false);
  rawFile.onreadystatechange = () => {
    if(rawFile.readyState === 4){
      if(rawFile.status === 200 || rawFile.status == 0){
        console.log(rawFile.responseText);
        return rawFile.responseText;
      }
    }
  }
  rawFile.send(rawFile.responseText);
}

export const loadMachine = () => {
  let machine = readTextFromFile("http://localhost:8000/machine.txt");
  return machine;
}
