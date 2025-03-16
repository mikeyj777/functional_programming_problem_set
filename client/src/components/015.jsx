import React, { useState, useEffect, useCallback } from 'react';
import { useFetcher } from 'react-router-dom';
import { inversePrimeCountingFunction } from '../utils/helpers';

// notes for claude:
// functional programming problem set.
// please review with sandwich method.  focus on the functional programming portion of the solution.  
// assume the rest of the react component is for display purposes.   

// problem: 15. Create a function that finds all triplets of numbers in a range that satisfy the Pythagorean theorem.

// another note for claude:  confirm that the method below is the correct approach for the stated problem.

const Func015 = ({ rangeMin = 1, rangeMax = 20 }) => {

  const [finalAns, setFinalAns] = useState([]);
  const [currentRangeMin, setCurrentRangeMin] = useState(rangeMin);
  const [currentRangeMax, setCurrentRangeMax] = useState(rangeMax);
  const [inputValueMin, setInputValueMin] = useState(rangeMin);
  const [inputValueMax, setInputValueMax] = useState(rangeMax);
  
  const getAnswer = () => {
    const minVal = Math.min(currentRangeMin, currentRangeMax);
    const maxVal = Math.max(currentRangeMin, currentRangeMax);
    const aVal = Array.from( {length : maxVal - minVal + 1}, (_, idx) =>   idx + minVal);
    const triples = aVal.reduce((triplesSoFar, currAvalue, idx, arr) => {
      const triplesInner = arr.slice(idx+1).reduce((tripleTest, currBvalue) => {
        const c = Math.sqrt(currAvalue**2 + currBvalue**2);
        return c <= maxVal && c % 1 == 0 ? [...tripleTest, [currAvalue, currBvalue, c]] : [...tripleTest];
      }, []);
      return triplesInner.length > 0 ? [...triplesSoFar, ...triplesInner] : [...triplesSoFar];
    }, []);
    return triples;
  }
  
  useEffect(() => {
    setFinalAns(getAnswer());
  }, [currentRangeMin, currentRangeMax]);

  const handleSubmitMin = (e) => {
    e.preventDefault();
    const newTarget = parseInt(inputValueMin);
    if (!isNaN(newTarget) && newTarget > 0) {
      setCurrentRangeMin(newTarget);
    }
  };

  const handleSubmitMax = (e) => {
    e.preventDefault();
    const newTarget = parseInt(inputValueMax);
    if (!isNaN(newTarget) && newTarget > 0) {
      setCurrentRangeMax(newTarget);
    }
  };

  return (
    <div className="func-container">
      <div className="func-card">
        <form onSubmit={handleSubmitMin} className="input-form">
          <input
            type="number"
            value={inputValueMin}
            onChange={(e) => setInputValueMin(e.target.value)}
            className="func-input"
            min="1"
          />
          <button type="submit" className="func-button">
            Boundary
          </button>
        </form>
      </div>
      <div className="func-card">
        <form onSubmit={handleSubmitMax} className="input-form">
          <input
            type="number"
            value={inputValueMax}
            onChange={(e) => setInputValueMax(e.target.value)}
            className="func-input"
            min="1"
          />
          <button type="submit" className="func-button">
            Other Boundary
          </button>
        </form>
      </div>
      <div className="func-card">
        <h1 className="func-text">triples: {finalAns.join(' | ')}</h1>
      </div>
    </div>
  );
};

export default Func015;