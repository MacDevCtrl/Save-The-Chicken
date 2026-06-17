let uiLayer;
let noIndex = 0;
let userName = '';
let currentAnimal = 'George';

const GREEN = '#4CAF50';
const RED = '#F44336';
const BLUE = '#2196F3';
const YELLOW = '#FFEB3B';
const NEUTRAL = '#F0F0F0';
const WHITE_TEXT = '#FFFFFF';
const BLACK_TEXT = '#111111';

function setup() {
  let canvas = createCanvas(800, 600);
  canvas.parent('app-container');
  uiLayer = select('#ui-layer');
  changeState('START');
}

function draw() {
  background(255);
}

function clearUI() {
  uiLayer.html('');
}

function addText(t) {
  let p = createP(t);
  p.class('story-text');
  p.parent(uiLayer);
}

function addButton(label, onClick, bgColor = NEUTRAL, textColor = BLACK_TEXT) {
  let btn = createButton(label);
  btn.class('btn');
  btn.parent(uiLayer);
  btn.style('background-color', bgColor);
  btn.style('color', textColor);
  btn.mousePressed(onClick);
  return btn;
}

function addInput() {
  let inp = createInput('');
  inp.class('name-input');
  inp.parent(uiLayer);
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
      addText("Would you like to donate to prevent animal slaughter and save a chicken today?");
      addButton("Yes", () => changeState('PAYMENT_GEORGE'), GREEN, WHITE_TEXT);
      addButton("No", () => triggerNoTrack('George'), RED, WHITE_TEXT);
      break;

    case 'PAYMENT_GEORGE':
      addText("Thank you! How much would you like to donate to save George?");
      addButton("$10,000", () => changeState('GEORGE_SAVED'), GREEN, WHITE_TEXT);
      addButton("$50,000", () => changeState('GEORGE_SAVED'), GREEN, WHITE_TEXT);
      addButton("$100,000", () => changeState('GEORGE_SAVED'), GREEN, WHITE_TEXT);
      addButton("Actually, I don't want to help", () => triggerNoTrack('George'), RED, WHITE_TEXT);
      break;

    case 'GEORGE_SAVED':
      addText("Payment Processed! You saved George! ...But wait. George has a little brother, Timmy. Timmy is currently freezing to death and needs a blanket.");
      addButton("Buy Timmy a blanket", () => changeState('PAYMENT_TIMMY'), GREEN, WHITE_TEXT);
      addButton("Let Timmy freeze", () => triggerNoTrack('Timmy'), RED, WHITE_TEXT);
      break;

    case 'PAYMENT_TIMMY':
      addText("Thank you! Timmy's medical-grade blankets are very expensive. How much would you like to donate?");
      addButton("$20,000", () => changeState('TIMMY_DIES_ANYWAY'), GREEN, WHITE_TEXT); 
      addButton("$100,000", () => changeState('TIMMY_DIES_ANYWAY'), GREEN, WHITE_TEXT);
      addButton("$200,000", () => changeState('TIMMY_DIES_ANYWAY'), GREEN, WHITE_TEXT);
      addButton("Actually, I don't want to help anymore", () => triggerNoTrack('Timmy'), RED, WHITE_TEXT);
      break;

    case 'TIMMY_DIES_ANYWAY':
      currentAnimal = 'Timmy'; 
      addText("Payment Processed! You bought Timmy a premium warm blanket. Unfortunately, he was highly allergic to the expensive polyester and died instantly. This is entirely your fault.");
      addButton("Oh no...", () => changeState('FUNERAL'));
      break;

    case 'FUNERAL':
      addText(`${currentAnimal} has died. It was entirely your fault. You have not done a single nice thing ever. Would you at least like to pay $500,000 for ${currentAnimal}'s funeral?`);
      addButton("Yes, I know I am going to pay.", () => changeState('END'), GREEN, WHITE_TEXT);
      addButton("No, I refuse.", () => changeState('GAME_OVER'), RED, WHITE_TEXT);
      break;

    case 'END':
      addText("Payment of $500,000 Processed.<br><br>You are now completely bankrupt.<br>They are still dead.<br>Nothing you do matters.");
      break;
      
    case 'GAME_OVER':
      addText("The End.<br><br>You will die in pain like <br><br>Timmy and George");
      break;

    case 'NO_TRACK':
      handleNoTrack();
      break;
  }
}

function handleNoTrack() {
  switch (noIndex) {
    case 0:
      addText("Are you sure? Why not? An innocent life is on the line and it costs practically nothing.");
      addButton("I changed my mind, I'll donate", returnToPayment, GREEN, WHITE_TEXT);
      addButton("I am sure, I don't want to help", () => { noIndex++; changeState('NO_TRACK'); }, RED, WHITE_TEXT);
      break;
      
    case 1:
      addText(`Look at ${currentAnimal}. He is terrified of what is going to happen. Are you really going to abandon him right now?`);
      addButton("I want to donate", returnToPayment, GREEN, WHITE_TEXT);
      addButton(`I don't care if ${currentAnimal} dies`, () => { noIndex++; changeState('NO_TRACK'); }, RED, WHITE_TEXT);
      break;
      
    case 2:
      addText("Before you go... quick question: What is your favorite color?");
      addButton("Blue", () => { noIndex++; changeState('NO_TRACK'); }, BLUE, WHITE_TEXT);
      addButton("Red", () => { noIndex++; changeState('NO_TRACK'); }, RED, WHITE_TEXT);
      addButton("Green", () => { noIndex++; changeState('NO_TRACK'); }, GREEN, WHITE_TEXT);
      addButton("Yellow", () => { noIndex++; changeState('NO_TRACK'); }, YELLOW, BLACK_TEXT);
      break;
      
    case 3:
      addText(`Wow! That is also ${currentAnimal}'s favorite color. You two have so much in common. He thought you were his friend.`);
      addButton(`I want to save ${currentAnimal}`, returnToPayment, GREEN, WHITE_TEXT);
      addButton(`I don't care for ${currentAnimal}, I hope he dies in pain`, () => { noIndex++; changeState('NO_TRACK'); }, RED, WHITE_TEXT);
      break;
      
    case 4:
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
      addText(`${userName}, you are a terrible, soulless person.`);
      addButton("I am aware", () => { noIndex++; changeState('NO_TRACK'); }, RED, WHITE_TEXT);
      break;
      
    case 6:
      addText("Do you truly believe you are a good person?");
      addButton("Actually, I want to help now", returnToPayment, GREEN, WHITE_TEXT);
      addButton("No, I am bad.", () => { noIndex++; changeState('NO_TRACK'); }, RED, WHITE_TEXT);
      break;
      
    case 7:
      changeState('FUNERAL');
      break;
  }
}