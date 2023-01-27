let api = 'LhqxB7GE9a95beFHqiNC85GHdrX8hNi34H2uQ7QG'
    let auth = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwOi8vd3d3LnR2dGltZS5jb20iLCJleHAiOjE2Nzk3NjM5NzksImlhdCI6MTY3NDU3OTk3OSwiaWQiOiI2Njk2OTM0MCIsImlzcyI6Imh0dHA6Ly93d3cudHZ0aW1lLmNvbSIsIm5hbWUiOiIiLCJyb2xlcyI6W10sInVzZXJuYW1lIjoiNjY5NjkzNDAifQ.E6AtaFoDNqZBVz7eMJ6oCj8hDZ_dUuIgiycYrPE-7-e11t2sBb7uWEecTTMMkVcEQpI6lrfg__bSosfHU4P8HTi-KQxJt5rw4rRxzGFRWLS6KnMkG6kjCMyRrnAdrg9YekSaGa7OHIuCQWoIRqgfJ1vjE1Q8meR4HIX0DUjoA89RfnO6Ckdd1e9jNXI-KGKuN8aeRWP85kD--DKGHAkYpIwnnsaH9ECAghCgHlid_wwbFDqeTpdu-M18FAbkOv_Yh_m_8F4gMjUbnW-U6pDdkXqugM2phB2VEzggCL2QOD2H0s1c2By3F9R7Xic1jQtT5_QNWV8CGt-i_VlKHx9IZw'
    
  
  let poster = document.querySelector('.poster')
  let serieTV = document.querySelector('.serieTV')
  
  let serieInfo = document.querySelector('.serieInfo')
  
  let spinner = document.querySelector('.loading')

  let imgInfo, h3Info, pInfo, typeInfo, spanInfo, dateUscita;
  
  imgInfo = document.querySelector('#imgInfo')
  
  h3Info = document.querySelector('#h3Info')
  
  pInfo = document.querySelector('#pInfo')
  
  typeInfo = document.querySelector('#typeInfo')
  
  spanInfo = document.querySelector('#spanInfo')
  dateUscita = document.querySelector('#dateUscita')
  
  let closeBTN = document.querySelector('.close')

  let story, dayTime,hoursTime,durata, folowers;

  story = document.querySelector('#story')
  dayTime = document.querySelector('#dayTime')
  hoursTime = document.querySelector('#hoursTime')
  durata = document.querySelector('#durata')
  folowers = document.querySelector('#folowers')


  let parentPerson = document.querySelector('.castParent')
    function search() {
        fetch('https://cors-anywhere.herokuapp.com/https://search.tvtime.com/v1/search/series?limit=1&offset=0&q='+encodeURIComponent(title), {headers: {'x-api-key': api, 'Authorization': 'Bearer '+auth}})
 
    .then( r => r.json()).then( res => {
    
 })
    }

    let parentSerie = document.querySelector('.serie')
    fetch('https://76aoj6qf4l.execute-api.us-east-1.amazonaws.com/API/Home')
    .then(r => r.json()).then( res => {
        
        for (const key in res) {

            let idSerie = res[key].id
            let urlImg = res[key].fanart.url
            let nameSerie = res[key].name

            let serieContainer = document.createElement('div')
            serieContainer.setAttribute('class', 'serie-container')

            let imgSerie = document.createElement('img')
            imgSerie.setAttribute('src', urlImg)

            serieContainer.appendChild(imgSerie)
            parentSerie.appendChild(serieContainer)

        }
        
        parentSerie.onclick = function (e) {
            var tgt = e.target, i = 0, items;
            if (tgt === this) return;
            items = children(this);
            while (tgt.parentNode !== this) tgt = tgt.parentNode;
            while (items[i] !== tgt) i++;
            
            spinner.style.display = 'flex'

            setTimeout(() => {
                spinner.style.display = 'none'
            }, 2000);
      
      poster.style.display = 'none'
      serieTV.style.display = 'none'
      serieInfo.style.display = 'flex'
      
      closeBTN.style.display = 'flex'
      
      h3Info.innerHTML = res[i].name
      
      
      imgInfo.setAttribute('src', res[i].fanart.url)
      

      fetch('https://76aoj6qf4l.execute-api.us-east-1.amazonaws.com/API/INFO/'+res[i].id)
      .then( reso => reso.json()).then(info => { 
        

        pInfo.innerHTML = info.season_count + ' Season - '+info.network
        spanInfo.innerHTML = info.rating+ '/10'
        typeInfo.innerHTML = '<p>Type: '+info.genres[0]+', '+info.genres[1]+', '+info.genres[2]+'</p>'
        dateUscita.innerHTML = info.first_air_date
        story.innerHTML = info.overview
        

        function kFormatter(num) {
            return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
        }

        dayTime.innerHTML = info.day_of_week
        hoursTime.innerHTML = info.air_time
        durata.innerHTML = info.runtime+' min'
        folowers.innerHTML = kFormatter(info.follower_count)+' watched this Serie TV'


        for (const keps in info.characters) {
           

            let personDiv = document.createElement('div')
            personDiv.setAttribute('class', 'person')

            let imgPersona = document.createElement('img')
            imgPersona.setAttribute('src', info.characters[keps].poster.url)

            personDiv.appendChild(imgPersona)

            let infoPerson = document.createElement('div')
            infoPerson.setAttribute('class', 'infoPerson')

            let nameH5 = document.createElement('h5')
            let nameH4 = document.createElement('h4')

            nameH5.innerHTML =  info.characters[keps].name
            nameH4.innerHTML =  info.characters[keps].actor_name

            infoPerson.appendChild(nameH5)
            infoPerson.appendChild(nameH4)

            personDiv.appendChild(infoPerson)

            parentPerson.appendChild(personDiv)

        }
        
      })
     
        };
        
        function children(el) {
            var i = 0, children = [], child;
            while (child = el.childNodes[i++]) {
                if (child.nodeType === 1) children.push(child);
            }
            return children;
        }

        
        
    })


    let parentSerieV2 = document.querySelector('.serieV2')
    let parentSerieV3 = document.querySelector('.serieV3')
    let parentSerieV4 = document.querySelector('.serieV4')
    let parentSerieV5 = document.querySelector('.serieV5')

  

    function random(params) {
        return Math.floor(Math.random() * 100) +2;
    }

    function random1(params) {
        return Math.floor(Math.random() * 100) +2;
    }
    function random2(params) {
        return Math.floor(Math.random() * 100) +2;
    }
    function random3(params) {
        return Math.floor(Math.random() * 100) +2;
    }
   fetch('https://76aoj6qf4l.execute-api.us-east-1.amazonaws.com/API/'+random())
    .then(r => r.json()).then( res => {
        
        for (const key in res) {

            let idSerie = res[key].id
            let urlImg = res[key].fanart.url
            let nameSerie = res[key].name

            let serieContainer = document.createElement('div')
            serieContainer.setAttribute('class', 'serie-container')

            let imgSerie = document.createElement('img')
            imgSerie.setAttribute('src', urlImg)

            serieContainer.appendChild(imgSerie)
            parentSerieV2.appendChild(serieContainer)

        }
        
        parentSerieV2.onclick = function (e) {
            var tgt = e.target, i = 0, items;
            if (tgt === this) return;
            items = children(this);
            while (tgt.parentNode !== this) tgt = tgt.parentNode;
            while (items[i] !== tgt) i++;

            spinner.style.display = 'flex'

            setTimeout(() => {
                spinner.style.display = 'none'
            }, 2000);
            
            poster.style.display = 'none'
            serieTV.style.display = 'none'
            serieInfo.style.display = 'flex'
            
            closeBTN.style.display = 'flex'
            
            h3Info.innerHTML = res[i].name
            
            
            imgInfo.setAttribute('src', res[i].fanart.url)
            
            
            
            
      
            fetch('https://76aoj6qf4l.execute-api.us-east-1.amazonaws.com/API/INFO/'+res[i].id)
            .then( reso => reso.json()).then(info => { 
              
      
              pInfo.innerHTML = info.season_count + ' Season - '+info.network
              spanInfo.innerHTML = info.rating+ '/10'
              typeInfo.innerHTML = '<p>Type: '+info.genres[0]+', '+info.genres[1]+', '+info.genres[2]+'</p>'
              dateUscita.innerHTML = info.first_air_date
              story.innerHTML = info.overview
              
      
              function kFormatter(num) {
                  return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
              }
      
              dayTime.innerHTML = info.day_of_week
              hoursTime.innerHTML = info.air_time
              durata.innerHTML = info.runtime+' min'
              folowers.innerHTML = kFormatter(info.follower_count)+' watched this Serie TV'
      
      
              for (const keps in info.characters) {
                 
      
                  let personDiv = document.createElement('div')
                  personDiv.setAttribute('class', 'person')
      
                  let imgPersona = document.createElement('img')
                  imgPersona.setAttribute('src', info.characters[keps].poster.url)
      
                  personDiv.appendChild(imgPersona)
      
                  let infoPerson = document.createElement('div')
                  infoPerson.setAttribute('class', 'infoPerson')
      
                  let nameH5 = document.createElement('h5')
                  let nameH4 = document.createElement('h4')
      
                  nameH5.innerHTML =  info.characters[keps].name
                  nameH4.innerHTML =  info.characters[keps].actor_name
      
                  infoPerson.appendChild(nameH5)
                  infoPerson.appendChild(nameH4)
      
                  personDiv.appendChild(infoPerson)
      
                  parentPerson.appendChild(personDiv)
      
              }
              
            })
           
              };
        
        function children(el) {
            var i = 0, children = [], child;
            while (child = el.childNodes[i++]) {
                if (child.nodeType === 1) children.push(child);
            }
            return children;
        }

    
      
        
    })
  
    fetch('https://76aoj6qf4l.execute-api.us-east-1.amazonaws.com/API/'+random3())
    .then(r => r.json()).then( res => {
        
        for (const key in res) {

            let idSerie = res[key].id
            let urlImg = res[key].fanart.url
            let nameSerie = res[key].name

            let serieContainer = document.createElement('div')
            serieContainer.setAttribute('class', 'serie-container')

            let imgSerie = document.createElement('img')
            imgSerie.setAttribute('src', urlImg)

            serieContainer.appendChild(imgSerie)
            parentSerieV3.appendChild(serieContainer)
            
        }
        
        parentSerieV3.onclick = function (e) {
            var tgt = e.target, i = 0, items;
            if (tgt === this) return;
            items = children(this);
            while (tgt.parentNode !== this) tgt = tgt.parentNode;
            while (items[i] !== tgt) i++;

            spinner.style.display = 'flex'

            setTimeout(() => {
                spinner.style.display = 'none'
            }, 2000);
            
            poster.style.display = 'none'
            serieTV.style.display = 'none'
            serieInfo.style.display = 'flex'
            
            closeBTN.style.display = 'flex'

            h3Info.innerHTML = res[i].name
            
            
            imgInfo.setAttribute('src', res[i].fanart.url)
            
            
            
            
      
            fetch('https://76aoj6qf4l.execute-api.us-east-1.amazonaws.com/API/INFO/'+res[i].id)
            .then( reso => reso.json()).then(info => { 
              
      
              pInfo.innerHTML = info.season_count + ' Season - '+info.network
              spanInfo.innerHTML = info.rating+ '/10'
              typeInfo.innerHTML = '<p>Type: '+info.genres[0]+', '+info.genres[1]+', '+info.genres[2]+'</p>'
              dateUscita.innerHTML = info.first_air_date
              story.innerHTML = info.overview
              
      
              function kFormatter(num) {
                  return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
              }
      
              dayTime.innerHTML = info.day_of_week
              hoursTime.innerHTML = info.air_time
              durata.innerHTML = info.runtime+' min'
              folowers.innerHTML = kFormatter(info.follower_count)+' watched this Serie TV'
      
      
              for (const keps in info.characters) {
                
      
                  let personDiv = document.createElement('div')
                  personDiv.setAttribute('class', 'person')
      
                  let imgPersona = document.createElement('img')
                  imgPersona.setAttribute('src', info.characters[keps].poster.url)
      
                  personDiv.appendChild(imgPersona)
      
                  let infoPerson = document.createElement('div')
                  infoPerson.setAttribute('class', 'infoPerson')
      
                  let nameH5 = document.createElement('h5')
                  let nameH4 = document.createElement('h4')
      
                  nameH5.innerHTML =  info.characters[keps].name
                  nameH4.innerHTML =  info.characters[keps].actor_name
      
                  infoPerson.appendChild(nameH5)
                  infoPerson.appendChild(nameH4)
      
                  personDiv.appendChild(infoPerson)
      
                  parentPerson.appendChild(personDiv)
      
              }
              
            })
           
              };
        
        function children(el) {
            var i = 0, children = [], child;
            while (child = el.childNodes[i++]) {
                if (child.nodeType === 1) children.push(child);
            }
            return children;
        }

    
      
        
    })
  



    fetch('https://76aoj6qf4l.execute-api.us-east-1.amazonaws.com/API/'+random2())
    .then(r => r.json()).then( res => {
        
        for (const key in res) {

            let idSerie = res[key].id
            let urlImg = res[key].fanart.url
            let nameSerie = res[key].name

            let serieContainer = document.createElement('div')
            serieContainer.setAttribute('class', 'serie-container')

            let imgSerie = document.createElement('img')
            imgSerie.setAttribute('src', urlImg)

            serieContainer.appendChild(imgSerie)
            parentSerieV4.appendChild(serieContainer)

        }
        
        parentSerieV4.onclick = function (e) {
            var tgt = e.target, i = 0, items;
            if (tgt === this) return;
            items = children(this);
            while (tgt.parentNode !== this) tgt = tgt.parentNode;
            while (items[i] !== tgt) i++;

            spinner.style.display = 'flex'

            setTimeout(() => {
                spinner.style.display = 'none'
            }, 2000);
            
            poster.style.display = 'none'
            serieTV.style.display = 'none'
            serieInfo.style.display = 'flex'
            
            closeBTN.style.display = 'flex'

            h3Info.innerHTML = res[i].name
            
            
            imgInfo.setAttribute('src', res[i].fanart.url)
            
            
            
          
      
            fetch('https://76aoj6qf4l.execute-api.us-east-1.amazonaws.com/API/INFO/'+res[i].id)
            .then( reso => reso.json()).then(info => { 
            
      
              pInfo.innerHTML = info.season_count + ' Season - '+info.network
              spanInfo.innerHTML = info.rating+ '/10'
              typeInfo.innerHTML = '<p>Type: '+info.genres[0]+', '+info.genres[1]+', '+info.genres[2]+'</p>'
              dateUscita.innerHTML = info.first_air_date
              story.innerHTML = info.overview
              
      
              function kFormatter(num) {
                  return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
              }
      
              dayTime.innerHTML = info.day_of_week
              hoursTime.innerHTML = info.air_time
              durata.innerHTML = info.runtime+' min'
              folowers.innerHTML = kFormatter(info.follower_count)+' watched this Serie TV'
      
      
              for (const keps in info.characters) {
                  
      
                  let personDiv = document.createElement('div')
                  personDiv.setAttribute('class', 'person')
      
                  let imgPersona = document.createElement('img')
                  imgPersona.setAttribute('src', info.characters[keps].poster.url)
      
                  personDiv.appendChild(imgPersona)
      
                  let infoPerson = document.createElement('div')
                  infoPerson.setAttribute('class', 'infoPerson')
      
                  let nameH5 = document.createElement('h5')
                  let nameH4 = document.createElement('h4')
      
                  nameH5.innerHTML =  info.characters[keps].name
                  nameH4.innerHTML =  info.characters[keps].actor_name
      
                  infoPerson.appendChild(nameH5)
                  infoPerson.appendChild(nameH4)
      
                  personDiv.appendChild(infoPerson)
      
                  parentPerson.appendChild(personDiv)
      
              }
              
            })
           
              };
        
        function children(el) {
            var i = 0, children = [], child;
            while (child = el.childNodes[i++]) {
                if (child.nodeType === 1) children.push(child);
            }
            return children;
        }

    
      
        
    })
  

    fetch('https://76aoj6qf4l.execute-api.us-east-1.amazonaws.com/API/'+random1())
    .then(r => r.json()).then( res => {
        
        for (const key in res) {

            let idSerie = res[key].id
            let urlImg = res[key].fanart.url
            let nameSerie = res[key].name

            let serieContainer = document.createElement('div')
            serieContainer.setAttribute('class', 'serie-container')

            let imgSerie = document.createElement('img')
            imgSerie.setAttribute('src', urlImg)

            serieContainer.appendChild(imgSerie)
            parentSerieV5.appendChild(serieContainer)

        }
        
        parentSerieV5.onclick = function (e) {
            var tgt = e.target, i = 0, items;
            if (tgt === this) return;
            items = children(this);
            while (tgt.parentNode !== this) tgt = tgt.parentNode;
            while (items[i] !== tgt) i++;
            
            spinner.style.display = 'flex'

            setTimeout(() => {
                spinner.style.display = 'none'
            }, 2000);

            poster.style.display = 'none'
            serieTV.style.display = 'none'
            serieInfo.style.display = 'flex'
            
            
            closeBTN.style.display = 'flex'

            h3Info.innerHTML = res[i].name
            
            
            imgInfo.setAttribute('src', res[i].fanart.url)
            
            
            
      
            fetch('https://76aoj6qf4l.execute-api.us-east-1.amazonaws.com/API/INFO/'+res[i].id)
            .then( reso => reso.json()).then(info => { 
              
      
              pInfo.innerHTML = info.season_count + ' Season - '+info.network
              spanInfo.innerHTML = info.rating+ '/10'
              typeInfo.innerHTML = '<p>Type: '+info.genres[0]+', '+info.genres[1]+', '+info.genres[2]+'</p>'
              dateUscita.innerHTML = info.first_air_date
              story.innerHTML = info.overview
              
      
              function kFormatter(num) {
                  return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
              }
      
              dayTime.innerHTML = info.day_of_week
              hoursTime.innerHTML = info.air_time
              durata.innerHTML = info.runtime+' min'
              folowers.innerHTML = kFormatter(info.follower_count)+' watched this Serie TV'
      
      
              for (const keps in info.characters) {
                  
      
                  let personDiv = document.createElement('div')
                  personDiv.setAttribute('class', 'person')
      
                  let imgPersona = document.createElement('img')
                  imgPersona.setAttribute('src', info.characters[keps].poster.url)
      
                  personDiv.appendChild(imgPersona)
      
                  let infoPerson = document.createElement('div')
                  infoPerson.setAttribute('class', 'infoPerson')
      
                  let nameH5 = document.createElement('h5')
                  let nameH4 = document.createElement('h4')
      
                  nameH5.innerHTML =  info.characters[keps].name
                  nameH4.innerHTML =  info.characters[keps].actor_name
      
                  infoPerson.appendChild(nameH5)
                  infoPerson.appendChild(nameH4)
      
                  personDiv.appendChild(infoPerson)
      
                  parentPerson.appendChild(personDiv)
      
              }
              
            })
           
              };
        
        function children(el) {
            var i = 0, children = [], child;
            while (child = el.childNodes[i++]) {
                if (child.nodeType === 1) children.push(child);
            }
            return children;
        }

    
      
        
    })
  
   
    
    let parentSerie0 = document.querySelector('.serie0')
    fetch('https://76aoj6qf4l.execute-api.us-east-1.amazonaws.com/API/MOST')
    .then(r => r.json()).then( res => {
        
        for (const key in res) {

            let idSerie = res[key].id
            let urlImg = res[key].fanart.url
            let nameSerie = res[key].name

            let serieContainer = document.createElement('div')
            serieContainer.setAttribute('class', 'serie-container')

            let imgSerie = document.createElement('img')
            imgSerie.setAttribute('src', urlImg)

            serieContainer.appendChild(imgSerie)
            parentSerie0.appendChild(serieContainer)

        }
        
        parentSerie0.onclick = function (e) {
            var tgt = e.target, i = 0, items;
            if (tgt === this) return;
            items = children(this);
            while (tgt.parentNode !== this) tgt = tgt.parentNode;
            while (items[i] !== tgt) i++;
            
            spinner.style.display = 'flex'

            setTimeout(() => {
                spinner.style.display = 'none'
            }, 2000);
      
      poster.style.display = 'none'
      serieTV.style.display = 'none'
      serieInfo.style.display = 'flex'
      
      closeBTN.style.display = 'flex'
      
      h3Info.innerHTML = res[i].name
      
      
      imgInfo.setAttribute('src', res[i].fanart.url)
      

      fetch('https://76aoj6qf4l.execute-api.us-east-1.amazonaws.com/API/INFO/'+res[i].id)
      .then( reso => reso.json()).then(info => { 
        

        pInfo.innerHTML = info.season_count + ' Season - '+info.network
        spanInfo.innerHTML = info.rating+ '/10'
        typeInfo.innerHTML = '<p>Type: '+info.genres[0]+', '+info.genres[1]+', '+info.genres[2]+'</p>'
        dateUscita.innerHTML = info.first_air_date
        story.innerHTML = info.overview
        

        function kFormatter(num) {
            return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
        }

        dayTime.innerHTML = info.day_of_week
        hoursTime.innerHTML = info.air_time
        durata.innerHTML = info.runtime+' min'
        folowers.innerHTML = kFormatter(info.follower_count)+' watched this Serie TV'


        for (const keps in info.characters) {
           

            let personDiv = document.createElement('div')
            personDiv.setAttribute('class', 'person')

            let imgPersona = document.createElement('img')
            imgPersona.setAttribute('src', info.characters[keps].poster.url)

            personDiv.appendChild(imgPersona)

            let infoPerson = document.createElement('div')
            infoPerson.setAttribute('class', 'infoPerson')

            let nameH5 = document.createElement('h5')
            let nameH4 = document.createElement('h4')

            nameH5.innerHTML =  info.characters[keps].name
            nameH4.innerHTML =  info.characters[keps].actor_name

            infoPerson.appendChild(nameH5)
            infoPerson.appendChild(nameH4)

            personDiv.appendChild(infoPerson)

            parentPerson.appendChild(personDiv)

        }
        
      })
     
        };
        
        function children(el) {
            var i = 0, children = [], child;
            while (child = el.childNodes[i++]) {
                if (child.nodeType === 1) children.push(child);
            }
            return children;
        }

        
        
    })

    closeBTN.onclick = () => {
        location.reload();
    }
	
	// ok
	
	let svgSearch = document.querySelector('.svgSearch')
let links = document.querySelector('.links')

let inputSearch, btnSearch, logos;

inputSearch = document.querySelector('#inputSearch')

btnSearch = document.querySelector('#btnSearch')

logos = document.querySelector('#logos')

    

let serieCon = document.querySelector(".serie-container")


btnSearch.onclick = search

function search() {
	
	spinner.style.display = 'flex'

            setTimeout(() => {
                spinner.style.display = 'none'
            }, 2000);
      
      poster.style.display = 'none'
      serieTV.style.display = 'none'
			
			
	fetch('https://76aoj6qf4l.execute-api.us-east-1.amazonaws.com/API/limit/10/search/'+encodeURIComponent(inputSearch.value))
	.then(r => r.json()).then(res => {
		
		
		
		
		for (ke in res.data) {
			let divol = document.createElement('div')
			divol.setAttribute('class', 'srcParent')
			
			let imgDivol = document.createElement('img')
			imgDivol.setAttribute('src', res.data[ke].poster.url)
			
			divol.appendChild(imgDivol)
			
			serieCon.appendChild(divol)
		}
		
		
		serieCon.onclick = function (e) {
            var tgt = e.target, i = 0, items;
            if (tgt === this) return;
            items = children(this);
            while (tgt.parentNode !== this) tgt = tgt.parentNode;
            while (items[i] !== tgt) i++;
			
			
			console.log(res.data[i].id)
			
			
            spinner.style.display = 'flex'

            setTimeout(() => {
                spinner.style.display = 'none'
            }, 2000);
      
      poster.style.display = 'none'
      serieTV.style.display = 'none'
      serieInfo.style.display = 'flex'
      
      closeBTN.style.display = 'flex'
      
      h3Info.innerHTML = res.data[i].name
      
      
      imgInfo.setAttribute('src', res.data[i].poster.url)
      

      fetch('https://76aoj6qf4l.execute-api.us-east-1.amazonaws.com/API/INFO/'+res.data[i].id)
      .then( reso => reso.json()).then(info => { 
        
        pInfo.innerHTML = info.season_count + ' Season - '+info.network
        spanInfo.innerHTML = info.rating+ '/10'
        typeInfo.innerHTML = '<p>Type: '+info.genres[0]+', '+info.genres[1]+', '+info.genres[2]+'</p>'
        dateUscita.innerHTML = info.first_air_date
        story.innerHTML = info.overview
        

        function kFormatter(num) {
            return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
        }

        dayTime.innerHTML = info.day_of_week
        hoursTime.innerHTML = info.air_time
        durata.innerHTML = info.runtime+' min'
        folowers.innerHTML = kFormatter(info.follower_count)+' watched this Serie TV'


        for (const keps in info.characters) {
           

            let personDiv = document.createElement('div')
            personDiv.setAttribute('class', 'person')

            let imgPersona = document.createElement('img')
            imgPersona.setAttribute('src', info.characters[keps].poster.url)

            personDiv.appendChild(imgPersona)

            let infoPerson = document.createElement('div')
            infoPerson.setAttribute('class', 'infoPerson')

            let nameH5 = document.createElement('h5')
            let nameH4 = document.createElement('h4')

            nameH5.innerHTML =  info.characters[keps].name
            nameH4.innerHTML =  info.characters[keps].actor_name

            infoPerson.appendChild(nameH5)
            infoPerson.appendChild(nameH4)

            personDiv.appendChild(infoPerson)

            parentPerson.appendChild(personDiv)

        }
				
				
        
	})
     
        };
        
		
		
		
        function children(el) {
            var i = 0, children = [], child;
            while (child = el.childNodes[i++]) {
                if (child.nodeType === 1) children.push(child);
            }
            return children;
        }
		
	})
}

var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;

svgSearch.onclick = () =>{
	svgSearch.style.animationName = 'expo'
	
	
	if (width < 600) {
		setTimeout(()=>{
		logos.style.display = 'none'
		links.style.display = 'flex'
		svgSearch.style.display = 'none'
		serieCon.style.justifyContent = 'space-between'
		console.log("is small")
	}, 400)
	} else {
		setTimeout(()=>{
		logos.style.display = 'flex'
		links.style.display = 'flex'
		svgSearch.style.display = 'none'
		console.log("is Big")
	}, 400)
	}
	
}

let closeSvg = document.getElementById('closeSvg')

closeSvg.onclick = ()=>{
	svgSearch.style.animationName = 'expi'
	
	setTimeout(()=>{
		logos.style.display = 'flex'
		links.style.display = 'none'
		svgSearch.style.display = 'flex'
		console.log("is Big")
	}, 400)
}

 

// Serie TV Page

let parentSerieZ = document.querySelector('.serieZ')
    fetch('https://76aoj6qf4l.execute-api.us-east-1.amazonaws.com/API/limit/25/sort/recommended')
    .then(r => r.json()).then( res => {
        
        for (const key in res) {

            let idSerie = res[key].id
            let urlImg = res[key].fanart.url
            let nameSerie = res[key].name

            let serieContainer = document.createElement('div')
            serieContainer.setAttribute('class', 'serie-container')

            let imgSerie = document.createElement('img')
            imgSerie.setAttribute('src', urlImg)

            serieContainer.appendChild(imgSerie)
            parentSerieZ.appendChild(serieContainer)

        }
        
        parentSerieZ.onclick = function (e) {
            var tgt = e.target, i = 0, items;
            if (tgt === this) return;
            items = children(this);
            while (tgt.parentNode !== this) tgt = tgt.parentNode;
            while (items[i] !== tgt) i++;
            
            spinner.style.display = 'flex'

            setTimeout(() => {
                spinner.style.display = 'none'
            }, 2000);
      
      poster.style.display = 'none'
      serieTV.style.display = 'none'
      serieInfo.style.display = 'flex'
      
      closeBTN.style.display = 'flex'
      
      h3Info.innerHTML = res[i].name
      
      
      imgInfo.setAttribute('src', res[i].fanart.url)
      

      fetch('https://76aoj6qf4l.execute-api.us-east-1.amazonaws.com/API/INFO/'+res[i].id)
      .then( reso => reso.json()).then(info => { 
        

        pInfo.innerHTML = info.season_count + ' Season - '+info.network
        spanInfo.innerHTML = info.rating+ '/10'
        typeInfo.innerHTML = '<p>Type: '+info.genres[0]+', '+info.genres[1]+', '+info.genres[2]+'</p>'
        dateUscita.innerHTML = info.first_air_date
        story.innerHTML = info.overview
        

        function kFormatter(num) {
            return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
        }

        dayTime.innerHTML = info.day_of_week
        hoursTime.innerHTML = info.air_time
        durata.innerHTML = info.runtime+' min'
        folowers.innerHTML = kFormatter(info.follower_count)+' watched this Serie TV'


        for (const keps in info.characters) {
           

            let personDiv = document.createElement('div')
            personDiv.setAttribute('class', 'person')

            let imgPersona = document.createElement('img')
            imgPersona.setAttribute('src', info.characters[keps].poster.url)

            personDiv.appendChild(imgPersona)

            let infoPerson = document.createElement('div')
            infoPerson.setAttribute('class', 'infoPerson')

            let nameH5 = document.createElement('h5')
            let nameH4 = document.createElement('h4')

            nameH5.innerHTML =  info.characters[keps].name
            nameH4.innerHTML =  info.characters[keps].actor_name

            infoPerson.appendChild(nameH5)
            infoPerson.appendChild(nameH4)

            personDiv.appendChild(infoPerson)

            parentPerson.appendChild(personDiv)

        }
        
      })
     
        };
        
        function children(el) {
            var i = 0, children = [], child;
            while (child = el.childNodes[i++]) {
                if (child.nodeType === 1) children.push(child);
            }
            return children;
        }

        
        
    })
	
		
	window.onload = Loader
	
	
	function Loader(mo) {
		if (mo = true) {
			spinner.style.display = 'flex'
			
			setTimeout(()=>{
				spinner.style.display = 'none'
			}, 2500)
			return false
		}
	}
	
	Loader(true)
	
	// end serieZ 
