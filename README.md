# Robotic Anomia

## Robotic Anomia is a project aiming to use machine learning to analyze text in images, and then simulate what functionality the AI would lose when certain capabilities are taken away. 

## Background and Overview

Using machine learning to analyze images is a common challenge in modern computer science. We intend to explore the ideas of machine learning by creating an AI with a neural network that can analyze user written text and and interpret it as a string. Once the model is functioning, we intend to take out core components in the pipeline in order to represent certain diseases of the brain.  

## Functionality & MVP
[ ] Allow users to draw letter on a canvas for the AI to interpret
[ ] Build a neural network and train it with set data (forward and backwards propagation) for it to recognize user inputted canvas
[ ] Generate reliable weights using the training process
[ ] Allow users to test trained weights on website by using canvas
[ ] Remove functionality of neural layer to allow user to visualize how certain pipelines in the neural network operate

## Technologies & Technical Challenges
Frontend: React/ Redux JavaScript 
Libraries: TensorFlow.js, D3.js, brain.js

### Composing a dataset

We will create a pre-trained data set that defines what images correspond to each letter of the alphabet. We will then train the network with “training” data of additional images that correspond to each letter to expand the network’s abilities. Users will interact with pre-trained data via our website and explore information relating to each of the components, including what disabling a component will do to our model.

There will be five main modes of interaction on the webpage.  Users will be able write words on our canvas, and our pretrained neural network will interpret the string by concating the characters together.  
 * Disabling the trained data (disabling long term memory) will allow users to train an untrained neural network, and see how robust they can train the neural network to be.
 * Disabling the ability to train (disabling working memory) will only allow users to access the stores weights in the database, and prevent them from training new data to the neural network.
 * Disabling the ability to recognize a coherant input (text recognition impediment) will cause user inputs to propogate incorrectly through the neural network.
 * Disabling the ability to produce a coherant output will cause the modal to display its returned data in a confusing or incomprehensible way.

 ## Wireframes
 ### Main Page 
 ![MainPage](/wireframes/prototype-for-main.png)
 ### Working with trained network
 ![PlayPage](/wireframes/prototype-for-trained-set.png)
 ### Training own set
 ![LearnPage](/wireframes/prototype-for-learn.png)
### Playing with own trained network
![PlayWithLearnedPage](/wireframes/prototype-for-learn-play.png)

## Timeline
 
### Monday 
* Done with canvas, to begin testing - Patrick
* Have functioning index.html - Bob
* Have preliminary components for React done - Dan
* Learn about machine learning algorithms and techniques - Everyone
* Begin math implementation - Valerie
* Begin training data

### Tuesday 
* Work on the webpage to build individual react components.
* Continue to train all the letters.  Have a working network for all 26 letters.
* Start building out the functions that will connect all parts of the pipeline.  Consider which functions should be handled by what * components.  Try to unite them all in a common javascript file or within the store.
* Start trying to write a formula for recognizing multiple letters on canvas, and splitting them into a package that the neural net can understand.

### Wednesday
* Begin to visually flesh out the project, along with adding event listeners for the relavant buttons.  Start writing the information that users will be reading when they click on certain buttons.
* Start testing the ability to test multiple words in the neural network.  Start considering how to visualize the output.
* Start working on visualizing the output.  
* Start working on functions do disable certain functionality within the neural network.

### Thursday
* Finish the ability for the neural network to recognize words and begin to create an API to this functionality.
* Work on API endpoints between each of the subroutines in the neural network pipeline.  
* Make the training data more robust.
* Work on visualization of the neural network in d3.  Start to consider how we might misrepresent the data.
* Continue to work on the text.  Begin to consider what a polished website might look like.

### Fri / Sat / Sun
* Finish linking up all the components on the website.  Fix bugs.
* Add user interactivity
* Polish the website visually
* Finish up other unfinished tasks.


