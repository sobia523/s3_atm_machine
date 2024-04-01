#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";


//initialize user balance and pin code
let myBalance = 12000;
let myPin = 2345;

// print welcome message
console.log(chalk.greenBright("\n \tWelcome to Syeda Sobia - ATM_Machine\n"));

let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        type: "number",
        message: chalk.yellowBright("Enter your pin code: ")
    }
])
if (pinAnswer.pin === myPin){
    console.log(chalk.bold("\nPin is Correct, Login Successfully!\n"));
   // console.log(`Current Account Balance is ${myBalance}`);

    let operationAns = await inquirer.prompt([
        {
            name: "operation",
            type: "list",
            message: "Select an operation:",
            choices: ["Withdraw Ammount" , "Check Balance"]
        }
    ])

    if(operationAns.operation === "Withdraw Ammount"){
        let withdrawAns = await inquirer.prompt([
            {
                name: "withdrawMethod",
                type: "list",
                message: "Select a withdrawl method:",
                choices: ["Fast Cash", "Enter Amount"]
            }
        ])
        if(withdrawAns.withdrawMethod === "Fast Cash"){
            let fastcashAns = await inquirer.prompt([
                {
                    name: "fastCash",
                    type: "list",
                    message: "Select Amount:",
                    choices: [1000, 2000, 5000, 10000, 120000, 20000, 50000]
                }
            ])
            if(fastcashAns.fastCash > myBalance){
                console.log(chalk.redBright("Insufficient Balance"));
            }
            else{
                myBalance -= fastcashAns.fastCash
                console.log(`${fastcashAns.fastCash} withdraw Successfully`);
                console.log(`Your Remaining Balance is: ${myBalance}`);
            }
        }
        else if(withdrawAns.withdrawMethod === "Enter Amount"){
            let amountAns = await inquirer.prompt([
                {
                    name: "amount",
                    type: "number",
                    message: "Enter the amount to withdraw:"
                }
            ])
            if(amountAns.amount > myBalance){
                console.log("Insufficient Balance");
            }
            else{
                myBalance -= amountAns.amount;
                console.log(`${amountAns.amount} Withdraw Successfully`);
                console.log(`Your Remaining Balance is: ${myBalance}`);
            }    
        }
     
    }
    else if (operationAns.operation === "Check Balance"){
        console.log(`Your Account Balance is ${myBalance}`);
    }
}
else{
    console.log(chalk.red("Pin is Incorrect, Try Again!"));
}


