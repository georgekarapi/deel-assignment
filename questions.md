### 1. What is the difference between Component and PureComponent? give an example where it might break my app.

React.Component gets updated every time new props are passed or parent component is being rerendered or the shouldComponentUpdate is used
**VS**
PureComponent can be used to optimize the React application as we can decrease the rendering times (it handles by itself the comparison between the new and old states/props) no need for shouldComponentUpdate

### 2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?

Updating the Context can cause components not to be re-rendered as the ShouldComponentUpdate can't identify the changes

### 3. Describe 3 ways to pass information from a component to its PARENT.

1. Using Context (app-wide)
2. Executing a passed function from parent to child :

> `<Parent><Child onDeployed={() => handleDeploymentToParent}>` 3. Using EventBubbling

### 4. Give 2 ways to prevent components from re-rendering.

We can use React.memo to prevent re-rendering of component OR using React.PureComponent

### 5. What is a fragment and why do we need it? Give an example where it might break my app.

Fragment can be used to wrap elements without creating any new DOM element. Should be avoided in cases that we need to style the component

### 6. Give 3 examples of the HOC pattern.

--

### 7. what's the difference in handling exceptions in promises, callbacks and async...await.

The difference between them is the way that are handles for example **async...await** are handled inside try{...}catch{} blocks where **promises** can be handled in more compact way like promise.then(//resolve functionality).catch(//error handling) vs **callbacks** are most oftenly handled with errorfirst handling like function(error, data){}

### 8. How many arguments does setState take and why is it async.

**setState** can take 2 arguments
The first one is the updating function where we **update** the states and second optional one which can be used as a **callback** once the setState is completed

It’s an async method as it costs calculation resources to the browser. It would keep the session unresponsive if it would be synchronous

### 9. List the steps needed to migrate a Class to Function Component.

1. Change the class to function

> class myExample extends React.component
> **_to_**
> const myExample = () => { return DOM }

2. Remove the render method and return the DOM element directly (as shown above)

3. Remove constructor and use methods like useState/useEffect to manage/initialize the states inside your component

4. Remove **_this._** reference

5. Initialize any event listeners in the useEffect method

### 10. List a few ways styles can be used with components.

**Classname**: Adding the CSS styles in your stylesheet (or object classes used in MaterialUI withStyles(deprecated) and being able to use the class’s name in any tag

**Attribute style**: Using directly the attribute to set the styling in-line with your element

**Using libraries like emotion/styled-components**: We can create customized components that are used multiple times in our component using the mentioned libraries (having cleaner code)

### 11. How to render an HTML string coming from the server.

We can use directly the node.**innerHTML** = **_HTML Entity_** or on React: **dangerouslySetInnerHTML**
