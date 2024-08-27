function printG(){
  for (var i=0; i < 7; i++) {
    var row=""
      for (var j=0; j < 5; j++) {
        if (j == 0 || i == 0 && j != 5 || i == 6 && j != 5 || i == 3 && j != 1 && j != 2 || j == 4 && i != 1 && i != 2) {
          row+="*"
        }else {
           row+=" "
        }
      }
    console.log(row);
  }
}
printG()