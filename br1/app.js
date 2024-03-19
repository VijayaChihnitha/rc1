import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import multer from 'multer';
// import signupform from './modules/signupform.js';

const app = express();
app.use(bodyParser.json())
app.use('/images',express.static('public/images'))



app.use(cors())
app.use(express.json())
import user from './modules/user.js';
import food from './modules/food.js';
import login from './modules/login.js';
import checkout from './modules/checkout.js';
// import cart from './modules/cart.js';

mongoose.connect("mongodb+srv://kaduputlamanu:2eZHJWK3X8iE188M@cluster0.t391zrw.mongodb.net/DriveReady?retryWrites=true&w=majority&appName=cluster0")

.then(()=>app.listen(9000))
.then(()=>
    console.log("Connected to Database & Listining to localhost 9000")
)

// app.post('/addfood',(req,res,next)=>{
       
//     console.log(req.body)
//     const{productpic,title,price}=req.body
//     const z=new form({
       
//         productpic,
//         title,
//         price
        
        
//     })
//     z.save();
// })

app.post('/addlogin',(req,res,next)=>{

    //console.log(req.body.loginform)
    const{email,password}=req.body.loginform
    const user=new login({
       email,
       password
        
    })
    user.save();
    return res.status(200).json(user)
})
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const e = await login.findOne({ email, password });
    if (e) {
      
      res.status(200).send(e.username)
      
    } else {
      res.status(401).send('Invalid credentials');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post('/adduser',(req,res,next)=>{
       
    console.log(req.body.registerforms)
    const{username,email,password,location}=req.body.registerforms
    const use=new user({
        username,
        email,
        password,
        location
        
    })
    // stud.save()//for saving data into database

    
        use.save();

})
app.post('/checkUser', async (req, res) => {
    const { email, username } = req.body;
  
    try {
      // Check if a user with the same email or username already exists
      const existingUser = await user.findOne({ $or: [{ email }, { username }] });
  
      if (existingUser) {
        // User with the same email or username already exists
        res.json({ exists: true });
      } else {
        // User doesn't exist
        res.json({ exists: false });
      }
    } catch (error) {
      // Handle database query error
      console.error('Database query error:', error);
      res.status(500).json({ exists: false, error: 'Database error' });
    }
  });



  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
 
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, Date.now()+ '-' +file.originalname)
    }
  })
  const upload = multer({ storage: storage })

  app.post('/addfood',upload.single("myfile"),async(req,res,next)=>{
    const profilepic=(req.file)?req.file.filename:null
    // res.send{message:"success"}
    // console.log(req.body)
    // res.send("success")
    // const{name,rollno,college,branch}=req.body;
    // const stud=new student({
    //     name,
    //     rollno,
    //     college,
    //     branch
    // })
    // stud.save()
    // return res.status(201).json({stud})
    console.log(req.body)
    const{title,price}=req.body
    const f=new food({
      profilepic,
      title,
      price
    })
    // stud.save()//for saving data into database
    try{
        f.save()
    }catch(err){
        console.log(err)
    }
    return res.send({msg:"inserted",result:f})//for displaying mesg in frontend
        
})
app.get('/getfood',async(req,res,next)=>{
  let formdata; 
  try{
      formdata=await food.find();
  }catch(err){
      console.log(err);
  }
  if(!formdata){

      return res.status(404).json({message:"no student found."})

  }
  return res.status(200).json(formdata)
})



app.post('/addcheckout', (req, res) => {
      console.log(req.body.billingForm); // Form data from frontend
      // Assuming you have a "checkout" model/schema defined
      const {firstName,lastName,email,address,address2,TotalPrice,zip,nameoncard,creditcardnumber,expiration,cvv} = req.body.billingForm
      const checkoutData = new checkout({
          firstName,
          lastName,
          email,
          address,
          address2,
          TotalPrice,
          zip,
          nameoncard,
          creditcardnumber,
          expiration,
          cvv,
      });
      checkoutData.save();
  })
  app.get('/getcheckout',async(req,res,next)=>{
    let billingForm
    try{
        billingForm =await checkout.find()
    }
    catch(err){
        console.log(err)
    }
    if(!billingForm){
        console.log("no reservation details found");
    }
    return res.status(200).json({billingForm})
})


  
