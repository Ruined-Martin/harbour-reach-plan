const n=`{
 "schema": 2,
 "level": "home",
 "projectCode": "HU",
 "modelCode": "HU-STUDIO",
 "layout": {
  "id": "HU-STUDIO",
  "name": "Studio",
  "type": "Studio",
  "bedrooms": 0,
  "bathrooms": 1,
  "areaSqm": 45.9,
  "exterior": "apartment",
  "northDeg": 0,
  "entry": {
   "storey": 0,
   "at": [
    1.3,
    5.6
   ],
   "facing": 0
  },
  "storeys": [
   {
    "level": 0,
    "name": "Studio",
    "height": 2.9,
    "outline": [
     [
      0,
      0
     ],
     [
      7.4,
      0
     ],
     [
      7.4,
      6.2
     ],
     [
      0,
      6.2
     ]
    ],
    "rooms": [
     {
      "id": "living",
      "kind": "living",
      "name": "Living and sleeping",
      "floor": "wood",
      "polygon": [
       [
        0,
        0
       ],
       [
        7.4,
        0
       ],
       [
        7.4,
        3.7
       ],
       [
        0,
        3.7
       ]
      ]
     },
     {
      "id": "entry",
      "kind": "entry",
      "name": "Entry",
      "floor": "wood",
      "polygon": [
       [
        0,
        3.7
       ],
       [
        2.2,
        3.7
       ],
       [
        2.2,
        6.2
       ],
       [
        0,
        6.2
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
        2.2,
        3.7
       ],
       [
        4.2,
        3.7
       ],
       [
        4.2,
        6.2
       ],
       [
        2.2,
        6.2
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
        4.2,
        3.7
       ],
       [
        7.4,
        3.7
       ],
       [
        7.4,
        6.2
       ],
       [
        4.2,
        6.2
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
        4.1,
        -1.8
       ],
       [
        6.9,
        -1.8
       ],
       [
        6.9,
        0
       ],
       [
        4.1,
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
        0.9,
        6.2
       ],
       [
        1.8,
        6.2
       ]
      ],
      "rooms": [
       "entry",
       null
      ]
     },
     {
      "id": "o-entry-living",
      "kind": "opening",
      "at": [
       [
        0.85,
        3.7
       ],
       [
        2,
        3.7
       ]
      ],
      "rooms": [
       "entry",
       "living"
      ]
     },
     {
      "id": "o-entry-bath",
      "kind": "door",
      "at": [
       [
        2.2,
        4.4
       ],
       [
        2.2,
        5.2
       ]
      ],
      "rooms": [
       "bath",
       "entry"
      ]
     },
     {
      "id": "o-kitchen-living",
      "kind": "opening",
      "at": [
       [
        4.5,
        3.7
       ],
       [
        6.9,
        3.7
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
        4.5,
        0
       ],
       [
        6.5,
        0
       ]
      ],
      "rooms": [
       "living",
       "balcony"
      ]
     },
     {
      "id": "w-living-north",
      "kind": "window",
      "at": [
       [
        0.6,
        0
       ],
       [
        2,
        0
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
      "id": "w-living-east",
      "kind": "window",
      "at": [
       [
        7.4,
        2.7
       ],
       [
        7.4,
        3.4
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
      "id": "w-kitchen-south",
      "kind": "window",
      "at": [
       [
        4.7,
        6.2
       ],
       [
        6.3,
        6.2
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
      "id": "f-bed",
      "kind": "bed-double",
      "room": "living",
      "at": [
       1.13,
       1.6
      ],
      "size": [
       1.6,
       2
      ],
      "rot": 270
     },
     {
      "id": "f-wardrobe",
      "kind": "wardrobe",
      "room": "living",
      "at": [
       3.2,
       0.405
      ],
      "size": [
       1.8,
       0.55
      ],
      "rot": 0
     },
     {
      "id": "f-rug",
      "kind": "rug",
      "room": "living",
      "at": [
       4.4,
       2.15
      ],
      "size": [
       2.6,
       1.9
      ],
      "rot": 0
     },
     {
      "id": "f-sofa",
      "kind": "sofa",
      "room": "living",
      "at": [
       3.775,
       2.4
      ],
      "size": [
       2.1,
       0.95
      ],
      "rot": 270
     },
     {
      "id": "f-coffee",
      "kind": "coffee-table",
      "room": "living",
      "at": [
       5.05,
       2.3
      ],
      "size": [
       0.6,
       1
      ],
      "rot": 0
     },
     {
      "id": "f-tv",
      "kind": "tv-unit",
      "room": "living",
      "at": [
       7.045,
       2
      ],
      "size": [
       1.4,
       0.45
      ],
      "rot": 90
     },
     {
      "id": "f-dining",
      "kind": "dining-table",
      "room": "living",
      "at": [
       6.05,
       2.775
      ],
      "size": [
       1.3,
       0.65
      ],
      "rot": 0
     },
     {
      "id": "f-plant",
      "kind": "plant",
      "room": "living",
      "at": [
       6.95,
       0.38
      ],
      "size": [
       0.5,
       0.5
      ],
      "rot": 0
     },
     {
      "id": "f-wardrobe-entry",
      "kind": "wardrobe",
      "room": "entry",
      "at": [
       0.405,
       4.8
      ],
      "size": [
       1.2,
       0.55
      ],
      "rot": 270
     },
     {
      "id": "f-shower",
      "kind": "shower",
      "room": "bath",
      "at": [
       3.68,
       5.62
      ],
      "size": [
       0.9,
       0.9
      ],
      "rot": 180
     },
     {
      "id": "f-toilet",
      "kind": "toilet",
      "room": "bath",
      "at": [
       3.78,
       4.6
      ],
      "size": [
       0.4,
       0.7
      ],
      "rot": 90
     },
     {
      "id": "f-basin",
      "kind": "basin",
      "room": "bath",
      "at": [
       2.8,
       3.995
      ],
      "size": [
       0.6,
       0.45
      ],
      "rot": 0
     },
     {
      "id": "f-run",
      "kind": "kitchen-run",
      "room": "kitchen",
      "at": [
       5.435,
       5.77
      ],
      "size": [
       2.33,
       0.6
      ],
      "rot": 180
     },
     {
      "id": "f-fridge",
      "kind": "fridge",
      "room": "kitchen",
      "at": [
       6.96,
       5.745
      ],
      "size": [
       0.62,
       0.65
      ],
      "rot": 180
     },
     {
      "id": "f-outdoor",
      "kind": "outdoor-table",
      "room": "balcony",
      "at": [
       5.4,
       -1.225
      ],
      "size": [
       1,
       0.85
      ],
      "rot": 0
     }
    ]
   }
  ]
 }
}
`;export{n as default};
