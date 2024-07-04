const search_bar = document.querySelector("[git-username]");
const search_btn = document.querySelector("[search-btn]");
const url = "https://api.github.com/users/";
var count=0;

// search_bar.value="codesoul23";
var username = "CodeSoul23";
getUserInfo();

search_btn.addEventListener("click", function(event) {
    event.preventDefault(); // Prevent the default form submission
    count++;
    getUserInfo();
});

async function getUserInfo() {
    if (!username) {
        alert("Please enter a GitHub username");
        return;
    }
    if(count==0 || search_bar.value=="")
    {
        username = "CodeSoul23";
    }
    if (count>0 && search_bar.value!="")
    {
        username = search_bar.value;
    }
    try {
        const res = await fetch(url + username);
        if (!res.ok) {
            throw new Error(`Error: ${res.status} - ${res.statusText}`);
        }
        const data = await res.json();
        fetchUserInfo(data);
    } catch (error) {
        console.error(error);
        alert("Please enter a valid Github username");
    }
}

function fetchUserInfo(GitData) {
    const userImage = document.querySelector("[user-image]");
    const userName = document.querySelector("[user-name]");
    const userLink = document.querySelector("[user-link]");
    const userBio = document.querySelector("[user-bio]");
    const userRepos = document.querySelector("[user-repos]");
    const userFollowers = document.querySelector("[user-followers]");
    const userFollowing = document.querySelector("[user-following]");
    const userLocation = document.querySelector("[user-location]");
    const userBioLink = document.querySelector("[user-bio-link]");
    const userTwitter = document.querySelector("[user-twitter-link]");
    const userComp = document.querySelector("[company-name]");
    const create_Date=document.querySelector("[user-create-date]")

    userImage.src = GitData.avatar_url || '';
    userName.innerText = GitData.name || 'N/A';
    if(userName.innerText=="N/A")
    {
        userName.innerText=GitData?.login.toUpperCase();
    }
    userLink.href = GitData.html_url || '#';
    userLink.innerText =`@${GitData?.login}`;
    // create_Date.innerText=DateGitData?.created_at;
    userBio.innerText = GitData.bio || "This profile has no bio";
    userRepos.innerText = GitData.public_repos || '0';
    userFollowers.innerText = GitData.followers || '0';
    userFollowing.innerText = GitData.following || '0';
    userLocation.innerText = GitData.location || 'Not Available';
    userBioLink.href = GitData.blog || '#';
    userBioLink.innerText = GitData.blog || 'Not Available';
    userTwitter.href = GitData.twitter_username ? `https://x.com/${GitData.twitter_username}` : '#';
    userTwitter.innerText = GitData.twitter_username || 'Not Available';
    userComp.innerText = GitData.company || 'Not Available';
    create_Date.innerText= `Joined ${GitData?.created_at.split("T").shift()}`;

}

document.addEventListener("DOMContentLoaded", function() {
    const light_icon = document.querySelector("[icon-light]");
    const dark_icon = document.querySelector("[icon-dark]");
    const light_mode=document.querySelector(".mode-light")
    const dark_mode=document.querySelector(".mode-dark");
    const root=document.documentElement;
    const proj_head=document.querySelector(".heading");
    const innerUserContent=document.querySelector(".inner-user-content")
    const userInfoContainer=document.querySelector(".user-info-container")

    root.classList.add("light-mode");
    light_icon.classList.add("active"); // Default
    dark_icon.classList.add("inactive");
    search_bar.style.backgroundColor="#fff"
    userInfoContainer.style.backgroundColor="white"
    innerUserContent.style.backgroundColor="lightgrey";
    // userInfoContainer.style.boxShadow="0 0 30px 10px rgba(0, 0, 0, 0.2)"
    document.querySelector(".searchbar-container").style.boxShadow="5px 10px 10px 5px lightgrey";
    // light_icon.style.paddingLeft="-15px";

    light_mode.innerText="Light";

    // Dark Mode
    light_icon.addEventListener("click", function(event) {
        light_icon.classList.remove("active");
        light_icon.classList.add("inactive");
        dark_icon.classList.remove("inactive");
        dark_icon.classList.add("active");
        light_mode.innerText="";
        dark_mode.innerText="Dark"
        root.classList.remove("light-mode");
        root.classList.add("dark-mode");
        dark_icon.style.color="#40566e"
        proj_head.style.color="#fff";
        search_bar.style.backgroundColor="#112d4e"
        document.querySelector(".searchbar-container").style.boxShadow="0 0 40px #112d4e";
        innerUserContent.style.backgroundColor="darkslateblue";
        userInfoContainer.style.backgroundColor="#112d4e"
        // userInfoContainer.style.boxShadow="0 0 30px 10px rgba(0, 0, 0, 0.2)"

    });

    // Light Mode
    dark_icon.addEventListener("click", function(event) {
        dark_icon.classList.remove("active");
        dark_icon.classList.add("inactive");
        light_icon.classList.remove("inactive");
        light_icon.classList.add("active");
        light_mode.innerText="Light";
        dark_mode.innerText="";
        root.classList.remove("dark-mode");
        root.classList.add("light-mode");
        proj_head.style.color="#40566e";
        search_bar.style.backgroundColor="#fff"
        innerUserContent.style.backgroundColor="lightgrey";
        userInfoContainer.style.backgroundColor="white"
        // userInfoContainer.style.boxShadow="0px 16px 30px -10px rgba(0, 0, 0, 0.2)"
        document.querySelector(".searchbar-container").style.boxShadow="0 0px 20px grey";
    });
});
