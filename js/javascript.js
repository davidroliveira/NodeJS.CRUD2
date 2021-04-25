//Arquivo FRONTEND
//alert('OI!');
(
    function readyJS(win, doc){
        if (doc.querySelectorAll('.deletar')){
            //console.log(doc.querySelectorAll('.deletar'));
            for (let i=0; i<doc.querySelectorAll('.deletar').length;i++) {
                doc.querySelectorAll('.deletar')[i].addEventListener('click',function(event){
                    if (confirm("Deseja mesmo excluir registro?")) {
                        return true
                    } else {
                        event.preventDefault()    ;
                    }
                })
            }

        }

    }
)(window,document)