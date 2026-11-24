const n=`{
 "schema": 2,
 "level": "home",
 "projectCode": "HU",
 "modelCode": "HU-APT3",
 "layout": {
  "id": "HU-APT3",
  "name": "Three-bedroom apartment",
  "type": "Apartment",
  "bedrooms": 3,
  "bathrooms": 3,
  "areaSqm": 150,
  "exterior": "apartment",
  "northDeg": 0,
  "entry": {
   "storey": 0,
   "at": [
    6.2,
    9.3
   ],
   "facing": 0
  },
  "storeys": [
   {
    "level": 0,
    "name": "Apartment",
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
      10
     ],
     [
      0,
      10
     ]
    ],
    "rooms": [
     {
      "id": "living",
      "kind": "living",
      "name": "Living and dining",
      "floor": "wood",
      "polygon": [
       [
        0,
        0
       ],
       [
        7,
        0
       ],
       [
        7,
        5.2
       ],
       [
        0,
        5.2
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
        0,
        5.2
       ],
       [
        3.8,
        5.2
       ],
       [
        3.8,
        10
       ],
       [
        0,
        10
       ]
      ]
     },
     {
      "id": "hall",
      "kind": "hall",
      "name": "Hall",
      "floor": "wood",
      "polygon": [
       [
        3.8,
        5.2
       ],
       [
        15,
        5.2
       ],
       [
        15,
        6.4
       ],
       [
        7,
        6.4
       ],
       [
        7,
        10
       ],
       [
        5.4,
        10
       ],
       [
        5.4,
        8.2
       ],
       [
        3.8,
        8.2
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
        8.2
       ],
       [
        5.4,
        8.2
       ],
       [
        5.4,
        10
       ],
       [
        3.8,
        10
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
        5.2
       ],
       [
        7,
        5.2
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
        11.8,
        0
       ],
       [
        15,
        0
       ],
       [
        15,
        3
       ],
       [
        11.8,
        3
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
        11.8,
        3
       ],
       [
        15,
        3
       ],
       [
        15,
        5.2
       ],
       [
        11.8,
        5.2
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
        7,
        6.4
       ],
       [
        11,
        6.4
       ],
       [
        11,
        10
       ],
       [
        7,
        10
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
        11,
        6.4
       ],
       [
        15,
        6.4
       ],
       [
        15,
        10
       ],
       [
        11,
        10
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
        0.8,
        -1.8
       ],
       [
        6.4,
        -1.8
       ],
       [
        6.4,
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
        5.75,
        10
       ],
       [
        6.75,
        10
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
        4.2,
        5.2
       ],
       [
        6.6,
        5.2
       ]
      ],
      "rooms": [
       "living",
       "hall"
      ]
     },
     {
      "id": "o-kitchen-living",
      "kind": "opening",
      "at": [
       [
        0.6,
        5.2
       ],
       [
        3.2,
        5.2
       ]
      ],
      "rooms": [
       "kitchen",
       "living"
      ]
     },
     {
      "id": "o-kitchen-hall",
      "kind": "door",
      "at": [
       [
        3.8,
        6.2
       ],
       [
        3.8,
        7.1
       ]
      ],
      "rooms": [
       "kitchen",
       "hall"
      ]
     },
     {
      "id": "o-hall-wc",
      "kind": "door",
      "at": [
       [
        5.4,
        8.6
       ],
       [
        5.4,
        9.4
       ]
      ],
      "rooms": [
       "wc",
       "hall"
      ]
     },
     {
      "id": "o-hall-master",
      "kind": "door",
      "at": [
       [
        8,
        5.2
       ],
       [
        8.9,
        5.2
       ]
      ],
      "rooms": [
       "master",
       "hall"
      ]
     },
     {
      "id": "o-master-ensuite",
      "kind": "door",
      "at": [
       [
        11.8,
        0.8
       ],
       [
        11.8,
        1.7
       ]
      ],
      "rooms": [
       "ensuite",
       "master"
      ]
     },
     {
      "id": "o-hall-bath",
      "kind": "door",
      "at": [
       [
        12.6,
        5.2
       ],
       [
        13.4,
        5.2
       ]
      ],
      "rooms": [
       "bath",
       "hall"
      ]
     },
     {
      "id": "o-hall-bed2",
      "kind": "door",
      "at": [
       [
        8,
        6.4
       ],
       [
        8.8,
        6.4
       ]
      ],
      "rooms": [
       "bed2",
       "hall"
      ]
     },
     {
      "id": "o-hall-bed3",
      "kind": "door",
      "at": [
       [
        12,
        6.4
       ],
       [
        12.8,
        6.4
       ]
      ],
      "rooms": [
       "bed3",
       "hall"
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
        6,
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
        3.2
       ],
       [
        0,
        4.6
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
      "id": "w-kitchen-west",
      "kind": "window",
      "at": [
       [
        0,
        6.3
       ],
       [
        0,
        8.9
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
        0.7,
        10
       ],
       [
        2.7,
        10
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
      "id": "w-master-north",
      "kind": "window",
      "at": [
       [
        8,
        0
       ],
       [
        10.8,
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
      "id": "w-ensuite-north",
      "kind": "window",
      "at": [
       [
        12.6,
        0
       ],
       [
        13.6,
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
      "id": "w-bath-east",
      "kind": "window",
      "at": [
       [
        15,
        3.4
       ],
       [
        15,
        4.4
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
      "id": "w-bed2-south",
      "kind": "window",
      "at": [
       [
        8,
        10
       ],
       [
        10,
        10
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
      "id": "w-bed3-south",
      "kind": "window",
      "at": [
       [
        12,
        10
       ],
       [
        13.8,
        10
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
      "id": "w-bed3-east",
      "kind": "window",
      "at": [
       [
        15,
        7.2
       ],
       [
        15,
        8.8
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
      "id": "w-hall-east",
      "kind": "window",
      "at": [
       [
        15,
        5.4
       ],
       [
        15,
        6.2
       ]
      ],
      "rooms": [
       "hall",
       null
      ],
      "sill": 0.9,
      "head": 2.2
     }
    ],
    "furniture": [
     {
      "id": "f-tv",
      "kind": "tv-unit",
      "room": "living",
      "at": [
       0.355,
       2.1
      ],
      "size": [
       2,
       0.45
      ],
      "rot": 270
     },
     {
      "id": "f-rug",
      "kind": "rug",
      "room": "living",
      "at": [
       3.3,
       2.3
      ],
      "size": [
       3.4,
       2.8
      ],
      "rot": 0
     },
     {
      "id": "f-sofa",
      "kind": "sofa-corner",
      "room": "living",
      "at": [
       3.9,
       2.2
      ],
      "size": [
       2.8,
       1.8
      ],
      "rot": 90
     },
     {
      "id": "f-coffee",
      "kind": "coffee-table",
      "room": "living",
      "at": [
       2.4,
       2.05
      ],
      "size": [
       0.6,
       1.1
      ],
      "rot": 0
     },
     {
      "id": "f-armchair",
      "kind": "armchair",
      "room": "living",
      "at": [
       5.9,
       1.7
      ],
      "size": [
       0.8,
       0.8
      ],
      "rot": 90
     },
     {
      "id": "f-dining",
      "kind": "dining-table",
      "room": "living",
      "at": [
       2,
       3.825
      ],
      "size": [
       2,
       0.95
      ],
      "rot": 0
     },
     {
      "id": "f-plant",
      "kind": "plant",
      "room": "living",
      "at": [
       6.65,
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
       6.65,
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
       0.43,
       7.75
      ],
      "size": [
       2.9,
       0.6
      ],
      "rot": 270
     },
     {
      "id": "f-counter",
      "kind": "kitchen-run",
      "room": "kitchen",
      "at": [
       1.24,
       9.57
      ],
      "size": [
       0.92,
       0.6
      ],
      "rot": 180
     },
     {
      "id": "f-fridge",
      "kind": "fridge",
      "room": "kitchen",
      "at": [
       2.1,
       9.535
      ],
      "size": [
       0.7,
       0.67
      ],
      "rot": 180
     },
     {
      "id": "f-island",
      "kind": "kitchen-island",
      "room": "kitchen",
      "at": [
       2,
       7.45
      ],
      "size": [
       1.6,
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
       7.85
      ],
      "size": [
       1.4,
       0.56
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
       7.37,
       3.7
      ],
      "size": [
       2.4,
       0.6
      ],
      "rot": 270
     },
     {
      "id": "f-wardrobe-master-2",
      "kind": "wardrobe",
      "room": "master",
      "at": [
       10.45,
       4.85
      ],
      "size": [
       2.5,
       0.56
      ],
      "rot": 180
     },
     {
      "id": "f-desk-master",
      "kind": "desk",
      "room": "master",
      "at": [
       11.43,
       3.5
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
       14.035,
       0.505
      ],
      "size": [
       1.67,
       0.75
      ],
      "rot": 0
     },
     {
      "id": "f-shower-ens",
      "kind": "shower",
      "room": "ensuite",
      "at": [
       14.42,
       2.465
      ],
      "size": [
       0.9,
       0.93
      ],
      "rot": 180
     },
     {
      "id": "f-toilet-ens",
      "kind": "toilet",
      "room": "ensuite",
      "at": [
       12.6,
       2.58
      ],
      "size": [
       0.4,
       0.7
      ],
      "rot": 180
     },
     {
      "id": "f-basin-ens",
      "kind": "basin",
      "room": "ensuite",
      "at": [
       13.3,
       2.705
      ],
      "size": [
       0.6,
       0.45
      ],
      "rot": 180
     },
     {
      "id": "f-bath-fam",
      "kind": "bath",
      "room": "bath",
      "at": [
       14.495,
       3.92
      ],
      "size": [
       1.7,
       0.75
      ],
      "rot": 90
     },
     {
      "id": "f-toilet-fam",
      "kind": "toilet",
      "room": "bath",
      "at": [
       12.4,
       3.42
      ],
      "size": [
       0.4,
       0.7
      ],
      "rot": 0
     },
     {
      "id": "f-basin-fam",
      "kind": "basin",
      "room": "bath",
      "at": [
       13.3,
       3.295
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
      "room": "bath",
      "at": [
       12.17,
       4.5
      ],
      "size": [
       0.6,
       0.6
      ],
      "rot": 270
     },
     {
      "id": "f-toilet-wc",
      "kind": "toilet",
      "room": "wc",
      "at": [
       4.22,
       8.8
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
       4.2,
       9.595
      ],
      "size": [
       0.6,
       0.45
      ],
      "rot": 180
     },
     {
      "id": "f-bed-2",
      "kind": "bed-double",
      "room": "bed2",
      "at": [
       9.77,
       8.2
      ],
      "size": [
       1.6,
       2
      ],
      "rot": 90
     },
     {
      "id": "f-wardrobe-2",
      "kind": "wardrobe",
      "room": "bed2",
      "at": [
       7.37,
       8.4
      ],
      "size": [
       2,
       0.6
      ],
      "rot": 270
     },
     {
      "id": "f-bed-3",
      "kind": "bed-double",
      "room": "bed3",
      "at": [
       13.87,
       8.2
      ],
      "size": [
       1.6,
       2
      ],
      "rot": 90
     },
     {
      "id": "f-wardrobe-3",
      "kind": "wardrobe",
      "room": "bed3",
      "at": [
       11.37,
       8.4
      ],
      "size": [
       2,
       0.6
      ],
      "rot": 270
     },
     {
      "id": "f-outdoor",
      "kind": "outdoor-table",
      "room": "balcony",
      "at": [
       3.15,
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
       1.25,
       -1.35
      ],
      "size": [
       0.5,
       0.5
      ],
      "rot": 0
     },
     {
      "id": "f-plant-balcony-2",
      "kind": "plant",
      "room": "balcony",
      "at": [
       5.75,
       -1.35
      ],
      "size": [
       0.5,
       0.5
      ],
      "rot": 0
     }
    ]
   }
  ]
 }
}
`;export{n as default};
