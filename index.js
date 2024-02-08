import express, { json } from 'express';
import fs, { readFileSync, readdirSync } from 'fs';
const app = express();
const PORT = 8000;
import path from 'path'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get('/',(req,res)=>{
    res.status(200).send(
        `<html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <style>
                div>h1{
                  color: red;
                  text-shadow: 1px 1px 1px black;
                  text-align: center;
                }
                div>a>button{
                    background-color: lawngreen;
                    color: white;
                    font-weight: 900;
                    border-radius: 5px;
                    padding: 8px;
                    text-shadow: 1px 1px 1px black;
                }
                div>div{
                    display: flex;
                    justify-content: center;
                    gap: 30px;
                    
                }
            </style>
        </head>
        
        <body>
            <div>
                <h1>Hai!!! Iam Saran ... Welcome To My Page... 😀</h1>
                <div>
                <a href="/time"><button>Get Time Stamp</button></a> 
                <a href="/retrieve"><button>Get Retrieve</button></a>
                </div>
            </div>
        </body>
        </html>
        `)
})



// 1. write API end point which will create a text file in a particular folder.
//              a)content of the file should be the current timestamp.
//              b)The filename should be current date-time.txt

app.get('/time',(req,res)=>{
    try{
        let fileFolder = path.join(__dirname,"/fileFolder/date-time.txt");
        if(!fs.existsSync(path.join(__dirname,"/fileFolder"))){
           fs.mkdirSync(path.join(__dirname,"/fileFolder")) 
        }
        let timeStamp = new Date().toLocaleString()
        fs.writeFileSync(fileFolder,`Last Created timeStamp is ${timeStamp}`)
        res.status(200).send({
            message:"File Created Successfully",
            timeStamp
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            message:"Error Occured in Creating a file "
        })
    }
    
})

// 2) write API endpoint to retrieve all the text files in that particular folder.

app.get('/retrieve' , (req,res)=>{
    try {
        const folderPath = path.join(__dirname,'/fileFolder');
        const files = readdirSync(folderPath).filter(file=>file.endsWith('.txt'));
        const fileContent = files.map(file=>{
            const filePath = path.join(folderPath,file)
            return{
                fileName : file,
                content : readFileSync(filePath,'utf-8')
            }
        });
         res.json(fileContent)
        
    } catch (error) {
        res.status(500).send({
            message:"Error Occured in Creating a file "
        })  
    }
})





app.listen(PORT , ()=>console.log(`App is Listening ${PORT}`))