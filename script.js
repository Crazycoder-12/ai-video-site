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
    const formData = new FormData();
    formData.append("model", "sora-2");
    formData.append("prompt", prompt);

    const response = await fetch("https://api.openai.com/v1/videos", {
      method: "POST",
      headers: {
        "Authorization": "Bearer YOUR_API_KEY_HERE"
        // Do NOT set Content-Type manually — browser sets it for FormData
      },
      body: formData
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
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
