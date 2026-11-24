const n=`{
 "schema": 2,
 "level": "home",
 "projectCode": "HU",
 "modelCode": "HU-PENT",
 "layout": {
  "id": "HU-PENT",
  "name": "Penthouse",
  "type": "Penthouse",
  "bedrooms": 4,
  "bathrooms": 3,
  "areaSqm": 257.3,
  "exterior": "apartment",
  "northDeg": 0,
  "entry": {
   "storey": 0,
   "at": [
    6.8,
    8.9
   ],
   "facing": 0
  },
  "storeys": [
   {
    "level": 0,
    "name": "Lower floor",
    "height": 2.9,
    "outline": [
     [
      0,
      0
     ],
     [
      15,
      0
     ],
     [
      15,
      9.6
     ],
     [
      0,
      9.6
     ]
    ],
    "rooms": [
     {
      "id": "living",
      "kind": "living",
      "name": "Living room",
      "floor": "wood",
      "polygon": [
       [
        0,
        0
       ],
       [
        9.6,
        0
       ],
       [
        9.6,
        5.4
       ],
       [
        0,
        5.4
       ]
      ]
     },
     {
      "id": "dining",
      "kind": "dining",
      "name": "Dining room",
      "floor": "wood",
      "polygon": [
       [
        9.6,
        0
       ],
       [
        15,
        0
       ],
       [
        15,
        5.4
       ],
       [
        9.6,
        5.4
       ]
      ]
     },
     {
      "id": "kitchen",
      "kind": "kitchen",
      "name": "Kitchen",
      "floor": "tile",
      "polygon": [
       [
        9.6,
        5.4
       ],
       [
        15,
        5.4
       ],
       [
        15,
        9.6
       ],
       [
        9.6,
        9.6
       ]
      ]
     },
     {
      "id": "stairs",
      "kind": "stairs",
      "name": "Stairs",
      "floor": "wood",
      "polygon": [
       [
        8.2,
        5.4
       ],
       [
        9.6,
        5.4
       ],
       [
        9.6,
        9.6
       ],
       [
        8.2,
        9.6
       ]
      ]
     },
     {
      "id": "hall",
      "kind": "entry",
      "name": "Entry hall",
      "floor": "stone",
      "polygon": [
       [
        3.8,
        5.4
       ],
       [
        8.2,
        5.4
       ],
       [
        8.2,
        9.6
       ],
       [
        5.4,
        9.6
       ],
       [
        5.4,
        7.6
       ],
       [
        3.8,
        7.6
       ]
      ]
     },
     {
      "id": "wc",
      "kind": "wc",
      "name": "Guest WC",
      "floor": "tile",
      "polygon": [
       [
        3.8,
        7.6
       ],
       [
        5.4,
        7.6
       ],
       [
        5.4,
        9.6
       ],
       [
        3.8,
        9.6
       ]
      ]
     },
     {
      "id": "study",
      "kind": "study",
      "name": "Study",
      "floor": "wood",
      "polygon": [
       [
        0,
        5.4
       ],
       [
        3.8,
        5.4
       ],
       [
        3.8,
        9.6
       ],
       [
        0,
        9.6
       ]
      ]
     },
     {
      "id": "terrace",
      "kind": "terrace",
      "name": "Terrace",
      "floor": "deck",
      "outdoor": true,
      "polygon": [
       [
        0.8,
        -3
       ],
       [
        14.2,
        -3
       ],
       [
        14.2,
        0
       ],
       [
        0.8,
        0
       ]
      ]
     }
    ],
    "openings": [
     {
      "id": "o-entrance",
      "kind": "entrance",
      "at": [
       [
        6.2,
        9.6
       ],
       [
        7.4,
        9.6
       ]
      ],
      "rooms": [
       "hall",
       null
      ]
     },
     {
      "id": "o-hall-living",
      "kind": "opening",
      "at": [
       [
        4.4,
        5.4
       ],
       [
        7.8,
        5.4
       ]
      ],
      "rooms": [
       "living",
       "hall"
      ]
     },
     {
      "id": "o-hall-study",
      "kind": "door",
      "at": [
       [
        3.8,
        5.9
       ],
       [
        3.8,
        6.8
       ]
      ],
      "rooms": [
       "study",
       "hall"
      ]
     },
     {
      "id": "o-hall-wc",
      "kind": "door",
      "at": [
       [
        5.4,
        8.3
       ],
       [
        5.4,
        9.1
       ]
      ],
      "rooms": [
       "wc",
       "hall"
      ]
     },
     {
      "id": "o-hall-stairs",
      "kind": "opening",
      "at": [
       [
        8.2,
        8.4
       ],
       [
        8.2,
        9.4
       ]
      ],
      "rooms": [
       "stairs",
       "hall"
      ]
     },
     {
      "id": "o-living-dining",
      "kind": "opening",
      "at": [
       [
        9.6,
        0.8
       ],
       [
        9.6,
        4.6
       ]
      ],
      "rooms": [
       "living",
       "dining"
      ]
     },
     {
      "id": "o-dining-kitchen",
      "kind": "opening",
      "at": [
       [
        10.6,
        5.4
       ],
       [
        14,
        5.4
       ]
      ],
      "rooms": [
       "kitchen",
       "dining"
      ]
     },
     {
      "id": "o-living-terrace-1",
      "kind": "sliding",
      "at": [
       [
        1.4,
        0
       ],
       [
        4.6,
        0
       ]
      ],
      "rooms": [
       "living",
       "terrace"
      ]
     },
     {
      "id": "o-living-terrace-2",
      "kind": "sliding",
      "at": [
       [
        5.4,
        0
       ],
       [
        8.6,
        0
       ]
      ],
      "rooms": [
       "living",
       "terrace"
      ]
     },
     {
      "id": "o-dining-terrace",
      "kind": "sliding",
      "at": [
       [
        10.4,
        0
       ],
       [
        14,
        0
       ]
      ],
      "rooms": [
       "dining",
       "terrace"
      ]
     },
     {
      "id": "w-living-west",
      "kind": "window",
      "at": [
       [
        0,
        1.2
       ],
       [
        0,
        4.2
       ]
      ],
      "rooms": [
       "living",
       null
      ],
      "sill": 0.9,
      "head": 2.2
     },
     {
      "id": "w-dining-east",
      "kind": "window",
      "at": [
       [
        15,
        1.4
       ],
       [
        15,
        4.4
       ]
      ],
      "rooms": [
       "dining",
       null
      ],
      "sill": 0.9,
      "head": 2.2
     },
     {
      "id": "w-kitchen-east",
      "kind": "window",
      "at": [
       [
        15,
        6.2
       ],
       [
        15,
        8.6
       ]
      ],
      "rooms": [
       "kitchen",
       null
      ],
      "sill": 1.1,
      "head": 2.2
     },
     {
      "id": "w-kitchen-south",
      "kind": "window",
      "at": [
       [
        10.4,
        9.6
       ],
       [
        13.6,
        9.6
       ]
      ],
      "rooms": [
       "kitchen",
       null
      ],
      "sill": 1.1,
      "head": 2.2
     },
     {
      "id": "w-study-west",
      "kind": "window",
      "at": [
       [
        0,
        6.6
       ],
       [
        0,
        8.4
       ]
      ],
      "rooms": [
       "study",
       null
      ],
      "sill": 0.9,
      "head": 2.2
     },
     {
      "id": "w-study-south",
      "kind": "window",
      "at": [
       [
        0.8,
        9.6
       ],
       [
        3,
        9.6
       ]
      ],
      "rooms": [
       "study",
       null
      ],
      "sill": 0.9,
      "head": 2.2
     }
    ],
    "furniture": [
     {
      "id": "f-rug",
      "kind": "rug",
      "room": "living",
      "at": [
       2.55,
       2.75
      ],
      "size": [
       3.7,
       3.5
      ],
      "rot": 0
     },
     {
      "id": "f-tv",
      "kind": "tv-unit",
      "room": "living",
      "at": [
       2.2,
       5.105
      ],
      "size": [
       2.6,
       0.45
      ],
      "rot": 180
     },
     {
      "id": "f-sofa",
      "kind": "sofa-corner",
      "room": "living",
      "at": [
       2.5,
       2.1
      ],
      "size": [
       3.2,
       2
      ],
      "rot": 0
     },
     {
      "id": "f-coffee",
      "kind": "coffee-table",
      "room": "living",
      "at": [
       2.1,
       3.75
      ],
      "size": [
       1.2,
       0.7
      ],
      "rot": 0
     },
     {
      "id": "f-coffee-2",
      "kind": "coffee-table",
      "room": "living",
      "at": [
       7.4,
       2.6
      ],
      "size": [
       0.8,
       0.8
      ],
      "rot": 0
     },
     {
      "id": "f-sofa-2",
      "kind": "sofa",
      "room": "living",
      "at": [
       7,
       3.875
      ],
      "size": [
       2.2,
       0.95
      ],
      "rot": 180
     },
     {
      "id": "f-armchair-3",
      "kind": "armchair",
      "room": "living",
      "at": [
       6.4,
       1.7
      ],
      "size": [
       0.8,
       0.8
      ],
      "rot": 0
     },
     {
      "id": "f-armchair-4",
      "kind": "armchair",
      "room": "living",
      "at": [
       8.6,
       1.7
      ],
      "size": [
       0.8,
       0.8
      ],
      "rot": 0
     },
     {
      "id": "f-plant",
      "kind": "plant",
      "room": "living",
      "at": [
       9.15,
       0.38
      ],
      "size": [
       0.5,
       0.5
      ],
      "rot": 0
     },
     {
      "id": "f-plant-2",
      "kind": "plant",
      "room": "living",
      "at": [
       0.38,
       4.85
      ],
      "size": [
       0.5,
       0.5
      ],
      "rot": 0
     },
     {
      "id": "f-dining",
      "kind": "dining-table",
      "room": "dining",
      "at": [
       12.3,
       2.65
      ],
      "size": [
       2.6,
       1.1
      ],
      "rot": 0
     },
     {
      "id": "f-sideboard",
      "kind": "tv-unit",
      "room": "dining",
      "at": [
       14.45,
       4.95
      ],
      "size": [
       0.7,
       0.9
      ],
      "rot": 90
     },
     {
      "id": "f-run",
      "kind": "kitchen-run",
      "room": "kitchen",
      "at": [
       11.485,
       9.17
      ],
      "size": [
       3.63,
       0.6
      ],
      "rot": 180
     },
     {
      "id": "f-fridge",
      "kind": "fridge",
      "room": "kitchen",
      "at": [
       13.75,
       9.12
      ],
      "size": [
       0.7,
       0.7
      ],
      "rot": 180
     },
     {
      "id": "f-fridge-2",
      "kind": "fridge",
      "room": "kitchen",
      "at": [
       14.52,
       6.55
      ],
      "size": [
       0.7,
       0.7
      ],
      "rot": 90
     },
     {
      "id": "f-counter-east",
      "kind": "kitchen-run",
      "room": "kitchen",
      "at": [
       14.57,
       7.45
      ],
      "size": [
       0.9,
       0.6
      ],
      "rot": 90
     },
     {
      "id": "f-island",
      "kind": "kitchen-island",
      "room": "kitchen",
      "at": [
       12.2,
       7.35
      ],
      "size": [
       2.4,
       0.9
      ],
      "rot": 180
     },
     {
      "id": "f-wardrobe-hall",
      "kind": "wardrobe",
      "room": "hall",
      "at": [
       4.6,
       7.28
      ],
      "size": [
       1.4,
       0.5
      ],
      "rot": 180
     },
     {
      "id": "f-stairs",
      "kind": "stairs",
      "room": "stairs",
      "at": [
       8.9,
       7.5
      ],
      "size": [
       1.2,
       4
      ],
      "rot": 180
     },
     {
      "id": "f-toilet-wc",
      "kind": "toilet",
      "room": "wc",
      "at": [
       4.22,
       8.2
      ],
      "size": [
       0.4,
       0.7
      ],
      "rot": 270
     },
     {
      "id": "f-basin-wc",
      "kind": "basin",
      "room": "wc",
      "at": [
       4.25,
       9.295
      ],
      "size": [
       0.6,
       0.45
      ],
      "rot": 180
     },
     {
      "id": "f-desk",
      "kind": "desk",
      "room": "study",
      "at": [
       0.43,
       7.4
      ],
      "size": [
       1.6,
       0.6
      ],
      "rot": 270
     },
     {
      "id": "f-wardrobe-study",
      "kind": "wardrobe",
      "room": "study",
      "at": [
       1.55,
       5.77
      ],
      "size": [
       1.9,
       0.6
      ],
      "rot": 0
     },
     {
      "id": "f-sofa-study",
      "kind": "sofa",
      "room": "study",
      "at": [
       1.9,
       9.02
      ],
      "size": [
       1.8,
       0.9
      ],
      "rot": 180
     },
     {
      "id": "f-sunbed-1",
      "kind": "sunbed",
      "room": "terrace",
      "at": [
       2.375,
       -1.85
      ],
      "size": [
       0.75,
       1.9
      ],
      "rot": 0
     },
     {
      "id": "f-sunbed-2",
      "kind": "sunbed",
      "room": "terrace",
      "at": [
       3.475,
       -1.85
      ],
      "size": [
       0.75,
       1.9
      ],
      "rot": 0
     },
     {
      "id": "f-outdoor",
      "kind": "outdoor-table",
      "room": "terrace",
      "at": [
       11.95,
       -2
      ],
      "size": [
       1.9,
       1
      ],
      "rot": 0
     },
     {
      "id": "f-plant-t1",
      "kind": "plant",
      "room": "terrace",
      "at": [
       1.3,
       -2.5
      ],
      "size": [
       0.6,
       0.6
      ],
      "rot": 0
     },
     {
      "id": "f-plant-t2",
      "kind": "plant",
      "room": "terrace",
      "at": [
       13.7,
       -2.5
      ],
      "size": [
       0.6,
       0.6
      ],
      "rot": 0
     }
    ]
   },
   {
    "level": 1,
    "name": "Upper floor",
    "height": 2.9,
    "outline": [
     [
      0,
      0
     ],
     [
      11.8,
      0
     ],
     [
      11.8,
      9.6
     ],
     [
      0,
      9.6
     ]
    ],
    "rooms": [
     {
      "id": "bed2",
      "kind": "bedroom",
      "name": "Bedroom 2",
      "floor": "wood",
      "polygon": [
       [
        0,
        0
       ],
       [
        4.4,
        0
       ],
       [
        4.4,
        4.2
       ],
       [
        0,
        4.2
       ]
      ]
     },
     {
      "id": "ensuite",
      "kind": "ensuite",
      "name": "Main en suite",
      "floor": "tile",
      "polygon": [
       [
        4.4,
        0
       ],
       [
        7,
        0
       ],
       [
        7,
        4.2
       ],
       [
        4.4,
        4.2
       ]
      ]
     },
     {
      "id": "master",
      "kind": "master",
      "name": "Main bedroom",
      "floor": "wood",
      "polygon": [
       [
        7,
        0
       ],
       [
        11.8,
        0
       ],
       [
        11.8,
        4.2
       ],
       [
        7,
        4.2
       ]
      ]
     },
     {
      "id": "landing",
      "kind": "hall",
      "name": "Landing",
      "floor": "wood",
      "polygon": [
       [
        0,
        4.2
       ],
       [
        11.8,
        4.2
       ],
       [
        11.8,
        5.4
       ],
       [
        0,
        5.4
       ]
      ]
     },
     {
      "id": "bed3",
      "kind": "bedroom",
      "name": "Bedroom 3",
      "floor": "wood",
      "polygon": [
       [
        0,
        5.4
       ],
       [
        4.4,
        5.4
       ],
       [
        4.4,
        9.6
       ],
       [
        0,
        9.6
       ]
      ]
     },
     {
      "id": "bath",
      "kind": "bathroom",
      "name": "Bathroom",
      "floor": "tile",
      "polygon": [
       [
        4.4,
        5.4
       ],
       [
        6.8,
        5.4
       ],
       [
        6.8,
        9.6
       ],
       [
        4.4,
        9.6
       ]
      ]
     },
     {
      "id": "linen",
      "kind": "storage",
      "name": "Linen store",
      "floor": "wood",
      "polygon": [
       [
        6.8,
        5.4
       ],
       [
        8.2,
        5.4
       ],
       [
        8.2,
        9.6
       ],
       [
        6.8,
        9.6
       ]
      ]
     },
     {
      "id": "stairs",
      "kind": "stairs",
      "name": "Stairs",
      "floor": "wood",
      "polygon": [
       [
        8.2,
        5.4
       ],
       [
        9.6,
        5.4
       ],
       [
        9.6,
        9.6
       ],
       [
        8.2,
        9.6
       ]
      ]
     },
     {
      "id": "bed4",
      "kind": "bedroom",
      "name": "Guest bedroom",
      "floor": "wood",
      "polygon": [
       [
        9.6,
        5.4
       ],
       [
        11.8,
        5.4
       ],
       [
        11.8,
        9.6
       ],
       [
        9.6,
        9.6
       ]
      ]
     },
     {
      "id": "roof",
      "kind": "terrace",
      "name": "Roof terrace",
      "floor": "deck",
      "outdoor": true,
      "polygon": [
       [
        11.8,
        0
       ],
       [
        15,
        0
       ],
       [
        15,
        9.6
       ],
       [
        11.8,
        9.6
       ]
      ]
     }
    ],
    "openings": [
     {
      "id": "o-stairs-landing",
      "kind": "opening",
      "at": [
       [
        8.5,
        5.4
       ],
       [
        9.3,
        5.4
       ]
      ],
      "rooms": [
       "stairs",
       "landing"
      ]
     },
     {
      "id": "o-landing-master",
      "kind": "door",
      "at": [
       [
        8,
        4.2
       ],
       [
        8.9,
        4.2
       ]
      ],
      "rooms": [
       "master",
       "landing"
      ]
     },
     {
      "id": "o-landing-bed2",
      "kind": "door",
      "at": [
       [
        1.4,
        4.2
       ],
       [
        2.3,
        4.2
       ]
      ],
      "rooms": [
       "bed2",
       "landing"
      ]
     },
     {
      "id": "o-master-ensuite",
      "kind": "door",
      "at": [
       [
        7,
        1.4
       ],
       [
        7,
        2.3
       ]
      ],
      "rooms": [
       "ensuite",
       "master"
      ]
     },
     {
      "id": "o-landing-bed3",
      "kind": "door",
      "at": [
       [
        1.4,
        5.4
       ],
       [
        2.3,
        5.4
       ]
      ],
      "rooms": [
       "bed3",
       "landing"
      ]
     },
     {
      "id": "o-landing-bath",
      "kind": "door",
      "at": [
       [
        5,
        5.4
       ],
       [
        5.8,
        5.4
       ]
      ],
      "rooms": [
       "bath",
       "landing"
      ]
     },
     {
      "id": "o-landing-linen",
      "kind": "door",
      "at": [
       [
        7.1,
        5.4
       ],
       [
        7.9,
        5.4
       ]
      ],
      "rooms": [
       "linen",
       "landing"
      ]
     },
     {
      "id": "o-landing-bed4",
      "kind": "door",
      "at": [
       [
        10.2,
        5.4
       ],
       [
        11,
        5.4
       ]
      ],
      "rooms": [
       "bed4",
       "landing"
      ]
     },
     {
      "id": "o-master-roof",
      "kind": "sliding",
      "at": [
       [
        11.8,
        0.8
       ],
       [
        11.8,
        3.4
       ]
      ],
      "rooms": [
       "master",
       "roof"
      ]
     },
     {
      "id": "o-bed4-roof",
      "kind": "sliding",
      "at": [
       [
        11.8,
        6
       ],
       [
        11.8,
        7.4
       ]
      ],
      "rooms": [
       "bed4",
       "roof"
      ]
     },
     {
      "id": "w-landing-roof",
      "kind": "window",
      "at": [
       [
        11.8,
        4.4
       ],
       [
        11.8,
        5.2
       ]
      ],
      "rooms": [
       "landing",
       "roof"
      ],
      "sill": 0.9,
      "head": 2.2
     },
     {
      "id": "w-bed2-north",
      "kind": "window",
      "at": [
       [
        1.2,
        0
       ],
       [
        3.4,
        0
       ]
      ],
      "rooms": [
       "bed2",
       null
      ],
      "sill": 0.9,
      "head": 2.2
     },
     {
      "id": "w-bed2-west",
      "kind": "window",
      "at": [
       [
        0,
        1
       ],
       [
        0,
        3
       ]
      ],
      "rooms": [
       "bed2",
       null
      ],
      "sill": 0.9,
      "head": 2.2
     },
     {
      "id": "w-ensuite-north",
      "kind": "window",
      "at": [
       [
        5.2,
        0
       ],
       [
        6.2,
        0
       ]
      ],
      "rooms": [
       "ensuite",
       null
      ],
      "sill": 1.3,
      "head": 2.2
     },
     {
      "id": "w-master-north",
      "kind": "window",
      "at": [
       [
        8,
        0
       ],
       [
        10.6,
        0
       ]
      ],
      "rooms": [
       "master",
       null
      ],
      "sill": 0.9,
      "head": 2.2
     },
     {
      "id": "w-bed3-west",
      "kind": "window",
      "at": [
       [
        0,
        6.2
       ],
       [
        0,
        8.2
       ]
      ],
      "rooms": [
       "bed3",
       null
      ],
      "sill": 0.9,
      "head": 2.2
     },
     {
      "id": "w-bed3-south",
      "kind": "window",
      "at": [
       [
        1,
        9.6
       ],
       [
        3.4,
        9.6
       ]
      ],
      "rooms": [
       "bed3",
       null
      ],
      "sill": 0.9,
      "head": 2.2
     },
     {
      "id": "w-bath-south",
      "kind": "window",
      "at": [
       [
        5.2,
        9.6
       ],
       [
        6,
        9.6
       ]
      ],
      "rooms": [
       "bath",
       null
      ],
      "sill": 1.3,
      "head": 2.2
     },
     {
      "id": "w-bed4-south",
      "kind": "window",
      "at": [
       [
        10.3,
        9.6
       ],
       [
        11.1,
        9.6
       ]
      ],
      "rooms": [
       "bed4",
       null
      ],
      "sill": 0.9,
      "head": 2.2
     }
    ],
    "furniture": [
     {
      "id": "f-bed-2",
      "kind": "bed-double",
      "room": "bed2",
      "at": [
       2.2,
       1.13
      ],
      "size": [
       1.6,
       2
      ],
      "rot": 0
     },
     {
      "id": "f-wardrobe-2",
      "kind": "wardrobe",
      "room": "bed2",
      "at": [
       0.43,
       3.25
      ],
      "size": [
       1.5,
       0.6
      ],
      "rot": 270
     },
     {
      "id": "f-desk-2",
      "kind": "desk",
      "room": "bed2",
      "at": [
       4,
       3
      ],
      "size": [
       1.2,
       0.6
      ],
      "rot": 90
     },
     {
      "id": "f-bath-ens",
      "kind": "bath",
      "room": "ensuite",
      "at": [
       5.3,
       0.505
      ],
      "size": [
       1.5,
       0.75
      ],
      "rot": 0
     },
     {
      "id": "f-shower-ens",
      "kind": "shower",
      "room": "ensuite",
      "at": [
       4.97,
       3.63
      ],
      "size": [
       1,
       1
      ],
      "rot": 180
     },
     {
      "id": "f-toilet-ens",
      "kind": "toilet",
      "room": "ensuite",
      "at": [
       6.58,
       3.4
      ],
      "size": [
       0.4,
       0.7
      ],
      "rot": 90
     },
     {
      "id": "f-basin-ens",
      "kind": "basin",
      "room": "ensuite",
      "at": [
       5.9,
       3.895
      ],
      "size": [
       0.6,
       0.45
      ],
      "rot": 180
     },
     {
      "id": "f-bed-master",
      "kind": "bed-double",
      "room": "master",
      "at": [
       9.4,
       1.18
      ],
      "size": [
       1.8,
       2.1
      ],
      "rot": 0
     },
     {
      "id": "f-wardrobe-master",
      "kind": "wardrobe",
      "room": "master",
      "at": [
       10.4,
       3.85
      ],
      "size": [
       2.4,
       0.56
      ],
      "rot": 180
     },
     {
      "id": "f-wardrobe-master-2",
      "kind": "wardrobe",
      "room": "master",
      "at": [
       7.37,
       3.3
      ],
      "size": [
       1.2,
       0.6
      ],
      "rot": 270
     },
     {
      "id": "f-stairs",
      "kind": "stairs",
      "room": "stairs",
      "at": [
       8.9,
       7.5
      ],
      "size": [
       1.2,
       4
      ],
      "rot": 180
     },
     {
      "id": "f-bed-3",
      "kind": "bed-double",
      "room": "bed3",
      "at": [
       2.2,
       8.47
      ],
      "size": [
       1.6,
       2
      ],
      "rot": 180
     },
     {
      "id": "f-wardrobe-3",
      "kind": "wardrobe",
      "room": "bed3",
      "at": [
       0.43,
       7
      ],
      "size": [
       1.6,
       0.6
      ],
      "rot": 270
     },
     {
      "id": "f-desk-3",
      "kind": "desk",
      "room": "bed3",
      "at": [
       4,
       6.8
      ],
      "size": [
       1.2,
       0.6
      ],
      "rot": 90
     },
     {
      "id": "f-toilet-bath",
      "kind": "toilet",
      "room": "bath",
      "at": [
       4.82,
       6.7
      ],
      "size": [
       0.4,
       0.7
      ],
      "rot": 270
     },
     {
      "id": "f-basin-bath",
      "kind": "basin",
      "room": "bath",
      "at": [
       4.695,
       7.5
      ],
      "size": [
       0.6,
       0.45
      ],
      "rot": 270
     },
     {
      "id": "f-washer",
      "kind": "washer",
      "room": "bath",
      "at": [
       6.45,
       6.6
      ],
      "size": [
       0.6,
       0.56
      ],
      "rot": 90
     },
     {
      "id": "f-shower-bath",
      "kind": "shower",
      "room": "bath",
      "at": [
       6.305,
       7.725
      ],
      "size": [
       0.85,
       0.85
      ],
      "rot": 90
     },
     {
      "id": "f-bath-bath",
      "kind": "bath",
      "room": "bath",
      "at": [
       5.4,
       9.095
      ],
      "size": [
       1.7,
       0.75
      ],
      "rot": 0
     },
     {
      "id": "f-wardrobe-linen",
      "kind": "wardrobe",
      "room": "linen",
      "at": [
       7.17,
       7.5
      ],
      "size": [
       1.8,
       0.6
      ],
      "rot": 270
     },
     {
      "id": "f-bed-4",
      "kind": "bed-single",
      "room": "bed4",
      "at": [
       11.05,
       8.47
      ],
      "size": [
       0.9,
       2
      ],
      "rot": 180
     },
     {
      "id": "f-wardrobe-4",
      "kind": "wardrobe",
      "room": "bed4",
      "at": [
       9.97,
       6.85
      ],
      "size": [
       1.2,
       0.6
      ],
      "rot": 270
     },
     {
      "id": "f-sunbed-r1",
      "kind": "sunbed",
      "room": "roof",
      "at": [
       13.575,
       2.45
      ],
      "size": [
       0.75,
       1.9
      ],
      "rot": 0
     },
     {
      "id": "f-sunbed-r2",
      "kind": "sunbed",
      "room": "roof",
      "at": [
       14.375,
       2.45
      ],
      "size": [
       0.75,
       1.9
      ],
      "rot": 0
     },
     {
      "id": "f-outdoor-r",
      "kind": "outdoor-table",
      "room": "roof",
      "at": [
       13.6,
       6.6
      ],
      "size": [
       1.2,
       1.2
      ],
      "rot": 0
     },
     {
      "id": "f-plant-r1",
      "kind": "plant",
      "room": "roof",
      "at": [
       12.95,
       8.75
      ],
      "size": [
       0.7,
       0.7
      ],
      "rot": 0
     },
     {
      "id": "f-plant-r2",
      "kind": "plant",
      "room": "roof",
      "at": [
       14.45,
       8.75
      ],
      "size": [
       0.7,
       0.7
      ],
      "rot": 0
     }
    ]
   }
  ]
 }
}
`;export{n as default};
