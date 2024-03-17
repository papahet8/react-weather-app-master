
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement, Filler } from 'chart.js';
ChartJS.register(
  Title, Tooltip, LineElement, Legend,
  CategoryScale, LinearScale, PointElement, Filler
);


const Chart = ({ title, items }) => {
    const [data, setData] = useState({
        labels: [],
        datasets: [
          {
            label: title || 'First Dataset',
            data: [],
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            borderColor: 'rgba(255, 206, 86, 1)',
            tension: 0.4,
            fill: true,
            pointStyle: 'rect',
            pointBorderColor: 'blue',
            pointBackgroundColor: '#fff',
            showLine: true
          }
        ],
        options: {
          scales: {
            x: {
              ticks: {
                color: '#fff' // Change the color of the x-axis labels
              }
            },
            y: {
              ticks: {
                color: '#fff' // Change the color of the y-axis labels
              }
            }
          }
        }
      });
      
  // Update chart data when items change
  useEffect(() => {
    if (items && items.length > 0) {
      const labels = items.map((item) => item.title);
      const dataPoints = items.map((item) => item.temp);

      setData({
        labels,
        datasets: [
          {
            label: title || 'First Dataset',
            data: dataPoints,
            backgroundColor: 'yellow',
            borderColor: 'green',
            tension: 0.4,
            fill: true,
            pointStyle: 'rect',
            pointBorderColor: 'blue',
            pointBackgroundColor: '#fff',
            showLine: true
          }
        ]
      });
    }
  }, [title, items]);

  return (
    <div className='w-full '>
      <div style={{width:"600px", height:"300px"}} >
        <Line data={data}  options={data.options}/>
      </div>
    </div>
  );
};

export default Chart;
