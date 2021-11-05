## File System Generator

_this is draft of file system generator that take text input and generate a React base file system for a hypocritical project_

#### Iteration no. "1"

_to process the input and log all the component and nested files that will have to be created_

**Input**

```
@@start@@
	MainContainer
		Text
		Button
@@end@@
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

#### Planning

1. Very Component will have a **"index.js"** and **"style.css"**
2. Recursion can be used.
3. If a component has even one sub component it has to have **"subcomponent folder"**
4. After **@@start@@** we have start accounting the component and computation
5. After **@@end@@** we have stop the computation.
6. Graph DS will be apt.