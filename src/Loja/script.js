let produtos //variavel

window.onload = function(){ //quando toda a pagina carregar, executa a função
    var storedUser = localStorage.getItem("usuario") //pega os dados salvos no localstorage, com o nome de "usuario" <--uma CHAVE
    var user = JSON.parse(storedUser)//pega os dados de JSON adquiridos aqui ^^^, que estao em formato de texto, e transforma em um objeto, para ser manipulado no java script
    var dataEntrada = new Date(user.dataEntrada)// sei la

    var dataFormatada = dataEntrada.toLocaleString("pt-BR", { // apenas pega a data do login e deixa em um modelo utilizado no brasil, como o de dia/mes/ano
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "numeric",
        minute: "numeric"
    })

    document.getElementById("user").textContent = user.name //atribui os valores do nome de usuario, data e id para as tags do HTML, que entao aparecem para o usuario na pagina
    document.getElementById("perfil").textContent = dataFormatada
    document.getElementById("idPerfil").textContent = user.id
   
}

document.addEventListener("DOMContentLoaded", function(){ //usa o eventlistener para quando o HTML em especifico termina de carregar, asssim ativando a função
    fetch("../Dados/data.json") // "fetch" vem de buscar, basicamente busca pelo arquivo de JSON
        .then((response) => response.json()) //através da busca, atribui o valor conseguido à variavel response, e a transforma em um objeto
        .then((data) => { //o java script AUTOMATICAMENTE atribui o valor do then de cima a variavel do then de baixo, sendo essa a data
            produtos = data //atribui os dados buscados do JSON à variavel produtos

            const produtosContainer = document.getElementById("produtos-container") //atribui a variavel à tag do html que vai conter os produtos

            produtos.forEach((produto, index) => { //roda através de todos os produtos no array/key/Chave
                const card = document.createElement("div") //cria uma div apenas na memória
                card.innerHTML = ` 
                <div class="card" style="width: 18rem;">
                    <img src="${produto.imagem}" class="card-img-top" alt="${produto.desc}" width="200px" height="200px">
                    <div class="card-body">
                        <h5 class="card-title">${produto.desc}</h5>
                        <p class="card-text">R$ ${produto.valor.toFixed(2)}</p>
                        <a href="#" class="btn btn-primary adicionar" data-indice="${index}">Adicionar ao carrinho</a>
                    </div>
                </div>
                ` //card.innerHTML inseri o que esta dentro da crase, dentro da div no html

                produtosContainer.appendChild(card) //finalmente insere o card na tela, dentro do container
            })
        }).catch((error) => console.log("Erro ao carregar dados", error)) //mensagem de erro caso o JSON nao carregue
})

document.getElementById("produtos-container").addEventListener("click", function(event){ //detecte cliques dentro do container
    const btn = event.target.closest(".adicionar") //se o botao tiver a classe "adicionar", o valor é retornado e a função continua
    if(!btn) return // se nao for o botao, encerra a função

    const indexDoProduto = btn.dataset.indice // !IMPORTANTE! todo elemento de HTML tem um dataset, que é atribuido atraves de "data-exemploAqui", que nesse caso, é o "data-indice"
    const produtoSelecionado = produtos[indexDoProduto] //pega o produto de acordo com o index
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [] // atribui os dados do carrinho à variavel "carrinho". se nao tiver nada, mostra apenas "[]"
    carrinho.push(produtoSelecionado) //adiciona o produto  que foi clicado ao carrinho
    localStorage.setItem("carrinho", JSON.stringify(carrinho)) //transforma em texto e deixa salvado
    alert("Produto adicionado com sucesso!!!") //informa que o produto foi adicionado
})
