localStorage.removeItem("token");

const token = localStorage.getItem("token");

if (!token) {
    location.href = "index.html"
}