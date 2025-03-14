
export interface Verse {
  id: string;
  chapter: number;
  verse: number;
  sanskrit: string;
  hindi: string;
  english: string;
  audioUrl?: string;
}

// Sample verses from Chapter 1
const verses: Verse[] = [
  {
    id: "1-1",
    chapter: 1,
    verse: 1,
    sanskrit: "धृतराष्ट्र उवाच । धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः । मामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय ॥",
    hindi: "धृतराष्ट्र बोले - हे संजय! धर्मभूमि कुरुक्षेत्र में एकत्र हुए युद्ध के इच्छुक मेरे और पाण्डु के पुत्रों ने क्या किया?",
    english: "Dhritarashtra said: O Sanjaya, what did my sons and the sons of Pandu do when they assembled on the holy field of Kurukshetra, eager for battle?",
    audioUrl: "/audio/1-1.mp3"
  },
  {
    id: "1-2",
    chapter: 1,
    verse: 2,
    sanskrit: "सञ्जय उवाच । दृष्ट्वा तु पाण्डवानीकं व्यूढं दुर्योधनस्तदा । आचार्यमुपसङ्गम्य राजा वचनमब्रवीत् ॥",
    hindi: "संजय बोले- उस समय राजा दुर्योधन ने व्यूहरचना में खड़ी पाण्डवों की सेना को देखकर, द्रोणाचार्य के पास जाकर यह वचन कहा।",
    english: "Sanjaya said: Seeing the army of the Pandavas arranged in battle formation, King Duryodhana approached his teacher Drona and spoke these words.",
    audioUrl: "/audio/1-2.mp3"
  },
  {
    id: "1-3",
    chapter: 1,
    verse: 3,
    sanskrit: "पश्यैतां पाण्डुपुत्राणामाचार्य महतीं चमूम् । व्यूढां द्रुपदपुत्रेण तव शिष्येण धीमता ॥",
    hindi: "हे आचार्य! आपके बुद्धिमान शिष्य द्रुपदपुत्र धृष्टद्युम्न द्वारा व्यूहरचना की गई पाण्डुपुत्रों की इस महती सेना को देखिए।",
    english: "O teacher, behold this mighty army of the sons of Pandu, arranged by your intelligent disciple, the son of Drupada.",
    audioUrl: "/audio/1-3.mp3"
  },
  {
    id: "1-4",
    chapter: 1,
    verse: 4,
    sanskrit: "अत्र शूरा महेष्वासा भीमार्जुनसमा युधि । युयुधानो विराटश्च द्रुपदश्च महारथः ॥",
    hindi: "इस सेना में महाधनुर्धर शूरवीर योद्धा हैं जो युद्ध में भीम और अर्जुन के समान हैं, जैसे कि युयुधान (सात्यकि), विराट तथा महारथी द्रुपद।",
    english: "Here in this army are many heroic bowmen who are equal in fighting skills to Bhima and Arjuna: great warriors like Yuyudhana, Virata, and Drupada.",
    audioUrl: "/audio/1-4.mp3"
  },
  {
    id: "1-5",
    chapter: 1,
    verse: 5,
    sanskrit: "धृष्टकेतुश्चेकितानः काशिराजश्च वीर्यवान् । पुरुजित्कुन्तिभोजश्च शैब्यश्च नरपुङ्गवः ॥",
    hindi: "धृष्टकेतु, चेकितान, वीर्यवान काशिराज, पुरुजित, कुन्तिभोज और नरश्रेष्ठ शैब्य भी इस सेना में हैं।",
    english: "Also there are the mighty Dhrishtaketu, Chekitana, the valiant king of Kashi, Purujit, Kuntibhoja, and Shaibya, all of whom are great warriors.",
    audioUrl: "/audio/1-5.mp3"
  },
  {
    id: "1-6",
    chapter: 1,
    verse: 6,
    sanskrit: "युधामन्युश्च विक्रान्त उत्तमौजाश्च वीर्यवान् । सौभद्रो द्रौपदेयाश्च सर्व एव महारथाः ॥",
    hindi: "पराक्रमी युधामन्यु, वीर्यवान उत्तमौजा, सुभद्रापुत्र अभिमन्यु और द्रौपदी के पाँचों पुत्र - ये सभी महारथी हैं।",
    english: "There are also the mighty Yudhamanyu, the valiant Uttamauja, the son of Subhadra (Abhimanyu), and the sons of Draupadi, all of whom are great chariot warriors.",
    audioUrl: "/audio/1-6.mp3"
  },
  {
    id: "1-7",
    chapter: 1,
    verse: 7,
    sanskrit: "अस्माकं तु विशिष्टा ये तान्निबोध द्विजोत्तम । नायका मम सैन्यस्य संज्ञार्थं तान्ब्रवीमि ते ॥",
    hindi: "हे द्विजश्रेष्ठ! अब हमारी सेना के जो विशिष्ट योद्धा हैं, उन्हें भी जानिए। आपकी जानकारी के लिए मैं अपनी सेना के प्रधान योद्धाओं के नाम बताता हूँ।",
    english: "O best of brahmanas, let me also tell you about the distinguished commanders of my army, for your information.",
    audioUrl: "/audio/1-7.mp3"
  },
  {
    id: "1-8",
    chapter: 1,
    verse: 8,
    sanskrit: "भवान्भीष्मश्च कर्णश्च कृपश्च समितिञ्जयः । अश्वत्थामा विकर्णश्च सौमदत्तिस्तथैव च ॥",
    hindi: "आप (द्रोणाचार्य), भीष्म, कर्ण और युद्ध में विजयी कृपाचार्य तथा अश्वत्थामा, विकर्ण और सोमदत्त का पुत्र भूरिश्रवा।",
    english: "Yourself, Bhishma, Karna, and the always-victorious Kripa; also Ashvatthama, Vikarna, and the son of Somadatta (Bhurishrava).",
    audioUrl: "/audio/1-8.mp3"
  },
  {
    id: "1-9",
    chapter: 1,
    verse: 9,
    sanskrit: "अन्ये च बहवः शूरा मदर्थे त्यक्तजीविताः । नानाशस्त्रप्रहरणाः सर्वे युद्धविशारदाः ॥",
    hindi: "मेरे लिए प्राण न्योछावर करने को तैयार अन्य बहुत से शूरवीर भी हैं। वे विविध प्रकार के शस्त्रों और अस्त्रों से सुसज्जित हैं और सभी युद्ध-कौशल में अत्यन्त निपुण हैं।",
    english: "And there are many other heroes who are prepared to lay down their lives for my sake, armed with various weapons and missiles, all highly skilled in warfare.",
    audioUrl: "/audio/1-9.mp3"
  },
  {
    id: "1-10",
    chapter: 1,
    verse: 10,
    sanskrit: "अपर्याप्तं तदस्माकं बलं भीष्माभिरक्षितम् । पर्याप्तं त्विदमेतेषां बलं भीमाभिरक्षितम् ॥",
    hindi: "भीष्म पितामह द्वारा रक्षित हमारी यह सेना अजेय है, जबकि भीम द्वारा संरक्षित इनकी सेना को जीतना सरल है।",
    english: "Our army, protected by Bhishma, is invincible, whereas their army, protected by Bhima, is easy to conquer.",
    audioUrl: "/audio/1-10.mp3"
  }
];

// Function to get verses by chapter
export const getVersesByChapter = (chapterNumber: number): Verse[] => {
  return verses.filter(verse => verse.chapter === chapterNumber);
};

// Function to get a specific verse
export const getVerse = (chapterId: number, verseNumber: number): Verse | undefined => {
  return verses.find(verse => verse.chapter === chapterId && verse.verse === verseNumber);
};

export default verses;
