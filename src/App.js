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
  const [visited,setVisited] = useState(Array.from({ length: 9 }, () => Array(9).fill(0)));
  

  function pauseUsingSetTimeout() {
    console.log("Before pause");
    setTimeout(() => {
        console.log("After pause");
    }, 2000); // Pause for 2000 milliseconds (2 seconds)
}
    const reset = () =>{
        setArray(  Array(9).fill().map(() => Array(9).fill(0)));
        setVisited( Array(9).fill().map(() => Array(9).fill(0)) );
    }

    const change = (row,col) =>{
        const value = parseInt(prompt("enter number"));
        if(value < 0 || value > 9){
            alert("enter valid number");
            return;
        }
        const newArray = [...array];
        newArray[row][col] = value;
        const newVis = [...visited];
        newVis[row][col] = 1;
        setVisited(newVis);
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
                const newArray = [...array];
                newArray[row][col] = num; // Place the number

                setArray(newArray); // Update the array state
                if (backtrack()) {
                    return true; // Continue solving
                }
                newArray[row][col] = 0; // Backtrack
                setArray(newArray); // Update state back
              
            }
        }
        return false; // No solution found
    };
    function isSudokuValid(board) {
        const isRowValid = (row) => {
            const seen = new Set();
            for (let num of row) {
                if (num !== 0) {
                    if (seen.has(num)) return false; // Duplicate found
                    seen.add(num);
                }
            }
            return true;
        };
    
        const isColumnValid = (colIndex) => {
            const seen = new Set();
            for (let i = 0; i < 9; i++) {
                const num = board[i][colIndex];
                if (num !== 0) {
                    if (seen.has(num)) return false; // Duplicate found
                    seen.add(num);
                }
            }
            return true;
        };
    
        const isBoxValid = (rowStart, colStart) => {
            const seen = new Set();
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    const num = board[rowStart + i][colStart + j];
                    if (num !== 0) {
                        if (seen.has(num)) return false; // Duplicate found
                        seen.add(num);
                    }
                }
            }
            return true;
        };
    
        // Check all rows, columns, and 3x3 boxes
        for (let i = 0; i < 9; i++) {
            if (!isRowValid(board[i])) return false; // Check row
            if (!isColumnValid(i)) return false; // Check column
        }
    
        // Check all 3x3 boxes
        for (let row = 0; row < 9; row += 3) {
            for (let col = 0; col < 9; col += 3) {
                if (!isBoxValid(row, col)) return false; // Check box
            }
        }
    
        return true; // The board is valid
    }
  const solveSudoku = () =>{
    if(!isSudokuValid(array)){
        alert("enter valid inputs");
        return;
    }
    
    backtrack();
  }  
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
      <button onClick = {solveSudoku}>
          solve this 
      </button>
      <button onClick = {reset}>
          reset
      </button>
    </div>
  );
}

export default App;