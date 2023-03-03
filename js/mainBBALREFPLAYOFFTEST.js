
class Club {
    constructor(name, abbr){
        this.name = name
        this.abbr = abbr
        this.sortOrder = []
        this.statsSelector = document.querySelector(`#stats`)
        
    }
    get conference(){
        return this.data[0].conference
    }
    get seed(){
        return this.data[0].seed
    }

    placeSeed(){
        document.querySelector(`.${this.conference}${this.seed}`).classList.add(`${this.abbr}`)
        document.querySelector(`.${this.conference}${this.seed}`).src = `img/${this.abbr}.png`
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
        fetch(`data/test/${this.abbr}/perGame.json`)
        .then((response) => response.json())
        .then((json) => {
            this.data = json})
        .then(() => {
            console.log(this.data)
        })   
    }



    showStats = () => {
        this.statsSelector.classList.toggle('hidden')
        for (let i = 0; i <= 5; i++){
            document.querySelector(`.Players .player${i} .playerName`).innerText = this.data[1][i].playerName
            document.querySelector(`.Players .player${i} .gp`).innerText = `GP: ${this.data[1][i].stats.games}`
            document.querySelector(`.Players .player${i} .mpg`).innerText = `MPG: ${this.data[1][i].stats.mpg}`
            document.querySelector(`.Players .player${i} .ppg`).innerText = `PTS: ${this.data[1][i].stats.pts}`
            document.querySelector(`.Players .player${i} .rpg`).innerText = `TRB: ${this.data[1][i].stats.trb}`
            document.querySelector(`.Players .player${i} .apg`).innerText = `AST: ${this.data[1][i].stats.ast}`
            document.querySelector(`.Players .player${i} .spg`).innerText = `STL: ${this.data[1][i].stats.stl}`
            document.querySelector(`.Players .player${i} .bpg`).innerText = `BLK: ${this.data[1][i].stats.blk}`
            document.querySelector(`.Players .player${i} .fg_pct`).innerText = `FG%: ${this.data[1][i].stats.fg_pct}`
            document.querySelector(`.Players .player${i} .three_pct`).innerText = `3P%: ${this.data[1][i].stats.threes_pct}`
            document.querySelector(`.Players .player${i} .ft_pct`).innerText = `FT%: ${this.data[1][i].stats.ft_pct}`
            document.querySelector(`.Players .player${i} .ts_pct`).innerText = `TS%: ${this.data[1][i].stats.ts_pct}`
            document.querySelector(`.Players .player${i} .ws`).innerText = `WS: ${this.data[1][i].stats.ws}`
            document.querySelector(`.Players .player${i} .bpm`).innerText = `BPM: ${this.data[1][i].stats.bpm}`
            document.querySelector(`.Players .player${i} .vorp`).innerText = `VORP: ${this.data[1][i].stats.vorp}`
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

const teams = [pho, orl, nop, mia, atl, uta, dal, mem, min, gsw, den, phi, tor, bos, brk, mil, chi, cho, lac, sas, lal, sac, por, okc, hou, cle, nyk, was, ind, det]

for (let i = 0; i < teams.length; i++) {
    teams[i].getDataFetch()
    setTimeout(() => {
        teams[i].placeSeed()
    }, 100);
    setTimeout(() => {
        teams[i].addSelectors()
    }, 300);
    
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



let playoffData
fetchPlayoffs = () => {
    fetch(`data/2022/playoffs.json`)
    .then((response) => response.json())
    .then((json) => {
        playoffData = json})
    .then(() => {
        console.log(playoffData)

    })   
}

fetchPlayoffs()


   

class Matchup {
    constructor(name, seed1, seed2, conference){
        this.name = name
        this.conference = conference
        this.team1 = teams.filter(x => x.conference === `${conference}` && x.seed === `${seed1}`)[0].abbr
        this.team2 = teams.filter(x => x.conference === `${conference}` && x.seed === `${seed2}`)[0].abbr
        this.correctData = playoffData[1].filter((x) => x.team1.toLowerCase() === `${this.team1}` && x.team2.toLowerCase() === `${this.team2}`)
        this.team1Wins = this.correctData[0].team1Wins
        this.team2Wins = this.correctData[0].team2Wins
        this.round = this.correctData[0].round
        this.games = this.correctData[0].gameScores
        if (this.team1Wins == 4){
            document.querySelector(`.${conference}${seed1}${seed2}Winner`).classList.add(`${this.team1}`)
            document.querySelector(`.${conference}${seed1}${seed2}Winner`).src = `img/${this.team1}.png`
        } else {
            document.querySelector(`.${conference}${seed1}${seed2}Winner`).classList.add(`${this.team2}`)
            document.querySelector(`.${conference}${seed1}${seed2}Winner`).src = `img/${this.team2}.png`
        }
    }
    paintGames = () => {
        let topSeedWins = 0
        let lowSeedWins = 0
        for (let i = 0; i < this.games.length; i++){
            let team1Score 
            let team2Score
            if (i === 0 || i === 1 || i === 4 || i === 6){
                team1Score = this.games[i].homeTeam.slice(-3).trim()
                team2Score = this.games[i].awayTeam.slice(-3).trim()
            } else {
                team1Score = this.games[i].awayTeam.slice(-3).trim()
                team2Score = this.games[i].homeTeam.slice(-3).trim()
            }
        
            let span = document.createElement('span')
            span.classList.add(`game${i}`, `hidden`, 'game')
            this.conference === 'west' ? span.innerHTML = '&#9654;' : span.innerHTML = '&#9664;'
            
            

            
            if (+team1Score > +team2Score){
                topSeedWins += 1
                span.classList.add(`${this.team1}Win`, `topSeedWin${topSeedWins}`)
            } else {
                lowSeedWins += 1
                span.classList.add(`${this.team2}Win`, `lowSeedWin${lowSeedWins}`)
            }

            let tooltip = document.createElement('span')
            tooltip.classList.add('toolTipText')
            tooltip.innerText = `${team1Score} - ${team2Score}`
            span.append(tooltip)
            document.querySelector(`.${this.name}`).prepend(span)
        }
    }
}



let westOneEight
let eastOneEight
let westFourFive
let eastFourFive
let westThreeSix
let eastThreeSix
let westTwoSeven
let eastTwoSeven
function createMatchup(){
    westOneEight = new Matchup('westOneEight', '1st', '8th', 'west') 
    eastOneEight = new Matchup('eastOneEight', '1st', '8th', 'east')
    westFourFive = new Matchup('westFourFive', '4th', '5th', 'west')
    eastFourFive = new Matchup('eastFourFive', '4th', '5th', 'east')
    westTwoSeven = new Matchup('westTwoSeven', '2nd', '7th', 'west')
    eastTwoSeven = new Matchup('eastTwoSeven', '2nd', '7th', 'east')
    westThreeSix = new Matchup('westThreeSix', '3rd', '6th', 'west')
    eastThreeSix = new Matchup('eastThreeSix', '3rd', '6th', 'east')
}


const matchups = [westOneEight]

setTimeout(() => {
    createMatchup()
    westOneEight.paintGames()
    eastOneEight.paintGames()
    westFourFive.paintGames()
    westTwoSeven.paintGames()
    eastFourFive.paintGames()
    eastTwoSeven.paintGames()
    westThreeSix.paintGames()
    eastThreeSix.paintGames()
}, 100);



// for (let i = 0; i < matchups.length; i++) {
//     setTimeout(() => {
//         matchups[i].paintGames()
//     }, 100);
 
// }

