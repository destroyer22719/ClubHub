(async () => {
    const name = $("#name");
    const desc = $("#desc");
    const city = $("#city");
    const province = $("#province");
    const country = $("#country");
    const joinButton = $("#join");
    const members = $("#members");
    const creator = $("#creator");
    const discord = $("#discord");
    const online = $("#online");

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

    $("title").text("ClubHub | " + club.name);
    name.text(club.name);
    desc.text(club.desc);
    city.text(club.location.city);
    province.text(club.location.province);
    country.text(club.location.country);
    creator.text(club.founder.username);

    if (club.location.online) {
        online.html('<i class="fa fa-check"></i>');
    } else {
        online.html('<i class="fa fa-times"></i>');
    }

    for (member of club.members) {
        members.append(`<li><a target="_blank" href="/user.html?id=${member._id}">${member.username}</a></li>`)
    }

    if (club.members.some(obj => obj._id === currentUser._id) || club.founder._id === currentUser._id) {
        joinButton.prop("disabled", true);
        discord.prop("href", club.discord);
        discord.text("Join Discord");
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
    });

})();
