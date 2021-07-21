let express = require('express')
require('dotenv').config()
let expressSession = require('express-session')
let connectFlash = require('connect-flash')
let mongoose = require('mongoose')
// let MongoStore = require('connect-mongo')(expressSession)
// let passport = require('passport')
let { APPNAME, PORT, dbhost, dbport, dbname, sessionsecret, domain, owner_mat_no, owner_name} = require('./config') 

// routes
const { LoginRouter, DoctorRouter, PatientRouter, UserRouter, DiagnosisRouter, DrugRouter, PrescriptionRouter } = require('./routes')

// models
const DoctorModel = require('./models/doctor')
const DiagnosisModel = require('./models/diagnosis')
const PrescriptionModel = require('./models/prescription')
const PatientModel = require('./models/patient')
const UserModel = require('./models/user')

const PatientController = require('./controllers/patient')

const DoctorController = require('./controllers/doctor')

// connect to mongodb database
// mongoose.connect(`mongodb://${dbhost}:${dbport}/${dbname}`)

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.qmunc.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`

try {
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  console.log('connected to ' + process.env.DB_NAME + ' database.')
} catch (error) {
  console.log('Error connecting to ' + process.env.DB_NAME + ' database.')
  console.log(error)
}

// init express App
let app = express()

// view engine 
app.set('view engine', 'ejs')
app.set('views', './views')

// expressStatic
app.use(express.static(__dirname + '/public'))

// bodyparser middlewares
app.use(express.json())
app.use(express.urlencoded())
// express-session middleware
app.use(expressSession({
  secret: sessionsecret,
  saveUninitialized: true,
  resave: true,
  // store: new MongoStore({
  //   mongooseConnection: mongoose.connection,
  //   ttl: 14 * 24 * 60 * 60
  // })
}))
// passport middleware
// app.use(passport.initialize())
// app.use(passport.session())
// connect-flash
app.use(connectFlash())

app.use((req, res, next) => {
  // res.locals.errors = req.flash('errors')
  // res.locals.error_msg = req.flash('error_msg')
  // res.locals.success_msg = req.flash('success_msg')
  res.locals.user = req.session.user || { username: 'test' }
  app.locals.owner_name = owner_name
  app.locals.owner_mat_no = owner_mat_no
  app.locals.appname = APPNAME
  app.locals.port = PORT
  app.locals.domain = domain + ':' + PORT
  next()
})

// routes

app.use('/login', LoginRouter)

app.use('/', (req, res, next) => {
  // for authenticating login
  if (req.session.loggedIn) {
    next()
  } else {
    res.redirect('/login')
  }
})

app.get('/logout', (req, res) => {
  req.session.loggedIn = false
  req.session.username = ''
  res.redirect('/login')
})

let getDashboard = async (req, res) => {
  try {
    let doctor_count = await DoctorModel.count()
    let patient_count = await PatientModel.count()
    let user_count = await UserModel.count()
    let diagnosis_count = await DiagnosisModel.count()
    let prescription_count = await PrescriptionModel.count()

    res.render('dashboard', {doctor_count, prescription_count, diagnosis_count, patient_count, user_count})
  } catch (err) {
    console.log(err)
    res.render('dashboard', {
      doctor_count: 0, prescription_count: 0, diagnosis_count: 0, patient_count: 0, user_count: 0,
    })
  }
}

app.get('/', getDashboard)

app.get('/dashboard', getDashboard)

app.use('/patients', PatientRouter)

app.use('/doctors', DoctorRouter)

app.use('/drugs', DrugRouter)

app.use('/prescriptions', PrescriptionRouter)

app.use('/diagnosis', DiagnosisRouter)

app.use('/users', UserRouter)

app.get('/api/patients/:patient_reg_no', PatientController.getOneByRegNoAPI)

app.get('/api/doctors/:doctor_username', DoctorController.getDoctorByUsernameAPI)

app.listen(process.env.PORT, () => { console.log(`${APPNAME} running on port ${process.env.PORT}`) })