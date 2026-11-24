const n=`{
 "schema": 2,
 "level": "home",
 "projectCode": "HU",
 "modelCode": "HU-TOWN",
 "layout": {
  "id": "HU-TOWN",
  "name": "Townhouse",
  "type": "Townhouse",
  "bedrooms": 3,
  "bathrooms": 3,
  "areaSqm": 192,
  "exterior": "house",
  "northDeg": 0,
  "entry": {
   "storey": 0,
   "at": [
    4.7,
    11.2
   ],
   "facing": 0
  },
  "plot": {
   "outline": [
    [
     -3,
     -9
    ],
    [
     11,
     -9
    ],
    [
     11,
     17
    ],
    [
     -3,
     17
    ]
   ]
  },
  "storeys": [
   {
    "level": 0,
    "name": "Ground floor",
    "height": 2.9,
    "outline": [
     [
      0,
      0
     ],
     [
      8,
      0
     ],
     [
      8,
      12
     ],
     [
      0,
      12
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
        4.6,
        0
       ],
       [
        4.6,
        6.4
       ],
       [
        0,
        6.4
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
        4.6,
        0
       ],
       [
        8,
        0
       ],
       [
        8,
        2.8
       ],
       [
        4.6,
        2.8
       ]
      ]
     },
     {
      "id": "dining",
      "kind": "dining",
      "name": "Dining",
      "floor": "wood",
      "polygon": [
       [
        4.6,
        2.8
       ],
       [
        8,
        2.8
       ],
       [
        8,
        6.4
       ],
       [
        4.6,
        6.4
       ]
      ]
     },
     {
      "id": "garage",
      "kind": "garage",
      "name": "Garage",
      "floor": "stone",
      "polygon": [
       [
        0,
        6.4
       ],
       [
        3.2,
        6.4
       ],
       [
        3.2,
        12
       ],
       [
        0,
        12
       ]
      ]
     },
     {
      "id": "wc",
      "kind": "wc",
      "name": "WC",
      "floor": "tile",
      "polygon": [
       [
        3.2,
        6.4
       ],
       [
        5,
        6.4
       ],
       [
        5,
        8.4
       ],
       [
        3.2,
        8.4
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
        5,
        6.4
       ],
       [
        6.6,
        6.4
       ],
       [
        6.6,
        10.4
       ],
       [
        8,
        10.4
       ],
       [
        8,
        12
       ],
       [
        3.2,
        12
       ],
       [
        3.2,
        8.4
       ],
       [
        5,
        8.4
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
        6.6,
        6.4
       ],
       [
        8,
        6.4
       ],
       [
        8,
        10.4
       ],
       [
        6.6,
        10.4
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
        0,
        -3
       ],
       [
        8,
        -3
       ],
       [
        8,
        0
       ],
       [
        0,
        0
       ]
      ]
     },
     {
      "id": "garden",
      "kind": "garden",
      "name": "Garden",
      "floor": "grass",
      "outdoor": true,
      "polygon": [
       [
        -3,
        -9
       ],
       [
        11,
        -9
       ],
       [
        11,
        17
       ],
       [
        8,
        17
       ],
       [
        8,
        -3
       ],
       [
        0,
        -3
       ],
       [
        0,
        17
       ],
       [
        -3,
        17
       ]
      ]
     },
     {
      "id": "front",
      "kind": "garden",
      "name": "Front garden",
      "floor": "grass",
      "outdoor": true,
      "polygon": [
       [
        3.2,
        12
       ],
       [
        8,
        12
       ],
       [
        8,
        17
       ],
       [
        3.2,
        17
       ]
      ]
     },
     {
      "id": "drive",
      "kind": "garden",
      "name": "Driveway",
      "floor": "stone",
      "outdoor": true,
      "polygon": [
       [
        0,
        12
       ],
       [
        3.2,
        12
       ],
       [
        3.2,
        17
       ],
       [
        0,
        17
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
        4.2,
        12
       ],
       [
        5.2,
        12
       ]
      ],
      "rooms": [
       "hall",
       "front"
      ]
     },
     {
      "id": "o-garage-door",
      "kind": "sliding",
      "at": [
       [
        0.4,
        12
       ],
       [
        2.8,
        12
       ]
      ],
      "rooms": [
       "garage",
       "drive"
      ]
     },
     {
      "id": "o-hall-garage",
      "kind": "door",
      "at": [
       [
        3.2,
        9.4
       ],
       [
        3.2,
        10.3
       ]
      ],
      "rooms": [
       "hall",
       "garage"
      ]
     },
     {
      "id": "o-hall-wc",
      "kind": "door",
      "at": [
       [
        5,
        7
       ],
       [
        5,
        7.8
       ]
      ],
      "rooms": [
       "wc",
       "hall"
      ]
     },
     {
      "id": "o-hall-dining",
      "kind": "opening",
      "at": [
       [
        5.15,
        6.4
       ],
       [
        6.45,
        6.4
       ]
      ],
      "rooms": [
       "dining",
       "hall"
      ]
     },
     {
      "id": "o-hall-stairs",
      "kind": "opening",
      "at": [
       [
        6.8,
        10.4
       ],
       [
        7.8,
        10.4
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
        4.6,
        3.2
       ],
       [
        4.6,
        5.6
       ]
      ],
      "rooms": [
       "living",
       "dining"
      ]
     },
     {
      "id": "o-kitchen-dining",
      "kind": "opening",
      "at": [
       [
        5.2,
        2.8
       ],
       [
        7.2,
        2.8
       ]
      ],
      "rooms": [
       "kitchen",
       "dining"
      ]
     },
     {
      "id": "o-living-terrace",
      "kind": "sliding",
      "at": [
       [
        0.6,
        0
       ],
       [
        3.6,
        0
       ]
      ],
      "rooms": [
       "living",
       "terrace"
      ]
     },
     {
      "id": "o-kitchen-terrace",
      "kind": "sliding",
      "at": [
       [
        5.4,
        0
       ],
       [
        7,
        0
       ]
      ],
      "rooms": [
       "kitchen",
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
        4.4
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
      "id": "w-living-west-2",
      "kind": "window",
      "at": [
       [
        0,
        4.8
       ],
       [
        0,
        5.8
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
        8,
        3.4
       ],
       [
        8,
        5.6
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
        8,
        0.7
       ],
       [
        8,
        2
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
      "id": "w-hall-south",
      "kind": "window",
      "at": [
       [
        6.2,
        12
       ],
       [
        7.4,
        12
       ]
      ],
      "rooms": [
       "hall",
       "front"
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
       2.3,
       3.7
      ],
      "size": [
       3.2,
       2.6
      ],
      "rot": 0
     },
     {
      "id": "f-tv",
      "kind": "tv-unit",
      "room": "living",
      "at": [
       1.9,
       6.105
      ],
      "size": [
       2,
       0.45
      ],
      "rot": 180
     },
     {
      "id": "f-sofa",
      "kind": "sofa",
      "room": "living",
      "at": [
       2.1,
       3.175
      ],
      "size": [
       2.2,
       0.95
      ],
      "rot": 0
     },
     {
      "id": "f-coffee",
      "kind": "coffee-table",
      "room": "living",
      "at": [
       2.1,
       4.4
      ],
      "size": [
       1.2,
       0.6
      ],
      "rot": 0
     },
     {
      "id": "f-armchair",
      "kind": "armchair",
      "room": "living",
      "at": [
       0.8,
       1.4
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
       4.225,
       0.425
      ],
      "size": [
       0.45,
       0.45
      ],
      "rot": 0
     },
     {
      "id": "f-run",
      "kind": "kitchen-run",
      "room": "kitchen",
      "at": [
       7.57,
       1.35
      ],
      "size": [
       2.3,
       0.6
      ],
      "rot": 90
     },
     {
      "id": "f-fridge",
      "kind": "fridge",
      "room": "kitchen",
      "at": [
       5,
       0.43
      ],
      "size": [
       0.6,
       0.6
      ],
      "rot": 0
     },
     {
      "id": "f-dining",
      "kind": "dining-table",
      "room": "dining",
      "at": [
       6.3,
       4.175
      ],
      "size": [
       1.8,
       0.95
      ],
      "rot": 0
     },
     {
      "id": "f-garage-car",
      "kind": "car",
      "room": "garage",
      "at": [
       1.6,
       9.1
      ],
      "size": [
       1.8,
       4.4
      ],
      "rot": 0
     },
     {
      "id": "f-wardrobe-hall",
      "kind": "wardrobe",
      "room": "hall",
      "at": [
       4.1,
       8.77
      ],
      "size": [
       1.6,
       0.6
      ],
      "rot": 0
     },
     {
      "id": "f-toilet-wc",
      "kind": "toilet",
      "room": "wc",
      "at": [
       3.62,
       7.6
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
       4.4,
       6.695
      ],
      "size": [
       0.6,
       0.45
      ],
      "rot": 0
     },
     {
      "id": "f-stairs",
      "kind": "stairs",
      "room": "stairs",
      "at": [
       7.3,
       8.4
      ],
      "size": [
       1.2,
       3.8
      ],
      "rot": 180
     },
     {
      "id": "f-sunbed",
      "kind": "sunbed",
      "room": "terrace",
      "at": [
       1.275,
       -1.8
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
       4.6,
       -1.8
      ],
      "size": [
       1.2,
       1.2
      ],
      "rot": 0
     },
     {
      "id": "f-plant-t",
      "kind": "plant",
      "room": "terrace",
      "at": [
       7.5,
       -2.4
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
    "name": "First floor",
    "height": 2.9,
    "outline": [
     [
      0,
      0
     ],
     [
      8,
      0
     ],
     [
      8,
      12
     ],
     [
      0,
      12
     ]
    ],
    "rooms": [
     {
      "id": "master",
      "kind": "master",
      "name": "Main bedroom",
      "floor": "wood",
      "polygon": [
       [
        0,
        0
       ],
       [
        4.8,
        0
       ],
       [
        4.8,
        4.6
       ],
       [
        0,
        4.6
       ]
      ]
     },
     {
      "id": "ensuite",
      "kind": "ensuite",
      "name": "En suite",
      "floor": "tile",
      "polygon": [
       [
        4.8,
        0
       ],
       [
        8,
        0
       ],
       [
        8,
        2.4
       ],
       [
        4.8,
        2.4
       ]
      ]
     },
     {
      "id": "dressing",
      "kind": "storage",
      "name": "Dressing room",
      "floor": "wood",
      "polygon": [
       [
        4.8,
        2.4
       ],
       [
        8,
        2.4
       ],
       [
        8,
        4.6
       ],
       [
        4.8,
        4.6
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
        4.6
       ],
       [
        8,
        4.6
       ],
       [
        8,
        6.4
       ],
       [
        6.6,
        6.4
       ],
       [
        6.6,
        11
       ],
       [
        5,
        11
       ],
       [
        5,
        6.4
       ],
       [
        0,
        6.4
       ]
      ]
     },
     {
      "id": "bed2",
      "kind": "bedroom",
      "name": "Bedroom 2",
      "floor": "wood",
      "polygon": [
       [
        0,
        6.4
       ],
       [
        3.2,
        6.4
       ],
       [
        3.2,
        9.2
       ],
       [
        0,
        9.2
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
        3.2,
        6.4
       ],
       [
        5,
        6.4
       ],
       [
        5,
        9.2
       ],
       [
        3.2,
        9.2
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
        9.2
       ],
       [
        5,
        9.2
       ],
       [
        5,
        12
       ],
       [
        0,
        12
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
        6.6,
        6.4
       ],
       [
        8,
        6.4
       ],
       [
        8,
        10.4
       ],
       [
        6.6,
        10.4
       ]
      ]
     },
     {
      "id": "store",
      "kind": "storage",
      "name": "Store",
      "floor": "wood",
      "polygon": [
       [
        5,
        11
       ],
       [
        6.6,
        11
       ],
       [
        6.6,
        10.4
       ],
       [
        8,
        10.4
       ],
       [
        8,
        12
       ],
       [
        5,
        12
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
        6.9,
        6.4
       ],
       [
        7.7,
        6.4
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
        3.6,
        4.6
       ],
       [
        4.4,
        4.6
       ]
      ],
      "rooms": [
       "master",
       "landing"
      ]
     },
     {
      "id": "o-master-ensuite",
      "kind": "door",
      "at": [
       [
        4.8,
        0.6
       ],
       [
        4.8,
        1.4
       ]
      ],
      "rooms": [
       "ensuite",
       "master"
      ]
     },
     {
      "id": "o-master-dressing",
      "kind": "door",
      "at": [
       [
        4.8,
        3.2
       ],
       [
        4.8,
        4
       ]
      ],
      "rooms": [
       "dressing",
       "master"
      ]
     },
     {
      "id": "o-landing-bed2",
      "kind": "door",
      "at": [
       [
        1.2,
        6.4
       ],
       [
        2,
        6.4
       ]
      ],
      "rooms": [
       "bed2",
       "landing"
      ]
     },
     {
      "id": "o-landing-bath",
      "kind": "door",
      "at": [
       [
        3.8,
        6.4
       ],
       [
        4.6,
        6.4
       ]
      ],
      "rooms": [
       "bath",
       "landing"
      ]
     },
     {
      "id": "o-landing-bed3",
      "kind": "door",
      "at": [
       [
        5,
        9.8
       ],
       [
        5,
        10.6
       ]
      ],
      "rooms": [
       "bed3",
       "landing"
      ]
     },
     {
      "id": "o-landing-store",
      "kind": "door",
      "at": [
       [
        5.4,
        11
       ],
       [
        6.2,
        11
       ]
      ],
      "rooms": [
       "store",
       "landing"
      ]
     },
     {
      "id": "w-master-north",
      "kind": "window",
      "at": [
       [
        1.2,
        0
       ],
       [
        3.6,
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
      "id": "w-master-west",
      "kind": "window",
      "at": [
       [
        0,
        1.4
       ],
       [
        0,
        3.2
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
      "id": "w-ensuite-north",
      "kind": "window",
      "at": [
       [
        5.8,
        0
       ],
       [
        7,
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
      "id": "w-ensuite-east",
      "kind": "window",
      "at": [
       [
        8,
        0.6
       ],
       [
        8,
        1.6
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
      "id": "w-dressing-east",
      "kind": "window",
      "at": [
       [
        8,
        3
       ],
       [
        8,
        4
       ]
      ],
      "rooms": [
       "dressing",
       null
      ],
      "sill": 1,
      "head": 2.2
     },
     {
      "id": "w-landing-east",
      "kind": "window",
      "at": [
       [
        8,
        4.8
       ],
       [
        8,
        6.2
       ]
      ],
      "rooms": [
       "landing",
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
        7
       ],
       [
        0,
        8.8
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
      "id": "w-bed3-west",
      "kind": "window",
      "at": [
       [
        0,
        10
       ],
       [
        0,
        11.6
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
        12
       ],
       [
        3,
        12
       ]
      ],
      "rooms": [
       "bed3",
       null
      ],
      "sill": 0.9,
      "head": 2.2
     }
    ],
    "furniture": [
     {
      "id": "f-bed-master",
      "kind": "bed-double",
      "room": "master",
      "at": [
       2.4,
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
       1.7,
       4.25
      ],
      "size": [
       2.6,
       0.56
      ],
      "rot": 180
     },
     {
      "id": "f-desk-master",
      "kind": "desk",
      "room": "master",
      "at": [
       0.43,
       3.1
      ],
      "size": [
       1,
       0.6
      ],
      "rot": 270
     },
     {
      "id": "f-bath-ens",
      "kind": "bath",
      "room": "ensuite",
      "at": [
       7.495,
       1.15
      ],
      "size": [
       1.7,
       0.75
      ],
      "rot": 90
     },
     {
      "id": "f-shower-ens",
      "kind": "shower",
      "room": "ensuite",
      "at": [
       5.85,
       1.88
      ],
      "size": [
       0.9,
       0.9
      ],
      "rot": 180
     },
     {
      "id": "f-toilet-ens",
      "kind": "toilet",
      "room": "ensuite",
      "at": [
       6.1,
       0.48
      ],
      "size": [
       0.4,
       0.7
      ],
      "rot": 0
     },
     {
      "id": "f-basin-ens",
      "kind": "basin",
      "room": "ensuite",
      "at": [
       6.7,
       0.355
      ],
      "size": [
       0.6,
       0.45
      ],
      "rot": 0
     },
     {
      "id": "f-wardrobe-dr1",
      "kind": "wardrobe",
      "room": "dressing",
      "at": [
       6.4,
       2.77
      ],
      "size": [
       1.6,
       0.6
      ],
      "rot": 0
     },
     {
      "id": "f-wardrobe-dr2",
      "kind": "wardrobe",
      "room": "dressing",
      "at": [
       6.45,
       4.265
      ],
      "size": [
       1.5,
       0.53
      ],
      "rot": 180
     },
     {
      "id": "f-wardrobe-dr3",
      "kind": "wardrobe",
      "room": "dressing",
      "at": [
       7.57,
       3.55
      ],
      "size": [
       0.7,
       0.6
      ],
      "rot": 90
     },
     {
      "id": "f-bed-2",
      "kind": "bed-single",
      "room": "bed2",
      "at": [
       1.13,
       7.75
      ],
      "size": [
       0.9,
       2
      ],
      "rot": 270
     },
     {
      "id": "f-wardrobe-2",
      "kind": "wardrobe",
      "room": "bed2",
      "at": [
       2.855,
       8.05
      ],
      "size": [
       1.5,
       0.55
      ],
      "rot": 90
     },
     {
      "id": "f-toilet-bath",
      "kind": "toilet",
      "room": "bath",
      "at": [
       3.62,
       7.6
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
       4.705,
       7.6
      ],
      "size": [
       0.6,
       0.45
      ],
      "rot": 90
     },
     {
      "id": "f-bath-bath",
      "kind": "bath",
      "room": "bath",
      "at": [
       4.12,
       8.755
      ],
      "size": [
       1.7,
       0.75
      ],
      "rot": 0
     },
     {
      "id": "f-stairs",
      "kind": "stairs",
      "room": "stairs",
      "at": [
       7.3,
       8.4
      ],
      "size": [
       1.2,
       3.8
      ],
      "rot": 180
     },
     {
      "id": "f-bed-3",
      "kind": "bed-double",
      "room": "bed3",
      "at": [
       1.13,
       10.7
      ],
      "size": [
       1.6,
       2
      ],
      "rot": 270
     },
     {
      "id": "f-wardrobe-3",
      "kind": "wardrobe",
      "room": "bed3",
      "at": [
       3.2,
       9.535
      ],
      "size": [
       1.6,
       0.53
      ],
      "rot": 0
     },
     {
      "id": "f-desk-3",
      "kind": "desk",
      "room": "bed3",
      "at": [
       3.5,
       11.57
      ],
      "size": [
       1.2,
       0.6
      ],
      "rot": 180
     }
    ]
   }
  ]
 }
}
`;export{n as default};
