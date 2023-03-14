function splitString ($text) 
{
    $splittetString = $text.split('');

    $returnWordArray = [];
    $returnWordArrayCounter = 0;

    $newWord = "";

    $.each($splittetString, function($characterIndex, $character){

        if($returnWordArray.length == 1 && $returnWordArray[0] == "SQL Injection Detected")
        {
            return false;
        }
        else
        {
            if($character == " " || $character == "," || $character == "." || $character == "!" || $character == "?" || $character == "-")
            {

                if($newWord != "")
                {
                    $returnWordArray[$returnWordArrayCounter] = $newWord;
                    $returnWordArrayCounter++;
                    $newWord = "";
                }

                $returnWordArray[$returnWordArrayCounter] = $character;
                $returnWordArrayCounter++;

            }
            else if ($splittetString.length - 1 == $characterIndex)
            {
                if($newWord != "")
                {
                    $newWord += $character;
                    $returnWordArray[$returnWordArrayCounter] = $newWord;
                    $returnWordArrayCounter++;
                    $newWord = "";
                }

            }
            else
            {
                if($newWord.toUpperCase() == "&LT;SCRIPT&GT;"){
                    $returnWordArray = [];
                    $returnWordArray[0] = "SQL Injection Detected";
                }
                else
                {
                    $newWord += $character; 
                }
            }
        }

    });

    return $returnWordArray;
}

$('#textGendern').click( function () 
{
    $generischesMaskulinum = ["Arbeiter", "Mitarbeiter", "Bauarbeiter", "Student", "Arbeiter", "Lehrer", "Mathematiker", "Tester"];

    $text1 = $('#text1').val();
    $text2 = $('#text2').val();
    $text3 = $('#text3').val();

    $encodedText1 = $('<textarea />').text($text1).html();
    $encodedText2 = $('<textarea />').text($text2).html();
    $encodedText3 = $('<textarea />').text($text3).html();

    $splitText1 = splitString($encodedText1);
    $splitText2 = splitString($encodedText2);
    $splitText3 = splitString($encodedText3);

    $newText1 = [];
    $newText2 = [];
    $newText3 = [];

    $lastWord = "";
    $lastWordIndex = 0;
    $artikel = "";

    $.each($splitText1, function($tElem, $tE)
    {

        $newWord = "";

        if($lastWord != "")
        {
            $artikel = $lastWord.toUpperCase();
        }

        if($artikel == "DER" || $artikel == "EIN")
        {
            // Singular
            $.each($generischesMaskulinum, function($mElem, $mE){
                if($tE == $mE){
                    $newWord = $tE + "*in";
                }
            });
        }
        else if($artikel == "DIE" || $artikel == "EINIGE" || $artikel == "VIELE" || $artikel == "MEHRERE")
        {
            // Plural
            $lastIndex = $tE.length - 1;
            $secondLastIndex = $tE.length - 2;
            $endung = $tE[$secondLastIndex] + $tE[$lastIndex];
            
            if($endung == "en")
            {
                // noch keine Pluralendung
                $.each($generischesMaskulinum, function($mElem, $mE){
                    $mE += "en";
                    if($tE == $mE){
                        $tE.slice(0, $secondLastIndex - 1);
                        $newWord = $tE + "*innen";
                    }
                });
            }
            else if ($endung == "er")
            {
                // bereits Pluralendung
                $.each($generischesMaskulinum, function($mElem, $mE){
                    if($tE == $mE){
                        $newWord = $tE + "*innen";
                    }
                });
            }
        }
        else
        {
            $.each($generischesMaskulinum, function($mElem, $mE)
            {

                $endung = $tE.slice($tE.length - 2, $tE.length);
                if($endung == "en")
                {
                    $newtE = $tE.slice(0, $tE.length - 2);
                    if($newtE == $mE)
                    {
                        $newWord = $newtE + "*innen";
                    }
                }
                else
                {
                    if($tE == $mE)
                    {
                        $newWord = $tE + "*innen";
                    }
                }
                
            });
        }

        if($newWord != "")
        {
            if($newText1.length > 0)
            {
                if($newText1.length > 0)
                {
                    $artikelToUpper = $newText1[$lastWordIndex].toUpperCase();
                    if($artikelToUpper == "DER")
                    {
                        $newText1[$lastWordIndex] = $newText1[$lastWordIndex] + "/die";
                    }else if ($artikelToUpper == "EIN")
                    {
                        $newText1[$lastWordIndex] = $newText1[$lastWordIndex] + "*e";
                    }
                }
            }
            $newText1[$tElem] = $newWord;
        }
        else
        {
            $newText1[$tElem] = $tE;
        }

        if($tE.length > 1){
            $lastWord = $tE;
            $lastWordIndex = $tElem;
        }
        
    });

    $newString = "";
    $.each($newText1, function($nTextElem, $nTE){
        $newString += $nTE;
    });

    $('#text1Ausgabe').text($newString);
    




    $.each($splitText2, function($tElem, $tE)
    {

        $newWord = "";

        if($lastWord != "")
        {
            $artikel = $lastWord.toUpperCase();
        }

        if($artikel == "DER" || $artikel == "EIN")
        {
            // Singular
            $.each($generischesMaskulinum, function($mElem, $mE){
                if($tE == $mE){
                    $newWord = $tE + "*in";
                }
            });
        }
        else if($artikel == "DIE" || $artikel == "EINIGE" || $artikel == "VIELE" || $artikel == "MEHRERE")
        {
            // Plural
            $lastIndex = $tE.length - 1;
            $secondLastIndex = $tE.length - 2;
            $endung = $tE[$secondLastIndex] + $tE[$lastIndex];
            
            if($endung == "en")
            {
                // noch keine Pluralendung
                $.each($generischesMaskulinum, function($mElem, $mE){
                    $mE += "en";
                    if($tE == $mE){
                        $tE.slice(0, $secondLastIndex - 1);
                        $newWord = $tE + "*innen";
                    }
                });
            }
            else if ($endung == "er")
            {
                // bereits Pluralendung
                $.each($generischesMaskulinum, function($mElem, $mE){
                    if($tE == $mE){
                        $newWord = $tE + "*innen";
                    }
                });
            }
        }
        else
        {
            $.each($generischesMaskulinum, function($mElem, $mE)
            {

                $endung = $tE.slice($tE.length - 2, $tE.length);
                if($endung == "en")
                {
                    $newtE = $tE.slice(0, $tE.length - 2);
                    if($newtE == $mE)
                    {
                        $newWord = $newtE + "*innen";
                    }
                }
                else
                {
                    if($tE == $mE)
                    {
                        $newWord = $tE + "*innen";
                    }
                }
                
            });
        }

        if($newWord != "")
        {
            if($newText2.length > 0)
            {
                if($newText2.length > 0)
                {
                    $artikelToUpper = $newText2[$lastWordIndex].toUpperCase();
                    if($artikelToUpper == "DER")
                    {
                        $newText2[$lastWordIndex] = $newText2[$lastWordIndex] + "/die";
                    }else if ($artikelToUpper == "EIN")
                    {
                        $newText2[$lastWordIndex] = $newText2[$lastWordIndex] + "*e";
                    }
                }
            }
            $newText2[$tElem] = $newWord;
        }
        else
        {
            $newText2[$tElem] = $tE;
        }

        if($tE.length > 1){
            $lastWord = $tE;
            $lastWordIndex = $tElem;
        }
        
    });

    $newString = "";
    $.each($newText2, function($nTextElem, $nTE){
        $newString += $nTE;
    });

    $('#text2Ausgabe').text($newString);





    $.each($splitText3, function($tElem, $tE)
    {

        $newWord = "";

        if($lastWord != "")
        {
            $artikel = $lastWord.toUpperCase();
        }

        if($artikel == "DER" || $artikel == "EIN")
        {
            // Singular
            $.each($generischesMaskulinum, function($mElem, $mE){
                if($tE == $mE){
                    $newWord = $tE + "*in";
                }
            });
        }
        else if($artikel == "DIE" || $artikel == "EINIGE" || $artikel == "VIELE" || $artikel == "MEHRERE")
        {
            // Plural
            $lastIndex = $tE.length - 1;
            $secondLastIndex = $tE.length - 2;
            $endung = $tE[$secondLastIndex] + $tE[$lastIndex];
            
            if($endung == "en")
            {
                // noch keine Pluralendung
                $.each($generischesMaskulinum, function($mElem, $mE){
                    $mE += "en";
                    if($tE == $mE){
                        $tE.slice(0, $secondLastIndex - 1);
                        $newWord = $tE + "*innen";
                    }
                });
            }
            else if ($endung == "er")
            {
                // bereits Pluralendung
                $.each($generischesMaskulinum, function($mElem, $mE){
                    if($tE == $mE){
                        $newWord = $tE + "*innen";
                    }
                });
            }
        }
        else
        {
            $.each($generischesMaskulinum, function($mElem, $mE)
            {

                $endung = $tE.slice($tE.length - 2, $tE.length);
                if($endung == "en")
                {
                    $newtE = $tE.slice(0, $tE.length - 2);
                    if($newtE == $mE)
                    {
                        $newWord = $newtE + "*innen";
                    }
                }
                else
                {
                    if($tE == $mE)
                    {
                        $newWord = $tE + "*innen";
                    }
                }
                
            });
        }

        if($newWord != "")
        {
            if($newText3.length > 0)
            {
                if($newText3.length > 0)
                {
                    $artikelToUpper = $newText3[$lastWordIndex].toUpperCase();
                    if($artikelToUpper == "DER")
                    {
                        $newText3[$lastWordIndex] = $newText3[$lastWordIndex] + "/die";
                    }else if ($artikelToUpper == "EIN")
                    {
                        $newText3[$lastWordIndex] = $newText3[$lastWordIndex] + "*e";
                    }
                }
            }
            $newText3[$tElem] = $newWord;
        }
        else
        {
            $newText3[$tElem] = $tE;
        }

        if($tE.length > 1){
            $lastWord = $tE;
            $lastWordIndex = $tElem;
        }
        
    });

    $newString = "";
    $.each($newText3, function($nTextElem, $nTE){
        $newString += $nTE;
    });

    $('#text3Ausgabe').text($newString);

});