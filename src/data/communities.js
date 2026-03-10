import lordImg from "../assets/images/lord.png";
import SNYS from "../assets/images/SNYS.jpg";
import SVS from "../assets/images/SVS.jpeg";
import FCK from "../assets/images/FCK.jpeg";
import SVNM from "../assets/images/SVNM.jpeg";
import KIFA from "../assets/images/KIFA.jpeg";

export const communities = [
  {
    id: "svs",
    name: "Sree Venkiteshwara Seva Samithy",
    logo: SVS,
    shortDescription: "A spiritual and cultural GSB community rooted in tradition.",
    founded: 1992,
    description:
      "Sree Venkiteshwara Seva Samithy is a spiritually rooted community organization dedicated to preserving GSB temple traditions, religious practices, and cultural heritage. Since its formation, the Samithy has played a vital role in organizing temple rituals, annual festivals, and community gatherings, fostering unity, devotion, and continuity across generations.",
    highlights: [
      "Annual temple festivals and rituals conducted with community participation",
      "Organized cultural programs and religious discourses",
      "Active involvement in social welfare and community services"
    ],
    members: [
      { name: "Anand Kamath", role: "President" },
      { name: "Dhanesh Rao", role: "Treasurer" }
    ]
  },

  {
    id: "snys",
    name: "SreeNaraya Devar Yuva Samaj",
    logo: SNYS,
    shortDescription: "Youth-driven initiatives for cultural and social growth.",
    founded: 2015,
    description:
      "Sree Naraya Devar Yuva Samaj is a vibrant youth-led community focused on nurturing leadership, cultural awareness, and social responsibility among young members. Through sports activities, cultural programs, and community initiatives, the Samaj provides a constructive platform for youth to engage, grow, and contribute meaningfully to society.",
    highlights: [
      "Conducted youth sports tournaments and cultural events",
      "Organized leadership and personality development programs",
      "Actively participated in community volunteering activities"
    ],
    members: [
      { name: "Vivek Prabhu", role: "President" },
      { name: "Krishnanada Kamath", role: "General Secretary" }
    ]
  },
  {
      id: "svkdm",
      name: "Sevanam Karanakodam",
      logo: SVNM,
      shortDescription: "Service-driven community initiative of Karnakodam",
      founded: 2025,
      description:
        "Sevanam Karnakodam is a community-oriented organization focused on service, compassion, and social responsibility. Rooted in the values of selfless service, the organization actively supports cultural, spiritual, and welfare activities that strengthen community bonds and promote collective well-being.",
      highlights: [
        "Community service and welfare programs",
  "Supporting religious and cultural events",
  "Assisting families and individuals in need",
  "Encouraging volunteerism and social responsibility"
      ],
      members: [
        { name: "Sreekanth G Bhat", role: "President" },
        { name: "Rohith Pai", role: "Vice-President" }
      ]
    },
  {
    id: "fck",
    name: "FC Karnakod",
    logo: FCK,
    shortDescription: "Karnakod’s united football community",
    founded: 2015,
    description:
      "FC Karnakod is a grassroots football community founded to unite local youth through the love of the game. Beyond competition, the club emphasizes discipline, teamwork, and sportsmanship while actively training players and representing Karnakod in tournaments. The club’s achievements, including winning the TD Cup, reflect its dedication and growing football culture.",
    highlights: [
      "Winners of the TD Cup Football Tournament",
      "Organized inter-community football matches",
      "Actively training and mentoring young local players"
    ],
    members: [
      { name: "Pramdo R Pai", role: "Captain" },
      { name: "Ramanand", role: "Vice-captain" }
    ]
  },

  {
    id: "kifa",
    name: "Konkan Internaltional Football Association",
    logo: KIFA,
    shortDescription: "Promoting Sports excellence across Konkan Community",
    founded: 2003,
    description:
      "Konkan International Football Association is a sports-focused organization dedicated to developing and promoting football across the Konkan region. The association works to identify talent, organize competitive tournaments, and create structured opportunities for players to showcase skills at regional and international levels.",
    highlights: [
      "Organizing inter-district and international football tournaments",
      "Talent identification and player development programs",
      "Supporting grassroots football initiatives",
      "Collaborating with clubs and communities to grow football culture"
    ],
    members: [
      { name: "Sarath Appappa", role: "President" },
      { name: "Srinivas", role: "Secretary" }
    ]
  }
];
