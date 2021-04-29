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
