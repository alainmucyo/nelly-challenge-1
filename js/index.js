fetch("https://jsonplaceholder.typicode.com/users").then(res => res.json()).then((res) => {
    document.getElementsByClassName("loader")[0].style.display = "none";
    res.forEach(user => {
        document.getElementsByClassName("users")[0].innerHTML += ` 
 <div class="user">
            <div class="user-content">
                <div class="user-details">
                    <span class="user-name">${user.name}</span>
                    <span class="user-email">${user.email}</span>
                </div>
                <a href="/posts?user_id=${user.id}" class="btn btn-primary" onclick="event.preventDefault();showPost(${user.id},'${user.name}')">POSTS</a>
            </div>
        </div>
`
    })
})

function showPost(userId, userName) {
    document.getElementsByClassName("users")[0].style.display = "none";
    document.getElementsByClassName("details")[0].style.display = "flex";
    document.getElementsByClassName("app-title")[0].textContent = `${userName}'s posts`
    document.getElementsByClassName("details")[0].innerHTML='';
    document.getElementsByClassName("loader")[0].style.display = "flex";
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`).then(res => res.json()).then((res) => {
        document.getElementsByClassName("loader")[0].style.display = "none";
        res.forEach(({title, body}) => {
            document.getElementById("back-button").style.display = 'inline-block';
            document.getElementsByClassName("details")[0].innerHTML += `
             <div class="post-detail">
                <div class="detail-content">
                    <div class="detail__title">${title}</div>
                    <div class="detail__body">
                       ${body}
                    </div>
                </div>
            </div>
            `
        })
    })
}
document.getElementById("back-button").addEventListener("click",function (event) {
    event.preventDefault();
    document.getElementsByClassName("users")[0].style.display = "flex";
    document.getElementsByClassName("details")[0].style.display = "none";
    document.getElementsByClassName("app-title")[0].textContent = "OUR AWESOME USERS"
    document.getElementById("back-button").style.display = 'none';
})