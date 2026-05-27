import { GiDrum, GiSoccerBall, GiSun, GiTheaterCurtains } from "react-icons/gi";

export const events = [
  {
    id: 1,
    title: "Holi Utsav",
    description:
      "A joyful celebration of Holi featuring traditional rituals, colors, music, and community togetherness.",
    date: { day: "08", month: "MAR" },
    time: "3:00 PM",
    location: "Anugraha Charitable Trust, Karanakodam",
    icon: GiSun,
    category: "Festival"
  },
  {
    id: 2,
    title: "Pragathi Cup 2026",
    description: "All India GSB football league bringing teams and supporters together for a community sports weekend.",
    date: { day: "03", month: "APR" },
    time: "9:00 AM",
    location: "Redkite, Vytilla",
    icon: GiSoccerBall,
    category: "Sports"
  },
  {
    id: 3,
    title: "Sree Narayana Devar Aarattu 2026",
    description: "Annual Aarattu observance with devotional gatherings and traditional temple participation.",
    date: { day: "27", month: "JUN" },
    time: "6:30 PM",
    location: "TD Temple, Karanakodam",
    icon: GiTheaterCurtains,
    category: "Temple"
  },
  {
    id: 4,
    title: "Mandalam Mahotsav",
    description: "Mandala Maasacharanam with evening prayers, bhajans, and community offerings.",
    date: { day: "27", month: "DEC" },
    time: "7:00 PM",
    location: "SVB Devi Temple, KDM",
    icon: GiDrum,
    category: "Devotion"
  }
];
