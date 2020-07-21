$(() => {
    $("username").each(function (indexInArray, valueOfElement) { 
        fetch("http://host.2008blox.com/api/names/" + $(valueOfElement).attr("id"))
        .then(res => {
            $(valueOfElement).text(res.raw);
        })
    });
});