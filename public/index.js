function Spa() {
  const[user, setUser] = React.useState({});

  const isEmpty = (user => {return Object.keys(user).length ===0});

  return (
    <HashRouter>
      <div>
        <UserContext.Provider value={{user, setUser}}>         
          {isEmpty(user) ? <NavBar/>: <UserNavBar/>}    
        </UserContext.Provider> 

        <div className="container" style={{padding: "20px"}}>
          <Route path="/" exact component={Home} />
          <UserContext.Provider value={{user, setUser}}> 
            <Route path="/CreateAccount/" component={CreateAccount} />
            <Route path="/login/" component={Login} />
            <Route path="/deposit/" component={Deposit} />
            <Route path="/withdraw/" component={Withdraw} />
            <Route path="/balance/" component={Balance} />
            <Route path="/alldata/" component={AllData} />
            <Route path="/logout/" component={Logout} />
          </UserContext.Provider> 
        </div>

      </div>
    </HashRouter>
  );
}

ReactDOM.render(
  <Spa/>,
  document.getElementById('root')
);
