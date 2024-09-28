import React from 'react';
import { useState } from 'react';
import './App.css';

function App() {
  const [array ,setArray] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0], 
  ]);
  

  function pauseUsingSetTimeout() {
    console.log("Before pause");
    setTimeout(() => {
        console.log("After pause");
    }, 2000); // Pause for 2000 milliseconds (2 seconds)
}
    const reset = () =>{
        setArray(  Array(9).fill().map(() => Array(9).fill(0)))
    }
    const change = (row,col) =>{
        const value = prompt("enter number");
        const newArray = [...array];
        newArray[row][col] = value;
        setArray(newArray);
    }
    const changeArray = (row, col, num)=>{
        const newArray = [...array];
        newArray[row][col] = num;
        setArray(newArray);
    }
    const findEmptySpot = (board) => {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (board[i][j] === 0) {
                    return [i, j]; // Return row and column
                }
            }
        }
        return null; // No empty spots
    };

    const isValid = (board, row, col, num) => {
        // Check row
        for (let j = 0; j < 9; j++) {
            if (board[row][j] === num) return false;
        }

        // Check column
        for (let i = 0; i < 9; i++) {
            if (board[i][col] === num) return false;
        }

        // Check 3x3 box
        const boxRow = Math.floor(row / 3) * 3;
        const boxCol = Math.floor(col / 3) * 3;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[boxRow + i][boxCol + j] === num) return false;
            }
        }
        
        return true; // Valid placement
    };

    
    const backtrack = () => {
        const emptySpot = findEmptySpot(array);
        if (!emptySpot) {
            return true; // Solved
        }

        const [row, col] = emptySpot;

        for (let num = 1; num <= 9; num++) {
             
            const numStr = num;
            if (isValid(array, row, col, numStr)) {
                // board[row][col] = numStr; // Place the number
                changeArray(row,col,numStr);
                
                if (backtrack()) {
                    return true; // Recursively continue
                }
                changeArray(row,col,0);// Backtrack
              
            }
        }
        return false; // No solution found
    };
    
  return (
    <div className="App">
      <h1>Sudoku Table</h1>
      <table>
        <tbody>
          {array.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((item, colIndex) => (
                <td key={colIndex}
                onClick={()=>change(rowIndex,colIndex)}
                >{item}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick = {backtrack}>
          solve this 
      </button>
      <button onClick = {reset}>
          reset
      </button>
    </div>
  );
}

export default App;