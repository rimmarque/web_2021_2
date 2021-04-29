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

