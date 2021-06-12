const card = document.querySelectorAll('.memory-card');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard;
let secondCard;
function flipCard(){
     if(lockBoard) return;
     if(this === firstCard) return;
     this.classList.add('flip');
     if(!hasFlippedCard){
          hasFlippedCard = true;
          firstCard = this;
          return;
     }
     secondCard = this;
     checkForMatch();
}
function checkForMatch(){
     let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
     isMatch ? disableCards() : unFlipCards();
}
function disableCards(){
     firstCard.removeEventListener('click',flipCard);
     secondCard.removeEventListener('click',flipCard);
     resetBoard();
}
function unFlipCards(){
     lockBoard = true;
     setTimeout(() => {
          firstCard.classList.remove('flip');
          secondCard.classList.remove('flip');
          resetBoard();
     },1500);
}
function resetBoard(){
     [hasFlippedCard,lockBoard] = [false,false];
     [firstCard,secondCard] = [null,null];
}
(function shuffle(){
     card.forEach(cards => {
          let randomPosition = Math.floor(Math.random() * card);
          cards.style.order = randomPosition;
     });
})();
card.forEach(cards => cards.addEventListener('click',flipCard));