import React from 'react'

function VoteRequest({state,account}){
    const {contract} = state;
    async function vote(event){
        event.preventDefault();
        const req =document.querySelector("#Request").value;
        try{
            await contract.methods.voteRequest(req).send({from:account,gas:1000000})
            alert("Voted")

        }catch(error){
            alert(error);
        }
    }




  return (
    <div>
        <form onSubmit={vote}>
        <label className='label1' htmlFor='Request'>
            <span className='font'>Request No:</span>
            </label>
        <input type="text" id='Request'></input>
        <button className='button'>Submit</button>
        </form>


    </div>
  )
}

export default VoteRequest;
