// types.ts

export interface Slot {
    startTime: number;
    endTime?: number;
    /** Day of week (0–7), where 0 = Sunday */
    Day: number;
  }
  
  export interface OperationInfo {
    slots: Slot[];
    text: string;
    additionalInfo: string;
  }
  
  export interface LocationEntry {
    Name: string;
    Location: [number, number];
    Address: string;
    Phone?: number;
    additionalNotes: string;
    OperationInfo?: OperationInfo;
  }
  


const locations: LocationEntry[] = [
    {
        "Name": "Bethany Presbyterian",
        "Location": [
            40.758,
            -83.6753
        ],
        "Address": "206 North Garfield Avenue",
        "Phone": 6142530077,
        "additionalNotes": "",
        "OperationInfo": {
            "slots": [
                {
                    "Day": 5,
                    "startTime": 690,
                    "endTime": 810
                }
            ],
            "text": "Sat - 11:30am - 1:30pm",
            "additionalInfo": ""
        }
    },
    {
        "Name": "The Dream Center",
        "Location": [
            40.758,
            -83.6753
        ],
        "Address": "38 West Greenwood",
        "Phone": 6145473138,
        "additionalNotes": "",
        "OperationInfo": {
            "slots": [
                {
                    "Day": 2,
                    "startTime": 570,
                    "endTime": 600
                },
                {
                    "Day": 3,
                    "startTime": 1140,
                    "endTime": 1170
                },
                {
                    "Day": 4,
                    "startTime": 570,
                    "endTime": 600
                }
            ],
            "text": "Mon-Tues: 9:30am - 10am; 7pm - 7:30pm. Wed: 9:30am - 10am; 12pm - 12:30pm. Thurs: 7pm - 7:30pm. Fri: 9:30am - 10am; 7pm - 7:30",
            "additionalInfo": ""
        }
    },
    {
        "Name": "Victory Ministries Center Of Hope",
        "Location": [
            40.758,
            -83.6753
        ],
        "Address": "3964 East Main Street",
        "Phone": 6142522500,
        "additionalNotes": "Pantry, Clothing"
    },
    {
        "Name": "Community Kitchen Inc.",
        "Location": [
            40.758,
            -83.6753
        ],
        "Address": "640 South Ohio Avenue",
        "Phone": 6142526428,
        "additionalNotes": ""
    },
    {
        "Name": "Holy Family Meal Program",
        "Location": [
            40.758,
            -83.6753
        ],
        "Address": "588 West Gay Street",
        "Phone": 6144619444,
        "additionalNotes": "rear lot"
    },
    {
        "Name": "St. Johns UCC at Trinity",
        "Location": [
            40.758,
            -83.6753
        ],
        "Address": "125 East Broad Street",
        "Phone": 6142248634,
        "additionalNotes": ""
    },
    {
        "Name": "Jordan's Crossing",
        "Location": [
            40.758,
            -83.6753
        ],
        "Address": "342 North Hague Avenue",
        "Phone": 6145073246,
        "additionalNotes": "lunch"
    },
    {
        "Name": "Reeb Center",
        "Location": [
            40.758,
            -83.6753
        ],
        "Address": "280 Reeb Avenue",
        "Phone": 6144689280,
        "additionalNotes": "mon-fri: lunch; tues: dinner",
        "OperationInfo": {
            "slots": [
                {
                    "Day": 1,
                    "startTime": 1020,
                    "endTime": 1140
                }
            ],
            "text": "Mon-Fri: 11am - 2pm; Tue: 5pm -7pm",
            "additionalInfo": ""
        }
    },
    {
        "Name": "Mount Olivet Baptist Church",
        "Location": [
            40.758,
            -83.6753
        ],
        "Address": "428 East Main Street",
        "Phone": 6142213446,
        "additionalNotes": "clothes, meal, hygeine",
        "OperationInfo": {
            "slots": [
                {
                    "Day": 4,
                    "startTime": 660,
                    "endTime": 780
                }
            ],
            "text": "Fri - 11am - 1pm",
            "additionalInfo": ""
        }
    },
    {
        "Name": "New Life Community Outreach",
        "Location": [
            40.758,
            -83.6753
        ],
        "Address": "25 West 5th Avenue",
        "Phone": 6142940134,
        "additionalNotes": "breakfast",
        "OperationInfo": {
            "slots": [
                {
                    "Day": 6,
                    "startTime": 420,
                    "endTime": 510
                }
            ],
            "text": "Sun - 7am - 8:30am ",
            "additionalInfo": ""
        }
    },
    {
        "Name": "Open Shelter",
        "Location": [
            40.758,
            -83.6753
        ],
        "Address": "1037 Parsons Avenye",
        "Phone": 6142222885,
        "additionalNotes": ""
    },
    {
        "Name": "Shiloah Christian Center",
        "Location": [
            40.758,
            -83.6753
        ],
        "Address": "787 East Broad Street",
        "Phone": 6149148406,
        "additionalNotes": "breakfast wednesday; lunch and dinner thurs-sat",
        "OperationInfo": {
            "slots": [
                {
                    "Day": 2,
                    "startTime": 660,
                    "endTime": 780
                }
            ],
            "text": "Wed: 11am-1pm. Thur-Sat: 9:30am - 10:15am; 7pm - 7:45pm. ",
            "additionalInfo": ""
        }
    },
    {
        "Name": "Saint Lawrence Haven - SVDP",
        "Location": [
            40.758,
            -83.6753
        ],
        "Address": "244 East Rich Street",
        "Phone": 6142412569,
        "additionalNotes": ""
    },
    {
        "Name": "First English Lutheran ",
        "Location": [
            40.758,
            -83.6753
        ],
        "Address": "1015 East Main Street",
        "Phone": 6142523191,
        "additionalNotes": "",
        "OperationInfo": {
            "slots": [
                {
                    "Day": 3,
                    "startTime": 1050,
                    "endTime": 1110
                },
                {
                    "Day": 6,
                    "startTime": 510,
                    "endTime": 570
                }
            ],
            "text": "Thurs: 5:30pm - 6:30pm. Sun: 8:30am - 9:30am",
            "additionalInfo": ""
        }
    },
    {
        "Name": "Bridge Ministry",
        "Location": [
            40.758,
            -83.6753
        ],
        "Address": "787 East Broad Street",
        "Phone": 6145000656,
        "additionalNotes": "breakfast and dinner"
    },
    {
        "Name": "Stowe Mission",
        "Location": [
            40.758,
            -83.6753
        ],
        "Address": "888 Parsons Avenue",
        "Phone": 6144458400,
        "additionalNotes": ""
    },
    {
        "Name": "Trinity Episcopal Church",
        "Location": [
            40.758,
            -83.6753
        ],
        "Address": "125 East Broad Street",
        "Phone": 6142215351,
        "additionalNotes": "",
        "OperationInfo": {
            "slots": [
                {
                    "Day": 6,
                    "startTime": 780
                }
            ],
            "text": "Sun 1pm",
            "additionalInfo": ""
        }
    },
    {
        "Name": "Feed my sheep ministries",
        "Location": [
            40.758,
            -83.6753
        ],
        "Address": "2364 West Broad Steet",
        "Phone": 6147215414,
        "additionalNotes": "",
        "OperationInfo": {
            "slots": [
                {
                    "Day": 1,
                    "startTime": 1080,
                    "endTime": 1200
                }
            ],
            "text": "Tues 6pm-8pm",
            "additionalInfo": ""
        }
    }
]

export default locations;