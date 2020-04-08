const getTime = document.querySelector('input')
const setTime = document.querySelector('#game_time')
const setResult = document.querySelector('#result_game')
const field = document.querySelector('.field')
let start = document.querySelector('.start')
let time = document.querySelector('.calculate_time')
let calc_result = document.querySelector('.calculate_result')
let result = 0
let _startGame = false
let colorSquare = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
'#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
'#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
'#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
'#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
'#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
'#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
'#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
'#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
'#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'
]

getTime.addEventListener('keyup', enterGameTime)

function enterGameTime(event){
  result = 0;
  removeClass(setTime)
  addClass(setResult)

  if (event.keyCode === 13){
    if (getTime.value === '' || getTime.value <= 0){
      alert('You must enter the correct game time')
      return getTime.value = ''
    }
    if(time.textContent === '' || time.textContent == 0){
      time.textContent = Number(getTime.value).toFixed(1)
      time.style.fontSize = '30px'
      time.style.marginLeft = '8px'
      setTime.append(time)
      getTime.value = ''
    } else {
      getTime.value = ''
    }
  }
}

start.addEventListener('click', function(){
  if(_startGame = true && time.textContent !== ''){
    field.style.backgroundColor = 'white'
    timer()
    createRandomSquare()
  }

  if( calc_result.textContent && time.textContent <= 0){
    finalGame()
  }
})


field.addEventListener('click', function(event){
  if(!_startGame){
    return
  }

  if (event.target.dataset.square){
    result++
    createRandomSquare()
  }
})

function timer(){
  const timer = setInterval(() => {
    if (time.textContent > 0){
      time.textContent = (time.textContent - 0.1).toFixed(1);
    } else {
      clearInterval(timer)
      finalGame()
    }
  }, 100)
}

function createRandomSquare() {
  
  field.innerHTML = ''
  let square = document.createElement('div')
  let squareSize = random(20,200)
  let fieldSize = field.getBoundingClientRect()
  let maxTop = fieldSize.height - squareSize
  let maxLeft = fieldSize.width - squareSize

  square.style.width = square.style.height = squareSize + 'px'
  square.style.position = 'absolute';
  square.style.top = random(0, maxTop) + 'px'
  square.style.left = random(0, maxLeft) + 'px'
  square.style.cursor = 'pointer'
  square.setAttribute('data-square','true')
  let indexColorSquare = random(0, colorSquare.length);
  square.style.backgroundColor = colorSquare[indexColorSquare];

  field.append(square);
} 

function removeClass(el){
  el.classList.remove('hidden')
}

function addClass(el){
  el.classList.add('hidden')
}

function random(min,max){
  return Math.floor(Math.random()*(max - min) + min);
}

function finalGame(){
   _startGame = false
   field.innerHTML = ''
   field.append(start)
   field.style.backgroundColor = 'rgb(253, 226, 246)'
   addClass(setTime)
   removeClass(setResult)
   calc_result.textContent = result;
}
