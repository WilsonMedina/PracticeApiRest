/*
******************ejercicio XMLHttpRequest********************
const d = document,
      $table = d.querySelector('.api-rest-table'),
      $form = d.querySelector('.api-rest-form'),
      $title = d.querySelector('.api-rest-title'),
      $template = d.getElementById('api-rest-template').content,
      $fragment = d.createDocumentFragment()

//funcion reutilizable para todos los method
const ajax_rest = (opts) => {
    let {url, method, success, err, data} = opts

    const xhr = new XMLHttpRequest()

    xhr.addEventListener('readystatechange', (e) => {
        if(xhr.readyState !== 4) return

        if(xhr.status >= 200 && xhr.status < 300){
            let json = JSON.parse(xhr.responseText)
            success(json)
        }else{
            let message = xhr.statusText || 'Ocurrio un error'
            err(`ERROR ${xhr.status}: ${message}`)
        }
    })

    xhr.open(method || 'GET', url)
    xhr.setRequestHeader('content-type', 'application/json; charset= utf-8')
    xhr.send(JSON.stringify(data))
}

//funcion GET para la ruta completa
const getAll = () => {
    ajax_rest({
        method: 'GET',
        url: 'http://localhost:8008/fruits',
        success: (res) => {
            console.log(res)
            res.forEach(el => {
                $template.querySelector('.name').textContent = el.name
                $template.querySelector('.sabor').textContent = el.sabor
                $template.querySelector('.edit').dataset.id = el.id
                $template.querySelector('.edit').dataset.name = el.name
                $template.querySelector('.edit').dataset.sabor = el.sabor
                $template.querySelector('.delete').dataset.id = el.id
                let $clone = d.importNode($template, true)
                $fragment.appendChild($clone)
            });
            $table.querySelector('tbody').appendChild($fragment)
        },
        err: (err) => {
            console.log(err)
            $table.insertAdjacentHTML('afterend', `<p>${err}</p>`)
        },
        data: null
    })
}

d.addEventListener('DOMContentLoaded', getAll)

d.addEventListener('submit', (e) => {
    if(e.target === $form){
        e.preventDefault()

        if(!e.target.id.value){
            //POST
            ajax_rest({
                url:'http://localhost:8008/fruits',
                method: 'POST',
                success: (res) => location.reload(),
                err: (err) => $form.insertAdjacentHTML('afterend', `<p>${err}</p>`),
                data: {
                    name: e.target.nombre.value,
                    sabor: e.target.sabor.value 
                }
            })
        }else{
            //PUT
            ajax_rest({
                url:`http://localhost:8008/fruits/${e.target.id.value}`,
                method: 'PUT',
                success: (res) => location.reload(),
                err: (err) => $form.insertAdjacentHTML('afterend', `<p>${err}</p>`),
                data: {
                    name: e.target.nombre.value,
                    sabor: e.target.sabor.value 
                }
            })
        }
    }
   
})

d.addEventListener('click', e => {
    if(e.target.matches('.edit')){
        $title.textContent = 'Editar'

        $form.nombre.value = e.target.dataset.name
        $form.sabor.value = e.target.dataset.sabor
        $form.id.value = e.target.dataset.id
    }

    if(e.target.matches('.delete')){
        let isDelete = confirm(`Estas seguro que deseas eliminar el id: ${e.target.dataset.id}`)

        if(isDelete){
            //DELETE
            ajax_rest({
                url:`http://localhost:8008/fruits/${e.target.dataset.id}`,
                method: 'DELETE',
                success: (res) => location.reload(),
                err: (err) => alert(err)
            })
        }
    }
})
//***************************ejercicio fetch async await******************
const d = document,
  $table = d.querySelector(".api-rest-table"),
  $form = d.querySelector(".api-rest-form"),
  $title = d.querySelector(".api-rest-title"),
  $template = d.getElementById("api-rest-template").content,
  $fragment = d.createDocumentFragment();

const getAll = async () => {
  try {
    let res = await fetch("http://localhost:8008/fruits"),
      json = await res.json();

    if (!res.ok) throw { status: res.status, statusText: res.statusText };

    //console.log(json)
    json.forEach((el) => {
      $template.querySelector(".name").textContent = el.name;
      $template.querySelector(".sabor").textContent = el.sabor;
      $template.querySelector(".edit").dataset.id = el.id;
      $template.querySelector(".edit").dataset.name = el.name;
      $template.querySelector(".edit").dataset.sabor = el.sabor;
      $template.querySelector(".delete").dataset.id = el.id;
      let $clone = d.importNode($template, true);
      $fragment.appendChild($clone);
    });
    $table.querySelector("tbody").appendChild($fragment);
  } catch (error) {
    let message = error.statusText || "Ocurrio un error";
    $table.insertAdjacentHTML(
      "afterend",
      `<p>ERROR ${error.status}: ${message}</p>`
    );
  }
};

d.addEventListener("DOMContentLoaded", getAll);

d.addEventListener("submit", async (e) => {
  if (e.target === $form) {
    e.preventDefault();

    if (!e.target.id.value) {
      //POST
      try {
        let opts = {
            method: "POST",
            headers: {
              "content-type": "application/json; chraset=utf-8",
            },
            body: JSON.stringify({
              name: e.target.nombre.value,
              sabor: e.target.sabor.value,
            }),
          },
          res = await fetch("http://localhost:8008/fruits", opts),
          json = await res.json();

          location.reload()

        if (!res.ok) throw { status: res.status, statusText: res.statusText };
      } catch (error) {
        let message = error.statusText || "Ocurrio un error";
        $form.insertAdjacentHTML(
          "afterend",
          `<p>ERROR ${error.status} ${message}</p>`
        );
      }
    } else {
      //PUT
      try {
        let opts = {
            method: "PUT",
            headers: {
              "content-type": "application/json; chraset=utf-8",
            },
            body: JSON.stringify({
              name: e.target.nombre.value,
              sabor: e.target.sabor.value,
            }),
          },
          res = await fetch(`http://localhost:8008/fruits/${e.target.id.value}`, opts),
          json = await res.json();

        if (!res.ok) throw { status: res.status, statusText: res.statusText };
        location.reload()
      } catch (error) {
        let message = error.statusText || "Ocurrio un error";
        $form.insertAdjacentHTML(
          "afterend",
          `<p>ERROR ${error.status} ${message}</p>`
        );
      }
    }
  }
});

d.addEventListener("click", async (e) => {
  if (e.target.matches(".edit")) {
    $title.textContent = "Editar";

    $form.nombre.value = e.target.dataset.name;
    $form.sabor.value = e.target.dataset.sabor;
    $form.id.value = e.target.dataset.id;
  }

  if (e.target.matches(".delete")) {
    
    let isDelete = confirm(`Estas seguro en borrar el id: ${e.target.dataset.id}`)

    if(isDelete){
        try {
            let opts = {
                method: "DELETE",
                headers: {
                  "content-type": "application/json; chraset=utf-8",
                }
              },
              res = await fetch(`http://localhost:8008/fruits/${e.target.dataset.id}`, opts),
              json = await res.json();
    
            if (!res.ok) throw { status: res.status, statusText: res.statusText };
            location.reload()
          } catch (error) {
            let message = error.statusText || "Ocurrio un error";
            alert(`ERROR ${error.status} ${message}`);
          }
    }
  }
});*/

//*******************************axios async await**********************

const d = document,
  $table = d.querySelector(".api-rest-table"),
  $form = d.querySelector(".api-rest-form"),
  $title = d.querySelector(".api-rest-title"),
  $template = d.getElementById("api-rest-template").content,
  $fragment = d.createDocumentFragment();

const getAll = async () => {
  try {
    let res = await axios.get("http://localhost:8008/fruits"),
      json = await res.data;

    json.forEach((el) => {
      $template.querySelector(".name").textContent = el.name;
      $template.querySelector(".sabor").textContent = el.sabor;
      $template.querySelector(".edit").dataset.id = el.id;
      $template.querySelector(".edit").dataset.name = el.name;
      $template.querySelector(".edit").dataset.sabor = el.sabor;
      $template.querySelector(".delete").dataset.id = el.id;
      let $clone = d.importNode($template, true);
      $fragment.appendChild($clone);
    });
    $table.querySelector("tbody").appendChild($fragment);
  } catch (error) {
    let message = error.response.statusText || "Ocurrio un error";
    $table.insertAdjacentHTML(
      "afterend",
      `<p>ERROR ${error.response.status}: ${message}</p>`
    );
  }
};

d.addEventListener("DOMContentLoaded", getAll);

d.addEventListener("submit", async (e) => {
  if (e.target === $form) {
    e.preventDefault();

    if (!e.target.id.value) {
      //POST
      try {
        let opts = {
            method: "POST",
            headers: {
              "content-type": "application/json; chraset=utf-8",
            },
            data: JSON.stringify({
              name: e.target.nombre.value,
              sabor: e.target.sabor.value,
            }),
          },
          res = await axios("http://localhost:8008/fruits", opts),
          json = await res.data
          location.reload()

      } catch (error) {
        let message = error.response.statusText || "Ocurrio un error";
        $form.insertAdjacentHTML(
          "afterend",
          `<p>ERROR ${error.response.status} ${message}</p>`
        );
      }
    } else {
      //PUT
      try {
        let opts = {
            method: "PUT",
            headers: {
              "content-type": "application/json; chraset=utf-8",
            },
            data: JSON.stringify({
              name: e.target.nombre.value,
              sabor: e.target.sabor.value,
            }),
          },
          res = await axios(`http://localhost:8008/fruits/${e.target.id.value}`, opts),
          json = await res.data

        location.reload()
      } catch (error) {
        let message = error.response.statusText || "Ocurrio un error";
        $form.insertAdjacentHTML(
          "afterend",
          `<p><b><mark>ERROR ${error.response.status} ${message}</mark></b></p>`
        );
      }
    }
  }
});

d.addEventListener("click", async (e) => {
  if (e.target.matches(".edit")) {
    $title.textContent = "Editar";

    $form.nombre.value = e.target.dataset.name;
    $form.sabor.value = e.target.dataset.sabor;
    $form.id.value = e.target.dataset.id;
  }

  if (e.target.matches(".delete")) {
    
    let isDelete = confirm(`Estas seguro en borrar el id: ${e.target.dataset.id}`)

    if(isDelete){
        try {
            let opts = {
                method: "DELETE",
                headers: {
                  "content-type": "application/json; chraset=utf-8",
                }
              },
              res = await axios(`http://localhost:8008/fruits/${e.target.dataset.id}`, opts),
              json = await res.data;
    
            location.reload()
          } catch (error) {
            let message = error.response.statusText || "Ocurrio un error";
            alert(`ERROR ${error.response.status} ${message}`);
          }
    }
  }
});
