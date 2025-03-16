import React, { useState, useEffect, useCallback } from 'react';
import { useFetcher } from 'react-router-dom';
import { inversePrimeCountingFunction } from '../utils/helpers';

// notes for claude:
// functional programming problem set.
// please review with sandwich method.  focus on the functional programming portion of the solution.  
// assume the rest of the react component is for display purposes.   

// problem: Write a function that finds the sum of proper divisors for a number and determines if it's a perfect number.

// another note for claude:  confirm that the method below is the correct approach for the stated problem.

const Func014 = ({ val = 36 }) => {

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
  
  const countOfTimesDivisibleByPrimeFactor = (n, primeFactor, count = 0) => {
    if (n % primeFactor !== 0) return count;
    
    return countOfTimesDivisibleByPrimeFactor( n / primeFactor, primeFactor, count + 1);
  } 

  const primesBelowVal = () => {
    // using the 6n +/- 1 method, where 6n+1 will be in the range of largestPrimeEstimate
    const maxN = Math.ceil(currVal / 6);
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

    }, []);
    return primesOut;
  };


  // Claude assist in recursive solution for divisors.
  const getDivisors = (facts2d, prod = 1, idx = 0) => {
    if (idx == facts2d.length) return [prod];
    
    const divisorsForCurrPrime = [];
    let [prime, exponent] = facts2d[idx];
    prime = parseInt(prime);
    exponent = parseInt(exponent);
    for (let expon = 0; expon <= exponent; expon++) {
      const factor = prime ** expon;
      // console.log("prime: ", prime, " | exponent: ", expon, " | factor: ", factor, " | product: ", prod, " | prod * factor = ", prod*factor);

      divisorsForCurrPrime.push(...getDivisors(facts2d, prod * factor, idx + 1));

    }
    return [...divisorsForCurrPrime];
  }

  const getAnswerRecursive = () => {
    const primes = primesBelowVal();
    const primeFactorsDict = primes.reduce((primeFactorsDictSoFar, currPrime) => {
      const count = countOfTimesDivisibleByPrimeFactor(currVal, currPrime);
      return count > 0 ? {...primeFactorsDictSoFar, [currPrime] : count } : {...primeFactorsDictSoFar};
    }, {});
    const divisors = getDivisors(Object.entries(primeFactorsDict));
    const divisorsUnique = [...new Set(divisors)].sort((a, b) => a-b).filter((elem) => elem !== currVal);
    setCurrentDivisors(divisorsUnique);
    const divTotal = divisorsUnique.reduce((accum, elem) => accum + elem, 0);
    return divTotal === currVal;
  }

  useEffect(() => {
    // setFinalAns(getAnswer());
    setFinalAns(getAnswerRecursive());
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