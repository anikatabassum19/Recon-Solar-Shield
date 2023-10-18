<script>
  import { onMount } from 'svelte';
  import Chart from 'chart.js/auto';

  
  let magnetometerChart;
  let orientationChart;

  onMount(() => {
    
    const magnetometerCtx = magnetometerChart.getContext('2d');
    const orientationCtx = orientationChart.getContext('2d');

    
    // Data for the magnetometer chart
    const magnetometerData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      datasets: [
        {
          label: 'Bt',
          data: [50, 55, 60, 65, 70],
          borderColor: 'rgba(255, 0, 0, 1)',
          borderWidth: 2,
          fill: false,
        },
        {
          label: 'ByGSM',
          data: [20, 25, 30, 35, 40],
          borderColor: 'rgba(0, 255, 0, 1)',
          borderWidth: 2,
          fill: false,
        },
        {
          label: 'BxGSM',
          data: [70, 75, 80, 85, 90],
          borderColor: 'rgba(0, 0, 255, 1)',
          borderWidth: 2,
          fill: false,
        },
        {
          label: 'BzGSM',
          data: [30, 35, 40, 45, 50],
          borderColor: 'rgba(255, 255, 0, 1)',
          borderWidth: 2,
          fill: false,
        },
      ],
    };

    // Data for the orientation chart (intensity, inclination, declination, north, east, vertical, horizontal)
    const orientationData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      datasets: [
        {
          label: 'Intensity',
          data: [100, 110, 120, 130, 140],
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 2,
          fill: false,
        },
        {
          label: 'Inclination',
          data: [10, 15, 20, 25, 30],
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 2,
          fill: false,
        },
        {
          label: 'Declination',
          data: [-10, -15, -20, -25, -30],
          borderColor: 'rgba(255, 0, 0, 1)',
          borderWidth: 2,
          fill: false,
        },
        {
          label: 'North',
          data: [50, 55, 60, 65, 70],
          borderColor: 'rgba(0, 255, 0, 1)',
          borderWidth: 2,
          fill: false,
        },
        {
          label: 'East',
          data: [-20, -25, -30, -35, -40],
          borderColor: 'rgba(0, 0, 255, 1)',
          borderWidth: 2,
          fill: false,
        },
        {
          label: 'Vertical',
          data: [-30, -35, -40, -45, -50],
          borderColor: 'rgba(255, 255, 0, 1)',
          borderWidth: 2,
          fill: false,
        },
        {
          label: 'Horizontal',
          data: [70, 75, 80, 85, 90],
          borderColor: 'rgba(128, 128, 128, 1)',
          borderWidth: 2,
          fill: false,
        },
      ],
    };

    // Adjust the chart height for larger charts
    const chartHeight = 600; // Set the desired height here

    const commonOptions = {
      maintainAspectRatio: true, // Enable aspect ratio
    };

    
    const magnetometerConfig = {
      type: 'line',
      data: magnetometerData,
      options: {
        ...commonOptions,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Magnetometer Data',
            },
          },
          x: {
            title: {
              display: true,
              text: 'Month',
            },
          },
        },
      },
    };

   
    const orientationConfig = {
      type: 'line',
      data: orientationData,
      options: {
        ...commonOptions,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Orientation Data',
            },
          },
          x: {
            title: {
              display: true,
              text: 'Month',
            },
          },
        },
      },
    };

    const resizeCharts = () => {
      magnetometerChart.height = chartHeight;
      orientationChart.height = chartHeight;
    };

    new Chart(magnetometerCtx, magnetometerConfig);
    new Chart(orientationCtx, orientationConfig);
    

    // Resize charts initially
    resizeCharts();
  });
</script>

<style>
  .chart-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  .chart-items {
    width: 100%;
  }

  .additional-data {
        list-style-type: none; /* Remove default bullets */
        padding-left: 20px; /* Indent the list items */
        color: #fff; /* Text color */
    }

    .additional-data li::before {
        content: "▶"; /* Use a triangle sign as a bullet */
        display: inline-block;
        width: 1em;
        margin-left: -1em; /* Adjust the position of the triangle */
        margin-right: 5px; /* Add spacing between the bullet and text */
        color: red; /* Set the color to red */
    }

    .additional-data li {
        margin-bottom: 15px; /* Adjust the spacing between list items */
    }

</style>

<div class="chart-container">
  <div class="chart-items">
    <canvas bind:this={magnetometerChart} id="magnetometerChart"></canvas>
  </div>
  <div class="chart-items">
    <canvas bind:this={orientationChart} id="orientationChart"></canvas>
  </div>
</div>

<div class="ml">
  <ul class="additional-data">
    <li class="triangle">Frequency of magnetic reconnection: </li>
    <li class="triangle">Relation between solar activity and Earth season: </li>
    <li class="triangle">Relation between solar activity and solar season: </li>
    <li class="triangle">Solar winds that are easily accessed: </li>
    <li class="triangle">Earth's magnetosphere: </li>
</ul> 
</div>

