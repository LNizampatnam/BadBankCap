function Balance(){

  const {user} = React.useContext(UserContext); 

  return (
    <Card
      bgcolor="info"
      txtcolor="black"
      header="Account Balance"
      body={ (  
        <>
        Hello {user.name}!<br/>
        Your Current Balance :       ${user.balance}<br/>
        </>
      )}
    />   
  )

}

