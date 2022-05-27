const key = '4QdQ1hBWFaignP-G6W-alx14PyUDmFMgQ8fr7kMTUO0'
const msg = document.querySelector('.msg');


timeOfDay = () => {
  let date = new Date();
  let hour = date.getHours();
  // Morning 
  if (hour >= 5 && hour < 12) {
     msg.innerHTML = 'Good Morning!';
  }
// Afternoon
  if (hour >= 12 && hour < 17) {
    msg.innerHTML = 'Good Afternoon!';
  }
  // Evening
  else {
    msg.innerHTML = 'Good Evening!' 
  }
}

window.addEventListener('load', timeOfDay);

document.querySelector("#input").addEventListener("keydown", (event) => {
  if (event.key == "Enter")
    apiRequest();
});

document.querySelector("#search").addEventListener("click", () => {
    apiRequest();
});

apiRequest = () => {
  document.querySelector("#grid").textContent = "";

  const url = `https://api.unsplash.com/search/photos/?query=${input.value}
  &per_page=18&client_id=${key}`

  fetch(url)
  .then(response => {
    if (!response.ok) throw Error(response.statusText);
      return response.json();
   })
   .then(data => {
      loadImages(data);
   })
   .catch(error => console.log(error));   
}

loadImages = (data) => {
  for(let i = 0;i < data.results.length;i++) {
    let image = document.createElement("div"); 

    image.className = 'img';

    image.style.backgroundImage = `url(${data.results[i].urls.raw}&w=1366&h=768)`

    image.addEventListener("dblclick", function() {
      window.open(data.results[i].links.download, '_blank');
    }) 

    document.querySelector("#grid").appendChild(image);
  }
}







