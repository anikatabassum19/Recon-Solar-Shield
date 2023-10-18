<!-- src/routes/home.svelte -->

<script>
    import { Link } from "svelte-routing";
    import S_Sat from "./ace_sat.svelte";
    import Dis_Sat from "./dis_sat.svelte";
    import { onMount } from "svelte";
    import { Chart } from "chart.js/auto";

    let displayACESatellite = false;
    let displayDSCOVRSatellite = false;

    function showACESatellite() {
        displayACESatellite = true;
        displayDSCOVRSatellite = false;
    }

    function showDSCOVRSatellite() {
        displayACESatellite = false;
        displayDSCOVRSatellite = true;
    }

    // Initialize Earth data as an empty object
    let earthData = {};

    // Initialize Sun data as an empty object
    let sunData = {};

    // Convert the Earth and Sun data objects into arrays for chart data
    let earthLabels = [];
    let earthValues = [];

    let sunLabels = [];
    let sunValues = [];

    let earthChart;
    let sunChart;

    // Chart data for Earth and Sun
    const earthChartData = {
        labels: earthLabels,
        datasets: [
            {
                label: "Vertical",
                data: earthValues.vertical,
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 2,
                fill: false,
            },
            {
                label: "Latitude",
                data: earthValues.latitude,
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 2,
                fill: false,
            },
            {
                label: "Altitude",
                data: earthValues.altitude,
                borderColor: "rgba(255, 206, 86, 1)",
                borderWidth: 2,
                fill: false,
            },
            {
                label: "Intensity",
                data: earthValues.intensity,
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 2,
                fill: false,
            },
            {
                label: "Declination",
                data: earthValues.declination,
                borderColor: "rgba(153, 102, 255, 1)",
                borderWidth: 2,
                fill: false,
            },
            {
                label: "Inclination",
                data: earthValues.inclination,
                borderColor: "rgba(255, 159, 64, 1)",
                borderWidth: 2,
                fill: false,
            },
            {
                label: "North",
                data: earthValues.north,
                borderColor: "rgba(255, 99, 71, 1)",
                borderWidth: 2,
                fill: false,
            },
            {
                label: "East",
                data: earthValues.east,
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 2,
                fill: false,
            },
            {
                label: "Horizontal",
                data: earthValues.horizontal,
                borderColor: "rgba(255, 206, 86, 1)",
                borderWidth: 2,
                fill: false,
            },
        ],
    };

    const sunChartData = {
        labels: sunLabels,
        datasets: [
            {
                label: "bzGSM",
                data: sunValues.bzGSM,
                borderColor: "rgba(255, 206, 86, 1)",
                borderWidth: 2,
                fill: false,
            },
            {
                label: "byGSM",
                data: sunValues.byGSM,
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 2,
                fill: false,
            },
            {
                label: "bxGSM",
                data: sunValues.bxGSM,
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 2,
                fill: false,
            },
            {
                label: "bt",
                data: sunValues.bt,
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 2,
                fill: false,
            },
        ],
    };

    // Function to check for magnetic reconnection
    function checkMagneticReconnection() {
        const earthVertical = earthData.Vertical;
        const sunBzGsm = sunData.bzGSM;

        if (earthVertical === sunBzGsm && sunBzGsm < 0) {
            // Magnetic reconnection detected
            return true;
        } else {
            return false;
        }
    }

    async function magneticReconnectionDetectionTweet() {
        // Create the request body
        const requestBody = {
            text: "Magnetic reconnection detected!",
        };

        const apiKey = "1202a311-b72c-4c0c-87fb-48cd908723c1";

        // Define the API endpoint for posting tweets
        const tweetApiUrl =
            "https://app-rssi-api-eastus-dev-001.azurewebsites.net/api/tweets";

        try {
            const response = await fetch(tweetApiUrl, {
                method: "POST",
                headers: {
                    "x-api-key": `${apiKey}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });

            if (response.ok) {
                // Successfully posted the tweet
                console.log("Tweet posted successfully.");
            } else {
                // Handle any errors during the POST request
                console.error("Failed to post the tweet.");
            }
        } catch (error) {
            // Handle network or fetch errors
            console.error("Error while posting the tweet:", error);
        }
    }

    let magneticReconnection = false;

    function updateEarthChart() {
        earthChart.data.labels = earthLabels;
        earthChart.data.datasets[0].data = earthValues;
        earthChart.update(); // Update the Earth chart
        
    }

    function updateSunChart() {
        sunChart.data.labels = sunLabels;
        sunChart.data.datasets[0].data = sunValues;
        sunChart.update(); // Update the Sun chart
        
    }

    onMount(async () => {

        // Common API key for both endpoints
        const apiKey = "1202a311-b72c-4c0c-87fb-48cd908723c1";
        const earthApiUrl =
            "https://app-rssi-api-eastus-dev-001.azurewebsites.net/api/earthdata/ncei";
        const sunApiUrl =
            "https://app-rssi-api-eastus-dev-001.azurewebsites.net/api/satellitedata/dscovr";

        // Fetch Earth data
        const earthResponse = await fetch(earthApiUrl, {
            headers: {
                "x-api-key": `${apiKey}`,
                "content-type": "application/json",
            },
        });
        
        if (earthResponse.ok) {
            earthData = await earthResponse.json();
            // Assuming 'earthData' is an object with properties 'time' and 'vertical'
            if (earthData.time) {
                earthLabels.push(earthData.time);
                earthValues.push(earthData.time);
            }

            if (earthData.vertical) {
                earthLabels.push("Vertical");
                earthValues.push(earthData.vertical);
            }

            if (earthData.latitude) {
                earthLabels.push("Latitude");
                earthValues.push(earthData.latitude);
            }

            if (earthData.altitude) {
                earthLabels.push("Altitude");
                earthValues.push(earthData.altitude);
            }

            if (earthData.intensity) {
                earthLabels.push("Intensity");
                earthValues.push(earthData.intensity);
            }

            if (earthData.declination) {
                earthLabels.push("Declination");
                earthValues.push(earthData.declination);
            }

            if (earthData.inclination) {
                earthLabels.push("Inclination");
                earthValues.push(earthData.inclination);
            }

            if (earthData.north) {
                earthLabels.push("North");
                earthValues.push(earthData.north);
            }

            if (earthData.east) {
                earthLabels.push("East");
                earthValues.push(earthData.east);
            }

            if (earthData.horizontal) {
                earthLabels.push("Horizontal");
                earthValues.push(earthData.horizontal);
            }

            updateEarthChart(); // Update the Earth chart with new data
        } else {
            console.error("Failed to fetch Earth data from the API.");
        }

        setInterval(earthResponse, 3000);

        // Fetch Sun data
        const sunResponse = await fetch(sunApiUrl, {
            headers: {
                "x-api-key": `${apiKey}`,
                "Content-Type": "application/json",
            },
        });

        if (sunResponse.ok) {
            sunData = await sunResponse.json();
            // Assuming 'sunData' is an object with properties 'time' and 'bzGSM'
            sunLabels.push(sunData.time);
            sunValues.push(sunData.time);

            if (sunData.bzGSM) {
                sunLabels.push("bzGSM");
                sunValues.push(sunData.bzGSM);
            }

            if (sunData.byGSM) {
                sunLabels.push("byGSM");
                sunValues.push(sunData.byGSM);
            }

            if (sunData.bxGSM) {
                sunLabels.push("bxGSM");
                sunValues.push(sunData.bxGSM);
            }

            if (sunData.bt) {
                sunLabels.push("bt");
                sunValues.push(sunData.bt);
            }

            updateSunChart(); // Update the Sun chart with new data
        } else {
            console.error("Failed to fetch Sun data from the API.");
        }

        setInterval(sunResponse, 3000);
    });
    // Initialize Sun chart
    onMount(() => {
        const sunCanvas = document.getElementById("sunChart");
        sunChart = new Chart(sunCanvas, {
            type: "line",
            data: sunChartData,
            options: {
                scales: {
                    x: {
                        display: true, // Display the X-axis
                    },
                    y: {
                        beginAtZero: true,
                    },
                },
                plugins: {
                    title: {
                        display: true,
                        text: "Sun Data",
                    },
                    legend: {
                        display: false,
                    },
                },
            },
        });

        const earthCanvas = document.getElementById("earthChart");

        earthChart = new Chart(earthCanvas, {
            type: "line",
            data: earthChartData,
            options: {
                scales: {
                    x: {
                        display: true, // Display the X-axis
                    },
                    y: {
                        beginAtZero: true,
                        display: true, // Display the Y-axis
                    },
                },
                plugins: {
                    title: {
                        display: true,
                        text: "Earth Data",
                    },
                    legend: {
                        display: false,
                    },
                },
            },
        });
    });
</script>

<main class="home-container">
    <div class="navbar">
        <div class="navbar-buttons">
            <button on:click={showACESatellite}> ACE Satellite </button>
            <button on:click={showDSCOVRSatellite}> DSCOVR Satellite </button>
        </div>
    </div>

    <!-- Display the S-Satellite component when clicked -->
    {#if displayACESatellite}
        <S_Sat />
    {:else}
        <!-- Display the DSCOVR Satellite component when clicked -->
        {#if displayDSCOVRSatellite}
            <Dis_Sat />
        {/if}
    {/if}

    <!-- Earth and Sun Data Line Charts -->
    <section class="data-graphs">
        <div class="data-graph">
            <h2>Solar wind</h2>
            <canvas id="sunChart" width="400" height="200" />
        </div>
        <div class="data-graph">
            <h2>Geo-magnet</h2>
            <canvas id="earthChart" width="400" height="200" />
        </div>
    </section>

    <!-- Magnetic Reconnection Detection -->
    {#if magneticReconnection}
        <p>Magnetic Reconnection Detected!</p>
    {:else}
        <p>No Magnetic Reconnection Detected.</p>
    {/if}
</main>

<style>
    /* Your CSS styles for home.svelte */
    .navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 40px;
    }

    .navbar-buttons {
        display: flex;
        gap: 20px;
    }

    .navbar-buttons button {
        background: none;
        border: 2px solid #ffcc00;
        font-size: 24px;
        color: #ffcc00;
        cursor: pointer;
        display: flex; /* Align icon and text horizontally */
        align-items: center; /* Center icon and text vertically */
        padding: 4px 8px; /* Adjust padding for smaller button size */
        font-size: 1rem; /* Set font size to match h4 */
        border-radius: 10px;
    }

    .data-graphs {
        display: flex;
        justify-content: space-between;
        margin-top: 40px;
    }

    .data-graph {
        border: 1px solid #ddd;
        text-align: center;
        padding: 20px;
        width: 48%; /* Adjust the width as needed */
        box-sizing: border-box;
    }
</style>
