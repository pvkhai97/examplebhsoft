import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './Post';
import { db, auth } from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';
import ImageUpdate from './ImageUpdate'

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


function App() {
  const [modalStyle] = useState(getModalStyle);
  const classes = useStyles();
  const [posts, setPosts] = useState([]);
  const [openSignIn, setOpenSignIn] = useState(false)

  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [email, setEmail] = useState()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubcribe = auth.onAuthStateChanged(function (authUser) {
      if (authUser) {
        console.log(authUser)
        setUser(authUser);

        if (authUser.displayName) {

        } else {
          return authUser.updateProfile({
            displayName: username,
          })
        }


        // User is signed in.
      } else {
        setUser(null)
        // No user is signed in.
      }
    });
    return () => {
      unsubcribe();
    }
  }, [user, username])

  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })))

    })
  }, [])


  const Signup = (event) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username
        })
      })
      .catch((error) => alert(error.message))

  }

  const SignIn = (event) => {
    event.preventDefault();
    auth.createUserWithEmailAndPassword(email, password)

      .catch((error) => alert(error.message))
    setOpenSignIn(false)

  }
  const onLogout = () => {
    // setUser(null)
    auth.signOut()
  }
  return (
    <div className="App">
      <ImageUpdate />
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <img className="app__headerImage"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt=""

              />
            </center>
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              placeholder="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="password"
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />


            <Button type="submit" onClick={Signup}>Signup </Button>


          </form>
        </div>
      </Modal>
      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <img className="app__headerImage"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt=""

              />
            </center>
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />


            <Button type="submit" onClick={SignIn}>SignIn </Button>


          </form>
        </div>
      </Modal>

      <div className="app__header">
        <img className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""

        />
      </div>
      {user ? (
        <Button onClick={onLogout}>Logout</Button>
      ) : (
          <div className="app__logincontainer">
            <Button onClick={() =>setOpenSignIn(true) }>Sign In</Button>
            <Button onClick={() => setOpen(true)}>Sign up</Button>
          </div>
        )}
      <h1> how to use art to enhance your powers of perception and find connections where they may not be apparent. Learn the techniques Herman uses to train Navy SEALs, doctors and crime scene investigators to convert observable details into actionable knowledge with this insightful talk.
      </h1>
      {posts.map(({ id, post }) => (
        <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
      ))}

    </div>
  );
}

export default App;
