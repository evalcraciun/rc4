RC4
===

RC4 Cryptosystem in javascript


## What is RC4?
RC4 is a fast stream cipher invented in 1987 by Ron Rivest. If you like details, you can see this http://en.wikipedia.org/wiki/RC4

RC4 has become an extremely popular ciphersuite for SSL/TLS connections. There are essentially two reasons for this:
1)RC4 does not require padding or IVs, which means it's immune to recent TLS attacks like BEAST and Lucky13. Many admins have recommended it as the solution to these threats.
2)RC4 is pretty fast. Faster encryption means less computation and therefore lower hardware requirements for big service providers like Google.

## Methods used in cryptosystem
RC4.encrypt(key, str) - demonstrate the RC4 encryption script
RC4.decrypt(key, res) - decode encrypted result with the same key
RC4.keyStream(key, str) - generate keystream for a random array
RC4.randomKey(len, msg, charSet) - generate a random key
RC4.generateKeys(len, keyLength, message) - create an array with random keys


Last method from the algorithm is showing the weaknesses in the key scheduling


