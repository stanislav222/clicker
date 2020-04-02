var startBtn = document.getElementById('start')
var panel = document.getElementById('game')
var time  = document.querySelector('#time')
var $result  = document.querySelector('#result')
var $timeHeader  = document.querySelector('#time-header')
var $resultHeader  = document.querySelector('#result-header')
var $gameTime = document.querySelector('#game-time')

var isGameStarted = false

var boxColor = ["green", "red", "blue", 'yellow']
var score = 0


startBtn.addEventListener('click', startGame)
$gameTime.addEventListener('input', setGameTime)

panel.addEventListener("click", function (ev) {

    if(!isGameStarted){
        return
    }

    if(ev.target.dataset.box){
        score++
        renderBox()
    }
})

function startGame() {
    score = 0
    setGameTime()
    $gameTime.setAttribute('disabled' , true)
      isGameStarted = true
    panel.style.backgroundColor = '#fff'
    startBtn.classList.add('hide')
    var interval = setInterval(function () {
        var timeS = parseFloat(time.textContent)
        if (timeS <= 0){
            clearInterval(interval)
            endGame()
        } else {
            time.textContent = (timeS - 0.1).toFixed(1)
        }
    }, 100);
    renderBox()
}

function setGameTime() {
    var newTime = parseInt($gameTime.value)
    time.textContent = newTime.toFixed(1)
    $timeHeader.classList.remove('hide')
    $resultHeader.classList.add('hide')
}

function endGame(){
    $gameTime.removeAttribute('disabled')
    isGameStarted = false
    startBtn.classList.remove('hide')
    panel.style.backgroundColor = '#ccc'
    panel.innerHTML = ''
    $timeHeader.classList.add('hide')
    $resultHeader.classList.remove('hide')
    $result.textContent = score.toString()
}

function renderBox() {

    panel.innerHTML = ""
    var box = document.createElement('div')
    var boxSize = getRandome(30, 100)
    var panelSize = panel.getBoundingClientRect()
    var maxTop = panelSize.height - boxSize
    var maxLeft = panelSize.width - boxSize


    box.style.height = box.style.width = boxSize+ 'px'
    box.style.position ='absolute'
    box.style.backgroundColor = boxColor[getRandome(0,boxColor.length)]
    box.style.top = getRandome(0,maxTop)+ 'px'
    box.style.left = getRandome(0,maxLeft)+ 'px'
    box.style.cursor = "pointer"
    box.setAttribute('data-box', 'true')

    panel.insertAdjacentElement("afterbegin", box)

}

function getRandome(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}


