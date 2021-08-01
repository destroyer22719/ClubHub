const form = $("form");
const name = $("#name");
const desc = $("#desc");
const city = $("#city");
const province = $("#province");
const country = $("#country");
const online = $("#online");

const fetchUser = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
        location.href = "login.html";
    }
    const res = await fetch("/api/users/profile", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const resJSON = await res.json();

    if (!resJSON._id) {
        location.href = "login.html";
    }
};

form.on("submit", async (e) => {
    e.preventDefault();
    await fetchUser();
    const token = localStorage.getItem("token");
    console.log(online.is(":checked"));
    const res = await fetch("/api/clubs/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            name: name.val(),
            desc: desc.val(),
            location: {
                city: city.val(),
                province: province.val(),
                country: country.val(),
                online: online.is(":checked"),
            },
        }),
    });

    const resJSON = await res.json();
    console.log(resJSON)
    // location.href = `club.html?id=${resJSON._id}`;
});
