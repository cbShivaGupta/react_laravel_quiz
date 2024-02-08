import React, { useEffect,useState,Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import config from '../config';

//var CanvasJSReact = require('@canvasjs/react-charts');
 
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
const Adminchart2=() =>{

	const apiUrl = config.backendUrl;

	const [totalsubjects, setTotalsubjects] = useState();
  
	const [totalusers, setTotalusers] = useState();
	const [totalsubscribers, setTotalsubscribers] = useState();
	const userId = localStorage.getItem("userid");
  
	useEffect(() => {
	  const fetcallrecords = async () => {
		try {
		  const response = await fetch(`${apiUrl}/fetcallrecords`, {
			method: "GET",
			headers: {
			  "Content-Type": "application/json",
			},
			// body: JSON.stringify({
			//   user_id: userId,
			// }),                                                                                     
		  });
  
		  const contentType = response.headers.get("content-type");
  
		  if (contentType && contentType.includes("application/json")) {
			const data = await response.json();
			console.log(data);
			setTotalusers( data.total_users)
			setTotalsubscribers(data.total_subscribers)
			setTotalsubjects(data.total_subjects)
  
			// console.log("Total Questions:", data.total_questions);
			// console.log("Total Subjects:", data.total_subjects);
		  }
		} catch (error) {
		  console.error("Error fetching user performance:", error);
		}
	  };
  
	  // Fetch user performance when the component mounts
	  fetcallrecords();
	}, [apiUrl, userId]);



	const options = {
		// title: {
		// 	text: "Basic Column Chart"
		// },
		data: [
		{
			// Change type to "doughnut", "line", "splineArea", etc.
			type: "column",
			dataPoints: [
				{ label: "Total Users",  y: totalusers  },
				{ label: "Total Subscribers", y: totalsubscribers  },
				{ label: "Total Subjects", y: totalsubjects  },
				
			]
		}
		]
	}
	
		
		return (
		<div>
			<CanvasJSChart options = {options}
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}

export default Adminchart2;    