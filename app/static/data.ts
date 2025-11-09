// /app/static/data.ts

export interface Slot {
  /** Day of week (1–7), where 1 = Sunday */
  Day: number;
  /** Minutes since midnight (e.g. 9:30am = 570) */
  startTime: number;
  endTime?: number;
}
export const ServiceOptions = ["meal", "pantry", "both"] as const;
export type ServiceType = (typeof ServiceOptions)[number];

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
  ServiceType: ServiceType;
  additionalNotes: string;
  OperationInfo?: OperationInfo;
}

const locations: LocationEntry[] = [
  {
    Name: "Bethany Presbyterian",
    Location: [39.96902, -82.97985], // Columbus, OH
    Address: "206 North Garfield Avenue",
    Phone: 6142530077,
    ServiceType: "meal",
    additionalNotes: "",
    OperationInfo: {
      slots: [{ Day: 7, startTime: 690, endTime: 810 }], // Saturday 11:30am–1:30pm
      text: "Saturday – 11:30am – 1:30pm",
      additionalInfo: "",
    },
  },
  {
    Name: "The Dream Center",
    Location: [39.98651, -83.00655],
    Address: "38 West Greenwood",
    Phone: 6145473138,
    ServiceType: "pantry",
    additionalNotes: "",
    OperationInfo: {
      slots: [
        { Day: 2, startTime: 570, endTime: 600 }, // Monday 9:30–10am
        { Day: 2, startTime: 1140, endTime: 1170 }, // Monday 7–7:30pm
        { Day: 3, startTime: 570, endTime: 600 }, // Tuesday 9:30–10am
        { Day: 3, startTime: 1140, endTime: 1170 }, // Tuesday 7–7:30pm
        { Day: 4, startTime: 570, endTime: 600 }, // Wednesday 9:30–10am
        { Day: 4, startTime: 720, endTime: 750 }, // Wednesday 12–12:30pm
        { Day: 5, startTime: 1140, endTime: 1170 }, // Thursday 7–7:30pm
        { Day: 6, startTime: 570, endTime: 600 }, // Friday 9:30–10am
        { Day: 6, startTime: 1140, endTime: 1170 }, // Friday 7–7:30pm
      ],
      text: "Mon–Fri: 9:30–10am & 7–7:30pm; Wed also 12–12:30pm",
      additionalInfo: "",
    },
  },
  {
    Name: "Victory Ministries Center Of Hope",
    Location: [39.95636, -82.893], // Columbus, OH
    Address: "3964 East Main Street",
    Phone: 6142522500,
    ServiceType: "meal",
    additionalNotes: "Pantry, Clothing",
    OperationInfo: {
      slots: [
        { Day: 3, startTime: 720, endTime: 900 }, // Tuesday 12–3pm
        { Day: 6, startTime: 720, endTime: 900 }, // Friday 12–3pm
      ],
      text: "Tuesday & Friday 12pm – 3pm",
      additionalInfo: "",
    },
  },
  {
    Name: "Community Kitchen Inc.",
    Location: [39.95211, -82.9709], // Columbus, OH
    Address: "640 South Ohio Avenue",
    Phone: 6142526428,
    ServiceType: "meal",
    additionalNotes: "",
    OperationInfo: {
      slots: [
        { Day: 2, startTime: 510, endTime: 600 }, // Monday 8:30–10am
        { Day: 2, startTime: 690, endTime: 780 }, // Monday 11:30–1pm
        { Day: 3, startTime: 510, endTime: 600 }, // Tuesday 8:30–10am
        { Day: 3, startTime: 690, endTime: 780 }, // Tuesday 11:30–1pm
        { Day: 4, startTime: 510, endTime: 600 }, // Wednesday 8:30–10am
        { Day: 4, startTime: 690, endTime: 780 }, // Wednesday 11:30–1pm
        { Day: 5, startTime: 510, endTime: 600 }, // Thursday 8:30–10am
        { Day: 5, startTime: 690, endTime: 780 }, // Thursday 11:30–1pm
        { Day: 6, startTime: 510, endTime: 600 }, // Friday 8:30–10am
        { Day: 6, startTime: 690, endTime: 780 }, // Friday 11:30–1pm
        { Day: 7, startTime: 510, endTime: 600 }, // Saturday 8:30–10am
        { Day: 7, startTime: 690, endTime: 780 }, // Saturday 11:30–1pm
      ],
      text: "Mon–Sat: 8:30–10am & 11:30–1pm",
      additionalInfo: "",
    },
  },
  {
    Name: "Holy Family Meal Program",
    Location: [39.96125, -83.01664], // Columbus, OH
    Address: "588 West Gay Street",
    Phone: 6144619444,
    ServiceType: "meal",
    additionalNotes: "rear lot",
    OperationInfo: {
      slots: [
        { Day: 2, startTime: 540, endTime: 720 }, // Monday 9–12pm
        { Day: 3, startTime: 540, endTime: 720 },
        { Day: 4, startTime: 540, endTime: 720 },
        { Day: 5, startTime: 540, endTime: 720 },
        { Day: 6, startTime: 540, endTime: 720 },
      ],
      text: "Mon–Fri: 9am – 12pm",
      additionalInfo: "",
    },
  },
  {
    Name: "St. Johns UCC at Trinity",
    Location: [39.96239, -82.99719], // Columbus, OH
    Address: "125 East Broad Street",
    Phone: 6142248634,
    ServiceType: "pantry",

    additionalNotes: "",
    OperationInfo: {
      slots: [{ Day: 4, startTime: 720, endTime: 720 }], // Wednesday 12pm
      text: "Wednesday at 12pm",
      additionalInfo: "",
    },
  },
  {
    Name: "Jordan's Crossing",
    Location: [40.758, -83.6753],
    Address: "342 North Hague Avenue",
    Phone: 6145073246,
    ServiceType: "pantry",

    additionalNotes: "lunch",
    OperationInfo: {
      slots: [{ Day: 1, startTime: 660, endTime: 780 }], // Sunday 11am–1pm
      text: "Sunday 11am – 1pm",
      additionalInfo: "",
    },
  },
  {
    Name: "Reeb Center",
    Location: [39.92541, -82.98728], // Columbus, OH
    Address: "280 Reeb Avenue",
    Phone: 6144689280,
    ServiceType: "pantry",

    additionalNotes: "Mon–Fri: lunch; Tue: dinner",
    OperationInfo: {
      slots: [
        { Day: 2, startTime: 660, endTime: 840 },
        { Day: 3, startTime: 660, endTime: 840 },
        { Day: 3, startTime: 1020, endTime: 1140 },
        { Day: 4, startTime: 660, endTime: 840 },
        { Day: 5, startTime: 660, endTime: 840 },
        { Day: 6, startTime: 660, endTime: 840 },
      ],
      text: "Mon–Fri 11am–2pm; Tue also 5–7pm",
      additionalInfo: "",
    },
  },
  {
    Name: "Mount Olivet Baptist Church",
    Location: [39.95778, -82.98794], // Columbus, OH
    Address: "428 East Main Street",
    Phone: 6142213446,
    ServiceType: "meal",
    additionalNotes: "clothes, meal, hygiene",
    OperationInfo: {
      slots: [{ Day: 6, startTime: 660, endTime: 780 }], // Friday 11am–1pm
      text: "Friday – 11am – 1pm",
      additionalInfo: "",
    },
  },
  {
    Name: "New Life Community Outreach",
    Location: [39.98691, -83.00645], // Columbus, OH
    Address: "25 West 5th Avenue",
    Phone: 6142940134,
    ServiceType: "pantry",

    additionalNotes: "breakfast",
    OperationInfo: {
      slots: [{ Day: 1, startTime: 420, endTime: 510 }], // Sunday 7–8:30am
      text: "Sunday – 7 – 8:30 am",
      additionalInfo: "",
    },
  },
  {
    Name: "Open Shelter",
    Location: [39.94247, -82.98342],
    Address: "1037 Parsons Avenue",
    ServiceType: "pantry",

    Phone: 6142222885,
    additionalNotes: "",
    OperationInfo: {
      slots: [
        { Day: 2, startTime: 630, endTime: 840 }, // Monday–Friday 10:30–2:00
        { Day: 3, startTime: 630, endTime: 840 },
        { Day: 4, startTime: 630, endTime: 840 },
        { Day: 5, startTime: 630, endTime: 840 },
        { Day: 6, startTime: 630, endTime: 840 },
      ],
      text: "Mon–Fri: 10:30am – 2:00pm",
      additionalInfo: "",
    },
  },
  {
    Name: "Shiloah Christian Center",
    Location: [39.9644, -82.97943],
    Address: "787 East Broad Street",
    Phone: 6149148406,
    ServiceType: "meal",
    additionalNotes: "breakfast Wednesday; lunch and dinner Thu–Sat",
    OperationInfo: {
      slots: [
        { Day: 4, startTime: 660, endTime: 780 },
        { Day: 5, startTime: 570, endTime: 615 },
        { Day: 5, startTime: 1140, endTime: 1185 },
        { Day: 6, startTime: 570, endTime: 615 },
        { Day: 6, startTime: 1140, endTime: 1185 },
        { Day: 7, startTime: 570, endTime: 615 },
        { Day: 7, startTime: 1140, endTime: 1185 },
      ],
      text: "Wed 11am–1pm; Thu–Sat 9:30–10:15am & 7–7:45pm",
      additionalInfo: "",
    },
  },
  {
    Name: "Saint Lawrence Haven - SVDP",
    Location: [39.95881, -82.99295],
    Address: "244 East Rich Street",
    Phone: 6142412569,
    ServiceType: "pantry",
    additionalNotes: "",
    OperationInfo: {
      slots: [
        { Day: 2, startTime: 720, endTime: 840 },
        { Day: 3, startTime: 720, endTime: 840 },
        { Day: 4, startTime: 720, endTime: 840 },
        { Day: 5, startTime: 720, endTime: 840 },
        { Day: 6, startTime: 720, endTime: 840 },
      ],
      text: "Mon–Fri: 12pm – 2pm",
      additionalInfo: "",
    },
  },
  {
    Name: "First English Lutheran",
    Location: [39.95763, -82.97209],
    Address: "1015 East Main Street",
    Phone: 6142523191,
    ServiceType: "pantry",
    additionalNotes: "",
    OperationInfo: {
      slots: [
        { Day: 5, startTime: 1050, endTime: 1110 },
        { Day: 1, startTime: 510, endTime: 570 },
      ],
      text: "Thu 5:30–6:30pm; Sun 8:30–9:30am",
      additionalInfo: "",
    },
  },
  {
    Name: "Bridge Ministry",
    Location: [40.758, -83.6753],
    Address: "787 East Broad Street",
    Phone: 6145000656,
    ServiceType: "meal",
    additionalNotes: "breakfast and dinner",
    OperationInfo: {
      slots: [
        { Day: 5, startTime: 570, endTime: 615 },
        { Day: 5, startTime: 1140, endTime: 1185 },
        { Day: 6, startTime: 570, endTime: 615 },
        { Day: 6, startTime: 1140, endTime: 1185 },
        { Day: 7, startTime: 570, endTime: 615 },
        { Day: 7, startTime: 1140, endTime: 1185 },
      ],
      text: "Thu–Sat: 9:30–10:15am & 7–7:45pm",
      additionalInfo: "",
    },
  },
  {
    Name: "Stowe Mission",
    Location: [39.94537, -82.98254],
    Address: "888 Parsons Avenue",
    Phone: 6144458400,
    ServiceType: "both",
    additionalNotes: "",
    OperationInfo: {
      slots: [
        { Day: 2, startTime: 510, endTime: 990 }, // Monday 8:30–4:30pm
        { Day: 6, startTime: 510, endTime: 990 }, // Friday 8:30–4:30pm
      ],
      text: "Mon & Fri: 8:30am – 4:30pm",
      additionalInfo: "",
    },
  },
  {
    Name: "Trinity Episcopal Church",
    Location: [39.96239, -82.99719],
    Address: "125 East Broad Street",
    ServiceType: "both",
    Phone: 6142215351,
    additionalNotes: "",
    OperationInfo: {
      slots: [{ Day: 1, startTime: 780, endTime: 810 }],
      text: "Sunday 1 pm",
      additionalInfo: "",
    },
  },
  {
    Name: "Feed My Sheep Ministries",
    Location: [39.95558, -83.06349],
    Address: "2364 West Broad Street",
    ServiceType: "both",
    Phone: 6147215414,
    additionalNotes: "",
    OperationInfo: {
      slots: [{ Day: 3, startTime: 1080, endTime: 1200 }],
      text: "Tuesday 6 – 8 pm",
      additionalInfo: "",
    },
  },
];

export default locations;