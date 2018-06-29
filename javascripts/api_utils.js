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
