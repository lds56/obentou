import inquirer from 'inquirer';
import { promises as fs } from 'node:fs';

import { arrangeGrid } from './grid_layout.js'

// const shapes = [
//   {'name': '4x4', 'value': '4x4'},
//   {'name': '1x4', 'value': '1x4'},
//   {'name': '2x2', 'value': '2x2'},
//   {'name': '2x4', 'value': '4x2'},
//   {'name': '4x2', 'value': '2x4'}
// ];

const shapes = ['4x4', '4x2', '2x4', '2x2', '1x4'];

async function enterProfile() {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Enter your name:',
    },
    {
      type: 'input',
      name: 'bio',
      message: 'Enter your bio:',
    },
    {
      type: 'input',
      name: 'avatar',
      message: 'Enter your avatar file name:',
    },
  ]);
}

async function enterShowcase() {
  let showcase = [];
  let addMore = true;
  while (addMore) {
    const cardType = await inquirer.prompt({
      type: 'list',
      name: 'cardType',
      message: 'Select the type of card to add:',
      choices: ['Note', 'Counter', 'Social', 'Link', 'Album', 'Section', 'Photo', 'Map'],
    });

    switch (cardType.cardType) {
      case 'Note':
        const noteCard = await inquirer.prompt([
          {
            type: 'input',
            name: 'title',
            message: 'Enter the title of the note:',
          },
          {
            type: 'input',
            name: 'content',
            message: 'Enter the content of the note:',
          },
          {
            type: 'list',
            name: 'shape',
            message: 'Select the shape of the note:',
            choices: shapes,
          },
          {
            type: 'input',
            name: 'bgColor',
            message: 'Enter the background color (e.g., bg-green-500):',
          },
          {
            type: 'input',
            name: 'bgImgUrl',
            message: 'Enter the background image URL (optional):',
          },
        ]);
        showcase.push({ Note: noteCard });
        break;

      case 'Counter':
        const counterCard = await inquirer.prompt([
          {
            type: 'input',
            name: 'title',
            message: 'Enter the title of the counter:',
          },
          {
            type: 'input',
            name: 'datetime',
            message: 'Enter the datetime (e.g., 2025/06/01-00:00:00):',
          },
          {
            type: 'list',
            name: 'shape',
            message: 'Select the shape of the counter:',
            choices: shapes,
          },
          {
            type: 'input',
            name: 'bgColor',
            message: 'Enter the background color (e.g., bg-green-500):',
          },
        ]);
        showcase.push({ Counter: counterCard });
        break;

      case 'Social':
        const socialCard = await inquirer.prompt([
          {
            type: 'input',
            name: 'title',
            message: 'Enter the title (e.g., your name):',
          },
          {
            type: 'input',
            name: 'platform',
            message: 'Enter the social platform (e.g., Twitter):',
          },
          {
            type: 'input',
            name: 'userId',
            message: 'Enter your user ID on the platform (e.g., @johnsmith):',
          },
          {
            type: 'list',
            name: 'shape',
            message: 'Select the shape of the social card:',
            choices: shapes,
          },
        ]);
        showcase.push({ Social: socialCard });
        break;

      case 'Link':
        const linkCard = await inquirer.prompt([
          {
            type: 'input',
            name: 'title',
            message: 'Enter the title of the link (e.g., "This is my homepage"):',
          },
          {
            type: 'input',
            name: 'url',
            message: 'Enter the URL:',
          },
          {
            type: 'list',
            name: 'shape',
            message: 'Select the shape of the link card:',
            choices: shapes,
          },
        ]);
        showcase.push({ Link: linkCard });
        break;

      case 'Album':
        const albumCard = await inquirer.prompt([
          {
            type: 'input',
            name: 'imgs',
            message: 'Enter the image file names (separated by commas):',
          },
          {
            type: 'input',
            name: 'title',
            message: 'Select the title of the album card:',
          },
          {
            type: 'list',
            name: 'shape',
            message: 'Select the shape of the album card:',
            choices: shapes,
          },
          
        ]);
        albumCard.imgs = albumCard.imgs.split(',').map((img) => img.trim());
        showcase.push({ Album: albumCard });
        break;

      case 'Section':
        const sectionCard = await inquirer.prompt([
          {
            type: 'input',
            name: 'title',
            message: 'Enter the title of the section:',
          },
          {
            type: 'input',
            name: 'subtitle',
            message: 'Enter the subtitle of the section (optional):',
          },
        ]);
        showcase.push({ Section: sectionCard });
        break;

      case 'Photo':
        const photoCard = await inquirer.prompt([
          {
            type: 'input',
            name: 'title',
            message: 'Enter the title of the photo (optional):',
          },
          {
            type: 'input',
            name: 'content',
            message: 'Enter the content of the photo (optional):',
          },
          {
            type: 'input',
            name: 'imgUrl',
            message: 'Enter the image URL:',
          },
          {
            type: 'list',
            name: 'shape',
            message: 'Select the shape of the photo card:',
            choices: shapes,
          },
        ]);
        showcase.push({ Photo: photoCard });
        break;

      case 'Map':
        const mapCard = await inquirer.prompt([
          {
            type: 'input',
            name: 'title',
            message: 'Enter the title of the map:',
          },
          {
            type: 'input',
            name: 'content',
            message: 'Enter the content of the map (e.g., location name):',
          },
          {
            type: 'input',
            name: 'address',
            message: 'Enter the address:',
          },
          {
            type: 'input',
            name: 'zoom',
            message: 'Enter the zoom level:',
          },
          {
            type: 'list',
            name: 'shape',
            message: 'Select the shape of the map card:',
            choices: shapes,
          },
        ]);
        showcase.push({ Map: mapCard });
        break;
    }

    const addMorePrompt = await inquirer.prompt({
        type: 'confirm',
        name: 'addMore',
        hint: 'Do you want to add another card?',
    });
    
    addMore = addMorePrompt.addMore;
  }
  return showcase;
}

async function collectInputs() {

  const modeInputs = await inquirer.prompt([
    {
      name: 'mode',
      type: 'list',
      choices: [
          {name: 'create', value: 'create'}, 
          {name: 'edit', value: 'edit'},
        ],
      message: 'Choose cli mode',
    }
  ]);

  console.log('inp', modeInputs);

  let showcase = [];
  let jsonData = null;

  if (modeInputs.mode === 'edit') {

    try {
      // 异步读取 JSON 文件
      const data = await fs.readFile('src/data/john-smith2.json', 'utf8');
      const jsonDat
      
      a = JSON.parse(data);
      console.log(jsonData);

      showcase = jsonData['showcase'];
    } catch (error) {
      console.error('Error:', error);
    }
    

  } else {
    const inputs = await enterProfile();
    showcase = await enterShowcase();
    jsonData = { ...inputs, showcase };
  }

  // 将 JSON 数据转换为对应的字符串数组
  const cellList = showcase.map((item, index) => {
    const cardType = Object.keys(item)[0]; // 获取卡片类型
    const card = item[cardType];
    if (cardType === 'Section') {
      return 'Section-1x8';
    }
    const shape = card['shape'];
    if (!shape) {
        return null; // 如果 shape 为空，则跳过该项数据
    }
    return `${cardType}-${shape}`;
  }).filter(item => item !== null); // 过滤掉空项数据

  console.log(cellList);
  console.log(arrangeGrid(cellList));

  const cardList = showcase.map((item, index) => {
    const cardType = Object.keys(item)[0];
    const card = item[cardType];
    const title = card['title'];
    if (!title) {
      return null;
    }
    return `${index}. ${cardType}(title=${title})`
  }).filter(item => item !== null);

  console.log(cardList.join('\n'));

  return jsonData;
}

async function main() {
  const data = await collectInputs();
  await fs.writeFile('output.json', JSON.stringify(data, null, 2));
  console.log('Data written to output.json');
}

main();