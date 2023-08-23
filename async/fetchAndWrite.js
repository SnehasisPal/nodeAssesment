// I try to fetch url from urls.text file and after that try to implemented this apis on htmlfile  using axios 

const fs = require('fs');
const axios = require('axios');
const path = require('path');
const { promisify } = require('util');

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

async function fetchAndWriteUrls() {
    try {
        const urls = await readFileAsync(path.join(__dirname, '..', 'urls.txt'), 'utf-8');
        // console.log(urls, 'urls')
        const urlList = urls.trim().split('\n');


        // const data ={}
        // const requests = urlList.forEach(async (url) => {
        //     const [key, value] = url.split('-')
        //     data[key.trim()] = value.trim()
        //     console.log(data);
        

        const requests = urlList.map(async (url, index) => {
            console.log(url);
            try {
                const response = await axios.get(url);
                console.log(response, '==>>');
                const htmlContent = response.data;
                console.log(htmlContent, 'htmlContent');
                const jsonString = JSON.stringify(htmlContent)
                const fileName = `page${index + 1}.html`;

                await writeFileAsync(path.join(__dirname, '..', 'public', fileName), jsonString);
                console.log(`Fetched and written ${fileName}`);
            } catch (error) {
                console.error(`Error fetching URL ${url}: ${error.message}`);
            }
        });

        await Promise.all(requests);
        console.log('All pages fetched and written');
    } catch (error) {
        console.error('Error reading the file:', error.message);
    }
}

fetchAndWriteUrls();
