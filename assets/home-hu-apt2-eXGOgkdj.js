const n=`{
 "schema": 2,
 "level": "home",
 "projectCode": "HU",
 "modelCode": "HU-APT2",
 "layout": {
  "id": "HU-APT2",
  "name": "Two-bedroom apartment",
  "type": "Apartment",
  "bedrooms": 2,
  "bathrooms": 2,
  "areaSqm": 93.6,
  "exterior": "apartment",
  "northDeg": 0,
  "entry": {
   "storey": 0,
   "at": [
    5,
    8.3
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
      10.4,
      0
     ],
     [
      10.4,
      9
     ],
     [
      0,
      9
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
        6,
        0
       ],
       [
        6,
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
        0,
        4.6
       ],
       [
        4,
        4.6
       ],
       [
        4,
        9
       ],
       [
        0,
        9
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
        4,
        4.6
       ],
       [
        6,
        4.6
       ],
       [
        6,
        9
       ],
       [
        4,
        9
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
        6,
        0
       ],
       [
        10.4,
        0
       ],
       [
        10.4,
        4
       ],
       [
        6,
        4
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
        6,
        4
       ],
       [
        8.2,
        4
       ],
       [
        8.2,
        5.8
       ],
       [
        6,
        5.8
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
        8.2,
        4
       ],
       [
        10.4,
        4
       ],
       [
        10.4,
        5.8
       ],
       [
        8.2,
        5.8
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
        6,
        5.8
       ],
       [
        10.4,
        5.8
       ],
       [
        10.4,
        9
       ],
       [
        6,
        9
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
        -1.6
       ],
       [
        5.4,
        -1.6
       ],
       [
        5.4,
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
        4.5,
        9
       ],
       [
        5.5,
        9
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
        4.6
       ],
       [
        5.8,
        4.6
       ]
      ],
      "rooms": [
       "hall",
       "living"
      ]
     },
     {
      "id": "o-kitchen-living",
      "kind": "opening",
      "at": [
       [
        0.4,
        4.6
       ],
       [
        3.6,
        4.6
       ]
      ],
      "rooms": [
       "kitchen",
       "living"
      ]
     },
     {
      "id": "o-hall-bath",
      "kind": "door",
      "at": [
       [
        6,
        4.8
       ],
       [
        6,
        5.6
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
        6,
        6.4
       ],
       [
        6,
        7.3
       ]
      ],
      "rooms": [
       "bed2",
       "hall"
      ]
     },
     {
      "id": "o-living-master",
      "kind": "door",
      "at": [
       [
        6,
        1
       ],
       [
        6,
        1.9
       ]
      ],
      "rooms": [
       "master",
       "living"
      ]
     },
     {
      "id": "o-master-ensuite",
      "kind": "door",
      "at": [
       [
        8.4,
        4
       ],
       [
        9.2,
        4
       ]
      ],
      "rooms": [
       "ensuite",
       "master"
      ]
     },
     {
      "id": "o-living-balcony",
      "kind": "sliding",
      "at": [
       [
        1,
        0
       ],
       [
        5,
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
        0.9
       ],
       [
        0,
        2.1
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
        5.6
       ],
       [
        0,
        8
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
        7,
        0
       ],
       [
        9.6,
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
      "id": "w-master-east",
      "kind": "window",
      "at": [
       [
        10.4,
        1
       ],
       [
        10.4,
        3
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
      "id": "w-bed2-east",
      "kind": "window",
      "at": [
       [
        10.4,
        6.4
       ],
       [
        10.4,
        8.4
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
      "id": "w-bed2-south",
      "kind": "window",
      "at": [
       [
        6.8,
        9
       ],
       [
        8,
        9
       ]
      ],
      "rooms": [
       "bed2",
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
       2.3
      ],
      "size": [
       1.6,
       0.45
      ],
      "rot": 270
     },
     {
      "id": "f-rug",
      "kind": "rug",
      "room": "living",
      "at": [
       2.35,
       2.45
      ],
      "size": [
       2.1,
       2.7
      ],
      "rot": 0
     },
     {
      "id": "f-sofa",
      "kind": "sofa",
      "room": "living",
      "at": [
       3.175,
       2.5
      ],
      "size": [
       2.2,
       0.95
      ],
      "rot": 90
     },
     {
      "id": "f-coffee",
      "kind": "coffee-table",
      "room": "living",
      "at": [
       2,
       2.5
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
       4.45,
       1.9
      ],
      "size": [
       1.8,
       0.9
      ],
      "rot": 90
     },
     {
      "id": "f-plant",
      "kind": "plant",
      "room": "living",
      "at": [
       5.65,
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
       3.45
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
       6.725
      ],
      "size": [
       2.85,
       0.6
      ],
      "rot": 270
     },
     {
      "id": "f-fridge",
      "kind": "fridge",
      "room": "kitchen",
      "at": [
       0.455,
       8.535
      ],
      "size": [
       0.67,
       0.65
      ],
      "rot": 270
     },
     {
      "id": "f-island",
      "kind": "kitchen-island",
      "room": "kitchen",
      "at": [
       2.4,
       6.6
      ],
      "size": [
       1.8,
       0.9
      ],
      "rot": 90
     },
     {
      "id": "f-wardrobe-hall",
      "kind": "wardrobe",
      "room": "hall",
      "at": [
       4.37,
       6.8
      ],
      "size": [
       1.6,
       0.6
      ],
      "rot": 270
     },
     {
      "id": "f-bed-master",
      "kind": "bed-double",
      "room": "master",
      "at": [
       8.3,
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
       7.1,
       3.63
      ],
      "size": [
       2,
       0.6
      ],
      "rot": 180
     },
     {
      "id": "f-chair-master",
      "kind": "armchair",
      "room": "master",
      "at": [
       9.8,
       3.3
      ],
      "size": [
       0.8,
       0.8
      ],
      "rot": 0
     },
     {
      "id": "f-bath",
      "kind": "bath",
      "room": "bath",
      "at": [
       7.765,
       4.925
      ],
      "size": [
       1.65,
       0.73
      ],
      "rot": 90
     },
     {
      "id": "f-basin-1",
      "kind": "basin",
      "room": "bath",
      "at": [
       6.45,
       4.295
      ],
      "size": [
       0.6,
       0.45
      ],
      "rot": 0
     },
     {
      "id": "f-toilet-1",
      "kind": "toilet",
      "room": "bath",
      "at": [
       7.1,
       4.42
      ],
      "size": [
       0.4,
       0.7
      ],
      "rot": 0
     },
     {
      "id": "f-basin-2",
      "kind": "basin",
      "room": "ensuite",
      "at": [
       9.7,
       4.295
      ],
      "size": [
       0.6,
       0.45
      ],
      "rot": 0
     },
     {
      "id": "f-toilet-2",
      "kind": "toilet",
      "room": "ensuite",
      "at": [
       8.62,
       5.15
      ],
      "size": [
       0.4,
       0.7
      ],
      "rot": 270
     },
     {
      "id": "f-shower",
      "kind": "shower",
      "room": "ensuite",
      "at": [
       9.82,
       5.28
      ],
      "size": [
       0.9,
       0.9
      ],
      "rot": 180
     },
     {
      "id": "f-bed-2",
      "kind": "bed-double",
      "room": "bed2",
      "at": [
       9,
       7.875
      ],
      "size": [
       1.6,
       1.99
      ],
      "rot": 180
     },
     {
      "id": "f-wardrobe-2",
      "kind": "wardrobe",
      "room": "bed2",
      "at": [
       7.8,
       6.17
      ],
      "size": [
       1.8,
       0.6
      ],
      "rot": 0
     },
     {
      "id": "f-desk",
      "kind": "desk",
      "room": "bed2",
      "at": [
       6.37,
       8.3
      ],
      "size": [
       1.2,
       0.6
      ],
      "rot": 270
     },
     {
      "id": "f-outdoor",
      "kind": "outdoor-table",
      "room": "balcony",
      "at": [
       3.05,
       -1.1
      ],
      "size": [
       0.9,
       0.7
      ],
      "rot": 0
     },
     {
      "id": "f-plant-balcony",
      "kind": "plant",
      "room": "balcony",
      "at": [
       1.05,
       -1.15
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
