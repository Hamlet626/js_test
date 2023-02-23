const fs = require('fs');
const mammoth = require('mammoth');
const DocxParser = require('docx-parser');
const cheerio = require('cheerio');

const processDocx=()=>{
    mammoth.convertToHtml({path: 'example.docx'})
        .then((result) => {
            const html = result.value;
            const $ = cheerio.load(html);
            const paragraphs = [];
            const sectionTitles = [];

            $('p').each((i, element) => {
                paragraphs.push($(element).text());
            });

            $('strong, em').each((i, element) => {
                sectionTitles.push($(element).text());
            });

            $('h1, h2, h3, h4, h5, h6').each((i, element) => {
                sectionTitles.push($(element).text());
            });

            $('li').each((i, element) => {
                paragraphs.push($(element).text());
            });

            console.log('Paragraphs:', paragraphs);
            console.log('Section Titles:', sectionTitles);
        })
        .done();

    // DocxParser.parseDocx('example.docx', function(data) {
    //     const fontInfo = data[0].document.fonts;
    //     const paragraphStructure = data[0].document.paragraphs;
    //     console.log(fontInfo);
    //     console.log(paragraphStructure);
    // });
}

const processJSON=()=>{
    let rawdata = fs.readFileSync('./app_en.json');
    let student = JSON.parse(rawdata);
    console.log(student);
    student=Object.fromEntries(Object.entries(student).
    filter(([key, val]) => !key.includes("@")&&!val.includes("{")));
    fs.writeFileSync("./output.json", JSON.stringify(student,null,2));
}

processDocx();
// console.log(encodeURIComponent(JSON.stringify({"cs":"sSpcVAzKvgk4epr2WtB0",
//     "ts":"anPzV9KGBGZ4XujjnT4r","av":null})).length)