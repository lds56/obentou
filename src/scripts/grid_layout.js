

// const color2Number = {
//     'black': 0,
//     'red': 1,
//     'green': 2,
//     'yellow': 3,
//     'blue': 4,
//     'magenta': 5,
//     'cyan': 6,
//     'white': 7
// };


const cardTypes = [
    'Section', 'Note', 'Counter', 'Link', 'Map', 'Photo', 'Section', 'Social', 'Album'
]

const charList = [
  ...Array.from(Array(10), (_, i) => i.toString()),
  ...Array.from(Array(26), (_, i) => String.fromCharCode(97 + i)),
  ...Array.from(Array(26), (_, i) => String.fromCharCode(65 + i))
];


function trimTailBlankLines(str) {
    // 使用正则表达式匹配末尾的空白行，并将其替换为空字符串
    return str.replace(/\s*$/g, '');
}

function coloredByName(text, color) {
    const colorCode = color2Number[color];
    if (colorCode !== undefined) {
        const coloredString = `\x1b[48;5;${colorCode}m${text}\x1b[0m`;
        return coloredString;
    } else {
        return text;
    }
}

function coloredByCode(text, backgroundColor) {
    // ANSI 转义序列格式：\x1b[背景色码m数字\x1b[0m
    const coloredString = `\x1b[48;5;${backgroundColor}m${text}\x1b[0m`;
    return coloredString;
}


// 检查是否有足够的空间放置单元格
function canPlaceCell(grid, row, col, width, height) {
  for (let r = row; r < row + height; r++) {
    for (let c = col; c < col + width; c++) {
      if (r >= grid.length || c >= grid[0].length || grid[r][c] !== ' ') {
        return false;
      }
    }
  }
  return true;
}

// 放置单元格
function placeCell(grid, row, col, width, height, char) {
  for (let r = row; r < row + height; r++) {
    for (let c = col; c < col + width; c++) {
      grid[r][c] = char;
    }
  }
}

// 尝试放置单元格，如果当前位置不行，则自动换行
function tryPlaceCell(grid, width, height, char, startRow) {
  for (let row = startRow; row < grid.length; row++) {
    for (let col = 0; col <= grid[0].length - width; col++) {
      if (canPlaceCell(grid, row, col, width, height)) {
        placeCell(grid, row, col, width, height, char);
        if (col == 0) {
            startRow = row;
        }
        return startRow;
      }
    }
  }
}

function addCell(grid, cellShape, cellChar, startRow) {
  const [num1, num2] = cellShape.split('x').map(Number);
  return tryPlaceCell(grid, num2, num1, cellChar, startRow);
}

export function arrangeGrid(cellList) {
    
    let startRow = 0;
    
    // 初始化 grid，8 列，足够多的行
    const grow = 20;
    const gcol = 8;
    const grid = Array.from({ length: grow }, () => Array(gcol).fill(' '));
    
    for (let i=0; i<cellList.length; i++) {
        // console.log('start row:', startRow);
        let cell = cellList[i];
        let [cellType, cellShape] = cell.split('-');
        let cellChar = coloredByCode(charList[i].toString(), cardTypes.indexOf(cellType) + 1);
        startRow = addCell(grid, cellShape, cellChar, startRow);
    }

    // let gridStr = grid.map(row => row.join('')).join('\n');
    // gridStr = trimTailBlankLines(gridStr);
    
    // 输出 grid
    // grid.forEach(row => console.log(row.join('')));    
    
    const gridStr = grid
                        .map(row => row.join(''))
                        .filter(row => row.trim() !== '')
                        .join('\n');
    return gridStr;
    // return gridStr;
}

// console.log(arrangeGrid(['Section-1x8', 'Note-4x4', 'Link-4x2', 'Social-2x4', 'Photo-2x2', 'Counter-1x4']));
// console.log(arrangeGrid(['Link-2x2', 'Map-2x4', 'Counter-1x4', 'Link-2x4', 'Section-1x8', 'Note-2x2', 'Album-4x4']));


// console.log(trimTailBlankLines('sdfafa\n    \n    \n   '))
// 使用示例
// console.log(coloredByCode(5, 0)); // 在蓝色背景下显示数字5
