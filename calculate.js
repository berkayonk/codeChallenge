/**
 * This class is for calculating RPN
 *
 * @author  Berkay Önk
 */

const express = require('express');
const router = express.Router();

// Get function
router.get('/', (req,res,next) => {
    // Get expression form user input
    let expression = req?.body?.expression; // Get expression form user json

    // Remove empty spaces from input
    const expressionArray = expression.split(" ");

    let myArray = new Array();

    for(let element of expressionArray){ // used of in order to reach values
        if(element.match(/[0-9]/)){ // if it is a number between 0-9 add to array 
            myArray.push(parseInt(element)); // turn all to integer before pushing
        }
        else{ // non-number value encountered
            let firstNumber = myArray.pop(); // first number that comes from array
            let secondNumber = myArray.pop(); // second number that comes from array
            let myResult = 0;

            // arithmetic operations
            if(element == '+'){
                myResult = secondNumber + firstNumber;
            }
            else if(element == '-'){
                myResult = secondNumber - firstNumber;
            }
            else if(element == '*'){
                myResult = secondNumber * firstNumber;
            }
            else if(element == '/'){
                myResult = parseInt(secondNumber / firstNumber);
            }

            myArray.push(myResult); // add result to array
        }
    }

    let result = myArray.pop(); // only element that stays in array is our result

    // Send our response to client.
    res.status(200).json({
        'result': result,
    });
});

module.exports = router;