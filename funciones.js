let tabla = document.getElementById('tabla'); tabla
let total = document.getElementById('total');
let finalizadas = document.getElementById('finalizadas');
let pendientes = document.getElementById('pendientes');
let guardar = document.getElementById('guardar');
let agregaT = document.getElementById('agregaT');


let usuario = document.getElementById('usuario');

usuario.addEventListener('change',function(){
    sessionStorage.setItem('usuario', usuario.value);
});

if(sessionStorage.getItem('usuario') == null){
    usuario.value = 'Sin Usuario'
}else{
    usuario.value = sessionStorage.getItem('usuario');
}

tabla.addEventListener('click',function(event){

    if(event.target.innerHTML === '<img src="img/borrar.png" height="25px" width="25px" alt="">'){
        event.target.parentElement.parentElement.remove();
    }else{
        if(event.target.parentElement.innerHTML === '<img src="img/borrar.png" height="25px" width="25px" alt="">'){
            event.target.parentElement.parentElement.parentElement.remove();
        }
    }

    actualizarDatos();
})

function agregarTarea() {
    let tr = document.createElement('tr');
    tr.classList.add('tarea');
    tr.innerHTML = `
                <th scope="row">
                    <div class="form-check">
                        <input class="form-check-input finalizada" type="checkbox" value="">
                        </label>
                    </div>
                </th>
                <td>${agregaT.value}</td>
                <td><button type="button" class="btn m-2 btn-danger"><img src="img/borrar.png" height="25px" width="25px" alt=""></button></td>
        `;

    tabla.appendChild(tr);

    agregaT.value = '';
}

guardar.addEventListener('click', function () {
    if (agregaT.value.trim() != "") {
        agregarTarea();
        actualizarDatos();
    }
});

function actualizarDatos() {

    let tareasFinalNum = 0;
    let tareasNum = 0;

    for (let x = 0; x < document.getElementsByClassName('form-check').length; x++) {
        if (document.getElementsByClassName('form-check')[x].children[0].checked) {
            tareasFinalNum += 1;
        }
    }

    tareasNum = document.getElementsByClassName('form-check').length;

    total.innerHTML = tareasNum;
    finalizadas.innerHTML = tareasFinalNum;
    pendientes.innerHTML = tareasNum - tareasFinalNum;

    localStorage.setItem('totalTareas', total.innerHTML);
    localStorage.setItem('tareasFinalizadas', finalizadas.innerHTML);
    localStorage.setItem('tareasPendientes', pendientes.innerHTML);
}
