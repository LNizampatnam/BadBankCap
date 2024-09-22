function CreateAccount(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');
  const {user, setUser} = React.useContext(UserContext); 

  return (
    <Card
      bgcolor="primary"
      header="Create Account"
      status={status}
      body={show ? 
        <CreateForm setStatus={setStatus} setShow={setShow} setUser={setUser} /> : 
        <CreateMsg setShow={setShow} user={user}/>}
    />
  )
}

function CreateMsg(props){
  return(<>
    <h5>Success, {props.user.name}</h5>
  </>);
}

function CreateForm(props){
  const [name, setName]         = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  const [role, setRole] = React.useState('user');

  function validate(field, label){
    if (!field) {
      props.setStatus('Error: ' + label);
      setTimeout(() => props.setStatus(''),3000);
      return (false);
    }
    return true;
  }

  function handle(){
    if (!validate(name,     'name'))     return(alert("Name is required!"));
    if (!validate(email,    'email'))    return(alert("Email is required!"));
    if (!validate(password, 'password')) return(alert("Password is required!"));
    if (password.length < 8) return(alert("Password must have at least 8 characters!"));

    const auth  = firebase.auth();
    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
      });

    const url = `/account/create/${name}/${email}/${password}/${role}`;
    (async () => {
        var res  = await fetch(url);
        var data = await res.json();    
        props.setUser(data);   
    })();
    props.setShow(false);
  }    

  return (<>

    Name<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter name" 
      value={name} 
      onChange={e => setName(e.currentTarget.value)} /><br/>

    Email address<br/>
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

    Role<br/>
    <select className="form-control" value={role} onChange={e => setRole(e.currentTarget.value)} >
      <option value="user">user</option>
      <option value="admin">admin</option>      
    </select><br/>
    <br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>Create Account</button>

  </>);
}