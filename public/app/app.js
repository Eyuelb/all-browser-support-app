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

  const body = new URLSearchParams();
  body.append("text", text);

  const res = await fetch("/api/hello", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });
  const data = await res.json();
  document.getElementById("output").textContent =
    "POST Response: " + JSON.stringify(data);
});
