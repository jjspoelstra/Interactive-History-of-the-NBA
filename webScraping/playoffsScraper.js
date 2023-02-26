const fs = require('fs');
const puppeteer = require('puppeteer');



(async function(){
    const browser = await puppeteer.launch( { 
        headless: false 
    } );
    const year = '2021'
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0)
    await page.goto(`http://www.espn.com/nba/bracket/_/year/${year}`)
    

    let data = await page.evaluate(() => {
        const playoffMatchups = []

        const firstRound = document.querySelectorAll('.c1 dl');
        const firstRoundMatchups = []
       for (i=0; i<8; i++){
            firstRoundMatchups.push({
                team1: firstRound[i].children[0].children[1].children[0].innerText,
                team2: firstRound[i].children[0].children[1].children[5].innerText,
                team1Wins: firstRound[i].children[1].children[0].children[0].firstChild.textContent,
                team2Wins: firstRound[i].children[1].children[0].children[0].lastChild.textContent,
                games: firstRound[i].children[1].children[0].children[0].children[4].children[0].children[0].children,
                gameScores: []
            })   
        }
        

        const secondRound = document.querySelectorAll('.c2 dl');
        const secondRoundMatchups = []
       for (i=0; i<4; i++){
            secondRoundMatchups.push({
                team1: secondRound[i].children[0].children[1].innerText,
                team2: secondRound[i].children[0].children[6].innerText,
                team1Wins: secondRound[i].children[1].children[0].children[0].nextSibling.textContent,
                team2Wins: secondRound[i].children[1].children[0].children[6].nextSibling.textContent,
                games: secondRound[i].children[1].children[0].children[5].children[0].children[0].children,
                gameScores: []
            })   
        }
        

        const thirdRound = document.querySelectorAll('.c3 dl');
        const thirdRoundMatchups = []
       for (i=0; i<2; i++){
            thirdRoundMatchups.push({
                team1: thirdRound[i].children[0].children[2].innerText,
                team2: thirdRound[i].children[0].children[7].innerText,
                team1Wins: thirdRound[i].children[1].children[0].children[1].nextSibling.textContent,
                team2Wins: thirdRound[i].children[1].children[0].children[7].nextSibling.textContent,
                games: thirdRound[i].children[1].children[0].children[6].children[0].children[0].children,
                gameScores: []
            })   
        }
       

        const finals = document.querySelectorAll('.c4 dl');
        const finalsMatchup = []
            finalsMatchup.push({
                team1: finals[0].children[0].children[0].innerText,
                team2: finals[0].children[0].children[7].innerText,
                team1Wins: finals[0].children[1].children[0].firstChild.textContent,
                team2Wins: finals[0].children[1].children[0].lastChild.textContent,
                games: finals[0].children[1].children[0].children[5].children[0].children[0].children,
                gameScores: []
            })   
        
            

//put games into each series

            for (let i = 0; i < 8; i++){
                seriesLength = firstRoundMatchups[i].games.length
                for (let s = 0; s < seriesLength; s++){
                    score = firstRoundMatchups[i].games[s].children[1].innerHTML
                    firstRoundMatchups[i].gameScores.push(score)
                }
                delete firstRoundMatchups[i].games
            }

            playoffMatchups.push(firstRoundMatchups)

            for (let i = 0; i < 4; i++){
                seriesLength = secondRoundMatchups[i].games.length
                for (let s = 0; s < seriesLength; s++){
                    score = secondRoundMatchups[i].games[s].children[1].children[0].innerHTML
                    secondRoundMatchups[i].gameScores.push(score)
                }
                delete secondRoundMatchups[i].games
            }

            playoffMatchups.push(secondRoundMatchups)

            for (let i = 0; i < 2; i++){
                seriesLength = thirdRoundMatchups[i].games.length
                for (let s = 0; s < seriesLength; s++){
                    score = thirdRoundMatchups[i].games[s].children[1].children[0].innerHTML
                    thirdRoundMatchups[i].gameScores.push(score)
                }
                delete thirdRoundMatchups[i].games
            }

            playoffMatchups.push(thirdRoundMatchups)

            seriesLength = finalsMatchup[0].games.length
            for (let s = 0; s < seriesLength; s++){
                score = finalsMatchup[0].games[s].children[1].children[0].innerHTML
                finalsMatchup[0].gameScores.push(score)
            }
            delete finalsMatchup[0].games

            playoffMatchups.push(finalsMatchup)
    
//return as data
        return playoffMatchups //+ thirdRoundMatchups + finalsMatchup

    })

    

    console.log(data)


    fs.writeFile(`C:/Users/jjspo/OneDrive/Desktop/Coding/Projects/NBA Site/data/${year}/playoffs.json`, JSON.stringify(data), (err) => {
        if(err) throw err;
        console.log('file saved')
    })

})();

