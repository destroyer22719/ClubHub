(async () => {
   
    const clubList = $("#clubs");
    const searchForm = $("form");
    const searchValue = $("input");
    const clubResultsCount = $("#count");
    const clubPageNav = $(".page-nav");

    const urlParams = new URLSearchParams(window.location.search);
    const page = +urlParams.get("page") || 1;
    let search = urlParams.get("search");

    let clubsRes;
    if (search) {
        search = urlParams.get("search").replace("%20", " ");     
        console.log(search)   
        clubsRes = await fetch(`/api/clubs?search=${search}&page=${page}`);

    } else {
        clubsRes = await fetch(`/api/clubs?page=${page}`);
    }

    const clubsResJSON = await clubsRes.json();
    const clubsJSON = clubsResJSON.clubs;
    const clubsCount = clubsResJSON.count;

    const displayClubs = (clubs, count) => {
        if (count === 0) {
            return clubList.html("<h2>No Clubs Found</h2>")
        }
        
        const totalPages = Math.ceil(count / 5);
        clubResultsCount.text(`${count} ${count > 1 ? "Results": "Result"}`);
        if (page === 1) {
            clubPageNav.html(`
            <a href="#" class="w3-bar-item w3-black w3-button">1</a>
            <a href="?${search ? 'search=' + search + '&': ''}page=${page + 1}" class="w3-bar-item w3-button w3-hover-black">»</a>
            <a href="?${search ? 'search=' + search + '&': ''}page=${totalPages}" class="w3-bar-item w3-button w3-hover-black">Last</a>
            `);
        } else if (page === totalPages) {
            clubPageNav.html(`
            <a href="?${search ? 'search=' + search + '&': ''}page=${1}" class="w3-bar-item w3-black w3-button w3-hover-black">First</a>
            <a href="?${search ? 'search=' + search + '&': ''}page=${page - 1}" class="w3-bar-item w3-button w3-hover-black">«</a>
            <a href="#" class="w3-bar-item w3-button">${page}</a>
            `);
        } else {
            clubPageNav.html(`
                <a href="?${search ? 'search=' + search + '&': ''}page=${1}" class="w3-bar-item w3-button w3-hover-black">First</a>
                <a href="?${search ? 'search=' + search + '&': ''}page=${page - 1}" class="w3-bar-item w3-button w3-hover-black">«</a>
                <a href="#" class="w3-bar-item w3-black w3-button">${page}</a>
                <a href="?${search ? 'search=' + search + '&': ''}page=${page + 1}" class="w3-bar-item w3-button w3-hover-black">»</a>
                <a href="?${search ? 'search=' + search + '&': ''}page=${totalPages}"  class="w3-bar-item w3-button w3-hover-black">Last</a>
            `)
        }

        clubList.html("");
        for (club of clubs) {
            clubList.append(`
                <a target="_blank" href="club.html?id=${club._id}">
                    <div class="club-list__item">
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
        location.href = `/clubs.html?search=${searchValue.val()}&page=${page}`
    })

    displayClubs(clubsJSON, clubsCount);

})();


