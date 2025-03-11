const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { GoogleGenerativeAI } = require("@google/generative-ai")

app.use(bodyParser.json())

app.post('/getResponse', async (req, res) => {
    // console.log(req.body); // Debugging
    console.log(req.body.question); // Expected output
    // res.send("Received"); // Send response to avoid Postman hanging

    
    const genAI = new GoogleGenerativeAI('AIzaSyAwn57KMJaBBStWmFx-AplbrMvo2exsTA0');
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // const prompt = "Explain how AI works";
    // prompt = req.body.question
    
    model.generateContent(req.body.question).then(result=>{
        const response=result.response.text()
        console.log(response);
        res.status(200).json({
            response:response
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
})

app.get('*',(req,res)=>{
    res.status(404).json({
        msg:'bad request'
    })
})

module.exports = app