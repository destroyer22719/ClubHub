(async () => {
   
    const clubList = $("#clubs");
    const clubsRes = await fetch("/api/clubs");
    const searchForm 


    const clubsJSON = await clubsRes.json();

    const displayClubs = (clubs) => {
        if (clubs.length === 0) {
            clubList.html("<h2>No Clubs Found</h2>")
        }
        
        for (club of clubs) {
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



    displayClubs(clubsJSON);

})();

