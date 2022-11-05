//TODO select all the drum elements and add event listener
//add animation when a button is clicked
//play music()


const animate = (key) => {
    const currentKey = document.querySelector(`.${key}`)
    currentKey.classList.add('pressed')
    setTimeout(()=>{
        currentKey.classList.remove('pressed')
    },180)
}
const playMusic = (path) => {
    const audio = new Audio(path)
    audio.volume = audio_volume;
    audio.play();
}

const makeSound = (key) =>{
    switch(key){
        case "w":
            playMusic("sounds/sound-1.mp3");
            break;
        case "a":
            playMusic("sounds/sound-2.mp3");
            break;
        case "s":
            playMusic("sounds/sound-3.mp3");
            break;
        case "d":
            playMusic("sounds/sound-4.mp3");
            break;
        case "j":
            playMusic("sounds/sound-5.mp3");
            break;
        case "k":
            playMusic("sounds/sound-6.mp3");
            break;
        case "l":
            playMusic("sounds/sound-7.mp3");
            break;
        default:
            console.log("wrong button")
        
    }
}

const handleDrumClick = (event) => {
    var innerHTML = event.target.innerHTML;
    console.log(innerHTML);
    animate(innerHTML)
    makeSound(innerHTML)
}

document.addEventListener('keypress', (event) => {
    const triggeredKey = event.key;
    makeSound(triggeredKey)
    animate(triggeredKey)
})

//theme 1
const theme_1__background = "#091921"
const theme_1__text = "#00fff1"

//theme 2
const theme_2__background = "#f7c340"
const theme_2__text = "#2d2d2d"

const change_theme = (theme) => {
    let root = document.documentElement
    if (theme === "theme_1") {
        root.style.setProperty('--background', theme_1__background)
        root.style.setProperty('--text', theme_1__text)
    }
    else{
        root.style.setProperty('--background', theme_2__background)
        root.style.setProperty('--text', theme_2__text)  
    }
    
}

var current_theme = "theme_1"
const theme_changer = document.getElementById("util__button-theme")
theme_changer.addEventListener("click", ()=>{
    theme_changer.classList.add("change_theme_pressed")
    setTimeout(()=>{
        theme_changer.classList.remove("change_theme_pressed")
    })
    if (current_theme == "theme_1"){
        change_theme("theme_2")
        current_theme = "theme_2"
    }else{
        change_theme("theme_1")
        current_theme = "theme_1"
    }

})

var auto_music_id;
var auto_music_on = false;
const auto_music = () => {
    const letters = ["w", "a", "s", "d", "j", "k", "l"];

    auto_music_id = setInterval(()=>{
        const current_key = letters[Math.floor(Math.random() * letters.length)]
        makeSound(current_key)
        animate(current_key)
    },200)
}

const auto_music_button = document.getElementById("util__button-auto")
auto_music_button.addEventListener("click", () => {
    if(auto_music_on){
        clearInterval(auto_music_id)
        auto_music_on = false
        auto_music_button.innerText = "start auto music"
        auto_music_button.classList.remove('auto_music_on')
    }
    else{
        auto_music()
        auto_music_on = true
        auto_music_button.innerText = "stop auto music"
        auto_music_button.classList.add('auto_music_on')
    }
    
})

audio_volume = 0.4;

const slider = document.getElementById("volume__slider")
slider.oninput = (event) => {
    audio_volume = event.target.value / 100
}

var drums = document.querySelectorAll(".drum")
for(let i = 0; i < drums.length; i++ ){
    drums[i].addEventListener("click", handleDrumClick)
}
