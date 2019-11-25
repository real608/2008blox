/*! 2008blox | (c) the 2008blox organization and other contributors | 2008blox.com/license */

// https://stackoverflow.com/questions/18683503/jquery-on-image-error-not-working-on-dynamic-images

// The function to insert a fallback image
var imgNotFound = function() {
    $(this).unbind("error").attr("src", getBlankImage());
};
// Bind image error on document load
$("img").error(imgNotFound);
// Bind image error after ajax complete
$(document).ajaxComplete(function(){
    $("img").error(imgNotFound);
});

// https://stackoverflow.com/questions/432493/how-do-you-access-the-matched-groups-in-a-javascript-regular-expression
function getBlankImage() {  // easter egg option, for those of you who know how to switch it >:)
    var myString = document.cookie;
    var myRegexp = /blankurl=(\S+)/g;
    return myRegexp.exec(myString)[1];
}