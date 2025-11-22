const url = "https://api.github.com/users";
const searchInputEl = document.getElementById("searchInput");
const searchButtonEl = document.getElementById("searchBtn");
const profileContainerEl = document.getElementById("profileContainer");
const loadingEl = document.getElementById("loading");

const generateProfile = (profile) => {
    return(
        ` <div class="profile-box" style="width: 100rem;">
            <div class="top-section">
                <div class="left">
                    <div class="avatar">
                        <img alt ="profile" src = "${profile.avatar_url}" />
                    </div>
                    <div class="self">
                        <h1>${profile.name}</h1>
                        <h1>${profile.login}</h1>
                    </div>
                </div>
                <a href = "${profile.html_url}" target="_blank">
                <button class="primary-btn">Check Profile</button>
                </a>
            </div>
            <div class="about">
                <h2>About</h2>
                <p>${profile.bio}</p>
            </div>
            <div class="status">
                <div class="status-item">
                    <h3>Followers</h3>
                    <p>${profile.followers}</p>
                </div>
                <div class="status-item">
                    <h3>Following</h3>
                    <p>${profile.following}</p>
                </div>
                <div class="status-item">
                    <h3>Repos</h3>
                    <p>${profile.public_repos}</p>
                </div>
            </div>
        </div>`
    );
};



const fetchProfile = async () => {
    const username = searchInputEl.value.trim();

    if(!username){
        loadingEl.innerText = "Please enter a username";
        loadingEl.style.color = "red";
        return;
    }

    loadingEl.innerText = `Loading...`;
    loadingEl.style.color = "black";
    profileContainerEl.innerHTML = "";

    try {
        const res = await fetch(`${url}/${username}`);
        const data = await res.json();

        if(data.login && !data.message){
            loadingEl.innerText = "";
            profileContainerEl.innerHTML = generateProfile(data);
        }else{
            loadingEl.innerHTML = data.message || "User not found";
            loadingEl.style.color = "red";
            profileContainerEl.innerHTML = "";
        }

        console.log("data", data);
    } catch (error) {
        console.log({ error });
        loadingEl.innerText = "An error occurred. Please try again.";
        loadingEl.style.color = "red";
        profileContainerEl.innerHTML = "";
    }
};

searchButtonEl.addEventListener("click", fetchProfile);