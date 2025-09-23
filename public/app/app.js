// Call GET API
document.getElementById("getBtn").addEventListener("click", async () => {
  const res = await fetch("/api/hello");
  const data = await res.json();
  document.getElementById("output").textContent =
    "GET Response: " + JSON.stringify(data);
});

// Call POST API
document.getElementById("postBtn").addEventListener("click", async () => {
  const text = document.getElementById("inputText").value;

  const body = new FormData();
  body.append("text", text);
  const res = await fetch("/api/hello", {
    method: "POST",
    body,
  });
  const data = await res.json();
  document.getElementById("output").textContent =
    "POST Response: " + JSON.stringify(data);
});
