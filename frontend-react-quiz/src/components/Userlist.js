import React from "react";
import { NavLink } from "react-router-dom";



class Userlist extends React.Component {
  constructor() {
    super();
    this.state = {
      userdata: {},
    };
  }

  componentDidMount() {
    fetch("http://127.0.0.1:8000/api/books/")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data[0])

       
           
                this.setState({
          userdata:data
        })
       
    })
   

  }
 

  render() {
   
    return (
      <div id="seach_for_train" style={{ height: "600px" }}>
        {Object.keys(this.state.userdata).length === 0 ? (
          <p>Loading...</p>
        ) : (
          <center>
            <table style={{ borderCollapse: "collapse", border: "2px solid black" }}>
              <thead>
                <tr>
                  <th style={{ border: "2px solid black" }}>Name</th>
                  <th style={{ border: "2px solid black" }}>Author Name</th>
                  <th style={{ border: "2px solid black" }}>No of pages</th>
                </tr>
              </thead>
              <tbody>
              {this.state.userdata.map(item => (
        
                <tr>
                  <td style={{ border: "2px solid black" }}>{item.name}</td>
                  <td style={{ border: "2px solid black" }}>{item.author_name}</td>
                 
                  <td style={{ border: "2px solid black" }}>{item.author_name}</td>
                </tr>
              ))}
              </tbody>
            </table>
          </center>
        )}
      </div>

    
    );
  }
}


export default Userlist;
