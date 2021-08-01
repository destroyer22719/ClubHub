(async () => {
    const username = $("#name");
    const bio = $("#bio");
    const clubs = $("#clubs");
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("id");

    const res = await fetch(`/api/users/${userId}`);

    if (res.status !== 200) {
        $("title").text("Clubhub | User 404")
        return $("body").html("<h1>User Not Found</h1>");
    }
    const user = await res.json();

    console.log(user);

    if (!user) {
        $("title").text("Clubhub | User 404")
        return $("body").html("<h1>User Not Found</h1>");
    }

    $("title").text("Clubhub | " + user.username)
    username.text(user.username);
    bio.text(user.bio);

    if (user.clubs.length === 0) {
        clubs.text(`${user.name} haven't joined any clubs yet`);
    } else {
        for (club of user.clubs) {
            console.log(club);
            clubs.append(
                `<li><a target="_blank" href="/club.html?id=${club._id}">${club.name}</a></li>`
            );
        }
    }
})();
