import React from 'react'
import { useState,useEffect } from "react";

function ShowRequest({state}){
    const[list,setList] = useState([]);
    const{contract} = state;
    async function showRequest(event){
        event.preventDefault();
        const show = document.querySelector("#show").value;
        const list = await contract.methods.requests(show).call();
        console.log(list)
        setList(list);
        
    }


  return (
    <><div><form onSubmit={showRequest}>
          <label htmlFor='show'>Show:</label>
          <input type="text" id='show'></input>
          <button>Show</button>
      </form></div>
      <div className="list">
              <h3>Requests List</h3>

              <table border={1}>
                  <tbody>
                      <tr>
                          <td>description</td>
                          <td>noOfVoters</td>
                          <td>recipient</td>
                          <td>value</td>
                          <td>completed</td>
                      </tr>
                    
                      
                  <tr>
               <td>{list.description}</td>
               <td>{list.noOfVoters}</td>
               <td>{list.recipient}</td>
               <td>{list.value}</td>
               <td>{list.completed}</td>
               </tr>


                    
                      
                  </tbody>
              </table>

          </div></>


  )
}


export default ShowRequest;