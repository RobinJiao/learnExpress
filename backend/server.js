const express = require('express')
const { eventNames } = require('process')
const app=express()

//Pseudo data
const users=[
    {name: 'Aaron', age:30},
    {name: 'Robin', age:40},
    {name:'Kelvin', age:22}
]
const posts=[{title:'my first post '},{title:'my favorite games'},{title:'i like play game'}]

//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use((req,res,next)=>{
    console.log(req.method, ' --- ',req.url)
    next()
})

//routes
app.get('/',(req, res)=>{
    // res.status(200).send('Hello world')
    res.status(200).send({msg:'Hello World',user: {}})
    //{"msg":"Hello World","user":{}} json format on browser
})

app.get('/users',(req, res)=>{
    res.status(200).send(users)
})
app.get('/users/:name',(req, res)=>{
    const {name} =req.params
    const user=users.find((user)=>user.name===name)
    if (user) res.status(200).send(user)
    else res.status(404).send('User Not Found !')
})
// app.get('/posts',(req,res)=>{
//     res.send(posts)
// })
app.get('/posts', (req,res)=>{
    const {title}=req.query   // /posts?title=game
    if (title) {
        const post=posts.filter((post)=>post.title.includes(title))
        if (post) res.status(200).send(post)
        else res.status(404).send('Not found')
    } else res.send(posts)
})
app.post('/users', (req,res)=>{
    const user=req.body
    if (user) {users.push(user)}
    res.status(200).send('Created the user')
})

app.post('/posts', (req,res)=>{
    console.log(req.headers)
    const post=req.body
    if (post) {
        posts.push(post)
        res.send(post)
    } else res.status(400)

})

app.listen(4000, ()=>{
    console.log('Server is running on port 4000 ...')
})