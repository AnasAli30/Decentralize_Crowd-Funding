import React from 'react'

function Contribute({state,account}){
    async function sendEth(event){
        event.preventDefault();
        const{contract} = state;
        const wei = document.querySelector("#Send").value;
        try{
        await contract.methods.sendEth().send({from:account,value:wei,gas:1000000})
        alert("Contribution done")
        }catch(error){
            alert(error);
        }

    }

    
  return (
    <div>
        <form onSubmit={sendEth}>
        <label className='label1' htmlFor='Send'> <span className='font'>Wei Value:</span></label>
        <input type="text" id='Send' placeholder="Min 100"></input>
        <button className='button'>Contribute</button>
        </form>

    </div>
  )
}

export default Contribute;
