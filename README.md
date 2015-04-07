# Installation
Assumes you have node and mongodb installed.
```
npm install
```
# Running

```
node server/server.js
```
# Considerations
I opted to write something in node and angular since these are new technologies to me. The REST api is not fully 'collection' agnostic as perhaps is required. 
I had trouble figuring out how to create a collection with flexible schema and then expose that schema dynamically through a RESTful interface. For example, 
how would I be able to dynamically create forms when the schema can change? There might be a way through mapreduce to collect the keys of a collection but
this not include type. There might be a way to solve this but I didn't have enough time to investigate.

# If I had more time
Definitely write more tests. 
  
