(async () => {
    const name = $("#name");
    const desc = $("#desc");
    const city = $("#city");
    const province = $("#province");
    const country = $("#country");
    const joinButton = $("#join");
    const members = $("#members");
    const creator = $("#creator");

    const urlParams = new URLSearchParams(window.location.search);
    const clubId = urlParams.get("id");

    const token = localStorage.getItem("token");

    if (!token) {
        location.href = "login.html";
    }
    const res = await fetch("/api/users/profile", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const currentUser = await res.json();

    const clubRes = await fetch(`/api/clubs/${clubId}`);
    const club = await clubRes.json();
    console.log(club);

    name.text(club.name);
    desc.text(club.desc);
    city.text(club.location.city);
    province.text(club.location.province);
    country.text(club.location.country);
    creator.text(club.founder.username);

    for (member of club.members) {
        console.log(member);
        members.append(`<li><a target="_blank" href="/user.html?id=${member._id}">${member.username}</a></li>`)
    }

    joinButton.click(async () => {
        const joinRes = await fetch(`/api/clubs/${clubId}/join`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const joinResJSON = await joinRes.json();
        alert(joinResJSON.message);
        location.reload()
    })
})();
