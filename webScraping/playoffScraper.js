const fs = require('fs');
const puppeteer = require('puppeteer');



(async function(){
    const browser = await puppeteer.launch( { 
        headless: false 
    } );
    const year = '2018'
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0)
    await page.goto(`https://www.basketball-reference.com/playoffs/NBA_${year}.html`)
    

    let data = await page.evaluate(() => {
        const playoffs = []
        let openSeries = document.getElementsByClassName('tooltip opener')
            for (let i = 0; i < openSeries.length; i++){
                openSeries[i].click()
            }
        const matchups = document.querySelectorAll('#all_playoffs tbody .rowSum');
        const matchupGames = document.querySelectorAll('#all_playoffs tbody .toggleable')
        const matchupsArray = []

        const mvp = document.querySelector('#meta div + div p + p a')
        playoffs.push({
            finalsMVP: mvp.innerHTML
        })

       for (i=0; i<15; i++){
            matchupsArray.push({
                round: matchups[i].children[0].innerText,
                team1: matchups[i].children[1].children[0].href.slice(43, 46),
                team2: matchups[i].children[1].children[1].href.slice(43, 46),
                team1Wins: matchups[i].children[1].innerText.slice(-4, -3),
                team2Wins: matchups[i].children[1].innerText.slice(-2, -1),
                gameScores: []
            })  
            let games = matchupGames[i].children[0].children[0].children[0].children[0].children
            g = 0
            while (g < games.length){
                matchupsArray[i].gameScores.push({ 
                    awayTeam: `${games[g].children[2].innerText} ${games[g].children[3].innerText}`,
                    homeTeam: `${games[g].children[4].innerText} ${games[g].children[5].innerText}`
                })
                ++g
            }
        }    
        
        
        playoffs.push(matchupsArray)

    
//return as data
        return playoffs

    })

    

    console.log(data)


    fs.writeFile(`C:/Users/jjspo/OneDrive/Desktop/Coding/Projects/NBA Site/data/${year}/playoffs.json`, JSON.stringify(data), (err) => {
        if(err) throw err;
        console.log('file saved')
    })

})();

