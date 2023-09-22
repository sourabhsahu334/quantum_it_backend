const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const Allnews = require('./Modal');
const Singletypenews = require('./Singlemodal');
const cron = require('node-cron');

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
require("./db")
require('dotenv').config();
app.get("/",async(req,res)=>{
  res.json({success:true})
})

const array = [ "latest-news","world","sports","technology","business","movies/bollywood","binge-watch"];

// app.get("/getalldata",async(req,res)=>{
 
// try {
//       await Allnews.deleteMany();
//       await Singletypenews.deleteMany();
//      for ( const item of array){
//       const url = `https://www.indiatoday.in/${item}`; // Replace with the URL you want to scrape
  
//       // Fetch the HTML content of the website
//       const response = await axios.get(url);
  
//       // Log the entire response
  
//       const html = response.data;
  
//       // Load the HTML content into Cheerio
//       const $ = cheerio.load(html);
  
//       // Use Cheerio selectors to extract data
//       const title = $('title').text();
//       const headlines = [];
//       const dataArray = [];
//       const headings=[];
//       const links=[];
//       const nextlinks=[];

  
//     // Use Cheerio to extract data from elements within the ".story__grid" class
//     $('.story__grid .B1S3_story__card__A_fhi').each((index, element) => {
//       // Extract the text content of each element and push it to the dataArray
//       const cardData = $(element).text();
//       dataArray.push(cardData);
//     });
//     $('.story__grid .B1S3_story__card__A_fhi').each((index, cardElement) => {
//       // Extract the heading text within each card
//       const heading = $(cardElement).find('.B1S3_content__wrap__9mSB6 h2').text();

//       // Push an object with the extracted data into the dataArray
//       headings.push({ heading });
//     });
//     $('.story__grid .B1S3_story__card__A_fhi').each((index, cardElement) => {
//       // Extract the heading text within each card
//       const link = $(cardElement).find('.B1S3_story__thumbnail___pFy6 img').attr('src');

//       // Push an object with the extracted data into the dataArray
//       links.push({ link });
//       $('.story__grid .B1S3_story__card__A_fhi').each((index, cardElement) => {
//         // Extract the heading text within each card
//         const link = $(cardElement).find('.B1S3_story__thumbnail___pFy6 a').attr('href');
  
//         // Push an object with the extracted data into the dataArray
//         nextlinks.push({ link });
//       });
//     });
   
//       // Example: Extract headlines from an HTML list
//       $('ul.headlines li').each((index, element) => {
//         headlines.push($(element).text());
//       });
//       let data = [];
//       for (let i = 0; i < dataArray.length; i++) {
   
//         const url2 = `https://www.indiatoday.in/${item}/${nextlinks[i].link}`; // Replace with the URL you want to scrape
    
//         const response2 = await axios.get(url2);
    
//         console.log(response2.data);
    
//         const html2 = response2.data;
    
//         const $2 = cheerio.load(html2);
    
//         const description = $2('.jsx-99cc083358cc2e2d.Story_description__fq_4S.description p').text();
//         const imagelink = $2('.Story_associate__image__bYOH_ img').attr('src');
//         const newobject= {
//           description:description,
//           imagelink:imagelink
//         }
//         const signlenews = await Singletypenews.create({
//           data:newobject,
//           newstype:item
//         })
//         const newData = {
//           heading: headings[i], // Use index 'i' to get corresponding values from arrays
//           content: dataArray[i],
//           image: links[i],
//           nextlinks:nextlinks[i],
//           singlenewid:signlenews._id

//         };
        
//         data.push(newData); // Push the newly created object into the 'data' array
//       }
//       const newsdocument = await Allnews.create({
//         data:data,
//         newstype:item

//       }) 
//      }
//      res.json({success:true})

// } catch (error) {
//   console.log(error);
//   res.json({error:error})
// }
// })

app.post('/data', async (req, res) => {
  const {newstype}=req.body;
    try {
       const data = await Allnews.find({
        newstype:newstype
       })
  
      res.json({ success:true,data });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred while scraping the website.' });
    }
  });


  app.post('/getsinglenewsdata', async (req, res) => {
    const {newsid}=req.body;
  
      try {
        const data= await Singletypenews.findOne({_id:newsid})
        res.json({ success:true,data:data});
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while scraping the website.' });
      }
    });


    cron.schedule('1 * * * *', async () => {
      try {
        console.log("running");
      //   await Allnews.deleteMany();
      //   await Singletypenews.deleteMany();
      //  for ( const item of array){
      //   const url = `https://www.indiatoday.in/${item}`; // Replace with the URL you want to scrape
    
      //   // Fetch the HTML content of the website
      //   const response = await axios.get(url);
    
      //   // Log the entire response
    
      //   const html = response.data;
    
      //   // Load the HTML content into Cheerio
      //   const $ = cheerio.load(html);
    
      //   // Use Cheerio selectors to extract data
      //   const title = $('title').text();
      //   const headlines = [];
      //   const dataArray = [];
      //   const headings=[];
      //   const links=[];
      //   const nextlinks=[];
  
    
      // // Use Cheerio to extract data from elements within the ".story__grid" class
      // $('.story__grid .B1S3_story__card__A_fhi').each((index, element) => {
      //   // Extract the text content of each element and push it to the dataArray
      //   const cardData = $(element).text();
      //   dataArray.push(cardData);
      // });
      // $('.story__grid .B1S3_story__card__A_fhi').each((index, cardElement) => {
      //   // Extract the heading text within each card
      //   const heading = $(cardElement).find('.B1S3_content__wrap__9mSB6 h2').text();
  
      //   // Push an object with the extracted data into the dataArray
      //   headings.push({ heading });
      // });
      // $('.story__grid .B1S3_story__card__A_fhi').each((index, cardElement) => {
      //   // Extract the heading text within each card
      //   const link = $(cardElement).find('.B1S3_story__thumbnail___pFy6 img').attr('src');
  
      //   // Push an object with the extracted data into the dataArray
      //   links.push({ link });
      //   $('.story__grid .B1S3_story__card__A_fhi').each((index, cardElement) => {
      //     // Extract the heading text within each card
      //     const link = $(cardElement).find('.B1S3_story__thumbnail___pFy6 a').attr('href');
    
      //     // Push an object with the extracted data into the dataArray
      //     nextlinks.push({ link });
      //   });
      // });
     
      //   // Example: Extract headlines from an HTML list
      //   $('ul.headlines li').each((index, element) => {
      //     headlines.push($(element).text());
      //   });
      //   let data = [];
      //   for (let i = 0; i < dataArray.length; i++) {
     
      //     const url2 = `https://www.indiatoday.in/${item}/${nextlinks[i].link}`; // Replace with the URL you want to scrape
      
      //     const response2 = await axios.get(url2);
      
      //     console.log(response2.data);
      
      //     const html2 = response2.data;
      
      //     const $2 = cheerio.load(html2);
      
      //     const description = $2('.jsx-99cc083358cc2e2d.Story_description__fq_4S.description p').text();
      //     const imagelink = $2('.Story_associate__image__bYOH_ img').attr('src');
      //     const newobject= {
      //       description:description,
      //       imagelink:imagelink
      //     }
      //     const signlenews = await Singletypenews.create({
      //       data:newobject,
      //       newstype:item
      //     })
      //     const newData = {
      //       heading: headings[i], // Use index 'i' to get corresponding values from arrays
      //       content: dataArray[i],
      //       image: links[i],
      //       nextlinks:nextlinks[i],
      //       singlenewid:signlenews._id
  
      //     };
          
      //     data.push(newData); // Push the newly created object into the 'data' array
      //   }
      //   const newsdocument = await Allnews.create({
      //     data:data,
      //     newstype:item
  
      //   }) 
      //  }
      //  res.json({success:true})
  
  } catch (error) {
    console.log(error);
    res.json({error:error})
  }
    });
    cron.schedule('* * * * *', () => {
      // This function will be executed every minute
      console.log('Task executed at every minute.');
    });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
