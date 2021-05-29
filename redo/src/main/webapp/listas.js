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
    const produto = document.querySelector("#produto")
    fetch(`api/list/search?query=${produto.value}`)
        .then( r => r.json() )
        .then(compras => {
            const lista = document.querySelector('#listaEncontrada')
            compras.forEach(compra => {
                const div = document.createElement('div')
                div.textContent = compra
                lista.appendChild(div)
            })
        })
}

window.addEventListener('load',Event => document.querySelector("#btn").addEventListener("click",pesquisar));






