content = document.querySelector("#content");

let loader = `<div class="loader" id="loader"></div>`;
document.getElementById("content").innerHTML = loader;

fetch("https://apis.liamshort.dev/profiles")
  .then((response) => response.json())
  .then((profiles_list) => {

    profile_container = document.createElement("container");
    profile_container.setAttribute("class", "content_container");

    table = document.createElement("table");

    profiles_list.forEach((item) => {
      if (item.age >= 18) {

        table_row = document.createElement("tr");
        table_data_image = document.createElement("td");
        table_data_info = document.createElement("td");

        profile_image = document.createElement("img");
        profile_image.setAttribute("src", item.id);

        profile_info = document.createElement("p");
        profile_info.innerHTML = item.name + "<br>" + item.age + "<br>" + item.gender + "<br>" + item.email + "<br>" + item.location;

        table_data_image.appendChild(profile_image)
        table_data_info.appendChild(profile_info)

        table_row.appendChild(table_data_image)
        table_row.appendChild(table_data_info)

        table.appendChild(table_row);
      }
    });

    profile_container.appendChild(table);
    content.appendChild(profile_container);

    var elem = document.getElementById("loader");
    elem.parentNode.removeChild(elem);
  });
