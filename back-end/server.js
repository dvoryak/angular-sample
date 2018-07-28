import express from 'express';
import cors from  'cors';
import bodyParser from  'body-parser';
import mongoose from 'mongoose';
import Issue from './model/issue'

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/issues');

const connection = mongoose.connection;

connection.once('open', () => {
  console.log("Connection with mongo established successfully")
});

app.get('/', (req, resp) => resp.send("Hello world!"));

app.get('/issues',(req, resp) => {
  Issue.find((err, issues) => {
    if(err) {
      console.log(err);
    } else {
      resp.json(issues);
    }
  })
});

app.get('/issues/:id', (req, resp) => {
  Issue.findById(req.params.id, (err, issue) => {
    console.log('Getting by id:', req.params.id);
    if(err) {
      console.log(err);
    } else {
      resp.json(issue);
    }
  });
});

app.post('/issues', (req, resp) => {
  let issue = new Issue(req.body);
  issue.save()
    .then(issue => {
      resp.status(200).json({'issue' : 'Added successfully'})
    })
    .catch(err => {
      resp.status(400).send("Failed to create new issue")
    })
});

app.put('/issues/:id', (req, resp) => {
  Issue.findById(req.params.id, (err, issue) => {
    if (!issue) {
      return next(new Error('Could not retrieve issue'))
    }
    else {
      issue.title = req.body.title;
      issue.responsible = req.body.responsible;
      issue.description = req.body.description;
      issue.severity = req.body.severity;
      issue.status = req.body.status;

      issue.save().then(issue => {
        resp.status(200).json('Update done');
      }).catch(err => {
        resp.status(400).send("Updated failed");
      });
    }
  });
});

app.delete('/issues/:id', (req, resp) => {
  Issue.findByIdAndDelete(req.params.id, (err, data) => {
    console.log(data);
    if (data) {
      resp.json("Deleted successfully");
    } else {
      resp.json("Error while deleting");
    }
  })
});
//router.route('api/issue/:id').delete()


app.listen("9999", () => console.log("Server runs on port 9999"));
