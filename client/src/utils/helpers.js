export const inversePrimeCountingFunction = (n) => {
  if (n <= 0) return 0;
    if (n === 1) return 2;
    
    const logn = Math.log(n);
    const loglogn = Math.log(logn);
    
    return n * (logn + loglogn - 1 + 
        (loglogn - 2) / logn + 
        (loglogn*loglogn - 6*loglogn + 11) / (2 * logn*logn) + 
        (loglogn*loglogn*loglogn - 9*loglogn*loglogn + 36*loglogn - 51) / (6 * logn*logn*logn));
  };
