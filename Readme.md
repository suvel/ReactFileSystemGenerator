## File System Generator

_this is draft of file system generator that take text input and generate a React base file system for a hypocritical project_

#### Iteration no. "1"

_to process the input and log all the component and nested files that will have to be created_

**Input**

```
MainContainer
[
Text
Button
]
```

**output**

```
mkdir src/components
cd MainContainer
touch index.js
touch style.css
mkdir subcomponents
cd Text
touch index.js
touch style.css
cd Button
touch index.js
touch style.css
```
