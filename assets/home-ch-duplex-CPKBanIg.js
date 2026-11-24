const n=`{
 "schema": 2,
 "level": "home",
 "projectCode": "CH",
 "modelCode": "CH-DUPLEX",
 "layout": {
  "id": "CH-DUPLEX",
  "name": "Duplex apartment",
  "type": "Apartment",
  "bedrooms": 2,
  "bathrooms": 3,
  "areaSqm": 160,
  "exterior": "apartment",
  "northDeg": 0,
  "entry": {
   "storey": 0,
   "at": [
    3.4,
    7.5
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
      10,
      0
     ],
     [
      10,
      8
     ],
     [
      0,
      8
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
        5.6,
        0
       ],
       [
        5.6,
        4.6
       ],
       [
        0,
        4.6
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
        5.6,
        0
       ],
       [
        10,
        0
       ],
       [
        10,
        2.8
       ],
       [
        5.6,
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
        5.6,
        2.8
       ],
       [
        10,
        2.8
       ],
       [
        10,
        4.6
       ],
       [
        5.6,
        4.6
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
        0,
        4.6
       ],
       [
        1.8,
        4.6
       ],
       [
        1.8,
        6.6
       ],
       [
        0,
        6.6
       ]
      ]
     },
     {
      "id": "laundry",
      "kind": "laundry",
      "name": "Laundry",
      "floor": "tile",
      "polygon": [
       [
        0,
        6.6
       ],
       [
        1.8,
        6.6
       ],
       [
        1.8,
        8
       ],
       [
        0,
        8
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
        1.8,
        4.6
       ],
       [
        5,
        4.6
       ],
       [
        5,
        8
       ],
       [
        1.8,
        8
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
        5,
        4.6
       ],
       [
        8.6,
        4.6
       ],
       [
        8.6,
        8
       ],
       [
        5,
        8
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
        8.6,
        4.6
       ],
       [
        10,
        4.6
       ],
       [
        10,
        8
       ],
       [
        8.6,
        8
       ]
      ]
     },
     {
      "id": "balcony",
      "kind": "balcony",
      "name": "Balcony",
      "floor": "deck",
      "outdoor": true,
      "polygon": [
       [
        0.6,
        -1.8
       ],
       [
        5,
        -1.8
       ],
       [
        5,
        0
       ],
       [
        0.6,
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
        3,
        8
       ],
       [
        4,
        8
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
        2.4,
        4.6
       ],
       [
        4.2,
        4.6
       ]
      ],
      "rooms": [
       "living",
       "hall"
      ]
     },
     {
      "id": "o-hall-wc",
      "kind": "door",
      "at": [
       [
        1.8,
        5
       ],
       [
        1.8,
        5.8
       ]
      ],
      "rooms": [
       "wc",
       "hall"
      ]
     },
     {
      "id": "o-hall-laundry",
      "kind": "door",
      "at": [
       [
        1.8,
        6.9
       ],
       [
        1.8,
        7.7
       ]
      ],
      "rooms": [
       "laundry",
       "hall"
      ]
     },
     {
      "id": "o-hall-study",
      "kind": "door",
      "at": [
       [
        5,
        6.3
       ],
       [
        5,
        7.1
       ]
      ],
      "rooms": [
       "study",
       "hall"
      ]
     },
     {
      "id": "o-living-dining",
      "kind": "opening",
      "at": [
       [
        5.6,
        3.1
       ],
       [
        5.6,
        4.3
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
        6.4,
        2.8
       ],
       [
        8.8,
        2.8
       ]
      ],
      "rooms": [
       "kitchen",
       "dining"
      ]
     },
     {
      "id": "o-dining-stairs",
      "kind": "opening",
      "at": [
       [
        8.8,
        4.6
       ],
       [
        9.8,
        4.6
       ]
      ],
      "rooms": [
       "dining",
       "stairs"
      ]
     },
     {
      "id": "o-living-balcony",
      "kind": "sliding",
      "at": [
       [
        1.2,
        0
       ],
       [
        4.8,
        0
       ]
      ],
      "rooms": [
       "living",
       "balcony"
      ]
     },
     {
      "id": "w-living-west",
      "kind": "window",
      "at": [
       [
        0,
        1
       ],
       [
        0,
        3.6
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
      "id": "w-kitchen-north",
      "kind": "window",
      "at": [
       [
        6.4,
        0
       ],
       [
        8.2,
        0
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
      "id": "w-dining-east",
      "kind": "window",
      "at": [
       [
        10,
        3
       ],
       [
        10,
        4.2
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
      "id": "w-study-south",
      "kind": "window",
      "at": [
       [
        5.8,
        8
       ],
       [
        7.8,
        8
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
       3.55,
       2.2
      ],
      "size": [
       2.7,
       2.8
      ],
      "rot": 0
     },
     {
      "id": "f-tv",
      "kind": "tv-unit",
      "room": "living",
      "at": [
       5.305,
       1.7
      ],
      "size": [
       1.6,
       0.45
      ],
      "rot": 90
     },
     {
      "id": "f-sofa",
      "kind": "sofa",
      "room": "living",
      "at": [
       2.875,
       2.2
      ],
      "size": [
       2.2,
       0.95
      ],
      "rot": 270
     },
     {
      "id": "f-coffee",
      "kind": "coffee-table",
      "room": "living",
      "at": [
       4,
       2.2
      ],
      "size": [
       0.6,
       1
      ],
      "rot": 0
     },
     {
      "id": "f-plant",
      "kind": "plant",
      "room": "living",
      "at": [
       0.38,
       4.15
      ],
      "size": [
       0.5,
       0.5
      ],
      "rot": 0
     },
     {
      "id": "f-run",
      "kind": "kitchen-run",
      "room": "kitchen",
      "at": [
       9.57,
       1.4
      ],
      "size": [
       2.2,
       0.6
      ],
      "rot": 90
     },
     {
      "id": "f-fridge",
      "kind": "fridge",
      "room": "kitchen",
      "at": [
       6.115,
       0.43
      ],
      "size": [
       0.63,
       0.6
      ],
      "rot": 0
     },
     {
      "id": "f-island",
      "kind": "kitchen-island",
      "room": "kitchen",
      "at": [
       7.5,
       1.575
      ],
      "size": [
       1.6,
       0.75
      ],
      "rot": 180
     },
     {
      "id": "f-dining",
      "kind": "dining-table",
      "room": "dining",
      "at": [
       7.3,
       3.95
      ],
      "size": [
       1.8,
       0.9
      ],
      "rot": 0
     },
     {
      "id": "f-toilet-wc",
      "kind": "toilet",
      "room": "wc",
      "at": [
       0.48,
       6.1
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
       0.7,
       4.895
      ],
      "size": [
       0.6,
       0.45
      ],
      "rot": 0
     },
     {
      "id": "f-washer",
      "kind": "washer",
      "room": "laundry",
      "at": [
       0.43,
       7.3
      ],
      "size": [
       0.6,
       0.6
      ],
      "rot": 270
     },
     {
      "id": "f-desk",
      "kind": "desk",
      "room": "study",
      "at": [
       6.6,
       7.56
      ],
      "size": [
       1.2,
       0.62
      ],
      "rot": 180
     },
     {
      "id": "f-plant-study",
      "kind": "plant",
      "room": "study",
      "at": [
       5.4,
       5
      ],
      "size": [
       0.5,
       0.5
      ],
      "rot": 0
     },
     {
      "id": "f-stairs",
      "kind": "stairs",
      "room": "stairs",
      "at": [
       9.3,
       6.3
      ],
      "size": [
       1.2,
       3.2
      ],
      "rot": 0
     },
     {
      "id": "f-outdoor",
      "kind": "outdoor-table",
      "room": "balcony",
      "at": [
       3.65,
       -1.225
      ],
      "size": [
       0.9,
       0.85
      ],
      "rot": 0
     },
     {
      "id": "f-plant-balcony",
      "kind": "plant",
      "room": "balcony",
      "at": [
       1.05,
       -1.35
      ],
      "size": [
       0.5,
       0.5
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
      10,
      0
     ],
     [
      10,
      8
     ],
     [
      0,
      8
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
        7.2,
        0
       ],
       [
        7.2,
        2.2
       ],
       [
        4.8,
        2.2
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
        2.2
       ],
       [
        7.2,
        2.2
       ],
       [
        7.2,
        4.6
       ],
       [
        4.8,
        4.6
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
        7.2,
        0
       ],
       [
        10,
        0
       ],
       [
        10,
        4.6
       ],
       [
        7.2,
        4.6
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
        0,
        4.6
       ],
       [
        1.8,
        4.6
       ],
       [
        1.8,
        8
       ],
       [
        0,
        8
       ]
      ]
     },
     {
      "id": "lounge",
      "kind": "living",
      "name": "Upper lounge",
      "floor": "carpet",
      "polygon": [
       [
        1.8,
        4.6
       ],
       [
        8.6,
        4.6
       ],
       [
        8.6,
        8
       ],
       [
        1.8,
        8
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
        8.6,
        4.6
       ],
       [
        10,
        4.6
       ],
       [
        10,
        8
       ],
       [
        8.6,
        8
       ]
      ]
     }
    ],
    "openings": [
     {
      "id": "o-lounge-master",
      "kind": "door",
      "at": [
       [
        3.4,
        4.6
       ],
       [
        4.2,
        4.6
       ]
      ],
      "rooms": [
       "master",
       "lounge"
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
      "id": "o-lounge-bed2",
      "kind": "door",
      "at": [
       [
        7.4,
        4.6
       ],
       [
        8.2,
        4.6
       ]
      ],
      "rooms": [
       "bed2",
       "lounge"
      ]
     },
     {
      "id": "o-lounge-bath",
      "kind": "door",
      "at": [
       [
        1.8,
        5.2
       ],
       [
        1.8,
        6
       ]
      ],
      "rooms": [
       "bath",
       "lounge"
      ]
     },
     {
      "id": "o-stairs-lounge",
      "kind": "opening",
      "at": [
       [
        8.6,
        5.8
       ],
       [
        8.6,
        7
       ]
      ],
      "rooms": [
       "stairs",
       "lounge"
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
      "id": "w-bed2-north",
      "kind": "window",
      "at": [
       [
        8,
        0
       ],
       [
        9.4,
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
      "id": "w-bed2-east",
      "kind": "window",
      "at": [
       [
        10,
        1.2
       ],
       [
        10,
        3.4
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
      "id": "w-bath-west",
      "kind": "window",
      "at": [
       [
        0,
        5.6
       ],
       [
        0,
        6.4
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
      "id": "w-lounge-south-1",
      "kind": "window",
      "at": [
       [
        2.4,
        8
       ],
       [
        4.6,
        8
       ]
      ],
      "rooms": [
       "lounge",
       null
      ],
      "sill": 0.9,
      "head": 2.2
     },
     {
      "id": "w-lounge-south-2",
      "kind": "window",
      "at": [
       [
        5.4,
        8
       ],
       [
        7.6,
        8
       ]
      ],
      "rooms": [
       "lounge",
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
       0.95,
       4.25
      ],
      "size": [
       1.3,
       0.56
      ],
      "rot": 180
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
      "id": "f-toilet-ens",
      "kind": "toilet",
      "room": "ensuite",
      "at": [
       5.9,
       0.48
      ],
      "size": [
       0.4,
       0.7
      ],
      "rot": 0
     },
     {
      "id": "f-shower-ens",
      "kind": "shower",
      "room": "ensuite",
      "at": [
       6.65,
       1.7
      ],
      "size": [
       0.9,
       0.8
      ],
      "rot": 180
     },
     {
      "id": "f-wardrobe-dr1",
      "kind": "wardrobe",
      "room": "dressing",
      "at": [
       6.83,
       3.3
      ],
      "size": [
       1.4,
       0.6
      ],
      "rot": 90
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
       1.1,
       0.53
      ],
      "rot": 180
     },
     {
      "id": "f-bed-2",
      "kind": "bed-double",
      "room": "bed2",
      "at": [
       8.6,
       1.18
      ],
      "size": [
       1.8,
       2.1
      ],
      "rot": 0
     },
     {
      "id": "f-wardrobe-2",
      "kind": "wardrobe",
      "room": "bed2",
      "at": [
       9.15,
       4.25
      ],
      "size": [
       1.3,
       0.56
      ],
      "rot": 180
     },
     {
      "id": "f-bath-bath",
      "kind": "bath",
      "room": "bath",
      "at": [
       0.92,
       7.555
      ],
      "size": [
       1.7,
       0.75
      ],
      "rot": 0
     },
     {
      "id": "f-toilet-bath",
      "kind": "toilet",
      "room": "bath",
      "at": [
       0.48,
       5.7
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
       0.9,
       4.895
      ],
      "size": [
       0.6,
       0.45
      ],
      "rot": 0
     },
     {
      "id": "f-rug",
      "kind": "rug",
      "room": "lounge",
      "at": [
       6.1,
       6.5
      ],
      "size": [
       2.4,
       2
      ],
      "rot": 0
     },
     {
      "id": "f-tv-lounge",
      "kind": "tv-unit",
      "room": "lounge",
      "at": [
       5.9,
       4.895
      ],
      "size": [
       1.8,
       0.45
      ],
      "rot": 0
     },
     {
      "id": "f-sofa-lounge",
      "kind": "sofa",
      "room": "lounge",
      "at": [
       6.1,
       6.875
      ],
      "size": [
       2.2,
       0.95
      ],
      "rot": 180
     },
     {
      "id": "f-coffee-lounge",
      "kind": "coffee-table",
      "room": "lounge",
      "at": [
       6.1,
       5.95
      ],
      "size": [
       1,
       0.5
      ],
      "rot": 0
     },
     {
      "id": "f-desk-lounge",
      "kind": "desk",
      "room": "lounge",
      "at": [
       2.9,
       7.59
      ],
      "size": [
       1.2,
       0.62
      ],
      "rot": 180
     },
     {
      "id": "f-plant-lounge",
      "kind": "plant",
      "room": "lounge",
      "at": [
       4.15,
       7.65
      ],
      "size": [
       0.5,
       0.5
      ],
      "rot": 0
     },
     {
      "id": "f-stairs",
      "kind": "stairs",
      "room": "stairs",
      "at": [
       9.3,
       6.3
      ],
      "size": [
       1.2,
       3.2
      ],
      "rot": 0
     }
    ]
   }
  ]
 }
}
`;export{n as default};
