const inquirer = require('inquirer');
const fs = require('fs');
const generatePage = require('./src/pageTemplate');
const { DH_UNABLE_TO_CHECK_GENERATOR } = require('constants');

let questions = [];
let addMemberType = 'Manager';

const promptTeam = teamData => {
  console.log(`
=================
Add a New members
=================
`, addMemberType);

if (!teamData) {
  teamData = [];
}

questions = [
  {
    type: 'input',
    name: 'name',
    message: 'Please enter the team member’s name?',
    validate: nameInput => {
      if (nameInput) {
        return true;
      } else {
        console.log('Please enter the team member’s name!');
        return false;
      }
    }
  },
  {
    type: 'input',
    name: 'empId',
    message: 'Enter the team member’s employee ID',
    validate: empIdInput => {
      if (empIdInput) {
        return true;
      } else {
        console.log('Please enter the team member’s employee ID!');
        return false;
      }
    }
  },
  {
    type: 'input',
    name: 'empEmail',
    message: 'Enter the team member’s email',
    validate: empEmailInput => {
      if (empEmailInput) {
        return true;
      } else {
        console.log('Please enter the team member’s email!');
        return false;
      }
    }
  }
]
switch(addMemberType){
  case 'Manager':
    questions.push(
    {
      type: 'input',
      name: 'officeNum',
      message: 'Enter the team manager’s office number',
      validate: officeNumInput => {
        if (officeNumInput) {
          return true;
        } else {
          console.log('Please enter the team manager’s office number!');
          return false;
        }
      }
    });
    break;
  case 'Engineer':
    questions.push(
      {
        type: 'input',
        name: 'github',
        message: 'Enter the team engineer’s Github username',
        validate: githubInput => {
          if (githubInput) {
            return true;
          } else {
            console.log('Please enter the team engineer’s Github username!');
            return false;
          }
        }
      });
    break;
  case 'Intern':
    questions.push(
      {
        type: 'input',
        name: 'intSchool',
        message: 'Enter the team intern’s school',
        validate: intSchoolInput => {
          if (intSchoolInput) {
            return true;
          } else {
            console.log('Please enter the team intern’s school!');
            return false;
          }
        }
      });
    break;
}
questions.push(
  {
    type: 'list',
    name: 'addEmployee',
    message: 'Add another Employee or finished inputing team?',
    choices: ['Add Engineer','Add Intern','Finished building the Team'],
    validate: switchInput => {
      if (switchInput) {
        return true;
      } else {
        console.log('Please select one!');
        return false;
      }
    }
  }
)
  return inquirer.prompt(questions)
  .then (memberData => {
     memberData.role = addMemberType;
    switch(memberData.addEmployee){
      case 'Add Engineer':
        addMemberType = 'Engineer';
       teamData.push(memberData);
        return promptTeam(teamData);
        break;
      case 'Add Intern':
        addMemberType = 'Intern';
        teamData.push(memberData);
        return promptTeam(teamData);
        break;
      case 'Finished building the Team':
        console.log('Finished building the Team!');
        teamData.push(memberData);
        return teamData;
         break;
    }    
  })
};


// // TEST DATA
// async function promptTeam(teamData) {
//   teamData = (
//   [
//     {
//       name: 'Gon Freecss',
//       empId: '123',
//       empEmail: 'gon@HunterPedia.com',
//       officeNum: '123',
//       addEmployee: 'Add Engineer',
//       role: 'Manager'
//     },
//     {
//       name: 'Killua Zoldyck',
//       empId: '125',
//       empEmail: 'cstark@HunterPedia.com',
//       github: 'assassinKid',
//       addEmployee: 'Add Intern',
//       role: 'Engineer'
//     },
//     {
//       name: 'Hisoka',
//       empId: '124',
//       empEmail: 'Hisoka@HunterPedia.com',
//       github: 'GOOOONNNN',
//       addEmployee: 'Add Intern',
//       role: 'Engineer'
//     },
//     {
//       name: 'Kurapika',
//       empId: '126',
//       empEmail: 'ScarletEyes@HunterPedia.com',
//       intSchool: 'FIU',
//       addEmployee: 'Add Intern',
//       role: 'Intern'
//     },
//     {
//       name: 'Leorio',
//       empId: '127',
//       empEmail: '@HunterPedia.com',
//       intSchool: 'FIU',
//       addEmployee: 'Finished building the Team',
//       role: 'Intern'
//     },
//
//   );
//   return generatePage(teamData);
// };

function init(){
  promptTeam()
    .then(teamData => {
      return generatePage(teamData);
    })
    .then(pageHTML => {
      fs.writeFile('./dist/index.html', pageHTML, err => {
        if (err) throw err;
      })
      console.log('team complete! Check out index.html!');
    })
}

init();
