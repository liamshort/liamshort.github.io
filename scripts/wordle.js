function wordle_func(){
  document.getElementById("content").innerHTML = "";

  let loader = `<div class="loader" id="loader"></div>`;
  document.getElementById("loader_temp").innerHTML = loader;

  wordle = document.querySelector("#content");

  var style = getComputedStyle(document.body);

  var form = document.getElementById("searchform");
  var found = form.elements.found.value.toLowerCase();
  var exclude = form.elements.exclude.value.toLowerCase();
  var letter0 = form.elements.letter0.value.toLowerCase();
  var letter1 = form.elements.letter1.value.toLowerCase();
  var letter2 = form.elements.letter2.value.toLowerCase();
  var letter3 = form.elements.letter3.value.toLowerCase();
  var letter4 = form.elements.letter4.value.toLowerCase();

  fetch(
    "https://apis.liamshort.dev/wordle?found=" +
      String(found) +
      "&exclude=" +
      String(exclude) +
      "&letter0=" +
      String(letter0) +
      "&letter1=" +
      String(letter1) +
      "&letter2=" +
      String(letter2) +
      "&letter3=" +
      String(letter3) +
      "&letter4=" +
      String(letter4)
  )
    .then((response) => response.json())
    .then((words) => {
      words["no_duplicates"].forEach((word) => {
        link = document.createElement("a");
        link.setAttribute("href", "https://www.dictionary.com/browse/" + word);
        link.setAttribute("target", "_blank");
        link.setAttribute("id", "wordle");
        item = document.createElement("div");
        var word_processed = "";
        for (var i = 0; i < word.length; i++) {
          if (
            word.charAt(i) == letter0 ||
            word.charAt(i) == letter1 ||
            word.charAt(i) == letter2 ||
            word.charAt(i) == letter3 ||
            word.charAt(i) == letter4
          ) {
            word_processed =
              word_processed +
              '<span style="color:' +
              style.getPropertyValue("--green") +
              ';">' +
              word.charAt(i) +
              "</span>";
          } else if (found.includes(word.charAt(i))) {
            word_processed =
              word_processed +
              '<span style="color: ' +
              style.getPropertyValue("--orange") +
              ';">' +
              word.charAt(i) +
              "</span>";
          } else {
            word_processed = word_processed + word.charAt(i);
          }
        }
        item.innerHTML = word_processed;
        link.appendChild(item);
        wordle.appendChild(link);
      });

      words["duplicates"].forEach((word) => {
        link = document.createElement("a");
        link.setAttribute("href", "https://www.dictionary.com/browse/" + word);
        link.setAttribute("target", "_blank");
        link.setAttribute("id", "wordle");
        item = document.createElement("div");
        var word_processed = "";
        for (var i = 0; i < word.length; i++) {
          if (word.charAt(i) == letter0) {
            word_processed =
              word_processed +
              '<span style="color: ' +
              style.getPropertyValue("--green") +
              ';">' +
              word.charAt(i) +
              "</span>";
          } else if (word.charAt(i) == letter1) {
            word_processed =
              word_processed +
              '<span style="color: ' +
              style.getPropertyValue("--green") +
              ';">' +
              word.charAt(i) +
              "</span>";
          } else if (word.charAt(i) == letter2) {
            word_processed =
              word_processed +
              '<span style="color: ' +
              style.getPropertyValue("--green") +
              ';">' +
              word.charAt(i) +
              "</span>";
          } else if (word.charAt(i) == letter3) {
            word_processed =
              word_processed +
              '<span style="color: ' +
              style.getPropertyValue("--green") +
              ';">' +
              word.charAt(i) +
              "</span>";
          } else if (word.charAt(i) == letter4) {
            word_processed =
              word_processed +
              '<span style="color: ' +
              style.getPropertyValue("--green") +
              ';">' +
              word.charAt(i) +
              "</span>";
          } else if (found.includes(word.charAt(i))) {
            word_processed =
              word_processed +
              '<span style="color: ' +
              style.getPropertyValue("--orange") +
              ';">' +
              word.charAt(i) +
              "</span>";
          } else {
            word_processed = word_processed + word.charAt(i);
          }
        }
        item.innerHTML = word_processed;
        link.appendChild(item);
        wordle.appendChild(link);
      });

      var elem = document.getElementById("loader");
      elem.parentNode.removeChild(elem);
    });
}
