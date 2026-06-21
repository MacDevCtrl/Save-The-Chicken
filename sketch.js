let uiLayer;
let btnContainer; 
let noIndex = 0;
let userName = '';
let currentAnimal = 'George';

const BTN_COLOR = '#E0E0E0';
const BTN_TEXT = '#222222';

const BLUE = '#2196F3';
const RED = '#F44336';
const GREEN = '#4CAF50';
const YELLOW = '#FFEB3B';
const WHITE_TEXT = '#FFFFFF';

function setup() {
  noCanvas(); 
  uiLayer = select('#ui-layer');
  changeState('START');
}

function clearUI() {
  uiLayer.html('');
  btnContainer = createDiv('');
  btnContainer.class('button-container');
}

function addPhoto(num) {
  // THE CACHE BUSTER: Forces the browser to load the fresh file every time
  let cacheBuster = Date.now();
  let img = createImg(`${num}.jpg?v=${cacheBuster}`, `photo ${num}`);
  img.class('game-photo');
  img.parent(uiLayer);

  img.elt.onerror = function() {
    this.style.display = 'none'; 
    
    let placeholder = createDiv(`[ BRAK ZDJĘCIA: sprawdź czy plik to na pewno ${num}.jpg ]`);
    placeholder.style('width', '100%');
    placeholder.style('height', '240px');
    placeholder.style('background', '#f5f5f5');
    placeholder.style('border', '2px dashed #bbb');
    placeholder.style('display', 'flex');
    placeholder.style('justify-content', 'center');
    placeholder.style('align-items', 'center');
    placeholder.style('color', '#888');
    placeholder.style('font-weight', 'bold');
    placeholder.class('game-photo');
    
    this.parentNode.insertBefore(placeholder.elt, this);
  };
}

function addText(t) {
  let p = createP(t);
  p.class('story-text');
  p.parent(uiLayer);
  btnContainer.parent(uiLayer);
}

function addButton(label, onClick, bgColor = BTN_COLOR, textColor = BTN_TEXT) {
  let btn = createButton(label);
  btn.class('btn');
  btn.parent(btnContainer);
  btn.style('background-color', bgColor);
  btn.style('color', textColor);
  btn.mousePressed(onClick);
  return btn;
}

function addInput() {
  let inp = createInput('');
  inp.class('name-input');
  inp.parent(btnContainer);
  return inp;
}

function triggerNoTrack(animalName) {
  currentAnimal = animalName;
  changeState('NO_TRACK');
}

function returnToPayment() {
  if (currentAnimal === 'George') {
    changeState('PAYMENT_GEORGE');
  } else {
    changeState('PAYMENT_TIMMY');
  }
}

function changeState(state) {
  clearUI();

  switch (state) {
    case 'START':
      addPhoto(1); 
      addText("Would you like to donate to prevent animal slaughter and save a chicken today?");
      addButton("Yes", () => changeState('PAYMENT_GEORGE'));
      addButton("No", () => triggerNoTrack('George'));
      break;

    case 'PAYMENT_GEORGE':
      addPhoto(2); 
      addText("Thank you! How much would you like to donate to save George?");
      addButton("$10,000", () => changeState('GEORGE_SAVED'));
      addButton("$50,000", () => changeState('GEORGE_SAVED'));
      addButton("$100,000", () => changeState('GEORGE_SAVED'));
      addButton("Actually, I don't want to help", () => triggerNoTrack('George'));
      break;

    case 'GEORGE_SAVED':
      addPhoto(3); 
      addText("Payment Processed! You saved George! ...But wait. George has a little brother, Timmy. Timmy is currently freezing to death and needs a blanket.");
      addButton("Buy Timmy a blanket", () => changeState('PAYMENT_TIMMY'));
      addButton("Let Timmy freeze", () => triggerNoTrack('Timmy'));
      break;

    case 'PAYMENT_TIMMY':
      addPhoto(4); 
      addText("Thank you! Timmy's medical-grade blankets are very expensive. How much would you like to donate?");
      addButton("$20,000", () => changeState('TIMMY_DIES_ANYWAY')); 
      addButton("$100,000", () => changeState('TIMMY_DIES_ANYWAY'));
      addButton("$200,000", () => changeState('TIMMY_DIES_ANYWAY'));
      addButton("Actually, I don't want to help anymore", () => triggerNoTrack('Timmy'));
      break;

    case 'TIMMY_DIES_ANYWAY':
      currentAnimal = 'Timmy'; 
      addPhoto(5); 
      addText("Payment Processed! You bought Timmy a premium warm blanket. Unfortunately, he was highly allergic to the expensive polyester and died instantly. This is entirely your fault.");
      addButton("Oh no...", () => changeState('FUNERAL'));
      break;

    case 'FUNERAL':
      addPhoto(6); 
      addText(`${currentAnimal} has died. It was entirely your fault. You have not done a single nice thing ever. Would you at least like to pay $500,000 for ${currentAnimal}'s funeral?`);
      addButton("Yes, I know I am going to pay.", () => changeState('END'));
      addButton("No, I refuse.", () => changeState('GAME_OVER'));
      break;

    case 'END':
      addPhoto(7); 
      addText("Payment of $500,000 Processed.<br><br>You are now completely bankrupt.<br>You didn't save anyone.<br>Nothing you do matters.");
      break;
      
    case 'GAME_OVER':
      addPhoto(8); 
      addText("The End.<br><br>You will die in pain.");
      break;

    case 'NO_TRACK':
      handleNoTrack();
      break;
  }
}

function handleNoTrack() {
  switch (noIndex) {
    case 0:
      addPhoto(11); 
      addText("Are you sure? Why not? An innocent life is on the line and it costs practically nothing.");
      addButton("I changed my mind, I'll donate", returnToPayment);
      addButton("I am sure, I don't want to help", () => { noIndex++; changeState('NO_TRACK'); });
      break;
      
    case 1:
      addPhoto(12); 
      addText(`Look at ${currentAnimal}. He is terrified of what is going to happen. Are you really going to abandon him right now?`);
      addButton("I want to donate", returnToPayment);
      addButton(`I don't care if ${currentAnimal} dies`, () => { noIndex++; changeState('NO_TRACK'); });
      break;
      
    case 2:
      addPhoto(9); 
      addText("Before you go... quick question: What is your favorite color?");
      addButton("Blue", () => { noIndex++; changeState('NO_TRACK'); }, BLUE, WHITE_TEXT);
      addButton("Red", () => { noIndex++; changeState('NO_TRACK'); }, RED, WHITE_TEXT);
      addButton("Green", () => { noIndex++; changeState('NO_TRACK'); }, GREEN, WHITE_TEXT);
      addButton("Yellow", () => { noIndex++; changeState('NO_TRACK'); }, YELLOW, BTN_TEXT);
      break;
      
    case 3:
      addPhoto(13); 
      addText(`Wow! That is also ${currentAnimal}'s favorite color. You two have so much in common. He thought you were his friend.`);
      addButton(`I want to save ${currentAnimal}`, returnToPayment);
      addButton(`I don't care for ${currentAnimal}, I hope he dies in pain`, () => { noIndex++; changeState('NO_TRACK'); });
      break;
      
    case 4:
      addPhoto(10); 
      addText("Before we part forever, could you please tell me your name?");
      let inp = addInput();
      addButton("Confirm", () => {
        let val = inp.value().trim();
        userName = val === "" ? "User" : val;
        noIndex++; 
        changeState('NO_TRACK');
      });
      break;
      
    case 5:
      addPhoto(14); 
      addText(`${userName}, you are a terrible, soulless person.`);
      addButton("I am aware", () => { noIndex++; changeState('NO_TRACK'); });
      break;
      
    case 6:
      addPhoto(15); 
      addText("Do you truly believe you are a good person?");
      addButton("Actually, I want to help now", returnToPayment);
      addButton("No, I am bad.", () => { noIndex++; changeState('NO_TRACK'); });
      break;
      
    case 7:
      changeState('FUNERAL'); 
      break;
  }
}