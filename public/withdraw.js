function Withdraw(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  
  const {user, setUser} = React.useContext(UserContext); 

  return (
    <Card
      bgcolor="success"
      header="Withdraw"
      status={status}
      body={show ?  (
        <>
          Current Balance :       ${user.balance}<br/>
        <WithdrawForm user={user} setShow={setShow} setStatus={setStatus} setUser={setUser}/>         
        </>) :
        <WithdrawMsg setShow={setShow} setStatus={setStatus}/>}
    />
  )
}

function WithdrawMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => {
        props.setShow(true);
        props.setStatus('');
      }}>
        Withdraw again
    </button>
  </>);
}

function WithdrawForm(props){
  const [amount, setAmount] = React.useState('');

  function handle(){
    fetch(`/account/update/${props.user.email}/-${amount}`)
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            props.setStatus('');
            props.setShow(false);
            props.setUser(data.value);
            console.log('JSON:', data);
        } catch(err) {
            props.setStatus('Deposit failed')
            console.log('err:', text);
        }
    });

    let id = props.user.transactions.length+1;
    let type = "withdraw";
    let date = new Date().toISOString();
        fetch(`/account/findOneAndUpdate/${props.user.email}/${id}/${type}/${amount}/${date}`)
        .then(response => response.text())
        .then(text => {
            try {
                const data = JSON.parse(text);
                props.setStatus('');
                props.setShow(false);
                props.setUser(data.value);
            } catch(err) {
                props.setStatus('Withdraw failed')
                console.log('err:', text);
            }
        });    
  }


  return(<>

    Amount<br/>
    <input type="number" 
      className="form-control" 
      placeholder="Enter amount" 
      value={amount} 
      onChange={e => setAmount(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>
        Withdraw
    </button>

  </>);
}
