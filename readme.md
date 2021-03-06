# teapi.io Node Library
This is a node driver for <http://teapi.io>.

# Installation

```javascript
npm install teapi
```

# Configuration
Create a teapi instance by specifying your host, key and secret (obtained through teapi's management dashboard):

```javascript
var teapi = require('teapi')('m01.teapi.io', 'KEY', 'SECRET');
```


# Usage
Documents can be created, updated or deleted one at a time:

```javascript
teapi.documents.create('people', {id: 4, name: 'leto atreides', power: 9001})
teapi.documents.update('people', {id: 4, name: 'leto atreides', power: 9002})
teapi.documents.delete('people', 4)
```

A third, optional, parameter can be provided. This dictionary, internally called meta, is used for building indexes with values that aren't part of the document (or at least, aren't part of the document's data to be displayed by the API). For example:

```javascript
teapi.documents.create(
  'people',
  {id: 4, name: 'leto atreides', power: 9001},
  {active: true, power: 52334}
)
```

if indexes were created for `name`, `active` and `power`, Teapi would index the values `leto atreides`, `true` and `52334` respectively (notice that the meta value overwrites the document's value).

# Bulk Updates
More efficiently, bulk changes can be provided for a given type:

```javascript
# Create or update leto and jessica and delete the documents
# with ids 9, 29 and 23
teapi.documents.bulk('people',
  [
    {doc: {id: 4, name: 'leto atreides', power: 9001}},
    {doc: {id: 5, name: 'jessica atreides', power: 9201}}
  ],
  [{id: 9}, {id: 29}, {id: 23}]
)
```

Up to 1000 items can be inserted/updated and 1000 items deleted per call.

Use the `meta` key for meta values:

```javascript
# Create or update leto and jessica and delete the documents
# with ids 9, 29 and 23
teapi.documents.bulk('people',
  [
    {doc: {id: 4, name: 'leto atreides', power: 9001}, meta: {...}},
    {doc: {id: 5, name: 'jessica atreides', power: 9201}, meta: {...}}
  ],
  [{id: 9}, {id: 29}, {id: 23}]
)
```

## Lists
Document ids can be pushed onto and removed from lists:

```javascript
teapi.lists.insert('people', 'newest', [1, 4, 992])
teapi.lists.delete('people', 'newest', 992)
```

For both `insert` and `delete`, the ids can either be a single value or an array (up to 1000 ids can be inserted / deleted at a time). You can also pass no ids to `delete`. This will remove all ids from the list:

```javascript
teapi.lists.delete('people', 'newest')
```

`insert` takes a 4th, optional, parameter: `truncate`. This defaults to `false`, but when set to true, it'll delete all existing ids then insert the newly provide one(s):

```javascript
// this will result in a list of only 1 id (99)
teapi.lists.insert('people', 'newest', 99, true)
```

# Return value
The teapi library returns a promise:

```javascript
teapi.document.delete('articles', 4).spread(function(res, body) {
  console.log(res.statusCode, body)
});
```
