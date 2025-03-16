import React, { useState, useEffect, useCallback } from 'react';
import { useFetcher } from 'react-router-dom';
import { inversePrimeCountingFunction } from '../utils/helpers';

// notes for claude:
// functional programming problem set.
// please review with sandwich method.  focus on the functional programming portion of the solution.  
// assume the rest of the react component is for display purposes.   

// problem: Write a function that finds the sum of proper divisors for a number and determines if it's a perfect number.

// another note for claude:  confirm that the method below is the correct approach for the stated problem.

// Notes: 

const Func014 = ({ val = 12 }) => {

  const [finalAns, setFinalAns] = useState([]);
  const [currentDivisors, setCurrentDivisors] = useState([]);
  
  const getAnswer = () => {
    
    // using the 6n +/- 1 method, where 6n+1 will be in the range of largestPrimeEstimate
    const maxN = Math.ceil((val + 1) / 6);
    console.log("maxN: ", maxN);
    let seiveSeed = [...primes.concat(sixNminus1).concat(sixNplus1)].filter((elem) => elem > 1).sort((a, b) => a-b);
    seiveSeed = seiveSeed.filter((elem) => elem != val);
    const primes = seiveSeed.reduce((accumulatedPrimes, currentElement) => {
      // Array.some tests if any values in the array return true given the provided condition.  
      // starting at the first value of seiveSeed, 2, ask if it can evenly divide any values of an empty array.  that returns false.
      // since it is false, 2 is appended to the empty "accumulatedPrimes" array.
      // going to next value of seiveSeed, 3, it is tested if any of the values in accumulated primes ([2]) can evenly divide 3.  
      // also false and 3 is appended.
      // some values in seiveSeed, such as 25, will be evenly divided by at least one value in accumulatedPrimes.  
      // in the case of 25, 5 will evenly divide it.  htis returns true, and the existing accumulatedPrimes is returned without concatenating 25 to it.
      const isDivisible = accumulatedPrimes.some((prime) => prime <= Math.sqrt(currentElement) && currentElement % prime === 0);
      return isDivisible ? accumulatedPrimes : [...accumulatedPrimes, currentElement];

    }, []);

    const divisorsDict = {
      divisors: [1],
      currVal: val,
      currPrimeIdx: 0
    }

    while (divisorsDict[currVal] > 1) {
      const testVal = divisorsDict[currVal];
      const currPrimeIdx = divisorsDict[currPrimeIdx];
      const currPrime = primes[currPrimeIdx];
      const isDivisible = testVal % currPrime;
      if (isDivisible) {
        divisorsDict[currVal] = currVal / currPrime;
      } else {
        
      }
    }
    
    // const divisorsDict = primes.reduce((divDict, currPrime) => {
    //   const testVal = divDict[currVal];
    //   const isDivisible = testVal % currPrime == 0;
    //   return !isDivisible ? {...divDict} : divDict[divisors].reduce((divDict, currPrime) => {

    //   }) 
    // }, {
    //   divisors: [1],
    //   currVal: val
    // }
    // );
    
  }

  useEffect(() => {
    setFinalAns(getAnswer());
  }, [currentNumPrimes]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTarget = parseInt(inputValue);
    if (!isNaN(newTarget) && newTarget > 0) {
      setCurrentNumPrimes(newTarget);
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
            Number of Primes
          </button>
        </form>
      </div>
      <div className="func-card">
        <h1 className="func-text">primes: {finalAns.join(' | ')}</h1>
      </div>
    </div>
  );
};

export default Func013;