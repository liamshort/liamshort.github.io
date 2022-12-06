function podcasts_func(){
    document.getElementById("content").innerHTML = "";
    let loader = `<div class="loader" id="loader"></div>`;

    document.getElementById("loader_temp").innerHTML = loader;

    content = document.querySelector("#content");
    
    var form = document.getElementById("searchform");
    var name = form.elements.name.value
    var podcasts = form.elements.podcasts.value
    var episodes = form.elements.episodes.value

    fetch("https://apis.liamshort.dev/podcastindex?name=" + name + "&podcasts=" + String(podcasts) + "&episodes=" + String(episodes))
    .then(response => response.json())
    .then(podcast_list => {
        podcast_list.forEach(podcast => {
            podcast_container = document.createElement("container");
            podcast_container.setAttribute("class", "content_container");

            podcast_title = document.createElement("h2");
            podcast_title.innerHTML = podcast.title
            podcast_container.appendChild(podcast_title);

            podcast_info = document.createElement("p");
            podcast_info.innerHTML = podcast.description
            podcast_container.appendChild(podcast_info);

            table = document.createElement("table");

            podcast.episodes.forEach(episode => {
                table_row = document.createElement("tr");
                table_data_image = document.createElement("td");
                table_data_info = document.createElement("td");

                episode_audio = document.createElement("audio");
                episode_audio.setAttribute("id", "player");
                episode_audio.setAttribute("controls", "controls");
                episode_audio.setAttribute("src", episode.url);
                episode_audio.setAttribute("preload", "none");

                episode_image = document.createElement("img");
                episode_image.setAttribute("src", podcast.image);

                episode_title = document.createElement("h4");
                episode_title.innerHTML = episode.title;

                episode_date = document.createElement("p");
                episode_date.innerHTML = episode.date;

                table_data_image.appendChild(episode_image)
                table_data_info.appendChild(episode_title)
                table_data_info.appendChild(episode_date)
                table_data_info.appendChild(episode_audio)

                table_row.appendChild(table_data_image)
                table_row.appendChild(table_data_info)

                table.appendChild(table_row);
            })
            podcast_container.appendChild(table)
            content.appendChild(podcast_container)
        })
        var elem = document.getElementById("loader");
        elem.parentNode.removeChild(elem);
    })
}
