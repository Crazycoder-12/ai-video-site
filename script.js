document.getElementById("videoForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const prompt = document.getElementById("prompt").value.trim();
  const videoElement = document.getElementById("aiVideo");
  const videoSection = document.getElementById("videoOutput");
  const loadingText = document.getElementById("loading");

  if (!prompt) {
    alert("Please enter a video prompt.");
    return;
  }

  videoSection.style.display = "block";
  loadingText.style.display = "block";
  videoElement.style.display = "none";
  videoElement.src = "";

  try {
    const response = await fetch("https://api.openai.com/v1/videos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_API_KEY_HERE"
      },
      body: JSON.stringify({
        prompt: prompt,
        duration: 10 // optional: adjust as needed
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    // Replace with actual key if different
    const videoUrl = data.video_url;

    if (!videoUrl) {
      throw new Error("No video URL returned.");
    }

    videoElement.src = videoUrl;
    videoElement.style.display = "block";
    videoElement.load();
    videoElement.play();
    loadingText.style.display = "none";
  } catch (error) {
    console.error("Video generation failed:", error);
    loadingText.textContent = "❌ Failed to generate video. Check console for details.";
  }
});
