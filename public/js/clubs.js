(async () => {
   
    const clubList = $("#clubs");
    const searchForm = $("form");
    const searchValue = $("input");
    const clubResultsCount = $("#count");
    // console.log(clubResultsCount.);

    const clubsRes = await fetch("/api/clubs");
    const clubsResJSON = await clubsRes.json();
    const clubsJSON = clubsResJSON.clubs;
    const clubsCount = clubsResJSON.count;

    const displayClubs = (clubs, count) => {

        if (count === 0) {
            return clubList.html("<h2>No Clubs Found</h2>")
        }
        
        console.log(count);
        clubResultsCount.text(`${count} ${count > 1 ? "Results": "Result"}`);

        for (club of clubs) {
            clubList.html("");
            clubList.append(`
                <a target="_blank" href="club.html?id=${club._id}">
                    <div>
                        <p>${club.name}</p>
                        <p>${club.location.city}, ${club.location.province}, ${club.location.country}<p>
                        <p>${club.desc}</p>
                        <p>Members: ${club.members.length}</p>
                    </div>
                </a>
            `);
        }
    }

    searchForm.on("submit", async (e) => {
        e.preventDefault();
        const searchRes = await fetch(`/api/clubs?search=${searchValue.val()}`);
        const searchResult = await searchRes.json();
        const clubResult = searchResult.clubs;
        const clubCount = searchResult.count;
        displayClubs(clubResultsCount, clubCount)
    })

    displayClubs(clubsJSON, clubsCount);

})();

