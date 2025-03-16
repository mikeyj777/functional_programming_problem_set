def get_divisors(factors, product = 1, curr_idx = 0):
  print(f'product: {product} | curr_idx: {curr_idx}')
  if curr_idx == len(factors):
    return [product]
  divisorsWithCurrentPrime = []
  for expon in range(factors[curr_idx][1] + 1):
    factor = factors[curr_idx][0] ** expon
    divisorsWithCurrentPrime.extend(get_divisors(factors=factors, product=product * factor, curr_idx=curr_idx + 1))
    
  return divisorsWithCurrentPrime
  

factors = [[2,2], [3,2]]

print(get_divisors(factors=factors))