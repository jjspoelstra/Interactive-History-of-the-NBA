
class Club {
    constructor(name, abbr){
        this.name = name
        this.abbr = abbr
        this.sortOrder = []
        this.establishSortOrder = () => {
            for (let i = 0; i<this.data.length ; i++){
                this.sortOrder.push(this.data[i].playerName)
            }
        }
        this.statsSelector = document.querySelector(`#stats`)
        
    }

    get seed(){
        
    }

    addSelectors(){
        document.querySelectorAll(`.${this.abbr}`).forEach(item => {
            item.addEventListener("mouseover", this.showStats)
        })
        document.querySelectorAll(`.${this.abbr}`).forEach(item => {
            item.addEventListener("mouseout", this.showStats)
        })
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
            document.querySelector(`.Players .player${i} .gp`).innerText = `GP: ${this.data[i].games}`
            document.querySelector(`.Players .player${i} .mpg`).innerText = `MPG: ${this.data[i].mpg}`
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


const phx = new Club('Phoenix Suns', 'phx')
const no = new Club('New Orleans Pelicans', 'no')
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
const lac = new Club('Los Angeles Clippers', 'lac') 
const sas = new Club('San Antonio Spurs', 'sas') 
const lal = new Club('Los Angeles Lakers', 'lal') 
const sac = new Club('Sacramento Kings', 'sac') 
const por = new Club('Portland Trail Blazers', 'por') 
const okc = new Club('Oklahoma City Thunder', 'okc') 
const hou = new Club('Houston Rockets', 'hou') 
const cle = new Club('Cleveland Cavaliers', 'cle')
const nyk = new Club('New York Knicks', 'nyk')
const was = new Club('Washington Wizards', 'was')
const ind = new Club('Indiana Pacers', 'ind')
const det = new Club('Detroit Pistons', 'det')
const orl = new Club('Orlando Magic', 'orl')

const teams = [phx, uta, no, dal, mem, min, gsw, den, mia, atl, phi, tor, bos, brk, mil, chi, cho, lac, sas, lal, sac, por, okc, hou, cle, nyk, was, ind, det, orl] //

for (let i = 0; i < teams.length; i++) {
    teams[i].getDataFetch()
    teams[i].getAdvancedFetch()
    setTimeout(() => {
        teams[i].establishSortOrder()
    }, 100);
    setTimeout(() => {
        teams[i].advancedSort()
    }, 100);
    setTimeout(() => {
        teams[i].addSelectors()
    }, 200);
}



//advance playoffs       (season object? Not sure it makes sense to add to each team)

document.querySelector('.advance').addEventListener('click', advance)

let clicks = 0
function advance(){
    clicks++
    document.querySelectorAll(`.game${clicks - 1}`).forEach(item => {
        item.classList.toggle('hidden')
    })
}






//testing
let playoffData
fetchPlayoffs = () => {
    fetch(`data/2022/playoffsOrigin.json`)
    .then((response) => response.json())
    .then((json) => {
        playoffData = json})
    .then(() => {
        console.log(playoffData)

        let oneEightSplitEast = playoffData[0][0].gameScores[0].split(' ')
        let eastOne = oneEightSplitEast[0].toLowerCase()
        let eastEight = oneEightSplitEast[2].toLowerCase()

        let oneEightSplitWest = playoffData[0][4].gameScores[0].split(' ')
        let westOne = oneEightSplitWest[0].toLowerCase()
        let westEight = oneEightSplitWest[2].toLowerCase()

        document.querySelector('.eastOneSeed').classList.add(`${eastOne}`)
        document.querySelector('.eastOneSeed').src = `img/${eastOne}.png`
        document.querySelector('.eastEightSeed').classList.add(`${eastEight}`)
        document.querySelector('.eastEightSeed').src = `img/${eastEight}.png`
       

        document.querySelector('.westOneSeed').classList.add(`${westOne}`)
        document.querySelector('.westOneSeed').src = `img/${westOne}.png`
        document.querySelector('.westEightSeed').classList.add(`${westEight}`)
        document.querySelector('.westEightSeed').src = `img/${westEight}.png`

        if (playoffData[0][0].team1Wins === '4'){
            document.querySelector('.eastOneEightWinner').classList.add(`${eastOne}`)
            document.querySelector('.eastOneEightWinner').src = `img/${eastOne}.png`
        }
        else {
            document.querySelector('.eastOneEightWinner').classList.add(`${eastEight}`)
            document.querySelector('.eastOneEightWinner').src = `img/${eastEight}.png`
        }

        if (playoffData[0][4].team1Wins === '4'){
            document.querySelector('.westOneEightWinner').classList.add(`${westOne}`)
            document.querySelector('.westOneEightWinner').src = `img/${westOne}.png`
        }
        else {
            document.querySelector('.westOneEightWinner').classList.add(`${westEight}`)
            document.querySelector('.westOneEightWinner').src = `img/${westEight}.png`
        }

        let topSeedWins = 0
        let lowSeedWins = 0

        for (let i = 0; i < playoffData[0][4].gameScores.length; i++){
            console.log(westOne)
            let topSeed = westOne
            let game = playoffData[0][4].gameScores[i].split(', ').join(' ').split(' ')
            let span = document.createElement('span')
            let winner = game[0].toLowerCase()
            span.classList.add(`${winner}Win`)
            if (span.classList.contains(`${topSeed}Win`)){
                topSeedWins += 1
                span.classList.add(`topSeedWin${topSeedWins}`)
            } else {
                lowSeedWins += 1
                span.classList.add(`lowSeedWin${topSeedWins}`)
            }

            span.classList.add(`game${i}`, `hidden`, 'game')
            span.innerHTML = '&#9654;'

            let tooltip = document.createElement('span')
            tooltip.classList.add('toolTipText')
            tooltip.innerText = `${game[1]} - ${game[3]}`
            span.append(tooltip)
            document.querySelector('.westOneEight').prepend(span)
            
        }

    })   
}

  
fetchPlayoffs()


   
class Matchup {
    constructor(round){
        this.round = round
    }
}    





