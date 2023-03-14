if (navigator.language.indexOf("de") > -1) 
{
        text = 'Dear visitor, welcome on our pages!';
} 
else if (navigator.language.indexOf("en") > -1) 
{
    text = 'Sehr geehrter Besucher, willkommen auf unseren Seiten!';
}

var ausgabe = document.getElementById('ausgabe');
ausgabe.innerHTML = text;