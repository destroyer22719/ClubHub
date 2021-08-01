const form = $("form");
const email = $("#email");
const password = $("#password");


form.on("submit", async (e) => {
    e.preventDefault();

    const res = await fetch("/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({
            email: email.val(),
            password: password.val(),
        }),
    });

    const resJSON = await res.json();

    if (resJSON.token) {
        location.href = "profile.html";
        localStorage.setItem("token", resJSON.token);
    } else if (resJSON.message) {
        alert(resJSON.message)
    }
});
