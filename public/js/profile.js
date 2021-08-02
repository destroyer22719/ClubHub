const username = $("#name");
const bio = $("#bio");
const clubs = $("#clubs");
const token = localStorage.getItem("token");


       
const fetchUser = async () => {
    const res = await fetch("/api/users/profile", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    const resJSON = await res.json();

    username.text(resJSON.username);
    bio.text(resJSON.bio)

    if (resJSON.clubs.length === 0) {
        clubs.text("You haven't joined any clubs");
    } else {
        for (club of resJSON.clubs) {
            clubs.append(`<li><a target="_blank" href="/club.html?id=${club._id}">${club.name}</a></li>`)
        }
    }
}    

if (!token) {
    location.href = "login.html"
} else {
    fetchUser()
}