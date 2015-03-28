# Minimalist, Lazy, Fast

In the field of array manipulation, many really outstanding librairies exist out there (underscore, lodash, lazyjs...).

MLF target is not to try to do better than its predecessors, nor to reinvent one more time the wheel.

We will try to stick to our name, like a motto, to be Minimalist, Lazy and Fast.

* Minimalist: We will implement some of the method of the native Array API, respecting as much as possible their behavior, and selecting the one that we can improve
* Lazy: A mean of improvement is to add a lazy implementation of the selected method, and to provide a fluent API to do so   
* Fast: At last, we will try to provide performance improvements over the native Array API


## API :
* Implemented lazily: map, filter, slice
* Implemented (but not lazily): forEach, reduce, reduceRight, join, every, some
* To be implemented: concat, indexOf, lastIndexOf, reverse, splice


