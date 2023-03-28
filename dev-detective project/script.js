const searchInput=document.querySelector("[require]");
const userSearch=document.querySelector("[data-userSearch]");
const userName=document.querySelector("[data-Username]");
const bio=document.querySelector("[data-bio]");
const dob=document.querySelector("[data-dob]");
const id=document.querySelector(".data-userId");
const respos=document.querySelector("[data-respos]");
const followers=document.querySelector("[data-followers]");
const following=document.querySelector("[data-following]");
const location1=document.querySelector("[data-location]")
const website=document.querySelector("[data-website]");
const twitter=document.querySelector("[data-twitter]");
const company=document.querySelector("[data-company]");
const icons=document.querySelectorAll("[data-icon-container]")
const container=document.querySelector(".container")
const userProfile=document.querySelector("[data-userProfile]")
const body=document.querySelector("[data-body]")
const searchImg=document.querySelector("[data-searchImg]")
const statValue=document.querySelector(".stat-value")
const image=document.querySelector("[data-img]")
const dark=document.querySelector(".dark")
const moonIcon=document.querySelector(".moon")
const light=document.querySelector(".light")
const sunIcon=document.querySelector(".sun")
const noResult=document.querySelector(".noResult")
const profileStat=document.querySelector(".profile-stat")


dark.classList.add("dis")
moonIcon.classList.add("dis");

let error =document.querySelector(".error")
error.classList.add('inactive');

requestUserRepos('aman091299');
let months=['Jan','Feb','March','April','May','June','July','Aug','Sep','Oct','Nov','Dec'];


userSearch.addEventListener('submit',(e)=>{
    e.preventDefault();
    let name=searchInput.value;
    requestUserRepos(name)
     
})
async function requestUserRepos(name){
    let response=await fetch(`https://api.github.com/users/${name}`);
    let data=await response.json();
    if(data?.message=='Not Found'){
        userProfile.classList.add('inactive');
        error.classList.remove('inactive');
        
    }
    else{
        error.classList.add('inactive');
        userProfile.classList.remove('inactive');
        console.log(data)
        renderUserInfo(data);
    }
   
}

function renderUserInfo(userData){
let  datesegments = userData?.created_at.split("T").shift().split("-");
  dob.innerText = `Joined ${datesegments[2]} ${months[datesegments[1] - 1]} ${datesegments[0]}`;   
image.src=userData?.avatar_url;
userName.innerText=userData?.name;
bio.innerText=userData?.bio;
 id.innerText=`@${userData?.login}`;
respos.innerText=userData?.public_repos;
followers.innerText=userData?.followers;
following.innerText=userData?.following;
location1.innerText=checkNull(userData?.location) ? userData?.location : "Not Available";
website.innerText=checkNull(userData?.html_url) ? userData?.html_url : "Not Available" ;
twitter.innerText=checkNull(userData?.twitter_username) ? userData?.twitter_username : "Not Available";
company.innerText=checkNull(userData?.company) ? (userData?.company) : "Not Available";

}
function checkNull(param){
    if(param === "" || param === null){
        return false;
    }
    else{
        return true;
    }
};
 icons.forEach((icon)=>{
    icon.addEventListener("click",()=>{
    body.classList.toggle("active");
    profileStat.classList.toggle("active");
    searchImg.classList.toggle("active");
    searchInput.classList.toggle("active");
    userProfile.classList.toggle("active");
    userName.classList.toggle("active");
    dark.classList.toggle("dis")
    light.classList.toggle("dis")
    moonIcon.classList.toggle("dis")
    sunIcon.classList.toggle("dis")
 })
});

searchInput.addEventListener("click",function(){
      noResult.style.display='none';
})
 