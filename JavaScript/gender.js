// Splittet den übergebenen String nach Satzzeichen und Leerzeichen
function splitString ($text) 
{
    // Speichert alle Buchstaben einzeln
    $splittetString = $text.split('');
    // Rückgabe Array indem die Wörter gespeichert werden
    $returnWordArray = [];
    // Counter, um zu wissen, wo neues Wort eingefügt werden muss
    $returnWordArrayCounter = 0;
    // Speichert das neue Wort
    $newWord = "";

    // Iteriert durch die Buchstaben
    $.each($splittetString, function($characterIndex, $character)
    {
        // Wenn Rückgabe Array nur einen Eintrag hat und der Eintrag gleich SQL Injection Detected ist
        if($returnWordArray.length == 1 && $returnWordArray[0] == "SQL Injection Detected!")
        {
            // Iteration beenden
            return false;
        }
        // Wenn Rückgabe Array nur keinen, einen oder mehrere Eintrag hat und/oder Eintrag ungleich SQL Injection Detected ist
        else
        {
            // Wenn Buchstabe gleich Satzzeichen oder Leerzeichen ist
            if($character == " " || $character == "," || $character == "." || $character == "!" || $character == "?" || $character == "-")
            {
                // Wenn neues Wort nicht leer ist
                if($newWord != "")
                {
                    // Neues Wort wird in Rückgabe Array gespeichert
                    $returnWordArray[$returnWordArrayCounter] = $newWord;
                    // Rückgabe Array Zähler wird um 1 erhöht
                    $returnWordArrayCounter++;
                    // Neues Wort wird resettet
                    $newWord = "";
                }

                // Satzzeichen wird in Rückgabe Array gespeichert
                $returnWordArray[$returnWordArrayCounter] = $character;
                // Rückgabe Array Zähler wird um 1 erhöht
                $returnWordArrayCounter++;
            }
            // Wenn letzer Buchstabe erreicht ist
            else if ($splittetString.length - 1 == $characterIndex)
            {
                // Wenn neues Wort nicht leer ist
                if($newWord != "")
                {
                    // Letzezn Buchstaben zum neuen Wort hinzufügen
                    $newWord += $character;
                    // Neues Wort wird in Rückgabe Array gespeichert
                    $returnWordArray[$returnWordArrayCounter] = $newWord;
                    // Rückgabe Array Zähler wird um 1 erhöht
                    $returnWordArrayCounter++;
                    // Neues Wort wird resettet
                    $newWord = "";
                }

            }
            // Wenn kein Satzzeichen bzw. Leerzeichen und nicht letzter Buchstabe
            else
            {
                // Wenn neues Wort gleich <SCRIPT>
                if($newWord.toUpperCase() == "&LT;SCRIPT&GT;")
                {
                    // Rückgabe Array leeren
                    $returnWordArray = [];
                    // In Rückgabe Array Warnung schreiben
                    $returnWordArray[0] = "SQL Injection Detected!";
                }
                // Wenn neues Wort ungleich <SCRIPT>
                else
                {
                    // Buchstaben zu neuem Wort hinzufügen
                    $newWord += $character; 
                }
            }
        }

    });

    // Gibt Rückgabe Array zurück
    return $returnWordArray;
}

// Ändert Text in gendergerechte Sprache
$('#textGendern').click( function () 
{
    // Die Textareas von denen der Inhalt eingelesen wird
    $textareas = ["#text1", "#text2", "#text3"];

    // Wörterbuch mit Wörtern, die im generischen Maskulinum sind
    $generischesMaskulinum = ["Arbeiter", "Mitarbeiter", "Bauarbeiter", "Student", "Arbeiter", "Lehrer", "Mathematiker", "Tester"];

    // Durch Ausgefelder iterieren und leeren
    $.each($textareas, function($textareaIndex, $textarea)
    {
        // Variable, die die Id des Ausgabefeldes beinhaltet
        $outputField = $textarea + "Ausgabe";
        
        // Ausgabefeld leeren
        $($outputField).text("");
    });

    // Iteriert durch die Felder, die eingelesen werden sollen
    $.each($textareas, function($textareaIndex, $textarea)
    {
        // Array, in dem der neue Text gespeichert wird
        $newText = [];
        // Letztes iteriertes Wort
        $lastWord = "";
        // Index vom letzten iterierten Wort
        $lastWordIndex = 0;
        // letzter Artikel
        $artikel = "";
        // Variable, die die Id des Ausgabefeldes beinhaltet
        $outputField = $textarea + "Ausgabe";

        // Liest den Text aus der iterierten Textarea aus
        $inputText = $($textarea).val();

        // Dekodiert Text --> somit CodeInjection außer Kraft gesetzt
        $encodedText = $('<textarea />').text($inputText).html();

        // Übergibt splitString den dekodierten Text und bekommt den nach Satzzeichen und Leerzeichen gesplitteten Text zurück
        $splitText = splitString($encodedText);

        // Iteriert durch den gesplitteten Text
        $.each($splitText, function($tElem, $tE)
        {
            // speichert das neu gegenderte Wort
            $newWord = "";

            // Wenn letzes Wort nicht leer ist
            if($lastWord != "")
            {
                // Artikel wird gesetzt
                $artikel = $lastWord.toUpperCase();
            }

            // Wenn Artikel Der oder Ein ist
            if($artikel == "DER" || $artikel == "EIN")
            {
                // Wort im Singular

                // Iteriert durch das Wörterbuch mit Wörtern im generischen Maskulinum
                $.each($generischesMaskulinum, function($mElem, $mE)
                {
                    // Wenn aktuell iteriertes Wort gleich einem Wort im Wörterbuch ist
                    if($tE == $mE)
                    {
                        // Genderendung anhängen
                        $newWord = $tE + "*in";
                    }
                });
            }
            // Wenn Artikel Die, Einige, Viele oder Mehrere ist
            else if($artikel == "DIE" || $artikel == "EINIGE" || $artikel == "VIELE" || $artikel == "MEHRERE")
            {
                // Wort im Plural

                // Index vom letzten Buchstaben
                $lastIndex = $tE.length - 1;
                // Index vom vorletzten Buchstaben
                $secondLastIndex = $tE.length - 2;
                // Setzt die Endung des Wortes zusammen
                $endung = $tE[$secondLastIndex] + $tE[$lastIndex];
                
                // Wenn Endung gleich en ist
                if($endung.toUpperCase() == "EN")
                {
                    // Endung des Wortes muss umgebaut werden

                    // Iteriert durch das Wörterbuch mit Wörtern im generischen Maskulinum
                    $.each($generischesMaskulinum, function($mElem, $mE)
                    {
                        // Wort aus dem Wörterbuch wird mit Pluralendung ergänzt
                        $mE += "en";
                        // Wenn aktuell iteriertes Wort gleich einem Wort im Wörterbuch ist
                        if($tE == $mE)
                        {
                            // Aktuell iteriertes Wort von Endung lösen
                            $tE.slice(0, $secondLastIndex - 1);
                            // Genderendung anhängen
                            $newWord = $tE + "*innen";
                        }
                    });
                }
                // Wenn Endung gleich er ist
                else if ($endung.toUpperCase() == "ER")
                {
                    // Endung des Wortes ist bereits im Plural

                    // Iteriert durch das Wörterbuch mit Wörtern im generischen Maskulinum
                    $.each($generischesMaskulinum, function($mElem, $mE)
                    {
                        // Wenn aktuell iteriertes Wort gleich einem Wort im Wörterbuch ist
                        if($tE == $mE)
                        {
                            // Genderendung anhängen
                            $newWord = $tE + "*innen";
                        }
                    });
                }
            }
            // Wenn kein Artikel oder anderer Artikel
            else
            {
                // Iteriert durch das Wörterbuch mit Wörtern im generischen Maskulinum
                $.each($generischesMaskulinum, function($mElem, $mE)
                {
                    // Speichert Endung des aktuell iterierten Wortes
                    $endung = $tE.slice($tE.length - 2, $tE.length);
                    // Wenn Endung gleich en ist
                    if($endung == "en")
                    {
                        // Aktuell iteriertes Wort von Endung lösen
                        $newtE = $tE.slice(0, $tE.length - 2);
                        // Wenn aktuell iteriertes Wort gleich einem Wort im Wörterbuch ist
                        if($newtE == $mE)
                        {
                            // Genderendung anhängen
                            $newWord = $newtE + "*innen";
                        }
                    }
                    // Wenn Endung ungleich en ist
                    else
                    {
                        // Wenn aktuell iteriertes Wort gleich einem Wort im Wörterbuch ist
                        if($tE == $mE)
                        {
                            // Genderendung anhängen
                            $newWord = $tE + "*innen";
                        }
                    }
                    
                });
            }

            // Wenn das neue Wort nicht leer ist
            if($newWord != "")
            {
                // Wenn newText Array größer als 0 ist
                if($newText.length > 0)
                {
                    // Speichert letzten Artikel in Großbuchstaben
                    $artikelToUpper = $newText[$lastWordIndex].toUpperCase();

                    // Wenn Artikel gleich DER ist
                    if($artikelToUpper == "DER")
                    {
                        // Artikel muss für die Grammatik geändert werden
                        $newText[$lastWordIndex] = $newText[$lastWordIndex] + "/die";
                    }
                    // Wenn Artikel gleich EIN ist
                    else if ($artikelToUpper == "EIN")
                    {
                        // Artikel muss für die Grammatik geändert werden
                        $newText[$lastWordIndex] = $newText[$lastWordIndex] + "*e";
                    }
                }

                // Artikel wird im Array geupdatet
                $newText[$tElem] = $newWord;
            }
            // Wenn das neue Wort leer ist
            else
            {
                // Sonst bleibt das iterierte Wort gleich
                $newText[$tElem] = $tE;
            }

            // Wenn iterierte Wort länger als 1 Buchstabe ist
            if($tE.length > 1)
            {
                // Dann wird ein neues letzes Wort gesetzt
                $lastWord = $tE;
                // Dann wird ein neuer Index des letzten Wortes gesetzt
                $lastWordIndex = $tElem;
            }
            
        });

        // Neuer String wird resettet
        $newString = "";

        // Iteriert durch das newText Array
        $.each($newText, function($nTextElem, $nTE)
        {
            // Setzt den Ausgabe String zusammen
            $newString += $nTE;
        });

        if($newString == "SQL Injection Detected!"){
            $($outputField).css('color','red');
        }

        // Schreibt neuen Text in das Ausgabefeld
        $($outputField).text($newString);

    });

});