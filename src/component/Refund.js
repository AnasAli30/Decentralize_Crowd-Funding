import React from 'react'

function Refund({state,account}){
    const{contract}=state;
    async function refund(event){
        event.preventDefault();
        try{
        await contract.methods.refund().send({from:account,gas:1000000})
        alert("Refund Success")
        }catch(error){
            alert(error)
        }
    }

  return (
    <div><button className='button' onClick={refund}>
        Refund</button></div>
  )
}

export default Refund;
