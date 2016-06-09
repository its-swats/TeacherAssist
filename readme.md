# Teacher Assistant
Teacher Assistant allows students to request help from their teachers through a web browser or phone. Ideal for situations where a student may not want to raise their hand to ask for help, or situations where students are not in viewing distance of their teacher. 

## How does it work?
TA functions in real time thanks to ```Sockets```, ```rethinkDB```, and ```React```. The server opens a socket with all connected users - namespaced to either ```teacher``` or ```student```. Communication is done by emitting events to the appropriate users. 

When a student requests help, they emit an event with their ID. The server will then take that users ID, find it in the database, and flag it as needing help. This will fire an event in the ```RethinkDB changefeed``` - the server will pick up on the change event, and will push out the user's information to the teacher dashboard. Once the teacher dashboard receives the event, the data is updated in the React state, which causes the screen to re-render with the new help request.

Authentication is done using Github OAuth and JWTs. The authentication goes through ```passport-github2```, while JWTs are handled using ```simple-jwt```. Tokens are stored in the user's local storage, and are passed back to the server whenever a client emits an event. 

## Project Status - June 8, 2016
The backend is is fully functional. Both users and teachers can register to submit and resolve help requests. The frontend is a work in progress, and while functional, will be significantly changed. 


## Planned Updates
* Full overhaul of the frontend UI and workflow.
* Student and Teacher metrics.
* Authentication systems besides github - FB, Google, and classic local signup.
* Allow teachers to send out messages to their class. 
* A plugin system to allow teachers to choose which features they want to use.


## Installation
Installation is simple - install ```rethinkdb```, run ```npm install```, and create a ```secret.js``` file.

```
~> brew install rethinkdb
~> npm install
~> rethinkdb
```

In the root directory, create a file called ```secret.js``` and fill in the following information:

```
var githubId = GITHUB_SECRET_HERE
var jwtKey = JWT_SECRET_HERE

module.exports.githubId = githubId;
module.exports.jwtKey = jwtKey;
```

Finally, launch the server using

```
~> node server.js
```

## Usage
Teachers and Students both enter through the same entry point. If not logged in, users will be prompted to create an account through Github OAuth. Once an account is created, it will be defaulted to a **student** account. 

Teachers need to be manually set through the RethinkDB commandline using:

```
r.table('users').get(<USER_ID>).update({assignment: 'teacher'})
```

Once a user has logged in, they will be brought to either the Teacher or Student dashboard. Students can flag and unflag themselves as needing help, while teachers can view a realtime feed of students that have flagged themselves as needing help. Once a teacher has assisted a student, they can mark that student's request as resolved. 