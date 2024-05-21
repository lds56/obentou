import inquirer from 'inquirer';

const modeInputs = await inquirer.prompt([
    {
      name: 'mode',
      type: 'checkbox',
      choices: [
          {name: 'create', value: 'create'}, 
          {name: 'edit', value: 'edit'},
        ],
      message: 'Choose cli mode',
    }
  ]);

  console.log('inp', modeInputs);