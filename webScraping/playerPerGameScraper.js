const fs = require('fs');
const puppeteer = require('puppeteer');



(async function(){
    const browser = await puppeteer.launch( { 
        headless: false 
    } );
    const team = "ORL"
    const year = '2022'
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0)
    await page.goto(`https://www.basketball-reference.com/teams/${team}/${year}.html`)
    

    let data = await page.evaluate(() => {
        const playerStats = document.querySelectorAll('#per_game tbody tr');
        const playersArray = []

       for (i=0; i<playerStats.length; i++){
            playersArray.push({
                playerName: playerStats[i].children[1].innerText,
                age: playerStats[i].children[2].innerText,
                games: playerStats[i].children[3].innerText,
                gamesStarted:  playerStats[i].children[4].innerText,
                mpg: playerStats[i].children[5].innerText,
                fg: playerStats[i].children[6].innerText,
                fga: playerStats[i].children[7].innerText,
                fg_pct: playerStats[i].children[8].innerText,
                threes: playerStats[i].children[9].innerText,
                threes_a: playerStats[i].children[10].innerText,
                threes_pct: playerStats[i].children[11].innerText,
                twos_pg: playerStats[i].children[12].innerText,
                twos_a: playerStats[i].children[13].innerText,
                twos_pct: playerStats[i].children[14].innerText,
                efg_pct: playerStats[i].children[15].innerText,
                ft: playerStats[i].children[16].innerText,
                fta: playerStats[i].children[17].innerText,
                ft_pct: playerStats[i].children[18].innerText,
                orb: playerStats[i].children[19].innerText,
                drb: playerStats[i].children[20].innerText,
                trb: playerStats[i].children[21].innerText,
                ast: playerStats[i].children[22].innerText,
                stl: playerStats[i].children[23].innerText,
                blk: playerStats[i].children[24].innerText,
                tov: playerStats[i].children[25].innerText,
                pf: playerStats[i].children[26].innerText,
                pts: playerStats[i].children[27].innerText 
            })  
        }
        return playersArray

    })

    console.log(data)

     //save data to JSON file


    fs.writeFile(`C:/Users/jjspo/OneDrive/Desktop/Coding/Projects/NBA Site/data/${year}/${team}/perGame.json`, JSON.stringify(data), (err) => {
        if(err) throw err;
        console.log('file saved')
    })

})();

