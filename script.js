document.getElementById('conversion-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Reset previous error message
    document.getElementById('error-message').style.display = 'none';
    
    // Get the video URL entered by the user
    var videoUrl = document.getElementById('video-url').value;
    
    // Validate the video URL
    if (!isValidUrl(videoUrl)) {
      displayErrorMessage('Please enter a valid YouTube video URL.');
      return;
    }
    
    // Display loading message
    displayLoadingMessage();
    
    // Call the server-side API or perform the necessary logic to convert the video

    // Make a POST request to the Flask endpoint
    fetch('http://localhost:5000/convert', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({url: videoUrl})
    })
    .then(response => response.json())
    .then(data => {
        // Hide the loading message
        hideLoadingMessage();

        // Display the converted video details
        document.getElementById('video-title').textContent = 'Title: ' + data.title;
        document.getElementById('video-duration').textContent = 'Duration: ' + data.duration;
        document.getElementById('video-thumbnail').src = data.thumbnail;
        document.getElementById('video-player').src = data.video_url;
        document.getElementById('download-link').href = data.video_url;

        // Show the video details section
        document.getElementById('video-details').style.display = 'block';
    })
    .catch(error => {
        // Hide the loading message
        hideLoadingMessage();

        // Display error message
        displayErrorMessage('An error occurred while converting the video. Please try again.');
    });
    
    // Simulating the conversion process with a delay
    // setTimeout(function() {
    //     // Assuming you receive the converted video details as an object
    //     var convertedVideo = {
    //         title: 'Converted Video Title',
    //         duration: '00:05:30',
    //         thumbnail: '<URL>',
    //         videoSource: 'https://example.com/converted-video.mp4'
    //     };
    
    //     // Display the converted video details
    //     document.getElementById('video-title').textContent = 'Title: ' + convertedVideo.title;
    //     document.getElementById('video-duration').textContent = 'Duration: ' + convertedVideo.duration;
    //     document.getElementById('video-thumbnail').src = convertedVideo.thumbnail;
    //     document.getElementById('video-player').src = convertedVideo.videoSource;
    //     document.getElementById('download-link').href = convertedVideo.videoSource;
        
    //     // Show the video details section
    //     document.getElementById('video-details').style.display = 'block';
        
    //     // Hide the loading message
    //     hideLoadingMessage();
    //     }, 2000); // Simulated delay of 2 seconds
    }
);
  
function isValidUrl(url) {
    // Implement your URL validation logic here
    // Example validation for YouTube video URLs
    var youtubeRegex = /^https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/;
    return youtubeRegex.test(url);
}

function displayErrorMessage(message) {
    var errorMessageElement = document.getElementById('error-message');
    errorMessageElement.textContent = message;
    errorMessageElement.style.display = 'block';
}

function displayLoadingMessage() {
    var loadingMessageElement = document.createElement('p');
    loadingMessageElement.textContent = 'Converting video... Please wait.';
    loadingMessageElement.id = 'loading-message';
    document.getElementById('conversion-form').appendChild(loadingMessageElement);
}

function hideLoadingMessage() {
    var loadingMessageElement = document.getElementById('loading-message');
    if (loadingMessageElement) {
        loadingMessageElement.parentNode.removeChild(loadingMessageElement);
    }
}
  