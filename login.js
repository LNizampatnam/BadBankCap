const { signInWithCredential } = require("firebase/auth/web-extension");
const { default: firebase } = require("firebase/compat/app");

function Login(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState(''); 
  const {user, setUser} = React.useContext(UserContext);   

  return (
    <Card
      bgcolor="warning"
      header="Login"
      status={status}
      body={show ? 
        <LoginForm setUser={setUser} setShow={setShow} setStatus={setStatus} user={user}/> :
        <LoginMsg user={user}/>}
    />
  ) 
}

function LoginMsg(props){
  return(<>
    <h5>Welcome back, {props.user.name}</h5>
  </>);
}

function LoginForm(props){
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');

  function validate(field, label){
    if (!field) {
      props.setStatus('Error: ' + label);
      setTimeout(() => props.setStatus(''),3000);
      return (false);
    }
    return true;
  }

  function handle(){
    if (!validate(email,    'email'))  return(alert("Email is required!"));
    if (!validate(password, 'password')) return(alert("Password is required!"));  

    const auth  = firebase.auth();
    const temp =email.slice(-9);

    if(temp ==='gmail.com') {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
        .then(function(result) {
          // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;        
          // The signed-in user info.
        var userinfo = result.user;
        console.log(`USER: ${JSON.stringify(userinfo)}`);
        })
    } else {
        auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in
          console.log(userCredential);
        })
        .catch((error) => {
          console.log(error);
        });
    }
 
    const url = `/account/login/${email}/${password}`;
    (async () => {
      var res  = await fetch(url);
      var data = await res.json();    
      props.setUser(data);   
    })();
    props.setShow(false);
    props.setStatus('');   
  }    

  return (<>

    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    Password<br/>
    <input type="password" 
      className="form-control" 
      placeholder="Enter password" 
      value={password} 
      onChange={e => setPassword(e.currentTarget.value)}/><br/>

    <button type="submit" className="btn btn-light" onClick={handle}>Login</button> &nbsp; &nbsp; &nbsp;
    <button type="submit" className="btn btn-light" onClick={handle}>Google Login</button> 
  </>);
}