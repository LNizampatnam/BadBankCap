function GoogleLogin(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState(''); 
  const {user, setUser} = React.useContext(UserContext);   
  console.log("google sign in clicked");

  return (
    <Card
      bgcolor="warning"
      header="Google Login"
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
    const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        console.log(token);
        // The signed-in user info.
        const userinfo = result.user;
        console.log(userinfo);
      // IdP data available using getAdditionalUserInfo(result)
      // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });

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

    <button type="submit" className="btn btn-light" onClick={handle}>Google Login</button>
   
  </>);
}