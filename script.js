document.getElementById("videoForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const prompt = document.getElementById("prompt").value.trim();
  const videoElement = document.getElementById("aiVideo");
  const videoSection = document.getElementById("videoOutput");

  if (!prompt) {
    alert("Please enter a video prompt.");
    return;
  }

  try {
    // Show loading message
    videoSection.style.display = "block";
    videoElement.poster = "";
    videoElement.src = "";
    videoElement.innerHTML = "<p>Generating video...</p>";

    const response = await fetch("https://api.openai.com/v1/videos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_API_KEY_HERE"
      },
      body: JSON.stringify({
        prompt: prompt,
        duration: 10 // optional: set duration in seconds
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    // Assuming the API returns a video URL in data.video_url
    videoElement.src = data.video_url;
    videoElement.load();
    videoElement.play();
  } catch (error) {
    console.error("Video generation failed:", error);
    alert("Failed to generate video. Check console for details.");
  }
});
