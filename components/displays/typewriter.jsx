import React from 'react';

class TypeWriter extends React.Component {

  constructor(props){
    super(props);
    this.dataText = [ "Hello!",
                      "I am a robot 🤖",
                      "I can read your hand writing",
                      "Train 💡 me to read",
                      "or play with me!",
                      "I always forget things",
                      "correct me while playing",
                      "Surely we will have lots of fun!   🎉"];
  }

  componentDidMount(){
    setTimeout(this.textAnimation(), 1000);
    }

  textAnimation(){
    const testInfo = document.getElementById('typing-text');

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
       if (typeof this.dataText[i] == 'undefined'){
          setTimeout(function() {
            StartTextAnimation(0);
          }, 2500);
       }

      if (this.dataText && i < this.dataText[i].length) {
       typeWriter(this.dataText[i], 0, function(){
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
