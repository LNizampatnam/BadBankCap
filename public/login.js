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

    <button type="submit" className="btn btn-light" onClick={handle}>Login</button>
   
  </>);
}