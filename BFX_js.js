var key = config.API_KEY;
const APILINK ='https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=' + key 
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCHAPI = 'https://api.themoviedb.org/3/search/movie?&api_key=' + key + '&query='
const Section = document.querySelector('section')
const primaryNav = document.querySelector('.primary-navigation');
const navToggle = document.querySelector('.mobile-nav-toggle');
const form = document.querySelector('form')
const search = document.getElementById("query")
navToggle.addEventListener('click', () => {
    const visibility = primaryNav.getAttribute('data-visible')

    if (visibility === "false") {
        primaryNav.setAttribute('data-visible', true)
        navToggle.setAttribute('aria-expanded', true)
    }
    else if(visibility === "true") {
        primaryNav.setAttribute('data-visible', false)
        navToggle.setAttribute('aria-expanded', false)
    }
})

returnMovies(APILINK)

    function returnMovies(url){
        fetch(url).then(res => res.json())
        .then(function(data){
            console.log(data.results);
            data.results.forEach(element => {
                const Parent = document.createElement('div');
                Parent.setAttribute('class', 'Parent')
                
                const Child_one = document.createElement('div');
                Child_one.setAttribute('class', 'child-one')
                
                const Image = document.createElement('img')
                Image.src = IMG_PATH + element.poster_path

                const Child_two = document.createElement('div');
                Child_two.setAttribute('class', 'child-two')
    
                Child_two.textContent = `${element.title}`

                const Child_three = document.createElement('div')
                Child_three.setAttribute('class', 'child-three')

                const butn1 = document.createElement('button')
                const butn2 = document.createElement('button')
                butn1.innerText = "PLAY"
                butn2.innerText = "SAVE"
                butn2.setAttribute('id', 'btn')

                Parent.appendChild(Child_one)
                Parent.appendChild(Child_two)
                Parent.appendChild(Child_three)
                Child_one.appendChild(Image)
                Child_three.appendChild(butn1)
                Child_three.appendChild(butn2)
                Section.appendChild(Parent)
////Breaks here

            });
        });
    }
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        Section.innerHTML = ''
    
        const searchItem = search.value;
    
        if (searchItem) {
            returnMovies(SEARCHAPI + searchItem);
            search.value = "";
        }
    
    })