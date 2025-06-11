# Joke API

Deze API geeft mopjes per misdaadcategorie. Je kunt alle mopjes ophalen of eentje op basis van een bepaalde categorie.

## Live URL

https://joke-api-2ihl.onrender.com

## Endpoints

### GET /api/mopjes

Geeft een lijst van alle mopjes.

Voorbeeld response:
```json
[
  {
    "category": "Fietsdiefstal",
    "joke": "Wat zegt een fietsdief als hij gepakt wordt? ‘Ik dacht dat hij van mij was, echt!’"
  }
]
```

### GET /api/mopjes/:categorie

Geeft een mopje op basis van de categorie.

Voorbeeld:
```
GET /api/mopjes/Autodiefstal
```

Response:
```json
{
  "joke": "Waarom nam de autodief een handboek mee? Hij wilde het stuur in eigen handen nemen."
}
```

## Licentie

MIT License

## Auteur

Briek Janssens - student Web Development aan Odisee
