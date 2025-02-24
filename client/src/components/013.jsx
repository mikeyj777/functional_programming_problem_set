import React, { useState, useEffect, useCallback } from 'react';
import { useFetcher } from 'react-router-dom';
import { inversePrimeCountingFunction } from '../utils/helpers';

// notes for claude:
// functional programming problem set.
// please review with sandwich method.  focus on the functional programming portion of the solution.  
// assume the rest of the react component is for display purposes.   

// problem: Create a function that generates the first n prime numbers using functional programming concepts.

// another note for claude:  confirm that the method below is the correct approach for the stated problem.

// Notes: 
// this uses an estimator for the nth largest prime in a sequence starting from 2.
// given that estimate, it then uses the 6n +/- 1 method to generate a seed for a seive technique.
// once the seed array is generated, the seive proceeds as follows:
  // start with an empty array.  then test if the first value of the seed array (2) can divide any values.  false by definition.  
  // add that value (2) to the array of accumulated primes
  // any values in the seive which cannot be evenly divided by the accumulated primes must also be prime.

const Func013 = ({ numPrimes = 10 }) => {

  const [finalAns, setFinalAns] = useState([]);
  const [currentNumPrimes, setCurrentNumPrimes] = useState(numPrimes);
  const [inputValue, setInputValue] = useState(numPrimes);
  
  
  // the inverse pi function can give somewhat of an estimate of the largest prime in a group of targeted size.
  // That is, if were looking for the first 10 primes, we would use inverse pi function to estimate what the largest
  // of those 10 primes would be.  since it is a very rough estimate, the esimated function takes that value and 
  // arbitrarily scales the output by 3.
  const estimatedLargestPrime = (p) => 3 * Math.ceil(inversePrimeCountingFunction(p));
  

  const getAnswer = () => {
    
    const largestPrimeEstimate = estimatedLargestPrime(currentNumPrimes);
    
    // using the 6n +/- 1 method, where 6n+1 will be in the range of largestPrimeEstimate
    const maxN = Math.ceil(largestPrimeEstimate / 6);
    console.log("maxN: ", maxN);
    const sixNplus1 = Array.from({ length: maxN + 1 }, 
      (_, index) => 6 * index + 1
    );
    const sixNminus1 = Array.from({ length: maxN + 1 }, 
      (_, index) => 6 * index - 1
    );
    const primes = [2,3];
    let seiveSeed = [...primes.concat(sixNminus1).concat(sixNplus1)].filter((elem) => elem > 1).sort((a, b) => a-b);
    const primesOut = seiveSeed.reduce((accumulatedPrimes, currentElement) => {
      // Array.some tests if any values in the array return true given the provided condition.  
      // starting at the first value of seiveSeed, 2, ask if it can evenly divide any values of an empty array.  that returns false.
      // since it is false, 2 is appended to the empty "accumulatedPrimes" array.
      // going to next value of seiveSeed, 3, it is tested if any of the values in accumulated primes ([2]) can evenly divide 3.  
      // also false and 3 is appended.
      // some values in seiveSeed, such as 25, will be evenly divided by at least one value in accumulatedPrimes.  
      // in the case of 25, 5 will evenly divide it.  htis returns true, and the existing accumulatedPrimes is returned without concatenating 25 to it.
      const isDivisible = accumulatedPrimes.some((prime) => prime <= Math.sqrt(currentElement) && currentElement % prime === 0);
      return isDivisible ? accumulatedPrimes : [...accumulatedPrimes, currentElement];

    }, []).slice(0, currentNumPrimes);

    console.log("primes: ", primesOut);
    return primesOut;
    
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