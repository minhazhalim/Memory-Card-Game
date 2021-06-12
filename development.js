class AudioController {
     constructor(){
          this.backgroundMusic = new Audio('./Assets/Audio/creepy.mp3');
          this.flipSound = new Audio('./Assets/Audio/flip.wav');
          this.matchSound = new Audio('./Assets/Audio/match.wav');
          this.victorySound = new Audio('./Assets/Audio/victory.wav');
          this.gameOverSound = new Audio('./Assets/Audio/gameOver.wav');
          this.backgroundMusic.volume = 0.5;
          this.backgroundMusic.loop = true;
     }
     startMusic(){
          this.backgroundMusic.play();
     }
     stopMusic(){
          this.backgroundMusic.pause();
          this.backgroundMusic.currentTime = 0;
     }
     flip(){
          this.flipSound.play();
     }
     match(){
          this.matchSound.play();
     }
     victory(){
          this.stopMusic();
          this.victorySound.play();
     }
     gameOver(){
          this.stopMusic();
          this.gameOverSound.play();
     }
}
class MixOrMatch {
     constructor(totalTime,cards){
          this.cardsArray = cards;
          this.totalTime = totalTime;
          this.timeRemaining = totalTime;
          this.timer = document.getElementById('time-remaining');
          this.ticker = document.getElementById('flips');
          this.audioController = new AudioController();
     }
     startGame(){
          this.totalClicks = 0;
          this.timeRemaining = this.totalTime;
          this.cardToCheck = null;
          this.matchedCards = [];
          this.busy = true;
          setTimeout(() => {
               this.audioController.startMusic();
               this.shuffleCards(this.cardsArray);
               this.countDown = this.startCountDown();
               this.busy = false;
          },500);
          this.hideCards();
          this.timer.innerText = this.timeRemaining;
          this.ticker.innerText = this.totalClicks;
     }
     startCountDown(){
          return setInterval(() => {
               this.timeRemaining--;
               this.timer.innerText = this.timeRemaining;
               if(this.timeRemaining === 0){
                    this.gameOver();
               }
          },1000);
     }
     gameOver(){
          clearInterval(this.countDown);
          this.audioController.gameOver();
          document.getElementById('game-over-text').classList.add('visible');
     }
     visible(){
          clearInterval(this.countDown);
          this.audioController.victory();
          document.getElementById('victory-text').classList.add('visible');
     }
     hideCards(){
          this.cardsArray.forEach(card => {
               card.classList.remove('visible');
               card.classList.remove('matched');
          });
     }
     flipCard(card){
          if(this.canFlipCard(card)){
               this.audioController.flip();
               this.totalClicks++;
               this.ticker.innerText = this.totalClicks;
               card.classList.add('visible');
               if(this.cardToCheck){
                    this.checkForCardMatch(card);
               }else{
                    this.cardToCheck = card;
               }
          }
     }
     checkForCardMatch(card){
          if(this.getCardType(card) === this.getCardType(this.cardToCheck)){
               this.checkForCardMatch(card,this.cardToCheck);
          }else{
               this.cardMissMatch(card,this.cardToCheck);
          }
          this.cardToCheck = null;
     }
     cardMatch(card1,card2){
          this.matchedCards.push(card1);
          this.matchedCards.push(card2);
          card1.classList.add('matched');
          card2.classList.add('matched');
          this.audioController.match();
          if(this.matchedCards.length === this.cardsArray.length){
               this.victory();
          }
     }
     cardMissMatch(card1,card2){
          this.busy = true;
          setTimeout(() => {
               card1.classList.remove('visible');
               card2.classList.remove('visible');
               this.busy = false;
          },1000);
     }
     shuffleCards(cardsArray){
          for(let i = cardsArray.length - 1;i > 0;i--){
               let randomIndex = Math.floor(Math.random() * (i + 1));
               cardsArray[randomIndex].style.order = i;
               cardsArray[i].style.order = randomIndex;
          }
     }
     getCardType(card){
          return card.getElementsByClassName('card-value')[0].src;
     }
     canFlipCard(card){
          return !this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck;
     }
}
if(document.readyState == 'loading'){
     document.addEventListener('DOMContentLoaded',ready);
}else{
     ready();
}
function ready(){
     let overlayText = Array.from(document.getElementsByClassName('overlay-text'));
     let card = Array.from(document.getElementsByClassName('card'));
     let game = new MixOrMatch(100,card);
     overlayText.forEach(overlay => {
          overlay.addEventListener('click',() => {
               overlay.classList.remove('visible');
               game.startGame();
          });
     });
     card.forEach(cards => {
          cards.addEventListener('click',() => {
               game.flipCard(cards);
          });
     });
}