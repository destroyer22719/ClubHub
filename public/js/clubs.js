(async () => {
   
    const clubList = $("#clubs");
    const clubsRes = await fetch("/api/clubs");
    const searchForm = $("form");
    const searchValue = $("input")

    const clubsJSON = await clubsRes.json();

    const displayClubs = (clubs) => {
        if (clubs.length === 0) {
            clubList.html("<h2>No Clubs Found</h2>")
        }

        for (club of clubs) {
            clubList.html("");
            clubList.append(`
                <a target="_blank" href="club.html?id=${club._id}">
                    <div>
                        <h3>${club.name}</h3>
                        <p>${club.location.city}, ${club.location.province}, ${club.location.country}<p>
                        <p>${club.desc}</p>
                        <p>Members: ${club.members.length}</p>
                    </div>
                </a>
            `)
        }
    }

    searchForm.on("submit", async (e) => {
        e.preventDefault();
        const searchRes = await fetch(`/api/clubs?search=${searchValue.val()}`);
        const searchResult = await searchRes.json();
        displayClubs(searchResult)
    })

    displayClubs(clubsJSON);

})();

