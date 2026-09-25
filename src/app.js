import chalk from 'chalk';
import express from 'express';
import fs from 'fs';
import path from 'path';

console.log(chalk.blue('Ready'));


const app = express(); 

const nav = '<p><a href="/">Home </a><a href="/page2">page 2</a></p>';

app.get('', (request,response) => {

    console.log(`Request URL:${chalk.green(request.url)}`);
    response.send(`<h1>Hello from Node and Express!!!</h1>${nav}`);
});

app.get('/page2',(req,res) => {
    console.log(`Request URL: ${chalk.green(req.url)}`);
    res.send('<h1>Page 2</h1><p><a href="/">Home</a></p>');
});

app.get('/student/:firstname/:lastname',(req,res)=>{
    let studentFirstName = req.params.firstname;
    let studentLastName = req.params.lastname;
    let html = `<h2>The studnet first name ${studentFirstName} last name ${studentLastName}</h2>`;
    res.send(html);
});

app.get('/stundet',(req,res) =>{
    let studentFirstName = req.query.firstname;
    let studentLastName = req.query.lastname;
    let html = `<h2>The studnet first name ${studentFirstName} last name ${studentLastName}</h2>`;
    res.send(html);
});

app.get('/vehicles',(req,res) => {
    let html = `${nav}<h1>Available Vehicles</h1>`;

    const vehicles = getVehicleData();

  
    for(let v of vehicles){
        
        
        html += '<div>';
        html += `<a href = "/vehicle/${v.id}">${v.make} ${v.model}</a>`
        html += '</div>';
        
    }

    res.send(html);
});

app.get('/vehicle/:id',(req,res)=>{
    let html = '';
    const id =parseInt(req.params.id);

    if(!isNaN(id)){
        const vehicles = getVehicleData();
        const vehicle = vehicles.find(v => v.id === id);

        if (!!vehicle){
            html += `<h2>${vehicle.make} ${vehicle.model}</h2>`;
            html += `<div>
                The ${vehicle.make} ${vehicle.model} will ${vehicle.description}
                </div>
                <div>
                <img src="${vehicle.img}" style="width:400px;" />
                </div>
                <dic><a href="/vehicles">Back to vehicles</a></div>
            `;
        }else{
            html +='<h2 style="color:red;">vehicle not found</h2>'
        }
    }else{
        html += '<h2 style="color:red;">Vehicle id is invalid</h2>';
    }
    res.send(html);

})

app.get('{*splat}',(req,res)=> {
    let html = '<h1>Page not found</h1>';
    res.status(404).send(html);
});

function getVehicleData(){
    try{
        const vehicleDataPath = path.join('data','store','vehicles.json');
        const vehicleData = fs.readFileSync(vehicleDataPath);
        const vehicles = JSON.parse(vehicleData);
        
        return vehicles; 

    }catch(error){
        console.log(chalk.red(error.message));
        return[]
;    }
}

app.listen(5000, () => {

    console.log(chalk.yellow('Server is running and listen at http://localhost:5000'));
});

