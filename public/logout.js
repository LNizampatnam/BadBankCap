function Logout(){
  const {user, setUser} = React.useContext(UserContext);  
  const [show, setShow]     = React.useState(true);

  return (
    <Card
      bgcolor="warning"
      header="Logout"
      body={show ? 
        <LogoutForm setUser={setUser} user={user} setShow={setShow}/>:
        <h5>Logout Success</h5> }
    />
  ) 
}

function LogoutForm(props){

    function handle(){
        props.setUser('');
        props.setShow(false);
    }    

  return(<>
    <h5>Logout, {props.user.name}?</h5>
    <button type="submit" className="btn btn-light" onClick={handle}>Logout</button>
  </>);
}

