///advanced statistics are out of order


class Club {
    constructor(name, abbr){
    this.name = name
    this.abbr = abbr
    this.statsSelector = document.querySelector(`#${this.abbr}Stats`)
    document.querySelector(`.${this.abbr}`).addEventListener("mouseover", this.showStats)
    document.querySelector(`.${this.abbr}`).addEventListener("mouseout", this.showStats)
    }
    showStats = () => {
        this.statsSelector.classList.toggle('hidden')
        for (let i = 0; i <= 5; i++){
            document.querySelector(`.${this.abbr}Players .player${i} .playerName`).innerText = this.data[i].playerName
            document.querySelector(`.${this.abbr}Players .player${i} .ppg`).innerText = `PTS: ${this.data[i].pts}`
            document.querySelector(`.${this.abbr}Players .player${i} .rpg`).innerText = `TRB: ${this.data[i].trb}`
            document.querySelector(`.${this.abbr}Players .player${i} .apg`).innerText = `AST: ${this.data[i].ast}`
            document.querySelector(`.${this.abbr}Players .player${i} .spg`).innerText = `STL: ${this.data[i].stl}`
            document.querySelector(`.${this.abbr}Players .player${i} .bpg`).innerText = `BLK: ${this.data[i].blk}`
            document.querySelector(`.${this.abbr}Players .player${i} .fg_pct`).innerText = `FG%: ${this.data[i].fg_pct}`
            document.querySelector(`.${this.abbr}Players .player${i} .three_pct`).innerText = `3P%: ${this.data[i].threes_pct}`
            document.querySelector(`.${this.abbr}Players .player${i} .ft_pct`).innerText = `AST: ${this.data[i].ft_pct}`
            document.querySelector(`.${this.abbr}Players .player${i} .ts_pct`).innerText = `TS%: ${this.data[i].ts_pct}`
            document.querySelector(`.${this.abbr}Players .player${i} .ws`).innerText = `WS: ${this.data[i].ws}`
            document.querySelector(`.${this.abbr}Players .player${i} .bpm`).innerText = `BPM: ${this.data[i].bpm}`
            document.querySelector(`.${this.abbr}Players .player${i} .vorp`).innerText = `VORP: ${this.data[i].vorp}`
        }   
    }
}

const pho = new Club('Phoenix Suns', 'pho')
const nop = new Club('New Orleans Pelicans', 'nop')
const dal = new Club('Dallas Mavericks', 'dal')
const uta = new Club('Utah Jazz', 'uta')
const mem = new Club('Memphis Grizzlies', 'mem')
const min = new Club('Minnesota Timberwolves', 'min')
const gsw = new Club('Golden State Warriors', 'gsw')
const den = new Club('Denver Nuggets', 'den')

fetch('data/2022/PHO2022.json')
    .then((response) => response.json())
    .then((json) => {
        pho.data = json})
    .then(() => {
        console.log(pho.data)
    })

fetch('data/2022/NOP2022.json')
    .then((response) => response.json())
    .then((json) => {
        nop.data = json})
    .then(() => {
        console.log(nop.data)
    })

fetch('data/2022/DAL2022.json')
    .then((response) => response.json())
    .then((json) => {
        dal.data = json})
    .then(() => {
        console.log(dal.data)
    })   

fetch('data/2022/UTA2022.json')
    .then((response) => response.json())
    .then((json) => {
        uta.data = json})
    .then(() => {
        console.log(uta.data)
    })   

fetch('data/2022/MEM2022.json')
    .then((response) => response.json())
    .then((json) => {
        mem.data = json})
    .then(() => {
        console.log(mem.data)
    })   

fetch('data/2022/MIN2022.json')
    .then((response) => response.json())
    .then((json) => {
        min.data = json})
    .then(() => {
        console.log(min.data)
    })  

fetch('data/2022/GSW2022.json')
    .then((response) => response.json())
    .then((json) => {
        gsw.data = json})
    .then(() => {
        console.log(gsw.data)
    })  

fetch('data/2022/DEN2022.json')
    .then((response) => response.json())
    .then((json) => {
        den.data = json})
    .then(() => {
        console.log(den.data)
    })  

const teams = [pho, nop, dal, uta, mem, min, gsw, den]