
class Club {
    constructor(name, abbr){
        this.name = name
        this.abbr = abbr
        this.sortOrder = []
        this.statsSelector = document.querySelector(`#Stats`)
        document.querySelectorAll(`.${this.abbr}`).forEach(item => {
            item.addEventListener("mouseover", this.showStats)
        })
        document.querySelectorAll(`.${this.abbr}`).forEach(item => {
            item.addEventListener("mouseout", this.showStats)
        })
        this.establishSortOrder = () => {
            for (let i = 0; i<this.data.length ; i++){
                this.sortOrder.push(this.data[i].playerName)
            }
        }
    }

    getDataFetch = () => {
        fetch(`data/2022/${this.abbr}/perGame.json`)
        .then((response) => response.json())
        .then((json) => {
            this.data = json})
        .then(() => {
            console.log(this.data)
        })   
    }

    getAdvancedFetch = () => {
        fetch(`data/2022/${this.abbr}/advanced.json`)
        .then((response) => response.json())
        .then((json) => {
            this.advanced = json})
        .then(() => {
            console.log(this.advanced)
        })   
    }

    advancedSort = () => {
        this.advanced.sort((a, b) => this.sortOrder.indexOf(a.playerName) - this.sortOrder.indexOf(b.playerName))
    }

    showStats = () => {
        this.statsSelector.classList.toggle('hidden')
        for (let i = 0; i <= 5; i++){
            document.querySelector(`.Players .player${i} .playerName`).innerText = this.data[i].playerName
            document.querySelector(`.Players .player${i} .ppg`).innerText = `PTS: ${this.data[i].pts}`
            document.querySelector(`.Players .player${i} .rpg`).innerText = `TRB: ${this.data[i].trb}`
            document.querySelector(`.Players .player${i} .apg`).innerText = `AST: ${this.data[i].ast}`
            document.querySelector(`.Players .player${i} .spg`).innerText = `STL: ${this.data[i].stl}`
            document.querySelector(`.Players .player${i} .bpg`).innerText = `BLK: ${this.data[i].blk}`
            document.querySelector(`.Players .player${i} .fg_pct`).innerText = `FG%: ${this.data[i].fg_pct}`
            document.querySelector(`.Players .player${i} .three_pct`).innerText = `3P%: ${this.data[i].threes_pct}`
            document.querySelector(`.Players .player${i} .ft_pct`).innerText = `FT%: ${this.data[i].ft_pct}`
            document.querySelector(`.Players .player${i} .ts_pct`).innerText = `TS%: ${this.advanced[i].ts_pct}`
            document.querySelector(`.Players .player${i} .ws`).innerText = `WS: ${this.advanced[i].ws}`
            document.querySelector(`.Players .player${i} .bpm`).innerText = `BPM: ${this.advanced[i].bpm}`
            document.querySelector(`.Players .player${i} .vorp`).innerText = `VORP: ${this.advanced[i].vorp}`
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
const mia = new Club('Miami Heat', 'mia')
const atl = new Club('Atlanta Hawks', 'atl')
const phi = new Club('Philadelphia 76ers', 'phi')
const tor = new Club('Toronto Raptors', 'tor')
const bos = new Club('Boston Celtics', 'bos')
const brk = new Club('Brooklyn Nets', 'brk')
const mil = new Club('Milwaukee Bucks', 'mil')
const chi = new Club('Chicago Bulls', 'chi')
const cho = new Club('Charlotte Hornets', 'cho')

const teams = [pho, uta, nop, dal, mem, min, gsw, den, mia, atl, phi, tor, bos, brk, mil, chi, cho]

for (let i = 0; i < teams.length; i++) {
    teams[i].getDataFetch()
    teams[i].getAdvancedFetch()
    setTimeout(() => {
        teams[i].establishSortOrder()
    }, 100);
    setTimeout(() => {
        teams[i].advancedSort()
    }, 100);
}