function AllData(){
    const [data, setData] = React.useState('');  
    const {user} = React.useContext(UserContext); 
    const users =[] ;

    if (user.role == "admin"){

        React.useEffect(() => {
            
            // fetch all accounts from API
            fetch('/account/all')
                .then(response => response.text())
                .then(text => {
                    try {
                        const data = JSON.parse(text);
                        setData((data));     
                    } catch(err) {
                        console.log('err:', text);
                    }             
                });

        }, []);
     
        for(let i=0; i< data.length; i++){
        let  user= data[i];
        users.push(user);
        }
    } else {
        users.push(user);
    }

    function HandleTransactions({item}){

        return (  
          <tr>
            <td className="tdx">{item.ID}</td>
            <td className="tdx">{item.Type}</td>  
            <td className="tdx">{item.Amount}</td>  
            <td className="tdx">{item.Date}</td>                   
          </tr>        
        );
      }

    function UserCard({user}){
        const trx = user.transactions;
        let len = user.transactions.length;
  
        return(
          <div className="card">
          <div className="card-body">
          <h5>{user.name}'s Information</h5>
    
              <table className="table">
                <tbody>
                  <tr>
                      <td className="text-success font-weight-bold">Name:</td>
                      <td>{user.name}</td>
                  </tr>
                  <tr>
                      <td className="text-success font-weight-bold">Email:</td>
                      <td>{user.email}</td>
                  </tr>
                  <tr>
                      <td className="text-success font-weight-bold">Password:</td>
                      <td>{user.password}</td>
                  </tr>
                  <tr>
                      <td className="text-success font-weight-bold">Balance:</td>
                      <td>{user.balance}</td>
                  </tr>
                  <tr>
                      <td className="text-success font-weight-bold">Role:</td>
                      <td>{user.role}</td>
                  </tr>
    
                </tbody>
              </table>

              <h5>All Transactions</h5>
              <table className="tablex">
                <tr>
                    <th className="thx" align="center">ID</th>
                    <th className="thx" align="center">Type</th>
                    <th className="thx" align="center">Amount ($)</th>
                    <th className="thx" align="center">Date & Time</th>
                </tr>
                {trx.map((item,i) => <HandleTransactions item={item} key={i}/>)}       
              </table>   

          </div>
      </div>
    )
      }

    return (<>
        <h1>Account Holders' Information</h1>
        {users.map((user,i) => <UserCard user={user} key={i}/>)}
    </>);
}
