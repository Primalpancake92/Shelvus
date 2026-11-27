const bookData = [
    {
        id: 1,
        title: "Dune",
        genre: "Sci-fi",
        publication_year: "1965"
    },
    {
        id: 2,
        title: "The Shining",
        genre: "Horror",
        publication_year: "1977"
    },
    {
        id: 3,
        title: "Sapiens: A Brief History of Humankind",
        genre: "Non-Fiction",
        publication_year: "2011"
    },
    {
        id: 4,
        title: "Pride and Prejudice",
        genre: "Romance",
        publication_year: "1813"
    },
    {
        id: 5,
        title: "The Hobbit",
        genre: "Fantasy",
        publication_year: "1937"
    },
    {
        id: 6,
        title: "The Hound of the Baskervilles",
        genre: "Mystery",
        publication_year: "1902"
    },
    {
        id: 7,
        title: "The Silent Patient",
        genre: "Thriller",
        publication_year: "2019"
    },
    {
        id: 8,
        title: "The Book Thief",
        genre: "Historical Fiction",
        publication_year: "2005"
    },
    {
        id: 9,
        title: "The Fault in Our Stars",
        genre: "Young Adult",
        publication_year: "2012"
    },
    {
        id: 10,
        title: "Watchmen",
        genre: "Graphical Fiction",
        publication_year: "1987"
    },
    {
        id: 11,
        title: "1984",
        genre: "Fiction",
        publication_year: "1949"
    },
    {
        id: 12,
        title: "To Kill a Mockingbird",
        genre: "Fiction",
        publication_year: "1960"
    },
    {
        id: 13,
        title: "The Great Gatsby",
        genre: "Fiction",
        publication_year: "1925"
    },
    {
        id: 14,
        title: "The Catcher in the Rye",
        genre: "Fiction",
        publication_year: "1951"
    },
    {
        id: 15,
        title: "Of Mice and Men",
        genre: "Fiction",
        publication_year: "1937"
    },
    {
        id: 16,
        title: "The Road",
        genre: "Fiction",
        publication_year: "2006"
    },
    {
        id: 17,
        title: "Beloved",
        genre: "Fiction",
        publication_year: "1987"
    },
    {
        id: 18,
        title: "Life of Pi",
        genre: "Fiction",
        publication_year: "2001"
    },
    {
        id: 19,
        title: "The Kite Runner",
        genre: "Fiction",
        publication_year: "2003"
    },
    {
        id: 20,
        title: "Dracula",
        genre: "Horror",
        publication_year: "1897"
    },
    {
        id: 21,
        title: "Frankenstein",
        genre: "Horror",
        publication_year: "1818"
    },
    {
        id: 22,
        title: "It",
        genre: "Horror",
        publication_year: "1986"
    },
    {
        id: 23,
        title: "Pet Sematary",
        genre: "Horror",
        publication_year: "1983"
    },
    {
        id: 24,
        title: "The Haunting of Hill House",
        genre: "Horror",
        publication_year: "1959"
    },
    {
        id: 25,
        title: "Rosemary's Baby",
        genre: "Horror",
        publication_year: "1967"
    },
    {
        id: 26,
        title: "The Exorcist",
        genre: "Horror",
        publication_year: "1971"
    },
    {
        id: 27,
        title: "Mexican Gothic",
        genre: "Horror",
        publication_year: "2020"
    },
    {
        id: 28,
        title: "Educated",
        genre: "Non-Fiction",
        publication_year: "2018"
    },
    {
        id: 29,
        title: "Thinking, Fast and Slow",
        genre: "Non-Fiction",
        publication_year: "2011"
    },
    {
        id: 30,
        title: "Atomic Habits",
        genre: "Non-Fiction",
        publication_year: "2018"
    },
    {
        id: 31,
        title: "A Brief History of Time",
        genre: "Non-Fiction",
        publication_year: "1988"
    },
    {
        id: 32,
        title: "The Immortal Life of Henrietta Lacks",
        genre: "Non-Fiction",
        publication_year: "2010"
    },
    {
        id: 33,
        title: "Quiet",
        genre: "Non-Fiction",
        publication_year: "2012"
    },
    {
        id: 34,
        title: "Born a Crime",
        genre: "Non-Fiction",
        publication_year: "2016"
    },
    {
        id: 35,
        title: "Into the Wild",
        genre: "Non-Fiction",
        publication_year: "1996"
    },
    {
        id: 36,
        title: "Neuromancer",
        genre: "Sci-fi",
        publication_year: "1984"
    },
    {
        id: 37,
        title: "Foundation",
        genre: "Sci-fi",
        publication_year: "1951"
    },
    {
        id: 38,
        title: "The Left Hand of Darkness",
        genre: "Sci-fi",
        publication_year: "1969"
    },
    {
        id: 39,
        title: "Ender's Game",
        genre: "Sci-fi",
        publication_year: "1985"
    },
    {
        id: 40,
        title: "The Martian",
        genre: "Sci-fi",
        publication_year: "2011"
    },
    {
        id: 41,
        title: "Project Hail Mary",
        genre: "Sci-fi",
        publication_year: "2021"
    },
    {
        id: 42,
        title: "Hyperion",
        genre: "Sci-fi",
        publication_year: "1989"
    },
    {
        id: 43,
        title: "Fahrenheit 451",
        genre: "Sci-fi",
        publication_year: "1953"
    },
    {
        id: 44,
        title: "Jane Eyre",
        genre: "Romance",
        publication_year: "1847"
    },
    {
        id: 45,
        title: "Persuasion",
        genre: "Romance",
        publication_year: "1817"
    },
    {
        id: 46,
        title: "Outlander",
        genre: "Romance",
        publication_year: "1991"
    },
    {
        id: 47,
        title: "The Notebook",
        genre: "Romance",
        publication_year: "1996"
    },
    {
        id: 48,
        title: "Me Before You",
        genre: "Romance",
        publication_year: "2012"
    },
    {
        id: 49,
        title: "The Hating Game",
        genre: "Romance",
        publication_year: "2016"
    },
    {
        id: 50,
        title: "Beach Read",
        genre: "Romance",
        publication_year: "2020"
    },
    {
        id: 51,
        title: "Red, White & Royal Blue",
        genre: "Romance",
        publication_year: "2019"
    },
    {
        id: 52,
        title: "The Fellowship of the Ring",
        genre: "Fantasy",
        publication_year: "1954"
    },
    {
        id: 53,
        title: "A Game of Thrones",
        genre: "Fantasy",
        publication_year: "1996"
    },
    {
        id: 54,
        title: "The Name of the Wind",
        genre: "Fantasy",
        publication_year: "2007"
    },
    {
        id: 55,
        title: "Mistborn: The Final Empire",
        genre: "Fantasy",
        publication_year: "2006"
    },
    {
        id: 56,
        title: "The Way of Kings",
        genre: "Fantasy",
        publication_year: "2010"
    },
    {
        id: 57,
        title: "A Wizard of Earthsea",
        genre: "Fantasy",
        publication_year: "1968"
    },
    {
        id: 58,
        title: "The Lion, the Witch and the Wardrobe",
        genre: "Fantasy",
        publication_year: "1950"
    },
    {
        id: 59,
        title: "American Gods",
        genre: "Fantasy",
        publication_year: "2001"
    },
    {
        id: 60,
        title: "And Then There Were None",
        genre: "Mystery",
        publication_year: "1939"
    },
    {
        id: 61,
        title: "Murder on the Orient Express",
        genre: "Mystery",
        publication_year: "1934"
    },
    {
        id: 62,
        title: "The Big Sleep",
        genre: "Mystery",
        publication_year: "1939"
    },
    {
        id: 63,
        title: "The Moonstone",
        genre: "Mystery",
        publication_year: "1868"
    },
    {
        id: 64,
        title: "In the Woods",
        genre: "Mystery",
        publication_year: "2007"
    },
    {
        id: 65,
        title: "The Thursday Murder Club",
        genre: "Mystery",
        publication_year: "2020"
    },
    {
        id: 66,
        title: "The Cuckoo's Calling",
        genre: "Mystery",
        publication_year: "2013"
    },
    {
        id: 67,
        title: "Big Little Lies",
        genre: "Mystery",
        publication_year: "2014"
    },
    {
        id: 68,
        title: "Gone Girl",
        genre: "Thriller",
        publication_year: "2012"
    },
    {
        id: 69,
        title: "The Girl with the Dragon Tattoo",
        genre: "Thriller",
        publication_year: "2005"
    },
    {
        id: 70,
        title: "The Da Vinci Code",
        genre: "Thriller",
        publication_year: "2003"
    },
    {
        id: 71,
        title: "The Bourne Identity",
        genre: "Thriller",
        publication_year: "1980"
    },
    {
        id: 72,
        title: "The Girl on the Train",
        genre: "Thriller",
        publication_year: "2015"
    },
    {
        id: 73,
        title: "The Firm",
        genre: "Thriller",
        publication_year: "1991"
    },
    {
        id: 74,
        title: "The Day of the Jackal",
        genre: "Thriller",
        publication_year: "1971"
    },
    {
        id: 75,
        title: "The Silence of the Lambs",
        genre: "Thriller",
        publication_year: "1988"
    },
    {
        id: 76,
        title: "All the Light We Cannot See",
        genre: "Historical Fiction",
        publication_year: "2014"
    },
    {
        id: 77,
        title: "Wolf Hall",
        genre: "Historical Fiction",
        publication_year: "2009"
    },
    {
        id: 78,
        title: "The Pillars of the Earth",
        genre: "Historical Fiction",
        publication_year: "1989"
    },
    {
        id: 79,
        title: "The Nightingale",
        genre: "Historical Fiction",
        publication_year: "2015"
    },
    {
        id: 80,
        title: "Memoirs of a Geisha",
        genre: "Historical Fiction",
        publication_year: "1997"
    },
    {
        id: 81,
        title: "The Name of the Rose",
        genre: "Historical Fiction",
        publication_year: "1980"
    },
    {
        id: 82,
        title: "Pachinko",
        genre: "Historical Fiction",
        publication_year: "2017"
    },
    {
        id: 83,
        title: "War and Peace",
        genre: "Historical Fiction",
        publication_year: "1869"
    },
    {
        id: 84,
        title: "The Hunger Games",
        genre: "Young Adult",
        publication_year: "2008"
    },
    {
        id: 85,
        title: "Divergent",
        genre: "Young Adult",
        publication_year: "2011"
    },
    {
        id: 86,
        title: "The Perks of Being a Wallflower",
        genre: "Young Adult",
        publication_year: "1999"
    },
    {
        id: 87,
        title: "Looking for Alaska",
        genre: "Young Adult",
        publication_year: "2005"
    },
    {
        id: 88,
        title: "The Hate U Give",
        genre: "Young Adult",
        publication_year: "2017"
    },
    {
        id: 89,
        title: "Six of Crows",
        genre: "Young Adult",
        publication_year: "2015"
    },
    {
        id: 90,
        title: "The Giver",
        genre: "Young Adult",
        publication_year: "1993"
    },
    {
        id: 91,
        title: "The Lightning Thief",
        genre: "Young Adult",
        publication_year: "2005"
    },
    {
        id: 92,
        title: "Maus",
        genre: "Graphical Fiction",
        publication_year: "1986"
    },
    {
        id: 93,
        title: "Persepolis",
        genre: "Graphical Fiction",
        publication_year: "2000"
    },
    {
        id: 94,
        title: "V for Vendetta",
        genre: "Graphical Fiction",
        publication_year: "1988"
    },
    {
        id: 95,
        title: "The Sandman: Preludes & Nocturnes",
        genre: "Graphical Fiction",
        publication_year: "1989"
    },
    {
        id: 96,
        title: "The Dark Knight Returns",
        genre: "Graphical Fiction",
        publication_year: "1986"
    },
    {
        id: 97,
        title: "Saga, Volume 1",
        genre: "Graphical Fiction",
        publication_year: "2012"
    },
    {
        id: 98,
        title: "Fun Home",
        genre: "Graphical Fiction",
        publication_year: "2006"
    },
    {
        id: 99,
        title: "Bone: Out from Boneville",
        genre: "Graphical Fiction",
        publication_year: "1995"
    }
];

export default bookData;