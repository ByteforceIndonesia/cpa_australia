//Express for server
var express = require ('express');
var app = express();

//Socket.io
var http = require('http').createServer(app);
var io = require('socket.io')(http);

//DBs
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/cpa_australia');
var questions = db.get('questions');

// Template Engine
app.set('view engine', 'ejs');

//Files Plugin
var bodyParser = require('body-parser');
var multer = require ('multer');
var fs = require ('fs');

// Question counter
var questionCount = [];

// Scores array for team score
var scores = [];

//Mutlter Upload
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname +'/public/images/uploaded_images')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname)
  }
});
var upload = multer({ storage: storage });

// Make public accessable to public
app.use(express.static('public'));

// For taking arrays and files
app.use(bodyParser.urlencoded ({extended: false}));

//Big screen
app.get('/', function(req, res){
	res.sendFile(__dirname + '/public/html/front.html');
})

//Control
app.get('/controller', function(req, res)
{
	questions.find({}, {sort: {id : 1}}).then((docs) => {
		res.render('controller', {questions: docs});
	});
});

//get input from controller
io.on('connection', function(socket){

	// SplashScreen
	socket.on('splashScreen', function()
	{
		io.emit('splashScreen');
	});

	//Countdown
	socket.on('setTimer', function(data)
	{
		io.emit('setTimer', data);
	});

	// Score
	socket.on('scoreScreen', function()
	{
		io.emit('scoreScreen', scores);
	});
	socket.on('scoreScreen2', function()
	{
		io.emit('scoreScreen2', scores);
	});

	socket.on('scoreScreenTop5', function()
	{
		io.emit('scoreScreenTop5', scores);
	});

	// Question
	socket.on('displayQuestion',function(id){
		// itu idnya di bikin ascending
		questions.find({"id": id}).then((docs) => {
      console.log(docs);
			// Display Question for Client
			io.emit('displayQuestion', docs[0]);

			// Store the displayed Question id
			questionCount[id] = 1;

			// Greyout button on controller
			io.emit('greyOut', questionCount);
		});
	});
	// Question
	socket.on('displayAnswer',function(id){
		// itu idnya di bikin ascending
		questions.find({"id": id}).then((docs) => {

			// Display Answer for Client
			io.emit('displayAnswer', docs[0]);

		});
	});

	// On score change
	socket.on('scoreSet', function(data){
		scores[data[0]-1] += parseInt(data[1]);
		io.emit('scoreScreen', scores);
	});

	// Team correct
	socket.on('teamCorrect', function(data){
		scores[data[0]-1] += parseInt(data[1]);
		var send = [data[0], data[1]];
		io.emit('teamCorrect', send);
	});

	// Team incorrect
	socket.on('teamIncorrect', function(data){
		scores[data[0]-1] += parseInt(data[1]);
		var send = [data[0], data[1]];
		io.emit('teamIncorrect', send);
	});

	// Save state
	socket.on('saveState', function()
	{
		var save = {
			score_data: scores
		};

		var json = JSON.stringify(save);

		fs.writeFile('saved_state.json', json, 'utf8', function(err){
				console.log("Error saving file");
				console.log(err);
			});
	});

	// FreezeTimer
	socket.on('FreezeTimer', function(){
		io.emit('FreezeTimer');
	});
});


//Add Question
app.get('/add_question', function(req, res){
	res.sendFile(__dirname + '/public/html/add_question.html');
})

// Question
app.post('/process_post', upload.fields([{name:'question_image', maxCount: 1}, {name:'answer_image', maxCount: 1}]) ,function (req, res, next)
{
	var answers = req.body['answers'];
	var count=0;
	var flag = 0;

	// auto increment
	questions.find({}, 'id', function(e, docs){

		if(!docs)
		{
			flag = 0;
		}else
		{
			flag = (docs.reverse()[0].id) + 1;
		}

		var response = {
			id: flag,
			question: req.body.question,
			qimageCheck: req.body.question_image_check,
			aimageCheck: req.body.answer_image_check
		}

		response.imageQues = '../images/uploaded_images/ques_' + response.id;
		response.imageAns = '../images/uploaded_images/ans_' + response.id;

		//Insert Answers
		if (Array.isArray(answers))
		{
			answers.forEach(function(ans)
			{
				count++;
				response['answer_' + count] = ans;
			});
		}

		//Move uploaded file
		fs.rename(__dirname + '/public/images/uploaded_images/answer_image', __dirname + '/public/images/uploaded_images/ans_' + response.id, function(err){
		    if (err)
	    	console.log(err);
		});

		fs.rename(__dirname + '/public/images/uploaded_images/question_image', __dirname + '/public/images/uploaded_images/ques_' + response.id, function(err){
		    if (err)
	    	console.log(err);
		});

		// put into database
		if(questions.insert(response))
		{
			console.log('Successfully posted a question');
		}

		res.send(response);
   	});
});


// setup system (nanti kasih html buat orang setup)
app.get('/setup_system',function(req, res){

	// Get all the question in db
	questions.find({}, {sort: {id : 1}}).then((docs) => {

		for(var i=0; i<20; i++)
		{
			scores[i] = 0;
		}

		for(var i=0; i<docs.length; i++)
		{
			questionCount[i] = 0;
		}

		//Broadcast
		io.on('connection', function(socket){
			socket.emit('setupScore', scores);
		});
		
		res.send('Setup Success! You will be redirected shortly');
		res.redirect('http://localhost:3000/controller');
	});
});

// Load state
app.get('/load', function(req, res)
{
	fs.readFile('saved_state.json', 'utf8', function readFileCallback(err, data){
	    if (err){
	        console.log(err);
	    } else {
	    obj = JSON.parse(data); //now it an object
	    
	    var score_data = obj.score_data;

	    for(var i = 0; i < score_data.length; i++ )
	    {
	    	scores[i] = score_data[i];
	    }

	}});

	res.send('Loaded')
});

// reset question counter
app.get('/reset_system', function(req, res){

	questionCount = 0;
	scores = [];

	res.send('System reseted!');
});

// get question
app.get('/questions', function(req, res){
	questions.find({}, function(e, docs){
		res.send(docs);
	});
});

//Delete questions
app.get('/dropdb', function(req, res)
{
	questions.drop();
	res.send("Database wiped");
});

//On port?
http.listen(3000, function(){
  console.log('listening on *:3000');
});
