const fs = require('fs');
const puppeteer = require('puppeteer');



(async function(){
    const browser = await puppeteer.launch( { 
        headless: false 
    } );
    const team = "CHO"
    const year = '2022'
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0)
    await page.goto(`https://www.basketball-reference.com/teams/${team}/${year}.html`)
    

    let data = await page.evaluate(() => {
        const playerStats = document.querySelectorAll('#advanced tbody tr');
        const playersArray = []

       for (i=0; i<playerStats.length; i++){
            playersArray.push({
                playerName: playerStats[i].children[1].innerText,
                per: playerStats[i].children[5].innerText,
                ts_pct: playerStats[i].children[6].innerText,
                three_rate: playerStats[i].children[7].innerText,
                ft_rate: playerStats[i].children[8].innerText,
                usg_pct: playerStats[i].children[16].innerText,
                ows: playerStats[i].children[18].innerText,
                dws: playerStats[i].children[19].innerText,
                ws: playerStats[i].children[20].innerText,
                ws_p: playerStats[i].children[21].innerText,
                bpm: playerStats[i].children[25].innerText,
                vorp: playerStats[i].children[26].innerText,
            })   
        }
        return playersArray 

    })

    console.log(data)


    fs.writeFile(`C:/Users/jjspo/OneDrive/Desktop/Coding/Projects/NBA Site/data/${year}/${team}/advanced.json`, JSON.stringify(data), (err) => {
        if(err) throw err;
        console.log('file saved')
    })

})();

