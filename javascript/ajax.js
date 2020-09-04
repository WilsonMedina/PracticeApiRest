(() => {
    /*esto es una funcion anonima autoejecutable */
    /*con el metodo XMLHttpRequest se deben declarar 4 pasos 1ro la instancia del objeto, 2do se le asigna el evento (el mas recomendado: readystatechange). 3ro se apertura la peticion y establece el metodo(verbo http) con .open(verbo js, src), 4to se envia con .send() */

    
    const d = document,
          xhr = new XMLHttpRequest(),
          $fragment = d.createDocumentFragment(),
          $ol = d.getElementById('xhr')
    
    xhr.addEventListener('readystatechange', (e) => {
        if(xhr.readyState !== 4) return

        if(xhr.status >= 200 && xhr.status <300){
            let json = JSON.parse(xhr.responseText)

            json.forEach((el) => {
                let $li = d.createElement('li')

                $li.innerHTML = `${el.name}--${el.email}--${el.phone}`

                $fragment.appendChild($li)
            });
        }else{
            let message = xhr.statusText || 'Ocurrio un error'

            $ol.innerHTML = `<h1>Error ${xhr.status}: ${message}</h1>`
        }

        $ol.appendChild($fragment)
    })   
    
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/users')

    xhr.send()
})();

(() => {
/*fetch*/
    const d = document,
          $fetch = d.getElementById('fetch'),
          $fragment = d.createDocumentFragment(),
          $loade = d.querySelector('.loade')
    
    fetch('https://jsonplaceholder.typicode.com/users')
        .then((res) => res.ok ? res.json() : Promise.reject(res))
        .then((json) => {
            //console.log(json)
            json.forEach((js) => {
                let $li = d.createElement('li')

                $li.textContent = `${js.name}--${js.email}--${js.phone}`

                $fragment.appendChild($li)
            })
            setTimeout(() => {
                $fetch.appendChild($fragment)
            }, 1500)
            
        })
        .catch((err) =>{
            let message = err.statusText || 'Ocurrio un error'

            setTimeout(() => {
                $fetch.innerHTML = `<h1>Error ${err.status}: ${message}</h1>`
            }, 1500)
        })
        .finally(() => {
            setTimeout(() => {
               $loade.classList.remove('loade')
               setTimeout(() => {
                $loade.classList.add('loade')
               },1000)
            },500)
            
        })
})();

(() => {
/*fetch async await*/
    const d = document,
          $async = d.getElementById('async'),
          $fragment = d.createDocumentFragment(),
          $loade = d.querySelector('.loade')
    
    async function getAsync(){

        try {
            let res = await fetch('https://jsonplaceholder.typicode.com/users'),
                json = await res.json()
            
            if(!res.ok) throw {status: res.status, statusText: res.statusText}  
            
            json.forEach((js) => {
                let $li = d.createElement('li')

                $li.textContent = `${js.name}--${js.email}--${js.phone}`

                $fragment.appendChild($li)
            })

           setTimeout(() => {
            $async.appendChild($fragment)
           },1500)
            

        } catch (error) {
            let message = error.statusText || 'Ocurrio un error inesperado'

            setTimeout(() => {
                $async.innerHTML = `<h1>${error.status} ${message}</h1>`
            }, 1500)
        } finally{
            setTimeout(() => {
               $loade.classList.remove('loade')
               setTimeout(() => {
                $loade.classList.add('loade')
               },1000)
            },500)
            
        }
        }    
    
    getAsync()
})();

(() => {
/*axios*/
    const d = document,
          $axios = d.getElementById('axios'),
          $fragment = d.createDocumentFragment(),
          $loade = d.querySelector('.loade')

   axios.get('https://jsonplaceholder.typicode.com/users')
   .then((res) =>{

    res.data.forEach((js) => {
        const $li = d.createElement('li')

        $li.textContent = `${js.name}--${js.email}--${js.phone}`

        $fragment.appendChild($li)
    })

    setTimeout(() => {
        $axios.appendChild($fragment)
    },1500)
   })
   .catch((err) => {
    let message = err.response.statusText || 'Ocurrio un error inesperado'

   setTimeout(() => {
    $axios.innerHTML = `<h1>${err.response.status} ${message}</h1>`
   }, 1500)

   })
   .finally(() => {
    setTimeout(() => {
       $loade.classList.remove('loade')
       setTimeout(() => {
        $loade.classList.add('loade')
       },1000)
    },500)
    
})       
})();

(() => {
/*axios async await*/
    const d = document,
    $axios_async = d.getElementById('axios-async'),
    $fragment = d.createDocumentFragment(),
    $loade = d.querySelector('.loade')

    async function getAxios(){

    try {
    let res = await axios.get('https://jsonplaceholder.typicode.com/users'),
        json = await res.data
        
    json.forEach((js) => {
        let $li = d.createElement('li')

        $li.textContent = `${js.name}--${js.email}--${js.phone}`

        $fragment.appendChild($li)
    })

    $axios_async.appendChild($fragment)   

    } catch (err) {
        let message = err.response.statusText || 'Ocurrio un error inesperado'
        
        $axios_async.innerHTML = `${err.response.status} ${message}`
    } finally {
        setTimeout(() => {
           $loade.classList.remove('loade')
           setTimeout(() => {
            $loade.classList.add('loade')
           },1000)
        },500)  
    }  
}
    getAxios()

})();

 

