import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Tooltip, Legend, Cell } from 'recharts';
import config from '../config';

const Adminchart = () => {
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


  // Define data with total correct, total questions, and total subjects
  const data = [
    { name: 'Total Registered', value: totalusers || 0 },
    { name: 'Total Subscribers', value: totalsubscribers || 0 },
   
  
    { name: 'Total Subjects', value: totalsubjects|| 0 },
  ];

  // Define custom colors for each data point
  const colors = ['#0088FE', '#00C49F', '#ff3333', '#FF8042'];

  return (
    <div>
      <PieChart width={700} height={500}>
        <Pie
          data={data}
          dataKey="value"
          outerRadius={200}
          // label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
          //   const radius = innerRadius + (outerRadius - innerRadius) * 1.2;
          //   const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
          //   const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

            // return (
            //   <text x={x} y={y} fill="black" textAnchor="middle" dominantBaseline="central">
            //     {`${data[index].name}: ${(percent * 100).toFixed(2)}%`}
            //   </text>
            // );
          // }}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default Adminchart;
