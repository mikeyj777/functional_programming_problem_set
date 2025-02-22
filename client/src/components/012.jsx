import React, { useState, useEffect, useCallback } from 'react';
import { useFetcher } from 'react-router-dom';

// notes for claude:
// functional programming problem set.
// please review with sandwich method.  focus on the functional programming portion of the solution.  
// assume the rest of the react component is for display purposes.   

// problem: Write a function that finds all pairs of numbers in an array that sum to a given target.

// another note for claude:  confirm that the method below is the correct approach for the stated problem.


const Func012 = ({ target = 10, array = [1, 2, 3, 4, 5, 6, 7, 8, 9] }) => {

  const [finalAns, setFinalAns] = useState([]);
  const [currentTarget, setCurrentTarget] = useState(target);
  const [inputValue, setInputValue] = useState(target);

  const getAnswer = useCallback((arr, tgt) => {
    return arr.map((currentElement, i, arrrr) => {
      const pairs = arrrr.filter((otherElement, j) => (i !== j) && (currentElement + otherElement === tgt))
                .map((otherElement) => [currentElement, otherElement])
      return pairs
    }).filter(pair => pair.length > 0)
      .flat();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTarget = parseInt(inputValue);
    if (!isNaN(newTarget) && newTarget > 0) {
      setCurrentTarget(newTarget);
    }
  };

  useEffect(() => {

    setFinalAns(getAnswer(array, currentTarget));

  },[currentTarget, getAnswer] )

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
            Update Target
          </button>
        </form>
      </div>
      <div className="func-card">
        <h1 className="func-text">pairs: {finalAns.join(' | ')}</h1>
      </div>
    </div>
  );
};

export default Func012;