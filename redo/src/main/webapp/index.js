var shoppingList = []

function insertItemFromText(event) {
    event.preventDefault()
    const input = document.querySelector('#produto');
    insertItemIntoList(input.value);

    input.value = '';
    input.focus();
}

function insertItemIntoList(value) {
    const item = document.createElement('div');
    item.innerText = value;
    document.getElementById('listaDeItens').appendChild(item);
    shoppingList.push(value);
}

function saveList() {
    const storageListaDeCompras = 'LISTA_DE_COMPRAS'
    localStorage.setItem(storageListaDeCompras, JSON.stringify(shoppingList))
    fetch('api/list/', {
        method: 'POST',
        body: JSON.stringify(shoppingList),
        headers: {
            'Content-Type': 'application/json'
        },
    })
    return false
}

window.addEventListener('load', (event) => {
    const rawStoredList = localStorage.getItem('LISTA_DE_COMPRAS') || '[]';
    const locallyStoredList = JSON.parse(rawStoredList);
    for (const item of locallyStoredList) {
        insertItemIntoList(item);
    }

    fetch('api/list', {
        headers: {'Content-Type': 'application/json'}
    }).then(response => response.json())
        .then(serverList => {
            shoppingList = [...serverList];

            const listContainer = document.querySelector("#listaDeItens");

            const oldItems = document.querySelectorAll("#listaDeItens > div");

            for (const item of oldItems) {
                listContainer.removeChild(item);
            }

            for (const newItem of serverList) {
                insertItemIntoList(newItem);
            }
        }).catch(e => alert('Erro ao carregar lista do servidor: ' + e));
});