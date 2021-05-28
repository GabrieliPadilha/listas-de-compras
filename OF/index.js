    var listaDeCompras = []

    function inserirItenNaLista(event){
        event.preventDefault()
        var input = document.querySelector('#produto');
        var item = '<div>' + input.value + '</div>'
        document.getElementById("listaDeItens").innerHTML += item
        listaDeCompras.push( input.value)
        input.value = ''
        input.focus()

    }

    function salvarLista(event){
        const storageListaDeCompras = 'LISTA_DE_COMPRAS'
        localStorage.setItem(storageListaDeCompras, JSON.stringify(listaDeCompras))
        fetch('http://localhost:3000/compras',{
            method: 'POST',
            body: JSON.stringify(listaDeCompras),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        return false
    }