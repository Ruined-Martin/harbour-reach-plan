const n=`{
 "schema": 2,
 "level": "home",
 "projectCode": "CH",
 "modelCode": "CH-APT1",
 "layout": {
  "id": "CH-APT1",
  "name": "One-bedroom apartment",
  "type": "Apartment",
  "bedrooms": 1,
  "bathrooms": 1,
  "areaSqm": 70.3,
  "exterior": "apartment",
  "northDeg": 0,
  "entry": {
   "storey": 0,
   "at": [
    7,
    6.6
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
      9.5,
      0
     ],
     [
      9.5,
      7.4
     ],
     [
      0,
      7.4
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
        6.2,
        0
       ],
       [
        6.2,
        4.4
       ],
       [
        0,
        4.4
       ]
      ]
     },
     {
      "id": "bed",
      "kind": "bedroom",
      "name": "Bedroom",
      "floor": "wood",
      "polygon": [
       [
        6.2,
        0
       ],
       [
        9.5,
        0
       ],
       [
        9.5,
        4.4
       ],
       [
        6.2,
        4.4
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
        4.4
       ],
       [
        3.4,
        4.4
       ],
       [
        3.4,
        7.4
       ],
       [
        0,
        7.4
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
        3.4,
        4.4
       ],
       [
        5.2,
        4.4
       ],
       [
        5.2,
        7.4
       ],
       [
        3.4,
        7.4
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
        5.2,
        4.4
       ],
       [
        9.5,
        4.4
       ],
       [
        9.5,
        7.4
       ],
       [
        5.2,
        7.4
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
        5.6,
        -1.8
       ],
       [
        5.6,
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
        6.8,
        7.4
       ],
       [
        7.8,
        7.4
       ]
      ],
      "rooms": [
       "hall",
       null
      ]
     },
     {
      "id": "o-hall-living",
      "kind": "door",
      "at": [
       [
        5.3,
        4.4
       ],
       [
        6.1,
        4.4
       ]
      ],
      "rooms": [
       "living",
       "hall"
      ]
     },
     {
      "id": "o-hall-bed",
      "kind": "door",
      "at": [
       [
        6.5,
        4.4
       ],
       [
        7.3,
        4.4
       ]
      ],
      "rooms": [
       "bed",
       "hall"
      ]
     },
     {
      "id": "o-hall-bath",
      "kind": "door",
      "at": [
       [
        5.2,
        5.3
       ],
       [
        5.2,
        6.1
       ]
      ],
      "rooms": [
       "bath",
       "hall"
      ]
     },
     {
      "id": "o-kitchen-living",
      "kind": "opening",
      "at": [
       [
        0.5,
        4.4
       ],
       [
        3,
        4.4
       ]
      ],
      "rooms": [
       "kitchen",
       "living"
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
        1.3
       ],
       [
        0,
        3.5
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
      "id": "w-bed-north",
      "kind": "window",
      "at": [
       [
        7.2,
        0
       ],
       [
        8.6,
        0
       ]
      ],
      "rooms": [
       "bed",
       null
      ],
      "sill": 0.9,
      "head": 2.2
     },
     {
      "id": "w-bed-east",
      "kind": "window",
      "at": [
       [
        9.5,
        0.9
       ],
       [
        9.5,
        2.5
       ]
      ],
      "rooms": [
       "bed",
       null
      ],
      "sill": 0.9,
      "head": 2.2
     },
     {
      "id": "w-kitchen-south",
      "kind": "window",
      "at": [
       [
        0.7,
        7.4
       ],
       [
        2.5,
        7.4
       ]
      ],
      "rooms": [
       "kitchen",
       null
      ],
      "sill": 1.1,
      "head": 2.2
     }
    ],
    "furniture": [
     {
      "id": "f-tv",
      "kind": "tv-unit",
      "room": "living",
      "at": [
       5.905,
       2.2
      ],
      "size": [
       1.6,
       0.45
      ],
      "rot": 90
     },
     {
      "id": "f-rug",
      "kind": "rug",
      "room": "living",
      "at": [
       3.95,
       2.35
      ],
      "size": [
       2.7,
       2.7
      ],
      "rot": 0
     },
     {
      "id": "f-sofa",
      "kind": "sofa",
      "room": "living",
      "at": [
       3.475,
       2.45
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
       4.6,
       2.4
      ],
      "size": [
       0.6,
       1
      ],
      "rot": 0
     },
     {
      "id": "f-dining",
      "kind": "dining-table",
      "room": "living",
      "at": [
       1.6,
       2.775
      ],
      "size": [
       1.6,
       0.85
      ],
      "rot": 0
     },
     {
      "id": "f-plant",
      "kind": "plant",
      "room": "living",
      "at": [
       5.8,
       0.38
      ],
      "size": [
       0.5,
       0.5
      ],
      "rot": 0
     },
     {
      "id": "f-bed",
      "kind": "bed-double",
      "room": "bed",
      "at": [
       8.1,
       1.165
      ],
      "size": [
       1.8,
       2.07
      ],
      "rot": 0
     },
     {
      "id": "f-wardrobe",
      "kind": "wardrobe",
      "room": "bed",
      "at": [
       9.07,
       3.35
      ],
      "size": [
       1.5,
       0.6
      ],
      "rot": 90
     },
     {
      "id": "f-run",
      "kind": "kitchen-run",
      "room": "kitchen",
      "at": [
       1.39,
       6.97
      ],
      "size": [
       2.52,
       0.6
      ],
      "rot": 180
     },
     {
      "id": "f-fridge",
      "kind": "fridge",
      "room": "kitchen",
      "at": [
       3.015,
       6.945
      ],
      "size": [
       0.63,
       0.65
      ],
      "rot": 180
     },
     {
      "id": "f-island",
      "kind": "kitchen-island",
      "room": "kitchen",
      "at": [
       1.85,
       5.65
      ],
      "size": [
       1.7,
       0.9
      ],
      "rot": 180
     },
     {
      "id": "f-toilet",
      "kind": "toilet",
      "room": "bath",
      "at": [
       3.7,
       4.785
      ],
      "size": [
       0.4,
       0.63
      ],
      "rot": 0
     },
     {
      "id": "f-basin",
      "kind": "basin",
      "room": "bath",
      "at": [
       4.6,
       4.695
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
       3.77,
       6
      ],
      "size": [
       0.6,
       0.6
      ],
      "rot": 270
     },
     {
      "id": "f-shower",
      "kind": "shower",
      "room": "bath",
      "at": [
       3.9,
       6.82
      ],
      "size": [
       0.9,
       0.9
      ],
      "rot": 180
     },
     {
      "id": "f-wardrobe-hall",
      "kind": "wardrobe",
      "room": "hall",
      "at": [
       9.07,
       5.8
      ],
      "size": [
       1.8,
       0.6
      ],
      "rot": 90
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
   }
  ]
 }
}
`;export{n as default};
