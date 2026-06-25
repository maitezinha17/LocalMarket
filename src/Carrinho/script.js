
$(document).ready(function() { // ".ready" executa a função quando o html terminar de carregar
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [] //pega a key do carrinho, transforma em objeto, e atribui à variavel criada
    const listElement = $('#lista') // conecta as variaveis listElement e totalElement com os elemntos no HTML, sendo eles a div e o h3    (sintax diferente, igual document.getElementById)
    const totalElement = $("#total")

    function exibirCarrinho(){ //função para mostrar o carrinho
        listElement.empty() //limpa a lista, removendo todos os "filhos"
        let totalPreco = 0

        $.each(carrinho, function(index, item){ //vai percorrer todos os itens no carrinho
            const listItem = $("<li>").text(`${item.desc} - Preço: R$${item.valor.toFixed(2)}`) // cria um <li>, e adiciona um texto 

            const removeButton = $("<button>").text("❌").css("margin-left", "10px").click(function(){ //cria um botao com o texto "❌", atribui um css, e a função quando clicar
                removerItem(index) //executa a função removerItem de acordo com o index do produto
            })

            listItem.append(removeButton) //adiciona o botao no html
            listElement.append(listItem) // adiciona o item no html

            totalPreco += item.valor // adiciona o preço do produto ao preço total
            //appends filhos aqui
        })

        totalElement.text(`Total: $${totalPreco.toFixed(2)}`) //muda o texto do html para mopstrar o reço total
    }
    

    function removerItem(index){ //funçao pra remover o item do carrinho, precisa do index de parametro
        carrinho.splice(index, 1) //remove o produto de acordo com o index
        localStorage.setItem("carrinho", JSON.stringify(carrinho)) //salva o novo carrinho
        exibirCarrinho()// carrega o carrinho denovo
    }
    exibirCarrinho()

    //funcao de removerItem

})

function gerar(){
    const listaElement = document.getElementById("lista") 
    const totalElement = document.getElementById("total")
    const listaClone = listaElement.cloneNode(true)

    $(listaClone).find("button").remove()
    const listaHtml = listaClone.innerHTML
    const totalHtml = totalElement.cloneNode(true)
    const conteudoHTML = `
    <html>
        <head>
            <meta charset="UTF-8">
        </head>
        <body>
            <h1>PEDIDO CONFIRMADO</h1>
            <h3>Agradecemos sua compra e sua preferência.</h3>
            <br>
            ${listaHtml}
            <br>
            <br>
            ${totalHtml}
        </body>
    </html>
    `
    const blob = new Blob([conteudoHTML], {type: "application/msword"})
    const link = document.createElement("a") 

    link.href = URL.createObjectURL(blob)
    link.download = "pedido.doc"
    link.click()
    document.getElementById("pedido").style.display = "none"
}

//gerar word

//success closes