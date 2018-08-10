import React from "react";

class Helpers{
    constructor(){}

    formatNumber(numberString){
        numberString = numberString.replace(/-/g,'').replace(/ /g,'');
        let newpiece = '';
        for (let i=0; i < numberString.length; i+=3){
          newpiece += numberString.slice( i, i + 3 );
          if ( i < numberString.length - 3 ){
              newpiece += '-';
          }
        }
        return newpiece;
    };

    showLineBreaksInHtml(content){
        let newText = content.split('\n').map((item, i) => {
            return <p key={i}>{item}</p>;
        });
        console.log(newText);
        return newText;
    }
}

export default Helpers;