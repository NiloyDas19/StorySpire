
const loadLatestPost = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
    const data = await res.json();
    console.log(data);

    const latestPostContainer = document.getElementById('latest-post-container');
    data.forEach(latestPost => {
        console.log(latestPost);
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







loadLatestPost();