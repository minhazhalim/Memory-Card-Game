document.addEventListener('DOMContentLoaded',() => {
     const cardArray = [
          {
               name: 'fries',
               image: './images/fries.png',
          },
          {
               name: 'cheeseburger',
               image: './images/cheeseburger.png',
          },
          {
               name: 'ice-cream',
               image: './images/ice-cream.png',
          },
          {
               name: 'pizza',
               image: './images/pizza.png',
          },
          {
               name: 'milkshake',
               image: './images/milkshake.png',
          },
          {
               name: 'hotdog',
               image: './images/hotdog.png',
          },
          {
               name: 'fries',
               image: './images/fries.png',
          },
          {
               name: 'cheeseburger',
               image: './images/cheeseburger.png',
          },
          {
               name: 'ice-cream',
               image: './images/ice-cream.png',
          },
          {
               name: 'pizza',
               image: './images/pizza.png',
          },
          {
               name: 'milkshake',
               image: './images/milkshake.png',
          },
          {
               name: 'hotdog',
               image: './images/hotdog.png',
          },
     ];
     cardArray.sort(() => 0.5 - Math.random());
     const grid = document.querySelector('.grid');
     const result = document.querySelector('#result');
     let cardsChosen = [];
     let cardsChosenID = [];
     let cardsWon = [];
     function createBoard(){
          for(let i = 0;i < cardArray.length;i++){
               const image = document.createElement('img');
               image.setAttribute('src','./images/blank.png');
               image.setAttribute('data-id',i);
               image.addEventListener('click',flipCard);
               grid.appendChild(image);
          }
     }
     createBoard();
     function flipCard(){
          let cardId = this.getAttribute('data-id');
          cardsChosen.push(cardArray[cardId].name);
          cardsChosenID.push(cardId);
          this.setAttribute('src',cardArray[cardId].image);
          if(cardsChosen.length === 2){
               setTimeout(checkForMatch,500);
          }
     }
     function checkForMatch() {
          const image = document.querySelectorAll('img');
          const optionOneID = cardsChosenID[0];
          const optionTwoID = cardsChosenID[1];
          if(optionOneID == optionTwoID){
               image[optionOneID].setAttribute('src','./images/blank.png');
               image[optionTwoID].setAttribute('src','./images/blank.png');
               alert('You Have Clicked the Same Image!');
          }
          else if(cardsChosen[0] === cardsChosen[1]){
               alert('You Found a Match');
               image[optionOneID].setAttribute('src','./images/white.png');
               image[optionTwoID].setAttribute('src','./images/white.png');
               image[optionOneID].removeEventListener('click',flipCard);
               image[optionTwoID].removeEventListener('click',flipCard);
               cardsWon.push(cardsChosen)
          }else{
               image[optionOneID].setAttribute('src','./images/blank.png');
               image[optionTwoID].setAttribute('src','./images/blank.png');
               alert('Sorry, Try Again');
          }
          cardsChosen = [];
          cardsChosenID = [];
          result.textContent = cardsWon.length;
          if (cardsWon.length === cardArray.length / 2){
               result.textContent = 'Congratulations! You Found Them All!';
          }
     }
});