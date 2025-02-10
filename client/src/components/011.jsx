import React, { useState, useEffect } from 'react';

// notes for claude:
// functional programming problem set.
// please review with sandwich method.  focus on the functional programming portion of the solution.  
// assume the rest of the react component is for display purposes.   

// problem: Create a function that finds the sum of all Fibonacci numbers below a given limit that are even.

// another note for claude:  confirm that the method below is the correct approach for the stated problem.


const Func011 = ({ upperLim = 100 }) => {

  const [finalAns, setFinalAns] = useState(0);

  const fibSeqGenerator = () => {
    const seq = Array.from({ length: upperLim})
      .reduce((seq) => {
        const nexFib = seq[seq.length - 2] + seq[seq.length - 1];
        return nexFib < upperLim ? [...seq, nexFib] : seq;
      }, [0, 1]);
  }

  useEffect(

    const fibSeek = fibSeqGenerator();

    setFinalAns(
      fibSeek
        .filter(elem => elem % 2 === 0)
        .
    )

  )

  return (
    <div className="func-container">
      <div className="func-card">
        <h1 className="func-text">Original array: {arr.join(", ")}</h1>
      </div>
      <div className="func-card">
        <h1 className="func-text">
          {finalAns}
        </h1>
      </div>
    </div>
  );
};

export default Func011;