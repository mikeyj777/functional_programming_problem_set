import React, { useState, useEffect, useCallback } from 'react';
import { useFetcher } from 'react-router-dom';
import { inversePrimeCountingFunction } from '../utils/helpers';

// notes for claude:
// functional programming problem set.
// please review with sandwich method.  focus on the functional programming portion of the solution.  
// assume the rest of the react component is for display purposes.   

// problem: Write a function that finds the sum of proper divisors for a number and determines if it's a perfect number.

// another note for claude:  confirm that the method below is the correct approach for the stated problem.

const Func014 = ({ val = 6 }) => {

  const [finalAns, setFinalAns] = useState(false);
  const [currentDivisors, setCurrentDivisors] = useState([]);
  const [currVal, setCurrVal] = useState(val);
  const [inputValue, setInputValue] = useState(val);
  
  const getAnswer = () => {
    
    const testVals = Array.from({length: Math.floor(currVal / 2)}, (_, index) => index + 1);
    const divisors = testVals.reduce((divs, currTest) => {
      const isDivisible = currVal % currTest === 0;
      return isDivisible ? [...divs, currTest] : [...divs];
    }, [])

    // note from claude on better approach:  testVals.filter(num => currVal % num === 0);
    
    setCurrentDivisors(divisors);

    const totVal = divisors.reduce((accum, currElem) => accum + currElem, 0);
    return totVal === currVal;
    
  }

  useEffect(() => {
    setFinalAns(getAnswer());
  }, [currVal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTarget = parseInt(inputValue);
    if (!isNaN(newTarget) && newTarget > 0) {
      setCurrVal(newTarget);
    }
  };

  return (
    <div className="func-container">
      <div className="func-card">
        <form onSubmit={handleSubmit} className="input-form">
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="func-input"
            min="1"
          />
          <button type="submit" className="func-button">
            Value to test for Perfection
          </button>
        </form>
      </div>
      <div className="func-card">
        <h1 className="func-text">divisors: {currentDivisors.join(' | ')}</h1>
      </div>
      <div className="func-card">
        <h1 className="func-text">Perfect? {finalAns.toString()}</h1>
      </div>
    </div>
  );
};

export default Func014;