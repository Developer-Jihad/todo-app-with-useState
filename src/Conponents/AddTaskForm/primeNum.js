function generatePrimes(limit) {
  const primes = {};

  for (let number = 2; number <= limit; number++) {
    if (isPrime(number)) {
      primes[number] = true;
    }
  }

  return primes;
}

function isPrime(number) {
  if (number < 2) {
    return false;
  }

  for (let i = 2; i <= Math.sqrt(number); i++) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
}

const isPrims = generatePrimes(100);
console.log(isPrims[0]);
