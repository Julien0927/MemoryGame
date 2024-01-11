const gameBoard = document.getElementById('gameboard');
let selectedCards = [];

function createCard(Card) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = Card;

  
    const cardContent = document.createElement('img');
    cardContent.classList.add('card-content');
    cardContent.src = `${Card}`;
    card.appendChild(cardContent);

    card.addEventListener('click', onCardClick);

    return card;
  }

const card = [
    '/images/tanjiro.png',
    '/images/dragonB.png',
    '/images/manga.png',
    '/images/chauve.png',
    '/images/nuage.png',
    '/images/gauche.png',
    '/images/pad.png',
    '/images/logo.png',
    '/images/demslay.jpg',
    '/images/onepiece.png',
    '/images/Zoro.png',
    '/images/luffy.jpg',
    '/images/heroes.png',
    '/images/inosuke.jpg',
    '/images/itachi.jpg',
    '/images/brook.webp',
]

function duplicateArray(arraySimple) {
    let arrayDouble = [];
    arrayDouble.push(...arraySimple);
    arrayDouble.push(...arraySimple);
      return arrayDouble;
  }
//Début de listing Informatique : JS
  function shuffleArray(arrayToshuffle){
      const arrayShuffled = arrayToshuffle.sort(() => 0.5 - Math.random());
      return arrayShuffled;
  }

  function onCardClick(e){
    if(!gameStarted){
        gameStarted = true;
    }
    const card = e.target.parentElement;
    card.classList.add("flip");
   

    selectedCards.push(card);
    if(selectedCards.length == 2){
        setTimeout(() => {
        if(selectedCards[0].dataset.value == selectedCards[1].dataset.value){

            //on a trouvé une paire
            selectedCards[0].classList.add("matched");
            selectedCards[1].classList.add("matched");
            selectedCards[0].removeEventListener('click', onCardClick);
            selectedCards[1].removeEventListener('click', onCardClick);

            const allCardsNotMatched = document.querySelectorAll('.card:not(.matched)');
            console.log(allCardsNotMatched);
            if(allCardsNotMatched.length == 0){
                alert(`Bravo, vous avez gagné en ${elapsedTime} secondes !`);
            }
        }
        else{
            //on s'est trompé
            selectedCards[0].classList.remove("flip");
            selectedCards[1].classList.remove("flip");
        }
        selectedCards = [];
    }, 1000);
    }
}

  let allCards = duplicateArray(card);
  //Mélanger le tableau
  allCards = shuffleArray(allCards);
  allCards.forEach(card => {
      const cardHtml = createCard(card);
      gameboard.appendChild(cardHtml);
  })

  let elapsedTime = 0;
  let gameStarted = false;
  const counterElement = document.getElementById('counter');
  
  function updateCounter() {
      setInterval(() => {
        if(gameStarted == true){
          elapsedTime++;
          counterElement.innerHTML = `Temps écoulé : ${elapsedTime} secondes`;
        }
      }, 1000);
  }
  
  updateCounter();
  
  
  let restartGame = document.getElementById('restart');
    restartGame.addEventListener('click', () => {
        window.location.reload();
    });