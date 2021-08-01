(() => {
    console.log("hello world")
})()

const urlParams = new URLSearchParams(window.location.search);
const clubId = urlParams.get("id");

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
        return false;
    } else {
        return resJSON._id;
    }
};

const fetchClub = async () => {
    const name = $("#name");
    const desc = $("#desc");
    const city = $("#city");
    const province = $("#province");
    const country = $("#country");

    const clubRes = await fetch(`/api/clubs/${clubId}`);
    const club = await clubRes.json();

    console.log(club);
}

const currentUser = await fetchUser();



if (currentUser) {

}