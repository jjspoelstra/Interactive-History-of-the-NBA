# Interactive-History-of-the-NBA
This project showcases a year-by-year history of the NBA. I set out to create a site that takes some of the statistical power of a site like basketball refernce, and combines it with a visual context, rather that lines and lines of data. Too often, information is spread across multiple locations and it is hard to paint a full picture. 

<img src="https://github.com/jjspoelstra/jjspoelstra/raw/main/images/gifNBA.gif" />


# How It's Made:
Tech used: HTML, CSS, JavaScript, Node, Express, Puppeteer

My learning was focused on scraping data to create my database of player, team, and league information. After that, there has been simple implementation of JS and CSS to create the bracket and interactive capabilities. 

# Optimizations
So far, there is a simple interface. As I continue, the website will contain pages for each season of the league. Currently working on optimizations to avoid hard-coding any team data into the DOM. 
I would like to transition the data for use as an API. 
Media queries need to be optimized, so that mobile users will have an enjoyable experience using the website as well. 

# Lessons Learned:
Scraping capabilities and how finnicky and inconsistent the websites can be in terms of where data is kept. It is not always uniform, so we have to find ways to work around this inconsistency. 

Realized that, for certain elements, creating a CSS hover state is simpler and more concise than adding an event listener to each individual element. 



