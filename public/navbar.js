function NavBar(){
  return(

    <nav className="navbar navbar-expand-lg navbar-light bg-primary">
      <a className="navbar-brand" href="#">BadBank</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        
        <ul className="navbar-nav">
          <li className="nav-item" >
            <Link className="nav-link active" to="/CreateAccount/">Create Account</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login/">Login</Link>
          </li>    
  
        </ul>
      </div>
    </nav>

  );
}