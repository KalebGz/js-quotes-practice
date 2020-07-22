

document.addEventListener("DOMContentLoaded", () => {
    /* Constants */
    const url = "http://localhost:3000/quotes?_embed=likes"
    const quoteList = document.querySelector('#quote-list')
    const form = document.querySelector('#new-quote-form')

    /* Inital method calls */
    fetchQuotes()
    addFormListener()
    
    /* Functions */
    function addFormListener(){
        form.addEventListener('submit', () => {
            // console.log()
            event.preventDefault()
            debugger

            let configObj = {
                method: "POST",
                headers: {
                    "Content-Type" : "application.json",
                    accept: "application/json"
                },
                body: JSON.stringify({
                    
                    quote: event.target[0].value,
                    author: event.target[1].value,
                })
            }
        

        fetch('http://localhost:3000/quotes', configObj)
        .then(res => res.json())
        .then(quote => {
            renderQuote(quote)
            form.reset()
        })
    })
    }
    

    function fetchQuotes(){
        fetch(url)
        .then(res => res.json())
        .then(quotes => quotes.forEach(quote => renderQuote(quote)))
    }

    function renderQuote(quote){
        const li = ce('li')
        li.className = 'quote-card'

        const blockQuote = ce('blockquote')
        blockQuote.className = 'blockquote'

        const p = ce('p')
        p.className = 'mb-0'
        p.innerText = quote.quote

        const footer = ce('footer')
        footer.className = 'blockquote-footer'
        footer.innerText = quote.author

        const br = ce('br')

        const btnLike = ce('btn')
        btnLike.className = 'btn-success'
        btnLike.innerText = 'Likes: '
        const span = ce('span')
        if(quote.likes){
            span.innerText = quote.likes.length
        }else{
            span.innerText = 0
        }
        btnLike.append(span)

        btnLike.addEventListener('click', () => {
            let config = {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Accept: 'application/json',
                },
                body: JSON.stringify({ quoteId: quote.id }),
              };
        
            fetch(`http://localhost:3000/likes`, config)
            .then(res => res.json())
            .then(console.log)
            .then( () => {
                let likes = parseInt(span.innerText)
                span.innerText = ++likes
            })
        })
            // {
            //     method: "POST",
            //     headers: {
            //         "Content-Type" : "application.json",
            //     },
            //     body: JSON.stringify({
            //         "quoteId": quote.id,
            //     })
            // })

        

        const btnDelete = ce('btn')
        btnDelete.className = 'btn-danger'
        btnDelete.innerText = 'Delete'

        btnDelete.addEventListener('click', () => {

            let configObj = {method: "DELETE"}
            fetch(`http://localhost:3000/quotes/${quote.id}`, configObj)
            .then(li.remove())

        })

        blockQuote.append(p, footer, br, btnLike, btnDelete)
        li.append(blockQuote)

        quoteList.append(li)
        
    }

    
    
    function ce(ele){
        return document.createElement(ele);
    }
})