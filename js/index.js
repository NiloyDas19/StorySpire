
const loadLatestPost = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
    const data = await res.json();
    // console.log(data);

    const latestPostContainer = document.getElementById('latest-post-container');
    data.forEach(latestPost => {
        // console.log(latestPost);
        const div = document.createElement('div');
        const divClass = "card w-full bg-base-100 shadow-xl";
        div.classList = divClass;
        div.innerHTML = `
        <figure class="px-10 pt-10">
            <img src="${latestPost.cover_image}" alt="Shoes"
                class="rounded-xl" />
        </figure>
        <div class="card-body space-y-3">
            <p><i class="fa-regular fa-calendar"></i> ${latestPost.author?.posted_date || "No publish date"}</p>
            <h2 class="text-2xl font-extrabold">${latestPost.title}</h2>
            <p class = "font-light">${latestPost.description}</p>
            <div class = "flex  items-center gap-5">
                <div class="avatar">
                    <div class="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src="${latestPost.profile_image}" />
                    </div>
                </div>
                <div>
                    <h3 class = "font-extrabold">${latestPost.author.name}</h3>
                    <p class = "font-light">${latestPost.author?.designation || "Unknown"}</p>
                </div>
            </div>
        </div>
        `;
        latestPostContainer.appendChild(div);
    });

}



const loadAllPost = async() => {
    const res = await fetch("https://openapi.programming-hero.com/api/retro-forum/posts");
    const data = await res.json();
    const posts = data.posts;
    // console.log(posts);

    const allPostContainer = document.getElementById('all-post-container');
    posts.forEach(post => {
        console.log(post);
        div = document.createElement('div');
        div.classList = "card w-full bg-base-100 shadow-xl";
        div.innerHTML = `
        <div class="card-body bg-[#797DFC19]">
            <div class="flex flex-col md:flex-row gap-4">
                    <div class="relative">
                        <img class=" w-14 h-14 rounded-full" src="${post.image}" alt="">
                        <span class="top-0 left-10 absolute  w-3.5 h-3.5 ${post.isActive ? 'bg-green-400' : 'bg-red-400'} border-2 border-white dark:border-gray-800 rounded-full"></span>
                    </div>
                    <div class = "w-full space-y-5">
                        <p>#${post.category} Author: ${post.author.name}</p>
                        <h2 class="card-title">${post.title}</h2>
                        <p>${post.description}</p>
                        <hr>
                        <div class="flex justify-between">
                            <div class="flex gap-5"> 
                                <p><i class="fa-solid fa-message"></i> ${post.comment_count}</p>
                                <p><i class="fa-regular fa-eye"></i> ${post.view_count}</p>
                                <p><i class="fa-regular fa-clock"></i> ${post.posted_time}</p>
                            </div>
                            <div class="">
                                <p onClick = "addReadPost('${post.title}','${post.view_count}')"><i class="fa-solid fa-envelope-open"></i></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
        allPostContainer.appendChild(div);
    });
};

let cnt = 0;
const addReadPost = (postTitle, postView) => {
    console.log(postTitle, postView);
    ++cnt;
    const readCount = document.getElementById('read-count');
    readCount.innerText = cnt;
    const readPost = document.getElementById('read-post');
    const div = document.createElement('div');
    div.classList = "card w-full bg-white";
    div.innerHTML =   `
        <div class="card-body">
            <div class = "flex justify-between">
                <div>
                    <p>${postTitle}</p>
                </div>

                <div>
                     <p><i class="fa-regular fa-eye"></i> ${postView}</p>
                </div>
            
            </div>
        </div>
    `;
    readPost.appendChild(div);
};


loadAllPost();
loadLatestPost();