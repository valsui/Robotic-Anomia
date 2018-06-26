const matrixMode = (canvas, context, array) => {
  for (var x = 0; x <= canvas.width ; x ++) {
    var row = array[x];
    for (var y = 0; y <= canvas.height  ; y ++) {
      if (array[x][y] === 1) {
          // context.font = "1px serif";
          context.fillStyle = "white";
          context.textAlign = "center";
          context.fillText("1",x  ,y );
      }else {
        context.fillStyle = "green";
        context.textAlign = "center";
        context.fillText("0",x ,y);
      }
    }
  }
}


export default matrixMode;
