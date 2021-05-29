/*function pesquisar(event) {
    event.preventDefault()
    var busca = document.querySelector('#produto').value;
    fetch(`http://localhost:8080/ListaCompras-1.0-SNAPSHOT/?busca=${busca}`, {
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(response => response.json())
        .then(compras => {
            document.querySelector('#listaEncontrada').innerHTML = compras
                .map(compra => `<div>${compra}</div>`)
        })
}*/

function pesquisar(event) {
    event.preventDefault()
    const produto = document.querySelector("#produto");
    fetch(`api/search?query=${produto.value}`).then( r => r.json() ).then( resultList => resultList.forEach(item => alert(''+item)).catch( e => alert(''+e)));

}

window.addEventListener('load',Event => document.querySelector("#btn").addEventListener("click",pesquisar));






