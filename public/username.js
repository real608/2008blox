var names = JSON.parse(localStorage.getItem('names_cache'));
var created = JSON.parse(localStorage.getItem('created_cache'));

var observer = new MutationObserver(function(mutations) {
 mutations.forEach(function(mutation) {
    for (var node of mutation.addedNodes) {
        if (node.nodeType == 1) {
            switch(node.nodeName) {
                case "USERNAME":
                    $(node).text(names[
                        $(node).attr("id")
                    ]);
                    break;
                case "CREATED":
                    let date = new Date(created[
                        $(node).attr("id")
                    ])
                                    
                    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date)
                    const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(date)
                    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date)
                
                    $(node).text(da + " " + mo + " " + ye)
                    
                    break;

            }
            
        }
    }
 })
});

observer.observe(document, { 
    childList: true,
    subtree: true 
});

