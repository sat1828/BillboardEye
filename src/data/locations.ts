export interface StateData {
  coordinates: [number, number];
  cities: string[];
  reportCount?: number;
  imageUrl?: string;
}

export interface CountryData {
  [state: string]: StateData;
}

export const GLOBAL_LOCATION_DATA: { [country: string]: CountryData } = {
  "India": {
    "Andhra Pradesh": {
      coordinates: [15.9129, 79.7400],
      cities: ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool", "Rajahmundry", "Tirupati", "Kakinada"],
      imageUrl: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=400&h=300&fit=crop"
    },
    "Arunachal Pradesh": {
      coordinates: [28.2180, 94.7278],
      cities: ["Itanagar", "Naharlagun", "Pasighat", "Tezpur", "Bomdila", "Ziro", "Along", "Tezu"]
    },
    "Assam": {
      coordinates: [26.2006, 92.9376],
      cities: ["Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Nagaon", "Tinsukia", "Tezpur", "Bongaigaon"]
    },
    "Bihar": {
      coordinates: [25.0961, 85.3131],
      cities: ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Purnia", "Darbhanga", "Bihar Sharif", "Arrah"]
    },
    "Chhattisgarh": {
      coordinates: [21.2787, 81.8661],
      cities: ["Raipur", "Bhilai", "Korba", "Bilaspur", "Durg", "Rajnandgaon", "Jagdalpur", "Raigarh"]
    },
    "Goa": {
      coordinates: [15.2993, 74.1240],
      cities: ["Panaji", "Vasco da Gama", "Margao", "Mapusa", "Ponda", "Bicholim", "Curchorem", "Sanquelim"]
    },
    "Gujarat": {
      coordinates: [23.0225, 72.5714],
      cities: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Junagadh", "Gandhinagar"]
    },
    "Haryana": {
      coordinates: [29.0588, 76.0856],
      cities: ["Gurugram", "Faridabad", "Panipat", "Ambala", "Yamunanagar", "Rohtak", "Hisar", "Karnal"]
    },
    "Himachal Pradesh": {
      coordinates: [31.1048, 77.1734],
      cities: ["Shimla", "Dharamshala", "Solan", "Mandi", "Kullu", "Hamirpur", "Una", "Bilaspur"]
    },
    "Jharkhand": {
      coordinates: [23.6102, 85.2799],
      cities: ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Deoghar", "Phusro", "Hazaribagh", "Giridih"]
    },
    "Karnataka": {
      coordinates: [15.3173, 75.7139],
      cities: ["Bangalore", "Mysore", "Hubli", "Mangalore", "Belgaum", "Gulbarga", "Davanagere", "Bellary"],
      imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop"
    },
    "Kerala": {
      coordinates: [10.8505, 76.2711],
      cities: ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam", "Palakkad", "Alappuzha", "Malappuram"]
    },
    "Madhya Pradesh": {
      coordinates: [22.9734, 78.6569],
      cities: ["Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain", "Sagar", "Dewas", "Satna"]
    },
    "Maharashtra": {
      coordinates: [19.7515, 75.7139],
      cities: ["Mumbai", "Pune", "Nagpur", "Thane", "Nashik", "Aurangabad", "Solapur", "Amravati"],
      imageUrl: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=400&h=300&fit=crop"
    },
    "Manipur": {
      coordinates: [24.6637, 93.9063],
      cities: ["Imphal", "Thoubal", "Bishnupur", "Churachandpur", "Kakching", "Ukhrul", "Senapati", "Tamenglong"]
    },
    "Meghalaya": {
      coordinates: [25.4670, 91.3662],
      cities: ["Shillong", "Tura", "Jowai", "Nongpoh", "Baghmara", "Williamnagar", "Resubelpara", "Ampati"]
    },
    "Mizoram": {
      coordinates: [23.1645, 92.9376],
      cities: ["Aizawl", "Lunglei", "Saiha", "Champhai", "Kolasib", "Serchhip", "Lawngtlai", "Mamit"]
    },
    "Nagaland": {
      coordinates: [26.1584, 94.5624],
      cities: ["Kohima", "Dimapur", "Mokokchung", "Tuensang", "Wokha", "Zunheboto", "Phek", "Kiphire"]
    },
    "Odisha": {
      coordinates: [20.9517, 85.0985],
      cities: ["Bhubaneswar", "Cuttack", "Rourkela", "Brahmapur", "Sambalpur", "Puri", "Balasore", "Baripada"]
    },
    "Punjab": {
      coordinates: [31.1471, 75.3412],
      cities: ["Chandigarh", "Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Mohali", "Firozpur"]
    },
    "Rajasthan": {
      coordinates: [27.0238, 74.2179],
      cities: ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer", "Bikaner", "Alwar", "Bharatpur"]
    },
    "Sikkim": {
      coordinates: [27.5330, 88.5122],
      cities: ["Gangtok", "Namchi", "Geyzing", "Mangan", "Rangpo", "Jorethang", "Nayabazar", "Singtam"]
    },
    "Tamil Nadu": {
      coordinates: [11.1271, 78.6569],
      cities: ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", "Erode", "Vellore"]
    },
    "Telangana": {
      coordinates: [18.1124, 79.0193],
      cities: ["Hyderabad", "Warangal", "Nizamabad", "Khammam", "Karimnagar", "Ramagundam", "Mahbubnagar", "Nalgonda"]
    },
    "Tripura": {
      coordinates: [23.9408, 91.9882],
      cities: ["Agartala", "Dharmanagar", "Udaipur", "Kailashahar", "Belonia", "Khowai", "Teliamura", "Sabroom"]
    },
    "Uttar Pradesh": {
      coordinates: [26.8467, 80.9462],
      cities: ["Lucknow", "Kanpur", "Ghaziabad", "Agra", "Varanasi", "Meerut", "Allahabad", "Bareilly"]
    },
    "Uttarakhand": {
      coordinates: [30.0668, 79.0193],
      cities: ["Dehradun", "Haridwar", "Roorkee", "Haldwani", "Rudrapur", "Kashipur", "Rishikesh", "Kotdwar"]
    },
    "West Bengal": {
      coordinates: [22.9868, 87.8550],
      cities: ["Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri", "Malda", "Bardhaman", "Kharagpur"]
    }
  },
  "United States": {
    "California": {
      coordinates: [36.7783, -119.4179],
      cities: ["Los Angeles", "San Francisco", "San Diego", "Sacramento", "San Jose", "Oakland", "Fresno", "Long Beach"],
      imageUrl: "https://images.unsplash.com/photo-1536431311719-398b6704d4cc?w=400&h=300&fit=crop"
    },
    "Texas": {
      coordinates: [31.9686, -99.9018],
      cities: ["Houston", "Dallas", "Austin", "San Antonio", "Fort Worth", "El Paso", "Arlington", "Corpus Christi"]
    },
    "Florida": {
      coordinates: [27.7663, -81.6868],
      cities: ["Miami", "Orlando", "Tampa", "Jacksonville", "St. Petersburg", "Hialeah", "Tallahassee", "Fort Lauderdale"]
    },
    "New York": {
      coordinates: [42.1657, -74.9481],
      cities: ["New York City", "Buffalo", "Rochester", "Yonkers", "Syracuse", "Albany", "New Rochelle", "Mount Vernon"]
    },
    "Pennsylvania": {
      coordinates: [40.5908, -77.2098],
      cities: ["Philadelphia", "Pittsburgh", "Allentown", "Erie", "Reading", "Scranton", "Bethlehem", "Lancaster"]
    }
  },
  "China": {
    "Guangdong": {
      coordinates: [23.3790, 113.7633],
      cities: ["Guangzhou", "Shenzhen", "Dongguan", "Foshan", "Zhongshan", "Zhuhai", "Jiangmen", "Huizhou"]
    },
    "Shandong": {
      coordinates: [36.3427, 118.1498],
      cities: ["Jinan", "Qingdao", "Yantai", "Weifang", "Zibo", "Weihai", "Liaocheng", "Tai'an"]
    },
    "Henan": {
      coordinates: [33.8818, 113.6140],
      cities: ["Zhengzhou", "Luoyang", "Kaifeng", "Anyang", "Xinxiang", "Nanyang", "Pingdingshan", "Xuchang"]
    },
    "Sichuan": {
      coordinates: [30.6171, 102.7103],
      cities: ["Chengdu", "Mianyang", "Deyang", "Nanchong", "Yibin", "Luzhou", "Dazhou", "Leshan"]
    },
    "Jiangsu": {
      coordinates: [32.0603, 118.7969],
      cities: ["Nanjing", "Suzhou", "Wuxi", "Changzhou", "Nantong", "Yancheng", "Yangzhou", "Taizhou"]
    }
  },
  "Brazil": {
    "São Paulo": {
      coordinates: [-23.5505, -46.6333],
      cities: ["São Paulo", "Guarulhos", "Campinas", "São Bernardo do Campo", "Santo André", "Osasco", "Ribeirão Preto", "Sorocaba"]
    },
    "Rio de Janeiro": {
      coordinates: [-22.9068, -43.1729],
      cities: ["Rio de Janeiro", "Nova Iguaçu", "Niterói", "Duque de Caxias", "São Gonçalo", "Volta Redonda", "Petrópolis", "Magé"]
    },
    "Minas Gerais": {
      coordinates: [-18.5122, -44.5550],
      cities: ["Belo Horizonte", "Uberlândia", "Contagem", "Juiz de Fora", "Betim", "Montes Claros", "Ribeirão das Neves", "Uberaba"]
    },
    "Bahia": {
      coordinates: [-12.9639, -38.5016],
      cities: ["Salvador", "Feira de Santana", "Vitória da Conquista", "Camaçari", "Itabuna", "Juazeiro", "Lauro de Freitas", "Ilhéus"]
    },
    "Paraná": {
      coordinates: [-24.8935, -51.4189],
      cities: ["Curitiba", "Londrina", "Maringá", "Ponta Grossa", "Cascavel", "São José dos Pinhais", "Foz do Iguaçu", "Colombo"]
    }
  },
  "Germany": {
    "Bavaria": {
      coordinates: [49.0134, 10.7909],
      cities: ["Munich", "Nuremberg", "Augsburg", "Würzburg", "Regensburg", "Ingolstadt", "Fürth", "Erlangen"]
    },
    "North Rhine-Westphalia": {
      coordinates: [51.4332, 7.6616],
      cities: ["Cologne", "Düsseldorf", "Dortmund", "Essen", "Duisburg", "Bochum", "Wuppertal", "Bielefeld"]
    },
    "Baden-Württemberg": {
      coordinates: [48.6616, 9.3501],
      cities: ["Stuttgart", "Mannheim", "Karlsruhe", "Freiburg", "Heidelberg", "Ulm", "Heilbronn", "Pforzheim"]
    },
    "Lower Saxony": {
      coordinates: [52.6367, 9.8451],
      cities: ["Hanover", "Braunschweig", "Oldenburg", "Osnabrück", "Wolfsburg", "Göttingen", "Salzgitter", "Hildesheim"]
    },
    "Hesse": {
      coordinates: [50.6521, 9.1624],
      cities: ["Frankfurt am Main", "Wiesbaden", "Kassel", "Darmstadt", "Offenbach", "Hanau", "Marburg", "Fulda"]
    }
  },
  "Canada": {
    "Ontario": {
      coordinates: [51.2538, -85.3232],
      cities: ["Toronto", "Ottawa", "Hamilton", "London", "Kitchener", "Windsor", "Oshawa", "Barrie"]
    },
    "Quebec": {
      coordinates: [52.9399, -73.5491],
      cities: ["Montreal", "Quebec City", "Laval", "Gatineau", "Longueuil", "Sherbrooke", "Saguenay", "Lévis"]
    },
    "British Columbia": {
      coordinates: [53.7267, -127.6476],
      cities: ["Vancouver", "Surrey", "Burnaby", "Richmond", "Abbotsford", "Coquitlam", "Saanich", "Kelowna"]
    },
    "Alberta": {
      coordinates: [53.9333, -116.5765],
      cities: ["Calgary", "Edmonton", "Red Deer", "Lethbridge", "St. Albert", "Medicine Hat", "Grande Prairie", "Airdrie"]
    },
    "Manitoba": {
      coordinates: [53.7609, -98.8139],
      cities: ["Winnipeg", "Brandon", "Steinbach", "Thompson", "Portage la Prairie", "Winkler", "Selkirk", "Dauphin"]
    }
  },
  "Australia": {
    "New South Wales": {
      coordinates: [-31.2532, 146.9211],
      cities: ["Sydney", "Newcastle", "Wollongong", "Maitland", "Wagga Wagga", "Albury", "Port Macquarie", "Tamworth"]
    },
    "Victoria": {
      coordinates: [-36.5986, 144.6780],
      cities: ["Melbourne", "Geelong", "Ballarat", "Bendigo", "Frankston", "Melton", "Casey", "Greater Dandenong"]
    },
    "Queensland": {
      coordinates: [-22.7359, 144.4937],
      cities: ["Brisbane", "Gold Coast", "Townsville", "Cairns", "Toowoomba", "Rockhampton", "Mackay", "Bundaberg"]
    },
    "Western Australia": {
      coordinates: [-25.2744, 133.7751],
      cities: ["Perth", "Fremantle", "Rockingham", "Mandurah", "Bunbury", "Geraldton", "Kalgoorlie", "Albany"]
    },
    "South Australia": {
      coordinates: [-30.0002, 136.2092],
      cities: ["Adelaide", "Mount Gambier", "Whyalla", "Murray Bridge", "Port Lincoln", "Port Pirie", "Victor Harbor", "Gawler"]
    }
  },
  "United Kingdom": {
    "England": {
      coordinates: [52.3555, -1.1743],
      cities: ["London", "Birmingham", "Manchester", "Liverpool", "Leeds", "Sheffield", "Bristol", "Nottingham"],
      imageUrl: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop"
    },
    "Scotland": {
      coordinates: [56.4907, -4.2026],
      cities: ["Edinburgh", "Glasgow", "Aberdeen", "Dundee", "Stirling", "Perth", "Inverness", "Paisley"]
    },
    "Wales": {
      coordinates: [52.1307, -3.7837],
      cities: ["Cardiff", "Swansea", "Newport", "Wrexham", "Barry", "Caerphilly", "Bridgend", "Neath"]
    },
    "Northern Ireland": {
      coordinates: [54.7877, -6.4923],
      cities: ["Belfast", "Derry", "Lisburn", "Newtownabbey", "Bangor", "Craigavon", "Castlereagh", "Ballymena"]
    }
  },
  "France": {
    "Île-de-France": {
      coordinates: [48.8499, 2.6370],
      cities: ["Paris", "Boulogne-Billancourt", "Saint-Denis", "Argenteuil", "Versailles", "Montreuil", "Créteil", "Nanterre"]
    },
    "Provence-Alpes-Côte d'Azur": {
      coordinates: [43.9352, 6.0679],
      cities: ["Marseille", "Nice", "Toulon", "Aix-en-Provence", "Antibes", "Cannes", "Avignon", "Fréjus"]
    },
    "Auvergne-Rhône-Alpes": {
      coordinates: [45.3584, 4.3776],
      cities: ["Lyon", "Saint-Étienne", "Grenoble", "Villeurbanne", "Clermont-Ferrand", "Valence", "Chambéry", "Annecy"]
    },
    "Nouvelle-Aquitaine": {
      coordinates: [45.7640, -0.5707],
      cities: ["Bordeaux", "Limoges", "Poitiers", "Pau", "La Rochelle", "Mérignac", "Pessac", "Bayonne"]
    },
    "Occitania": {
      coordinates: [43.8927, 2.1972],
      cities: ["Toulouse", "Montpellier", "Nîmes", "Perpignan", "Béziers", "Narbonne", "Carcassonne", "Albi"]
    }
  },
  "Japan": {
    "Tokyo": {
      coordinates: [35.6762, 139.6503],
      cities: ["Tokyo", "Hachioji", "Machida", "Fuchu", "Chofu", "Musashino", "Mitaka", "Ome"]
    },
    "Osaka": {
      coordinates: [34.6937, 135.5023],
      cities: ["Osaka", "Sakai", "Higashiosaka", "Hirakata", "Toyonaka", "Suita", "Takatsuki", "Yao"]
    },
    "Kanagawa": {
      coordinates: [35.4478, 139.6425],
      cities: ["Yokohama", "Kawasaki", "Sagamihara", "Fujisawa", "Chigasaki", "Hiratsuka", "Machida", "Yamato"]
    },
    "Aichi": {
      coordinates: [35.1802, 136.9066],
      cities: ["Nagoya", "Toyota", "Okazaki", "Ichinomiya", "Kasugai", "Anjo", "Toyohashi", "Nishio"]
    },
    "Hokkaido": {
      coordinates: [43.2203, 142.8635],
      cities: ["Sapporo", "Asahikawa", "Hakodate", "Kushiro", "Tomakomai", "Obihiro", "Otaru", "Ebetsu"]
    }
  },
  "Mexico": {
    "Mexico City": {
      coordinates: [19.4326, -99.1332],
      cities: ["Mexico City", "Ecatepec", "Guadalajara", "Puebla", "Tijuana", "León", "Juárez", "Zapopan"]
    },
    "Jalisco": {
      coordinates: [20.6767, -103.3475],
      cities: ["Guadalajara", "Zapopan", "Tlaquepaque", "Tonalá", "Puerto Vallarta", "Tlajomulco", "El Salto", "Tepatitlán"]
    },
    "Nuevo León": {
      coordinates: [25.5922, -99.9962],
      cities: ["Monterrey", "Guadalupe", "San Nicolás", "Escobedo", "Apodaca", "Santa Catarina", "San Pedro", "Cadereyta"]
    },
    "Baja California": {
      coordinates: [30.8406, -115.2838],
      cities: ["Tijuana", "Mexicali", "Ensenada", "Playas de Rosarito", "Tecate", "San Felipe", "Vicente Guerrero", "El Sauzal"]
    },
    "Puebla": {
      coordinates: [19.0414, -98.2063],
      cities: ["Puebla", "Tehuacán", "San Martín", "Atlixco", "San Pedro Cholula", "Amozoc", "Cuautlancingo", "Huauchinango"]
    }
  },
  "Russia": {
    "Moscow Oblast": {
      coordinates: [55.5815, 36.8251],
      cities: ["Moscow", "Balashikha", "Khimki", "Podolsk", "Korolev", "Mytishchi", "Lyubertsy", "Elektrostal"]
    },
    "Saint Petersburg": {
      coordinates: [59.9311, 30.3609],
      cities: ["Saint Petersburg", "Pushkin", "Kolpino", "Kronstadt", "Lomonosov", "Pavlovsk", "Peterhof", "Sestroretsk"]
    },
    "Sverdlovsk Oblast": {
      coordinates: [56.8431, 60.6454],
      cities: ["Yekaterinburg", "Nizhny Tagil", "Kamensk-Uralsky", "Pervouralsk", "Serov", "Novouralsk", "Verkhnyaya Pyshma", "Asbest"]
    },
    "Novosibirsk Oblast": {
      coordinates: [55.0084, 82.9357],
      cities: ["Novosibirsk", "Berdsk", "Iskitim", "Ob", "Kuybyshev", "Tatarsk", "Barabinsk", "Toguchin"]
    },
    "Tatarstan": {
      coordinates: [55.7887, 49.1221],
      cities: ["Kazan", "Naberezhnye Chelny", "Nizhnekamsk", "Almetyevsk", "Zelenodolsk", "Bugulma", "Yelabuga", "Leninogorsk"]
    }
  }
};