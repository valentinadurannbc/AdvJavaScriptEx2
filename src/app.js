import chalk from 'chalk';
import express from 'express';

console.log(chalk.blue('Ready'));


const app = express(); 

app.get('', (request,response) => {

    console.log(`Request URL:${chalk.green(request.url)}`);
    response.send('<h1>Hello from Node and Express!!!</h1>');
});

app.get('/page2',(req,res) => {
    console.log(`Request URL: ${chalk.green(req.url)}`);
    res.send('<h1>Page 2</h1><p><a href="/">Home</a></p>');
});

app.listen(5000, () => {

    console.log(chalk.yellow('Server is running and listen at http://localhost:5000'));
});

