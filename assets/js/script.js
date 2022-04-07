const dino = document.querySelector('.dino')
const background = document.querySelector('.background')
let isJumping = false
let dinoPosition = 0


const handleKeyUp = event => {
    if (event.keyCode === 32) {
        console.log(isJumping)
        if (!isJumping) {
            jump()
        }
    }
}

const jump = () => {
    isJumping = true
    let upInterval = setInterval(() => {
        if(dinoPosition >= 150) {
            clearInterval(upInterval)
            let downInterval = setInterval(() => {
                if (dinoPosition <= 0) {
                    clearInterval(downInterval)
                    isJumping = false
                }else{
                    dinoPosition -= 20
                    dino.style.bottom = dinoPosition + 'px'
                }
            }, 20)
        }else{
            dinoPosition += 20
            dino.style.bottom = dinoPosition + 'px'
        }
    }, 20)
}

const createCactus = () => {
    const cactus = document.createElement('div')
    let randomTime = Math.random() * 6000
    let cactusPosition = 1000
    cactus.classList.add('cactus')
    cactus.style.left = cactusPosition + 'px'
    background.appendChild(cactus)

    let lefInterval = setInterval(() => {
        if(cactusPosition < -60){
            clearInterval(lefInterval)
            background.removeChild(cactus)
        }else if(cactusPosition > 0 && cactusPosition < 60 && dinoPosition < 60){
            clearInterval(lefInterval)
            document.body.innerHTML = '<h1 class="game-over">Game Over</h1>'
        }else{
            cactusPosition -= 10
            cactus.style.left = cactusPosition + 'px'
        }
    }, 40)

    setTimeout(createCactus, randomTime)
}

createCactus()
document.addEventListener('keyup', handleKeyUp)