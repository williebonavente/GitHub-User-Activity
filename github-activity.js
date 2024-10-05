const axios = require('axios');

// Get the GitHub username from the command line arguments
const username = process.argv[2];

// Check if the username is provided
if (!username) {
    console.error("Please provide an username");
    process.exit(1);
}

// Fetch the user data from GitHub API
async function getUserActivity(username) {
    const apiUrl = `https://api.github.com/users/${username}/events/public`;

    try {
        const response = await axios.get(apiUrl);
        const events = response.data;

        // Display the events in terminal
        if (events.length === 0) {
            console.log(`No recent activity found from user: ${username}`);
        } else {
            events.forEach((event) => {
                switch (event.type) {
                    case 'PushEvent':
                        console.log(`Pushed ${event.payload.commits.length} commits to ${event.repo.name}`);
                        break;
                    case 'IssuesEvent':
                        console.log(`Opened a new issue in ${event.repo.name}`);
                        break;
                    case 'WatchEvent':
                        console.log(`Starred the repo ${event.repo.name}`);
                        break;
                    case 'CreateEvent':
                        console.log(`Created a new repository ${event.repo.name}`);
                        break;
                    case 'PullRequestEvent':
                        console.log(`Opened a new pull request in ${event.repo.name}`);
                        break;
                    default:
                        console.log(`Some other event: ${event.type}`);
                        break;
                }
            });
        }
    } catch (error) {
        console.error("Error fetching data from GitHub API", error.message);
    }
}

// Testing the function
getUserActivity(username);