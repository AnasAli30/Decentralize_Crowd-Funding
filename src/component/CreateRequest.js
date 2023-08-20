import React from 'react'

import "./Create.css"

function CreateRequest({state,account}){
    async function CreateRequest(event){
        event.preventDefault();
        const{contract} = state;
        const des = document.querySelector("#Des").value;
        const rec = document.querySelector("#rec").value;
        const value = document.querySelector("#value").value;
        try{
            await contract.methods.CreateRequest(des,rec,value).send({from:account,gas:1000000})
            alert("Created Succesfull")


        }catch(error){
            alert(error)
        }
       

    }
    


  return (
    <form onSubmit={CreateRequest}>
          <label className='label1' htmlFor='Des'>
              <span className='font'>Description:</span>
          </label>
          <input type="text" id='Des'></input><br></br>
          <label className='label1' htmlFor='rec'>
              <span className='font'>Recipient:</span>
          </label>
          <input type="text" id='rec'></input><br></br>
          <label className='label1' htmlFor='value'>
              <span className='font'>value:</span>
          </label>
          <input type="text" id='value'></input>
          <button className="button">Create Request</button>
          </form>)
}

export default CreateRequest;