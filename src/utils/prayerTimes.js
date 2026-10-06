// لیست کامل شهرهای ایران (به تفکیک استان)
export const cities = [
  // تهران
  { name: 'تهران', lat: 35.6892, lng: 51.3890 },
  { name: 'اسلامشهر', lat: 35.5628, lng: 51.2368 },
  { name: 'شهریار', lat: 35.6595, lng: 51.2031 },
  { name: 'ورامین', lat: 35.3246, lng: 51.6475 },
  { name: 'رباط‌کریم', lat: 35.4650, lng: 51.0797 },
  { name: 'پاکدشت', lat: 35.4752, lng: 51.6843 },
  { name: 'پردیس', lat: 35.7377, lng: 51.8281 },
  { name: 'دماوند', lat: 35.7170, lng: 52.0648 },
  { name: 'فیروزکوه', lat: 35.7560, lng: 52.7710 },

  // البرز
  { name: 'کرج', lat: 35.8400, lng: 50.9391 },
  { name: 'فردیس', lat: 35.7227, lng: 50.9877 },
  { name: 'نظرآباد', lat: 35.9511, lng: 50.6091 },
  { name: 'هشتگرد', lat: 35.9615, lng: 50.6797 },

  // اصفهان
  { name: 'اصفهان', lat: 32.6546, lng: 51.6680 },
  { name: 'کاشان', lat: 33.9831, lng: 51.4364 },
  { name: 'نجف‌آباد', lat: 32.6331, lng: 51.3654 },
  { name: 'خمینی‌شهر', lat: 32.7007, lng: 51.5221 },
  { name: 'شهرضا', lat: 32.0072, lng: 51.8664 },
  { name: 'شاهین‌شهر', lat: 32.7866, lng: 51.5715 },
  { name: 'فولادشهر', lat: 32.4855, lng: 51.3968 },
  { name: 'زرین‌شهر', lat: 32.3900, lng: 51.3773 },
  { name: 'اردستان', lat: 33.3763, lng: 52.3716 },
  { name: 'نطنز', lat: 33.5070, lng: 51.9123 },
  { name: 'گلپایگان', lat: 33.4540, lng: 50.2871 },
  { name: 'دهاقان', lat: 32.0569, lng: 51.6452 },

  // مشهد و خراسان رضوی
  { name: 'مشهد', lat: 36.2605, lng: 59.6168 },
  { name: 'نیشابور', lat: 36.2133, lng: 58.7950 },
  { name: 'سبزوار', lat: 36.2128, lng: 57.6815 },
  { name: 'تربت حیدریه', lat: 35.2753, lng: 59.2194 },
  { name: 'تربت جام', lat: 35.2437, lng: 60.6219 },
  { name: 'قوچان', lat: 37.1063, lng: 58.5095 },
  { name: 'کاشمر', lat: 35.2383, lng: 58.4654 },
  { name: 'گناباد', lat: 34.3528, lng: 58.6804 },
  { name: 'خواف', lat: 34.5708, lng: 60.1410 },
  { name: 'تایباد', lat: 34.7398, lng: 60.7758 },
  { name: 'چناران', lat: 36.6450, lng: 59.1214 },
  { name: 'درگز', lat: 37.4421, lng: 59.1061 },
  { name: 'سرخس', lat: 36.5460, lng: 61.1565 },
  { name: 'بردسکن', lat: 35.2621, lng: 57.9681 },
  { name: 'خلیل‌آباد', lat: 35.2555, lng: 58.2846 },
  { name: 'فریمان', lat: 35.7041, lng: 59.8497 },
  { name: 'جغتای', lat: 36.7581, lng: 57.1606 },

  // خراسان شمالی
  { name: 'بجنورد', lat: 37.4747, lng: 57.3290 },
  { name: 'شیروان', lat: 37.3967, lng: 57.9274 },
  { name: 'اسفراین', lat: 37.0761, lng: 57.5100 },
  { name: 'آشخانه', lat: 37.5628, lng: 56.9170 },
  { name: 'گرمه', lat: 37.0700, lng: 56.2863 },

  // خراسان جنوبی
  { name: 'بیرجند', lat: 32.8660, lng: 59.2211 },
  { name: 'قائن', lat: 33.7249, lng: 59.1849 },
  { name: 'فردوس', lat: 34.0152, lng: 58.1667 },
  { name: 'طبس', lat: 33.5951, lng: 56.9247 },
  { name: 'نهبندان', lat: 31.5418, lng: 60.0357 },
  { name: 'سربیشه', lat: 32.5777, lng: 59.8027 },

  // فارس
  { name: 'شیراز', lat: 29.5918, lng: 52.5837 },
  { name: 'مرودشت', lat: 29.8744, lng: 52.8029 },
  { name: 'کازرون', lat: 29.6194, lng: 51.6541 },
  { name: 'جهرم', lat: 28.5000, lng: 53.5605 },
  { name: 'فسا', lat: 28.9382, lng: 53.6474 },
  { name: 'داراب', lat: 28.7519, lng: 54.5444 },
  { name: 'لار', lat: 27.6841, lng: 54.3397 },
  { name: 'آباده', lat: 31.1609, lng: 52.6505 },
  { name: 'نی‌ریز', lat: 29.1983, lng: 54.3279 },
  { name: 'اقلید', lat: 30.8980, lng: 52.6876 },
  { name: 'سپیدان', lat: 30.2412, lng: 51.9896 },
  { name: 'زرین‌دشت', lat: 28.4235, lng: 54.4336 },
  { name: 'خرامه', lat: 29.4997, lng: 53.3160 },
  { name: 'سروستان', lat: 29.2753, lng: 53.2207 },
  { name: 'استهبان', lat: 29.1275, lng: 54.0410 },
  { name: 'فیروزآباد', lat: 28.8444, lng: 52.5706 },
  { name: 'قیر', lat: 28.4815, lng: 53.0303 },
  { name: 'لامرد', lat: 27.3426, lng: 53.1844 },
  { name: 'مهر', lat: 27.5570, lng: 52.8868 },

  // خوزستان
  { name: 'اهواز', lat: 31.3183, lng: 48.6706 },
  { name: 'دزفول', lat: 32.3806, lng: 48.4058 },
  { name: 'آبادان', lat: 30.3392, lng: 48.3043 },
  { name: 'خرمشهر', lat: 30.4477, lng: 48.1815 },
  { name: 'بهبهان', lat: 30.5952, lng: 50.2418 },
  { name: 'ماهشهر', lat: 30.5588, lng: 49.1893 },
  { name: 'شوشتر', lat: 32.0492, lng: 48.8501 },
  { name: 'شوش', lat: 32.1940, lng: 48.2436 },
  { name: 'اندیمشک', lat: 32.4581, lng: 48.3556 },
  { name: 'ایذه', lat: 31.8303, lng: 49.8672 },
  { name: 'مسجد سلیمان', lat: 31.9467, lng: 49.3012 },
  { name: 'رامهرمز', lat: 31.2781, lng: 49.6034 },
  { name: 'باغ‌ملک', lat: 31.5250, lng: 49.8844 },
  { name: 'امیدیه', lat: 30.7602, lng: 49.7017 },
  { name: 'هندیجان', lat: 30.2346, lng: 49.7117 },

  // گیلان
  { name: 'رشت', lat: 37.2808, lng: 49.5832 },
  { name: 'انزلی', lat: 37.4760, lng: 49.4586 },
  { name: 'لاهیجان', lat: 37.2020, lng: 50.0020 },
  { name: 'آستارا', lat: 38.4230, lng: 48.8720 },
  { name: 'تالش', lat: 37.8008, lng: 48.9039 },
  { name: 'رودسر', lat: 37.1380, lng: 50.2878 },
  { name: 'رودبار', lat: 36.8225, lng: 49.4284 },
  { name: 'فومن', lat: 37.2249, lng: 49.3115 },
  { name: 'صومعه‌سرا', lat: 37.3148, lng: 49.3182 },
  { name: 'آستانه اشرفیه', lat: 37.2625, lng: 49.9430 },

  // مازندران
  { name: 'ساری', lat: 36.5633, lng: 53.0601 },
  { name: 'بابل', lat: 36.5508, lng: 52.6783 },
  { name: 'آمل', lat: 36.4704, lng: 52.3507 },
  { name: 'قائم‌شهر', lat: 36.4628, lng: 52.8590 },
  { name: 'بهشهر', lat: 36.6937, lng: 53.5525 },
  { name: 'نوشهر', lat: 36.6485, lng: 51.4965 },
  { name: 'چالوس', lat: 36.6536, lng: 51.4199 },
  { name: 'رامسر', lat: 36.9197, lng: 50.6539 },
  { name: 'تنکابن', lat: 36.8142, lng: 50.8750 },
  { name: 'بابلسر', lat: 36.7008, lng: 52.6471 },
  { name: 'نکا', lat: 36.8498, lng: 53.3017 },
  { name: 'جویبار', lat: 36.6408, lng: 52.9119 },
  { name: 'نور', lat: 36.5726, lng: 52.0122 },

  // آذربایجان شرقی
  { name: 'تبریز', lat: 38.0800, lng: 46.2919 },
  { name: 'مراغه', lat: 37.3886, lng: 46.2385 },
  { name: 'مرند', lat: 38.4243, lng: 45.7746 },
  { name: 'اهر', lat: 38.4762, lng: 47.0711 },
  { name: 'بناب', lat: 37.3405, lng: 46.0559 },
  { name: 'سراب', lat: 37.9424, lng: 47.5385 },
  { name: 'میانه', lat: 37.4216, lng: 47.7099 },
  { name: 'شبستر', lat: 38.1802, lng: 45.7027 },
  { name: 'آذرشهر', lat: 37.7584, lng: 45.9788 },
  { name: 'اسکو', lat: 37.9177, lng: 46.1242 },
  { name: 'جلفا', lat: 38.9386, lng: 45.6371 },
  { name: 'هریس', lat: 38.2537, lng: 47.1168 },

  // آذربایجان غربی
  { name: 'ارومیه', lat: 37.5527, lng: 45.0761 },
  { name: 'خوی', lat: 38.5503, lng: 44.9546 },
  { name: 'میاندوآب', lat: 36.9671, lng: 46.1021 },
  { name: 'مهاباد', lat: 36.7638, lng: 45.7203 },
  { name: 'بوکان', lat: 36.5212, lng: 46.2094 },
  { name: 'سلماس', lat: 38.1974, lng: 44.7653 },
  { name: 'نقده', lat: 36.9553, lng: 45.3879 },
  { name: 'پیرانشهر', lat: 36.6959, lng: 45.1427 },
  { name: 'ماکو', lat: 39.2945, lng: 44.4410 },
  { name: 'شاهین‌دژ', lat: 36.6771, lng: 46.5656 },

  // اردبیل
  { name: 'اردبیل', lat: 38.2498, lng: 48.2933 },
  { name: 'پارس‌آباد', lat: 39.6487, lng: 47.9181 },
  { name: 'خلخال', lat: 37.6189, lng: 48.5259 },
  { name: 'مشگین‌شهر', lat: 38.3883, lng: 47.6784 },
  { name: 'گرمی', lat: 39.0296, lng: 48.0796 },
  { name: 'بیله‌سوار', lat: 39.3778, lng: 48.3534 },

  // زنجان
  { name: 'زنجان', lat: 36.6769, lng: 48.4963 },
  { name: 'ابهر', lat: 36.1465, lng: 49.2182 },
  { name: 'خرمدره', lat: 36.2040, lng: 49.1853 },
  { name: 'قیدار', lat: 36.1146, lng: 48.5872 },
  { name: 'صائین‌قلعه', lat: 36.4590, lng: 48.3416 },

  // قزوین
  { name: 'قزوین', lat: 36.2670, lng: 50.0040 },
  { name: 'تاکستان', lat: 36.0695, lng: 49.6964 },
  { name: 'آبیک', lat: 36.0400, lng: 50.5311 },
  { name: 'بوئین‌زهرا', lat: 35.7660, lng: 50.0587 },

  // همدان
  { name: 'همدان', lat: 34.7983, lng: 48.5147 },
  { name: 'ملایر', lat: 34.2969, lng: 48.8233 },
  { name: 'نهاوند', lat: 34.1910, lng: 48.3736 },
  { name: 'تویسرکان', lat: 34.5490, lng: 48.4441 },
  { name: 'اسدآباد', lat: 34.7851, lng: 48.1201 },
  { name: 'بهار', lat: 34.9073, lng: 48.4409 },
  { name: 'کبودراهنگ', lat: 35.2063, lng: 48.7242 },

  // کردستان
  { name: 'سنندج', lat: 35.3147, lng: 46.9988 },
  { name: 'سقز', lat: 36.2499, lng: 46.2736 },
  { name: 'مریوان', lat: 35.5191, lng: 46.1759 },
  { name: 'بانه', lat: 35.9985, lng: 45.8855 },
  { name: 'قروه', lat: 35.1666, lng: 47.8057 },
  { name: 'بیجار', lat: 35.8708, lng: 47.6044 },
  { name: 'کامیاران', lat: 34.7946, lng: 46.9357 },

  // کرمانشاه
  { name: 'کرمانشاه', lat: 34.3142, lng: 47.0650 },
  { name: 'اسلام‌آباد غرب', lat: 34.1087, lng: 46.5257 },
  { name: 'هرسین', lat: 34.2724, lng: 47.5852 },
  { name: 'کنگاور', lat: 34.5028, lng: 47.9658 },
  { name: 'سنقر', lat: 34.7818, lng: 47.5994 },
  { name: 'پاوه', lat: 35.0435, lng: 46.3554 },
  { name: 'جوانرود', lat: 34.8067, lng: 46.4898 },

  // ایلام
  { name: 'ایلام', lat: 33.6374, lng: 46.4226 },
  { name: 'دهلران', lat: 32.6942, lng: 47.2659 },
  { name: 'آبدانان', lat: 32.9960, lng: 47.4198 },
  { name: 'ایوان', lat: 33.8262, lng: 46.3097 },
  { name: 'مهران', lat: 33.1216, lng: 46.1649 },

  // لرستان
  { name: 'خرم‌آباد', lat: 33.4878, lng: 48.3558 },
  { name: 'بروجرد', lat: 33.8973, lng: 48.7516 },
  { name: 'دورود', lat: 33.4949, lng: 49.0669 },
  { name: 'الیگودرز', lat: 33.4024, lng: 49.6909 },
  { name: 'کوهدشت', lat: 33.5323, lng: 47.6099 },
  { name: 'نورآباد', lat: 34.0729, lng: 47.9727 },
  { name: 'پل‌دختر', lat: 33.1535, lng: 47.7124 },
  { name: 'ازنا', lat: 33.4562, lng: 49.4563 },

  // چهارمحال و بختیاری
  { name: 'شهرکرد', lat: 32.3256, lng: 50.8644 },
  { name: 'بروجن', lat: 31.9668, lng: 51.2870 },
  { name: 'فارسان', lat: 32.2550, lng: 50.5639 },
  { name: 'لردگان', lat: 31.5142, lng: 50.8281 },
  { name: 'سامان', lat: 32.4590, lng: 50.9095 },

  // کهگیلویه و بویراحمد
  { name: 'یاسوج', lat: 30.6682, lng: 51.5880 },
  { name: 'دوگنبدان', lat: 30.3564, lng: 50.7991 },
  { name: 'دهدشت', lat: 30.7956, lng: 50.5641 },
  { name: 'سی‌سخت', lat: 30.8540, lng: 51.4589 },

  // بوشهر
  { name: 'بوشهر', lat: 28.9234, lng: 50.8200 },
  { name: 'برازجان', lat: 29.2664, lng: 51.2142 },
  { name: 'گناوه', lat: 29.5796, lng: 50.5160 },
  { name: 'دیلم', lat: 30.0532, lng: 50.1622 },
  { name: 'کنگان', lat: 27.8390, lng: 52.0623 },
  { name: 'جم', lat: 27.8267, lng: 52.3266 },
  { name: 'دیر', lat: 27.8424, lng: 51.9398 },
  { name: 'عسلویه', lat: 27.4761, lng: 52.6067 },
  { name: 'خورموج', lat: 28.6543, lng: 51.3800 },

  // هرمزگان
  { name: 'بندرعباس', lat: 27.1832, lng: 56.2666 },
  { name: 'میناب', lat: 27.1386, lng: 57.0786 },
  { name: 'بندرلنگه', lat: 26.5580, lng: 54.8807 },
  { name: 'قشم', lat: 26.9504, lng: 56.2704 },
  { name: 'کیش', lat: 26.5578, lng: 53.9802 },
  { name: 'رودان', lat: 27.4489, lng: 57.1853 },
  { name: 'پارسیان', lat: 27.2082, lng: 53.0372 },
  { name: 'بستک', lat: 27.1976, lng: 54.3678 },
  { name: 'حاجی‌آباد', lat: 28.3094, lng: 55.9019 },

  // سیستان و بلوچستان
  { name: 'زاهدان', lat: 29.4963, lng: 60.8629 },
  { name: 'زابل', lat: 31.0281, lng: 61.5014 },
  { name: 'چابهار', lat: 25.2906, lng: 60.6430 },
  { name: 'ایرانشهر', lat: 27.2025, lng: 60.6847 },
  { name: 'سراوان', lat: 27.3713, lng: 62.3342 },
  { name: 'خاش', lat: 28.2213, lng: 61.2113 },
  { name: 'کنارک', lat: 25.3603, lng: 60.7538 },
  { name: 'میرجاوه', lat: 29.0150, lng: 61.4472 },
  { name: 'نیکشهر', lat: 26.2261, lng: 60.2141 },

  // کرمان
  { name: 'کرمان', lat: 30.2839, lng: 57.0834 },
  { name: 'سیرجان', lat: 29.4520, lng: 55.6806 },
  { name: 'رفسنجان', lat: 30.4067, lng: 55.9939 },
  { name: 'جیرفت', lat: 28.6752, lng: 57.7381 },
  { name: 'بم', lat: 29.1061, lng: 58.3569 },
  { name: 'زرند', lat: 30.8120, lng: 56.5646 },
  { name: 'کهنوج', lat: 27.9499, lng: 57.7000 },
  { name: 'بردسیر', lat: 29.9261, lng: 56.5741 },
  { name: 'شهربابک', lat: 30.1168, lng: 55.1186 },
  { name: 'راور', lat: 31.2660, lng: 56.8058 },
  { name: 'انار', lat: 30.8734, lng: 55.2720 },

  // یزد
  { name: 'یزد', lat: 31.8974, lng: 54.3569 },
  { name: 'میبد', lat: 32.2496, lng: 54.0173 },
  { name: 'اردکان', lat: 32.3101, lng: 54.0175 },
  { name: 'بافق', lat: 31.6033, lng: 55.4018 },
  { name: 'مهریز', lat: 31.5891, lng: 54.4418 },
  { name: 'ابرکوه', lat: 31.1289, lng: 53.2812 },
  { name: 'طبس (یزد)', lat: 32.2300, lng: 53.5334 },

  // سمنان
  { name: 'سمنان', lat: 35.5729, lng: 53.3971 },
  { name: 'شاهرود', lat: 36.4180, lng: 54.9747 },
  { name: 'گرمسار', lat: 35.2170, lng: 52.3406 },
  { name: 'دامغان', lat: 36.1682, lng: 54.3489 },
  { name: 'مهدی‌شهر', lat: 35.7069, lng: 53.2775 },

  // گلستان
  { name: 'گرگان', lat: 36.8456, lng: 54.4393 },
  { name: 'گنبد کاووس', lat: 37.2500, lng: 55.1674 },
  { name: 'علی‌آباد کتول', lat: 36.9114, lng: 54.8686 },
  { name: 'آق‌قلا', lat: 37.0129, lng: 54.4562 },
  { name: 'بندر ترکمن', lat: 36.9019, lng: 54.0734 },
  { name: 'کردکوی', lat: 36.7914, lng: 54.1095 },
  { name: 'مینودشت', lat: 37.2328, lng: 55.3755 },
  { name: 'آزادشهر', lat: 37.0853, lng: 55.1712 },
]

export const getSavedCity = () => {
  try {
    const saved = localStorage.getItem('ebadat-city')
    if (saved) return JSON.parse(saved)
  } catch {}
  return cities[0]
}

export const saveCity = (city) => {
  localStorage.setItem('ebadat-city', JSON.stringify(city))
}

// محاسبه اوقات شرعی (تقریبی)
export const calculatePrayerTimes = (city, date = new Date()) => {
  const base = new Date(date)
  const tzOffset = 3.5
  const month = date.getMonth() + 1
  const seasonal = month >= 4 && month <= 9 ? 0 : 1
  const times = {
    fajr: seasonal ? '05:15' : '04:30',
    sunrise: seasonal ? '06:45' : '06:00',
    dhuhr: '12:05',
    asr: seasonal ? '15:45' : '15:00',
    maghrib: seasonal ? '18:00' : '17:30',
    isha: seasonal ? '19:15' : '18:45',
  }
  const toDate = (str) => {
    if (!str) return null
    const [h, m] = str.split(':').map(Number)
    const d = new Date(base)
    d.setHours(h, m, 0, 0)
    return d
  }
  return {
    fajr: toDate(times.fajr),
    sunrise: toDate(times.sunrise),
    dhuhr: toDate(times.dhuhr),
    asr: toDate(times.asr),
    maghrib: toDate(times.maghrib),
    isha: toDate(times.isha),
  }
}

export const getNextPrayer = (times) => {
  if (!times) return null
  const now = new Date()
  const order = [
    { key: 'fajr', name: 'اذان صبح', icon: '🌅' },
    { key: 'dhuhr', name: 'اذان ظهر', icon: '🌞' },
    { key: 'maghrib', name: 'اذان مغرب', icon: '🌆' },
  ]
  for (const p of order) {
    if (times[p.key] && times[p.key] > now) return { ...p, time: times[p.key] }
  }
  const tomorrow = new Date(times.fajr)
  tomorrow.setDate(tomorrow.getDate() + 1)
  return { ...order[0], time: tomorrow, tomorrow: true }
}

export const getAllTimes = (times) => {
  if (!times) return []
  return [
    { name: 'اذان صبح', time: times.fajr, icon: '🌅' },
    { name: 'طلوع آفتاب', time: times.sunrise, icon: '☀️' },
    { name: 'اذان ظهر', time: times.dhuhr, icon: '🌞' },
    { name: 'نماز عصر', time: times.asr, icon: '🌤️' },
    { name: 'اذان مغرب', time: times.maghrib, icon: '🌆' },
    { name: 'نماز عشا', time: times.isha, icon: '🌙' },
  ]
}

export const formatTime = (date) => {
  if (!date) return '--:--'
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
}

export const getCountdown = (targetTime) => {
  if (!targetTime) return { h: 0, m: 0, s: 0 }
  const now = new Date()
  let diff = targetTime - now
  if (diff < 0) diff += 24 * 60 * 60 * 1000
  return {
    h: Math.floor(diff / (1000 * 60 * 60)),
    m: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    s: Math.floor((diff % (1000 * 60)) / 1000),
  }
}
