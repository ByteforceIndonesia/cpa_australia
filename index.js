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

//Files Plugin
var bodyParser = require('body-parser');
var multer = require ('multer');
var fs = require ('fs');

//Mutlter Upload
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname +'/temp/uploaded_images')
  },
  filename: function (req, file, cb) {
    cb(null, 'uploaded')
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
	res.sendFile(__dirname + '/public/html/back.html');
})

//get input from controller
io.on('connection', function(socket){
	
	// SplashScreen
	socket.on('splashScreen', function()
	{
		io.emit('splashScreen');
	});

	// Score
	socket.on('scoreScreen', function()
	{
		io.emit('scoreScreen');
	});

	// Question
	socket.on('displayQuestion',function(){
		questions.find({"id": 1},'question').then((docs) => {
			io.emit('displayQuestion', docs[0].question);
		});
	});
});


//Add Question
app.get('/add_question', function(req, res){
	res.sendFile(__dirname + '/public/html/add_question.html');
})

// Question
app.post('/process_post', upload.single('question_image') ,function (req, res, next)
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
			question: req.body.question
		}

		response.image = '/temp/uploaded_images/' + response.id;

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
		fs.rename(__dirname + '/temp/uploaded_images/uploaded', __dirname + '/temp/uploaded_images/' + response.id, function(err){
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