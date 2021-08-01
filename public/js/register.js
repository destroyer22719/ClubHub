const form = $("form");
const username = $("#username");
const email = $("#email");
const password = $("#password");
const bio = $("#bio");

form.on("submit", async (e) => {
    e.preventDefault();

    const res = await fetch("/api/users/register", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            username: username.val(),
            email: email.val(),
            password: password.val(), 
            bio: bio.val()
        })
    });

    const resJSON = await res.json();
    if (resJSON.token) {
        location.href = "profile.html"
        localStorage.setItem("token", resJSON.token)
    } else if (resJSON.message) {
        alert(resJSON.message)
    }
});
