// import boxen from 'boxen';

// console.log(boxen('unicorn', {padding: 1}));
// /*
// ┌─────────────┐
// │             │
// │   unicorn   │
// │             │
// └─────────────┘
// */

// console.log(boxen('unicorn', {textAlignment: 'center', width:10, height: 5}));
// /*

//    ╔═════════════╗
//    ║             ║
//    ║   unicorn   ║
//    ║             ║
//    ╚═════════════╝

// */

// console.log(boxen('unicorns love rainbows', {title: 'magical', titleAlignment: 'center'}));
// /*
// ┌────── magical ───────┐
// │unicorns love rainbows│
// └──────────────────────┘
// */

function getColoredRect(width, height, color) {
    const reset = "\x1b[0m";
    const colorCode = {
      red: "\x1b[41m",
      green: "\x1b[42m",
      yellow: "\x1b[43m",
      blue: "\x1b[44m",
      magenta: "\x1b[45m",
      cyan: "\x1b[46m",
      white: "\x1b[47m"
    }[color] || "";
  
    let output = "";
    for (let i = 0; i < height; i++) {
      output += colorCode;
      for (let j = 0; j < width; j++) {
        output += "  ";
      }
      output += reset + "\n";
    }
  
    console.log('wwww:', width);

    return output;
  }

  function getSize(rect) {
    let lines = rect.split('\n');
    const h = lines.length;
    const w = lines[0].split(' ').length - 1;
    return [h, w];
  }

  function mergeV(rect1, rect2) {

    const [h1, w1] = getSize(rect1);

    let output = rect1;
    
    for (let i=0; i<w1; i++) {
        output += ' ';
    }
    output += "\n"; 
    output += rect2;
    return output;
  }

  function mergeH(rect1, rect2) {
    let lines1 = rect1.split('\n');
    let lines2 = rect2.split('\n');
    let output = "";
    for (let i=0; i<lines1.length; i++) {
        output += lines1[i] + '  ' + lines2[i] + '\n';
    }
    return output;
  }
  
  // 使用示例

  console.log(mergeV(getColoredRect(4, 3, "green"), getColoredRect(4, 3, "red")));
  console.log(mergeH(getColoredRect(4, 3, "red"), getColoredRect(4, 3, "blue")));


  console.log(getColoredRect(4, 3, "white"));

  console.log(getColoredRect(9, 6, "green"));

  console.log(getColoredRect(4, 6, "blue"));

  console.log(getColoredRect(9, 3, "cyan"));

  console.log(getColoredRect(9, 1, "magenta"));


  let aaa = mergeV(getColoredRect(9, 1, "green"), getColoredRect(9, 1, "red"));
  let ccc= getColoredRect(9, 3, "cyan");
//   console.log(ccc);
//   console.log(aaa);
  let bbb = mergeH(aaa, ccc);
  console.log(bbb);