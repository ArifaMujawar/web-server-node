const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req, res) => {
  res.render('index', {
    title:'Weather',
    name: 'Arifa'
  })
})

app.get('/about', (req, res)=>{
res.render('about',{
  title: 'Weather',
  name: 'Arifa'
})
})

app.get('/help', (req,res)=>{
  res.render('help',{
    title: 'Weather',
    message: ' What help would you like?',
    name:'Arifa'
  })
})


app.get('/weather',(req, res)=>{
  if(!req.query.address){
    return res.send({
      error: 'You must provide address'
    })
  }

  geocode(req.query.address, (error, {latitude, longitude, location}={})=>{
    if(error){
      console.log('1')
      return res.send({error})
    }
      forecast(latitude, longitude,(error, forecastData) => {
        if(error){
          console.log('2')
          return res.send({error})
        }
        res.send({
          forecast:forecastData,
          location,
          address:req.query.address
        })
      })
    })

 
})

app.get('/products',(req,res)=>{
  if(!req.query.search){
    return res.send({
      error: 'You must provide a search term'
    })
  }

  console.log(req.query.search)
  res.send({
    products: []
  })
})
app.get('/help/*', (req, res)=>{
  res.render('404-page', {
    title:'Weather',
    message:'Help article not found',
    name:'Arifa'
  })
})

app.get('*', (req, res)=>{
  res.render('404-page',{
    title:'404',
    message:'404 not found',
    name:'Arifa'
  })
})

app.listen(port, ()=>{
  console.log('Server is up and running')
})