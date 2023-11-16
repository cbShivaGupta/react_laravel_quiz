import React from "react";
import { NavLink } from "react-router-dom";
class Contact extends React.Component
{
    constructor(){
        super()
        this.state={
            fname:'',
            lname:'',
            email:'',
            gender:'',
            birthyear:'',
            query:''
        }
this.handle=this.handle.bind(this)
    }
    handle(event){
        this.setState({[event.target.name]:event.target.value})
    }
    render(){
    return (
        <div style={{ height: "600px" }}>
            <center>

<form style={{ fontSize:30 ,marginTop:"40px"}}>
    <table style={{border:"1 px solid black"}}>
   <tr>
    <td>
   First Name:
   </td><td>
   <input type="text" style={{ border: "1px solid black" }} name="fname" onChange={this.handle} value={this.state.fname}/>
   </td></tr>
   <tr>
   <td> Last Name:</td><td><input type="text" style={{ border: "1px solid black" }} name="lname" onChange={this.handle} value={this.state.lname}/>
   </td></tr>
   <tr><td>
    Gender:</td><td><input type="radio" style={{ border: "1px solid black" }} name="gender" onChange={this.handle} checked={this.state.gender==="male"} value="male"/>M
    <input type="radio" style={{ border: "1px solid black" }} name="gender" onChange={this.handle}  checked={this.state.gender==="female"} value="female"/>F</td></tr>
    <tr><td>
    Year of birth:</td><td><select style={{ border: "1px solid black" }} name="birthyear" value={this.state.birthyear} onChange={this.handle}>
        <option value="1992">1992</option>
        <option value="1993">1993</option>
        <option value="1994">1994</option>
        <option value="1995">1995</option>


    </select></td></tr>
   <tr> <td><button style={{ border: "1px solid black" }} type="submit">Submit</button></td></tr>
    </table>
</form></center></div>
    )}
}
export default Contact