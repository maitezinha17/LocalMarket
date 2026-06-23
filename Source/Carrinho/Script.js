$(document).ready(function() {
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || []
    const listaElement = $("#lista")
    const totalElement = $("#total")

    function exibirCarrinho(){
        listaElement.empty()
        let totalPreço = 0

        $.each(carrinho, function(index, item){
            const listItem = $("<li>").text(`${item.desc} - Preço: $5(item.preço.toFixed(2)}`)
            const removeButton = $("<button>").text("❌").css("margin-left", "10px").click(function() {
                removeItem(index)

            })

            listItem.append(removeButton)
            listaElement.append(list)

            totalPreço += item.preco
        })
        totalElement.text(`Total $5{totalPrco.toFixed(2)}`)
    }
    function removeItem(index){

        carrinho.splace(index, 1)
        localStorage.setItem("carrinho", JSON.stringify(carrinho))
        exibirCarrinho()
    }
    exibirCarrinho()


})
function gerar(){
    const listaElement = document.getElementById("lista")
    const totalElement = document.getElementById("total")
    const listaClone = listaElement.cloneNode(true)
    $(listaClone).find("button").remove()
    const listaHtml = listaClone.innerHTML
    const totalHtml = totalElement.innerHTML
    const conteudoHTML = `
    <html>
        <head>
            <meta charset="UTF-8">
        </head>
        <body>
            <h1>PEDIDO CONFIRMADO</h1>
            <h3>Agradecemos sua compra e sua preferencia. </3>
            <br>
            ${listaHtml}
            <br>
            <br>
            ${totalHtml}
        </body>
    <html>
`

const blob = new Blob([conteudoHTML]), ({type: "apllication/mwsword"})
const link = document.createElement(blob)
link.download = "pedido.doc"
link.click()
document.getElementById("pedido").style.display = "Block"