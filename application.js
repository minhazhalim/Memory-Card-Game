const section = document.querySelector('section');
const playerLivesCount = document.querySelector('.playerLivesCount');
let playerLives = 6;
playerLivesCount.textContent = playerLives;
const getData = () => [
     {imageSource: "./images/beatles.jpeg",name: "beatles"},
     {imageSource: "./images/blink182.jpeg",name: "blink 182"},
     {imageSource: "./images/fkatwigs.jpeg",name: "fka twigs"},
     {imageSource: "./images/fleetwood.jpeg",name: "fleetwood"},
     {imageSource: "./images/joy-division.jpeg",name: "joy division"},
     {imageSource: "./images/ledzep.jpeg",name: "lep zeppelin"},
     {imageSource: "./images/metallica.jpeg",name: "metallica"},
     {imageSource: "./images/pinkfloyd.jpeg",name: "pink floyd"},
     {imageSource: "./images/beatles.jpeg",name: "beatles"},
     {imageSource: "./images/blink182.jpeg",name: "blink 182"},
     {imageSource: "./images/fkatwigs.jpeg",name: "fka twigs"},
     {imageSource: "./images/fleetwood.jpeg",name: "fleetwood"},
     {imageSource: "./images/joy-division.jpeg",name: "joy division"},
     {imageSource: "./images/ledzep.jpeg",name: "led zeppelin"},
     {imageSource: "./images/metallica.jpeg",name: "metallica"},
     {imageSource: "./images/pinkfloyd.jpeg",name: "pink floyd"},
];
const randomize = () => {
     const cardData = getData();
     cardData.sort(() => Math.random() - 0.5);
     return cardData;
};
const cardGenerator = () => {
     const cardData = randomize();
     cardData.forEach((item) => {
          const div1 = document.createElement("div");
          const image = document.createElement("img");
          const div2 = document.createElement("div");
          div1.classList = 'card';
          image.classList = 'face';
          div2.classList = 'back';
          image.src = item.imageSource;
          div1.setAttribute('name',item.name);
          section.appendChild(div1);
          div1.appendChild(image);
          div1.appendChild(div2);
          div1.addEventListener('click',(event) => {
               div1.classList.toggle('toggleCard');
               checkCards(event);
          });
     });
};
const checkCards = (event) => {
     const clickedCard = event.target;
     const flippedCard = document.querySelectorAll('.flipped');
     const toggleCard = document.querySelectorAll('.toggleCard');
     clickedCard.classList.add('flipped');
     if(flippedCard.length === 2){
          if(flippedCard[0].getAttribute('name') === flippedCard[1].getAttribute('name')){
               flippedCard.forEach((div1) => {
                    div1.classList.remove('flipped');
                    div1.style.pointerEvents = 'none';
               });
          }else{
               flippedCard.forEach((div1) => {
                    div1.classList.remove('flipped');
                    setTimeout(() => {
                         div1.classList.remove('toggleCard');
                    },1000);
                    playerLives--;
                    playerLivesCount.textContent = playerLives;
                    if(playerLives === 0) restart(":thumbsdown: try again");
               });
          }
     }
     if(toggleCard.length === 16) restart(":wine_glass: you win");
};
const restart = (text) => {
     const cardData = randomize();
     const face = document.querySelectorAll('.face');
     const card = document.querySelectorAll('.card');
     section.style.pointerEvents = 'none';
     cardData.forEach((item,index) => {
          card[index].classList.remove('toggleCard');
          setTimeout(() => {
               card[index].style.pointerEvents = 'all';
               face[index].src = item.imageSource;
               card[index].setAttribute('name',item.name);
               section.style.pointerEvents = 'all';
          },1000);
     });
     playerLives = 6;
     playerLivesCount.textContent = playerLives;
     setTimeout(() => {
          window.alert(text);
     },100);
};
cardGenerator();