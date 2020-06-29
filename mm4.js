var GameTable;
var cur1, cur2, cur3, cur4, cur5, cur6, cur7, cur8;
var imagesPath = 'images';
var currMouseValue = 'P';
var maxMouseValue = '8';
var num_colors = 8;
var code_length = 8;
var curr_attempt = 0;
var num_attempts = 0;
var num_bulls = 0;
var num_cows = 0;
var game_ended = 0;
var allow_duplicates = 0;

function Init() {
  GameTable = document.getElementById("GameTable");

  maxMouseValue = document.getElementById("NumColors").value;

  val = document.getElementById("NumColors").value;
  num_colors = parseInt(val);

  val = document.getElementById("CodeLength").value;
  code_length = parseInt(val);

  val = document.getElementById("NumAttempts").value;
  num_attempts = parseInt(val);

  val = document.getElementById("AllowDup").value;
  allow_duplicates = parseInt(val);

  cur1 = document.getElementById("Cur1");
  cur2 = document.getElementById("Cur2");
  cur3 = document.getElementById("Cur3");
  cur4 = document.getElementById("Cur4");
  cur5 = document.getElementById("Cur5");
  cur6 = document.getElementById("Cur6");
  cur7 = document.getElementById("Cur7");
  cur8 = document.getElementById("Cur8");

  curPath = 'url(' + imagesPath + '/color_1.cur),auto';
  cur1.style.cursor = curPath;
  curPath = 'url(' + imagesPath + '/color_2.cur),auto';
  cur2.style.cursor = curPath;
  curPath = 'url(' + imagesPath + '/color_3.cur),auto';
  cur3.style.cursor = curPath;
  curPath = 'url(' + imagesPath + '/color_4.cur),auto';
  cur4.style.cursor = curPath;
  curPath = 'url(' + imagesPath + '/color_5.cur),auto';
  cur5.style.cursor = curPath;
  curPath = 'url(' + imagesPath + '/color_6.cur),auto';
  cur6.style.cursor = curPath;
  curPath = 'url(' + imagesPath + '/color_7.cur),auto';
  cur7.style.cursor = curPath;
  curPath = 'url(' + imagesPath + '/color_8.cur),auto';
  cur8.style.cursor = curPath;

  colors = new createImageArray((num_colors * 2) + 1);
  colors[0].src = "images/color_hole.gif";

  for (i = 1; i <= num_colors; i++) {
    colors[i].src = "images/color_" + i + ".gif";
    //colors[i+num_colors].src= "images/color_"+i+"b.gif";
  }

  ibull = new Image();
  ibull.src = "images/bull.gif";

  icow = new Image();
  icow.src = "images/cow.gif";

  selectedNums = new Array(code_length);
  tmpSelectedNums = new Array(code_length);
  currRowNums = new Array(code_length);

  i = 0;

  do {
    rand_num = rand(num_colors);

    if (allow_duplicates == 1) {
      selectedNums[i] = rand_num;
    }
    else {
      exists = 0;

      for (j = 0; j < i; j++) {
        if (rand_num == selectedNums[j]) {
          exists = 1;
          break;
        }
      }


      if (exists == 1) {
        continue;
      }
      else {
        selectedNums[i] = rand_num;
      }
    }

    i++;

  } while (i < code_length);

  /*
  selectedNums[0] = 7;
  selectedNums[1] = 5;
  selectedNums[2] = 5;
  selectedNums[3] = 5;
  selectedNums[4] = 5;
  selectedNums[5] = 6;
  */

  for (i = 0; i < code_length; i++) {
    currRowNums[i] = 0;
  }

  if (GameTable.addEventListener) {
    GameTable.addEventListener('DOMMouseScroll', handle_wheel1, false);
  }
  GameTable.onmousewheel = handle_wheel1;
  curr_attempt = 0;
  game_ended = 0;

}

function createImageArray(len) {
  this.length = len;
  for (i = 0; i < len; i++) {
    this[i] = new Image();
  }
  return this;
}

function MouseSelection(value) {
  try {
    switch (value) {
      case '1':
        GameTable.style.cursor = cur1.style.cursor;
        break;

      case '2':
        GameTable.style.cursor = cur2.style.cursor;
        break;

      case '3':
        GameTable.style.cursor = cur3.style.cursor;
        break;

      case '4':
        GameTable.style.cursor = cur4.style.cursor;
        break;

      case '5':
        GameTable.style.cursor = cur5.style.cursor;
        break;

      case '6':
        GameTable.style.cursor = cur6.style.cursor;
        break;

      case '7':
        GameTable.style.cursor = cur7.style.cursor;
        break;

      case '8':
        GameTable.style.cursor = cur8.style.cursor;
        break;

      default: ;
    }


    if ((value >= '1') && (value <= maxMouseValue)) {
      currMouseValue = value;
    }

  }
  catch (err) {
    alert("Error in function MouseSelection : " + err.description);
  }
}

function handle_wheel1(event) {
  try {
    if ((currMouseValue >= '1') && (currMouseValue <= maxMouseValue)) {
      if (!event) {
        event = window.event;
        window.event.returnValue = false;
      }

      if (event.preventDefault) {
        event.preventDefault();
      }

      HandleMouseWheel(event);
    }
  }

  catch (err) {
    alert("Error in function Handle_Wheel1 : " + err.description);
  }
}

function HandleMouseWheel(e) {
  try {
    if ((currMouseValue >= '1') && (currMouseValue <= maxMouseValue)) {
      if (!e) e = window.event;

      if (e.wheelDelta <= 0 || e.detail > 0) {
        ChangeMouseSelection(1);
      }
      else {
        ChangeMouseSelection(-1);
      }
    }
  }

  catch (err) {
    alert("Error in function HandleMouseWheel : " + err.description);
  }
}

function ChangeMouseSelection(delta) {
  try {
    if (delta == 1) {
      if (currMouseValue == maxMouseValue) MouseSelection('1');
      else if (currMouseValue == '1') MouseSelection('2');
      else if (currMouseValue == '2') MouseSelection('3');
      else if (currMouseValue == '3') MouseSelection('4');
      else if (currMouseValue == '4') MouseSelection('5');
      else if (currMouseValue == '5') MouseSelection('6');
      else if (currMouseValue == '6') MouseSelection('7');
      else if (currMouseValue == '7') MouseSelection('8');
    }

    else {
      if (currMouseValue == '1') MouseSelection(maxMouseValue);
      else if (currMouseValue == '2') MouseSelection('1');
      else if (currMouseValue == '3') MouseSelection('2');
      else if (currMouseValue == '4') MouseSelection('3');
      else if (currMouseValue == '5') MouseSelection('4');
      else if (currMouseValue == '6') MouseSelection('5');
      else if (currMouseValue == '7') MouseSelection('6');
      else if (currMouseValue == '8') MouseSelection('7');
    }
  }
  catch (err) {
    alert("Error in function ChangeMouseSelection : " + err.description);
  }
}

function PutColor(x, y) {
  try {
    if (curr_attempt != y) return;
    if (game_ended == 1) return;

    if ((currMouseValue >= '1') && (currMouseValue <= maxMouseValue)) {
      img_name = "img" + (code_length * (num_attempts - y)) + x;

      document[img_name].src = colors[currMouseValue].src;

      currRowNums[x] = currMouseValue;
    }
  }
  catch (err) {
    alert("Error in function PutColor : " + err.description);
  }
}

function CheckRow() {
  try {
    if (game_ended == 1) return;

    if (curr_attempt == num_attempts) {
      alert('Sorry, no more attempts!');
      return;
    }

    for (i = 0; i < code_length; i++) {
      if (currRowNums[i] == 0) {
        alert('Row is not complete!');
        return;
      }
    }


    var str = '';
    for (i = 0; i < code_length; i++) {
      str = str + '|' + selectedNums[i];
    }

    num_bulls = 0;
    num_cows = 0;

    for (i = 0; i < code_length; i++) {
      tmpSelectedNums[i] = selectedNums[i]
    }

    for (i = 0; i < code_length; i++) {
      if (currRowNums[i] == tmpSelectedNums[i]) {
        num_bulls++;
        tmpSelectedNums[i] = 0;
        currRowNums[i] = 0;
      }
    }

    for (i = 0; i < code_length; i++) {
      if (currRowNums[i] == 0) continue;

      for (j = 0; j < code_length; j++) {
        if (currRowNums[i] == tmpSelectedNums[j]) {
          num_cows++;
          tmpSelectedNums[j] = 0;
          break;
        }
      }
    }

    for (i = 0; i < code_length; i++) {
      currRowNums[i] = 0;
    }

    PutBullsAndCows();

    rowName = "Row" + (num_attempts - curr_attempt);
    rowFld = document.getElementById(rowName);
    rowFld.style.background = "#ad7363";

    btnName = "Btn" + (num_attempts - curr_attempt);
    btnFld = document.getElementById(btnName);
    btnFld.style.visibility = "hidden";

    curr_attempt++;

    if (num_bulls == code_length) {
      game_ended = 1;
      Btr4000();
      alert("Congratulations!! You win !!");
      return;
    }

    if (num_attempts > curr_attempt) {
      rowName = "Row" + (num_attempts - curr_attempt);
      rowFld = document.getElementById(rowName);
      rowFld.style.background = "#885343";

      btnName = "Btn" + (num_attempts - curr_attempt);
      btnFld = document.getElementById(btnName);
      btnFld.style.visibility = "visible";
    }
    else {
      Btr4000();
    }
  }
  catch (err) {
    alert("Error in function CheckRow : " + err.description);
  }
}

function PutBullsAndCows() {
  try {
    for (i = 0; i < num_bulls; i++) {
      img_name = "bc_img" + (code_length * (num_attempts - curr_attempt)) + i;
      document[img_name].src = ibull.src;
    }

    for (i = num_bulls; i < num_bulls + num_cows; i++) {
      img_name = "bc_img" + (code_length * (num_attempts - curr_attempt)) + i;
      document[img_name].src = icow.src;
    }
  }
  catch (err) {
    alert("Error in function PutBullsAndCows : " + err.description);
  }
}

function rand(limit) {
  var i;
  var randomnumber = Math.floor(Math.random() * limit)

  x = randomnumber;
  y = x + 3;
  z = x + 5;
  for (i = randomnumber; i > 0; i--) {
    x = z - y;
    x = z + y;
    x = z * y;
    x = z + y;
    x = z - y;
    x = z * y;
  }

  return randomnumber + 1;
}

function Btr4000() {
  try {
    for (i = 0; i < code_length; i++) {
      img_name = "sel" + i;

      document[img_name].src = colors[selectedNums[i]].src;
    }
    GameTable.style.cursor = 'default';
  }
  catch (err) {
    alert("Error in function Btr4000 : " + err.description);
  }
}
