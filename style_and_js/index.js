const shooter = document.getElementById('player-controlled-shooter')

let justice
let monsterInterval

function moveUp() {
    let topPosition = window.getComputedStyle(shooter).getPropertyValue('top')
    if(shooter.style.top === '0px') {
        return 
}   else {
    let position = parseInt(topPosition)
    position -= 60
    shooter.style.top = `${position}px`
    }  
} 

function moveDown() {
    let topPosition = window.getComputedStyle(shooter).getPropertyValue('top')
    if(shooter.style.top === '360px') {
        return 
} else {
    let position = parseInt(topPosition)
    position += 60
    shooter.style.top = `${position}px`
    }  
} 

function letShipFly(event) {
    if (event.key === 'ArrowUp') {
        event.preventDefault()
        moveUp()
    } else if (event.key === 'ArrowDown') {
        event.preventDefault()
        moveDown()
    } else if (event.key === ' ') {
        event.preventDefault()
        fireLaser()
    }
}

window.addEventListener('keydown', letShipFly)

function fireLaser() {
    let laser = createLaserElement()
    mainPlayArea.appendChild(laser)
    let laserSFX = new Audio('laserShot.mp3')
    laserSFX.play()
    moveLaser(laser)
}

function createLaserElement() {
    let xPosition = parseInt(window.getComputedStyle(shooter).getPropertyValue('left'));
    let yPosition = parseInt(window.getComputedStyle(shooter).getPropertyValue('top'));
    let newLaser = document.createElement('img')
    newLaser.src = 'arts/laser.png'
    newLaser.classList.add('laser')
    newLaser.style.left = `${xPosition}px`
    newLaser.style.top = `${yPosition - 10}px`
    return newLaser
}

function moveLaser(laser) {
    let laserInterval = setInterval(() => {
        let xPosition = parseInt(laser.style.left)
        if(xPosition === 340) {
            laser.remove()
        } else {
            laser.style.left = `${xPosition + 4}px`
        }
    }, 10)
}

const monsterImgs = ['arts/monster-1.jpg', 'arts/monster-2.jpg', 'arts/monster-3.jpg'];

function createMonster() {
    let newMonster = document.createElement('img');
    let monsterSpriteImg = monsterImgs[Math.floor(Math.random()*monsterImgs.length)];
    newMonster.src = monsterSpriteImg;
    newMonster.classList.add('monster');
    newMonster.style.left = '370px';
    newMonster.style.top = `${Math.floor(Math.random() * 330) + 30}px`;
    mainPlayArea.appendChild(newMonster);
    moveMonster(newMonster);
}

function moveMonster(monster) {
    let moveMonsterInterval = setInterval(() => {
        let xPosition = parseInt(window.getComputedStyle(monster).getPropertyValue('left'))
        if (xPosition <= 50) {
            monster.remove()
        } else {
            monster.style.left = `${xPosition - 4}px`
        }
    }, 30)
}

function checkLaserCollision(laser, monster) {
  let laserLeft = parseInt(laser.style.left)
  let laserTop = parseInt(laser.style.top)
  let laserBottom = laserTop - 20
  let monsterTop = parseInt(monster.style.top)
  let monsterBottom = monsterTop - 30
  let monsterLeft = parseInt(monster.style.left)
  if (laserLeft != 340 && laserLeft + 60 >= monsterLeft) {
    if ( (laserTop <= monsterTop && laserTop >= monsterBottom) ) {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}

function checkLaserCollision(laser, monster) {
    let laserLeft = parseInt(laser.style.left)
    let laserTop = parseInt(laser.style.top)
    let laserBottom = laserTop - 20
    let monsterTop = parseInt(monster.style.top)
    let monsterBottom = monsterTop - 30
    let monsterLeft = parseInt(monster.style.left)
    if (laserLeft != 340 && laserLeft + 60 >= monsterLeft) {
      if ( (laserTop <= monsterTop && laserTop >= monsterBottom) ) {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  }

startButton.addEventListener('click', (event) => {
    playGame()
})

function playGame() {
    startButton.style.display = 'none'
    instructions.style.display = 'none'
    window.addEventListener("keydown", letShipFly)
    justice = new Audio("start.mp3")
    justice.play()
    monsterInterval = setInterval(() => { createMonster() }, 2100)
  }

const scoreCounter = document.querySelector('#score span')

function moveLaser(laser) {
    let laserInterval = setInterval(() => {
        let xPosition = parseInt(laser.style.left)

        let monsters = document.querySelectorAll(".monster")
        monsters.forEach(monster => {
            if (checkLaserCollision(laser, monster)) {
                let explosion = new Audio('explosion.mp3')
                explosion.play()
                monster.src = 'arts/explosion.png'
                monster.classList.remove("monster")
                monster.classList.add("dead-monster")
                scoreCounter.innerHTML = parseInt(scoreCounter.innerHTML) + 100
            }
        })
    })
}

function moveMonster(monster) {
    let moveMonsterInterval = setInterval(() => {
      let xPosition = parseInt(window.getComputedStyle(monster).getPropertyValue('left'))
      if (xPosition <= 50) {
        if (Array.from(monster.classList).includes("dead-monster")) {
          monster.remove()
        } else {
          gameOver()
        }
      } else {
        monster.style.left = `${xPosition - 4}px`
      }
    }, 30)
  }