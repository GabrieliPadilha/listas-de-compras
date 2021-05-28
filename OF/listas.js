function pesquisar(event) {
    event.preventDefault()
    var busca = document.querySelector('#produto').value;
    fetch(`http://localhost:3000/compras?busca=${busca}`, {
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(response => response.json())
    .then(compras => {
        document.querySelector('#listaEncontrada').innerHTML = compras
            .map(compra =>`<div>${compra}</div>`)
    })
}