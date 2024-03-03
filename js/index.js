
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


let postsContainer = [];

const loadAllPost = async(isSearch) => {
    let res = await fetch("https://openapi.programming-hero.com/api/retro-forum/posts");
    if(isSearch){
        const searchInputField = document.getElementById('search-input-field');
        res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchInputField.value}`)
    }
    const data = await res.json();
    const posts = data.posts;
    console.log(posts);

    const allPostContainer = document.getElementById('all-post-container');
    allPostContainer.textContent = '';


    if(posts.length === 0){
        const div = document.createElement('div');
        div.innerHTML = `
            <p class ="text-center text-3xl font-semibold">${data.message}</p>
        `;
        allPostContainer.appendChild(div);
        return;
    }


    posts.forEach(post => {
        console.log(post);
        postsContainer.push(post);
        div = document.createElement('div');
        div.classList = "card w-full bg-base-100 shadow-sm";
        div.innerHTML = `
        <div class="card-body bg-[#797DFC19] rounded-3xl">
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
                                <a onClick = "addReadPost(${post.id})" class="cursor-pointer"><i class="fa-solid fa-envelope-open"></i></a>
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
const addReadPost = (postID) => {
    console.log(postID);
    ++cnt;
    const readCount = document.getElementById('read-count');
    readCount.innerText = cnt;
    const readPost = document.getElementById('read-post');
    const div = document.createElement('div');
    div.classList = "card w-full bg-white";
    for(const post of postsContainer){
        console.log(post);
        if(post.id === postID){
            div.innerHTML =   `
                <div class="card-body">
                    <div class = "flex justify-between">
                        <div>
                            <p>${post.title}</p>
                        </div>
        
                        <div>
                             <p><i class="fa-regular fa-eye"></i> ${post.view_count}</p>
                        </div>
                    
                    </div>
                </div>
            `;
            readPost.appendChild(div);
            break;
        }
    }
};


const searchPost = (isSearch) => {
    loadAllPost(isSearch);
}

loadAllPost(false);
loadLatestPost();