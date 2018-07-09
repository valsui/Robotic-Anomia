import React from 'react';

class TypeWriter extends React.Component {

  constructor(props){
    super(props);
  }

  componentDidMount(){
    setTimeout(this.textAnimation(), 1000);
    }

  textAnimation(){
    const testInfo = document.getElementById('typing-text');

    // const dataText = [ "Hello!",
    //                   "I am a robot 🤖",
    //                   "I can read your hand writing",
    //                   "Train 💡 me to read",
    //                   "or play with me!",
    //                   "I always forget things",
    //                   "correct me while playing",
    //                   "Surely we will have lots of fun!   🎉"];

    const dataText = [
      "Welcome to Robotica Anomia...",
      "We trained a Neural Network to recognize handwriting...",
      "Click Play to test our network...",
      "Click Train to add to our network...",
      "You can even train your own network...",
      "Just look for the tab in the header when you are training or playing...",
      "Have fun!"
    ];


    const typeWriter = (text, i, fnCallback) => {
      if (text && i < (text.length)) {
       testInfo.innerHTML = text.substring(0, i+1) +'<span aria-hidden="true"></span>';
        setTimeout(function() {
          typeWriter(text, i + 1, fnCallback)
        }, 40);
      }
      else if (typeof fnCallback == 'function') {
        setTimeout(fnCallback, 600);
      }
    }

     const StartTextAnimation = (i) => {
       if (!dataText[i]){
          setTimeout(function() {
            StartTextAnimation(0);
          }, 2500);
       }

      if (dataText[i] && i < dataText[i].length) {
       typeWriter(dataText[i], 0, function(){
         StartTextAnimation(i + 1);
       });
      }

    }
    StartTextAnimation(0);
  }

  render(){
    return (<h1 id="typing-text">abd</h1>);
  }
}

export default TypeWriter;
