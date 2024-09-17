function UserNavBar(){
  const {user} = React.useContext(UserContext);   
  return(

    <nav className="navbar navbar-expand-lg navbar-light bg-primary">
      <a className="navbar-brand" href="#">BadBank</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/deposit/">Deposit</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/withdraw/">Withdraw</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/balance/">Balance</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/alldata/">AllData</Link>
          </li>  
        </ul>
        <span className="navbar-text ml-auto font-weight-bold">
          {user.name}
        </span> 
        <ul className="navbar-nav"> 
          <li className="nav-item ml-auto">
            <Link className="nav-link" to="/logout/">Logout</Link>
          </li>   
        </ul>      
      </div>
    </nav>

  );
}