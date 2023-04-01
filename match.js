let cardsArray = [
        {
            'name': 'CSS',
            'img': 'http://thapatechnical.online/logos/css.png',
        },
        {
            'name': 'HTML',
            'img': 'http://thapatechnical.online/logos/html5.png',
        },
        {
            'name': 'jQuery',
            'img': 'http://thapatechnical.online/logos/jquery.png',
        },
        {
            'name': 'JS',
            'img': 'http://thapatechnical.online/logos/js.png',
        },
        {
            'name': 'Node',
            'img': 'http://thapatechnical.online/logos/nodejs.png',
        },
        {
            'name': 'Python',
            'img': 'http://thapatechnical.online/logos/python.png',
        }
    ];
    const parentDiv = document.querySelector('#card-section');
    const gameCard = cardsArray.concat(cardsArray)
    let shuffledChild = Array.from(gameCard).sort(() => 0.5 - Math.random());
    let clickCount = 0;
    let firstCard = "";
    let secondCard = "";
    const card_matches = () => {
        let card_selected = document.querySelectorAll('.card_selected');
        card_selected.forEach((curElem) => {
            curElem.classList.add('card_match')
        })
    }
    const resetGame = () => {
        firstCard = "";
        secondCard = "";
        clickCount = 0;

        let card_selected = document.querySelectorAll('.card_selected');

        card_selected.forEach((curElem) => {
            curElem.classList.remove('card_selected')
        })
    }
    parentDiv.addEventListener('click', (event) => {
        let curCard = event.target;
        if(curCard.id === "card-section"){return false }
        clickCount ++;
        if(clickCount < 3){
            if(clickCount === 1){
                firstCard = curCard.parentNode.dataset.name;
                curCard.parentNode.classList.add('card_selected');
            }else{
                secondCard = curCard.parentNode.dataset.name;
                curCard.parentNode.classList.add('card_selected');
            }
            if(firstCard !== "" && secondCard !== ""){
                if(firstCard === secondCard){
                    setTimeout(() => {
                        card_matches()
                        resetGame()
                    }, 1000)
                }else{
                    setTimeout(() => {
                        resetGame()
                    }, 1000)
                }
            }
        }
    })
    for(let i=0; i<shuffledChild.length; i++){
        const childDiv = document.createElement('div')
        childDiv.classList.add('card')
        childDiv.dataset.name = shuffledChild[i].name;
        const front_div = document.createElement('div');
        front_div.classList.add('front-card')
        const back_div = document.createElement('div');
        back_div.classList.add('back-card')
        back_div.style.backgroundImage = `url(${shuffledChild[i].img})`;
        parentDiv.appendChild(childDiv)
        childDiv.appendChild(front_div)
        childDiv.appendChild(back_div)
    }