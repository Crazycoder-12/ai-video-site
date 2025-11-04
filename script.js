document.getElementById("videoForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const prompt = document.getElementById("prompt").value;

  // Placeholder: simulate video generation
  alert(`Pretending to generate video for: "${prompt}"`);

  // Simulate video output
  const videoSection = document.getElementById("videoOutput");
  const videoElement = document.getElementById("aiVideo");

  // Replace with actual video URL when available
  videoElement.src = "https://www.w3schools.com/html/mov_bbb.mp4";
  videoSection.style.display = "block";
});
