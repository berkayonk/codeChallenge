/**
 * This class for giving hint to minesweep player
 *
 * @author  Berkay Önk
 */

const express = require('express');
const router = express.Router();

// Get function
router.get('/', (req,res,next) => {
    // Get expression form user input
    var square = req?.body?.square; 
    var arraySquare = new Array();
    var resultSquare = new Array();

    // Turn all '.' to '0'
    for(var i = 0; i < square.length; i++){
        var temp = square[i].replaceAll('.','0'); 
        arraySquare.push(temp);
    }

    // Turn all string members to array. (all '*'s will turn into null)
    for(var i = 0; i < arraySquare.length; i++){  // loop for 3 string  
        resultSquare.push(arraySquare[i].split('').map(Number));
    }

    // Replace nulls that created in previous function.
    for(var i = 0; i < resultSquare.length; i++){
        for(var y = 0; y < resultSquare[i].length; y++){
            if(arraySquare[i][y].match(/[^0-9]/g)){ // if we encounter non-number value
                resultSquare[i].splice(y, 1, '*'); // replace non-number value's with '*'
            }
        }
    }

    // Look for mines and increase around it.
    var mineSweeper = myArray => {
        for (let row = 0; row < myArray.length; row++) {
            for (let column = 0; column < myArray[row].length; column++) {
                if (myArray[row][column] === '*') {
                    // check if element is an integer in order to avoid nulls then do operations
                    Number.isInteger(myArray[row - 1] && myArray[row - 1][column]) && myArray[row - 1][column]++; 
                    Number.isInteger(myArray[row] && myArray[row][column - 1]) && myArray[row][column - 1]++;
                    Number.isInteger(myArray[row + 1] && myArray[row + 1][column]) && myArray[row + 1][column]++;
                    Number.isInteger(myArray[row] && myArray[row][column + 1]) && myArray[row][column + 1]++;
                    Number.isInteger(myArray[row - 1] && myArray[row - 1][column - 1]) && myArray[row - 1][column - 1]++;
                    Number.isInteger(myArray[row + 1] && myArray[row + 1][column + 1]) && myArray[row + 1][column + 1]++;
                    Number.isInteger(myArray[row - 1] && myArray[row - 1][column + 1]) && myArray[row - 1][column + 1]++;
                    Number.isInteger(myArray[row + 1] && myArray[row + 1][column - 1]) && myArray[row + 1][column - 1]++;
                }
            }
        }
    };   
    mineSweeper(resultSquare);

    // transform 2d array to required format.
    var result = resultSquare.map(arr => arr.join(''));

    // Send our response to client.
    res.status(200).json({
        hints: result
    });
});

module.exports = router;