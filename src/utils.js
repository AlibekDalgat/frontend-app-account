/**
 * Compare two dates.
 * @param {*} a the first date
 * @param {*} b the second date
 * @returns a negative integer if a > b, a positive integer if a < b, or 0 if a = b
 */
export function compareVerifiedNamesByCreatedDate(a, b) {
  const aTimeSinceEpoch = new Date(a.created).getTime();
  const bTimeSinceEpoch = new Date(b.created).getTime();
  return bTimeSinceEpoch - aTimeSinceEpoch;
}

/**
 *
 * @param {*} verifiedNames a list of verified name objects, where each object has at least the
 *                          following keys: created, status, and verified_name.
 * @returns the most recent verified name object from the list parameter with the 'pending' or
 *          'accepted' status, if one exists; otherwise, null
 */
export function getMostRecentApprovedOrPendingVerifiedName(verifiedNames) {
  // clone array so as not to modify original array
  const names = [...verifiedNames];

  if (Array.isArray(names)) {
    names.sort(compareVerifiedNamesByCreatedDate);
  }

  // We only want to consider a subset of verified names when determining the value of nameOnAccount.
  // approved: consider this status, as the name has been verified by IDV and should supersede the full name
  //           (profile name).
  // pending: consider this status, as the learner has started the name change process through the
  //          Account Settings page, and has been navigated to IDV to complete the name change process.
  // submitted: do not consider this status, as the name has already been submitted for verification through
  //            IDV but has not yet been verified
  // denied: do not consider this status because the name was already denied via the IDV process
  const applicableNames = names.filter(name => ['approved', 'pending'].includes(name.status));
  const applicableName = applicableNames.length > 0 ? applicableNames[0].verified_name : null;

  return applicableName;
}

export const languageTranslations = {
  'aa': 'Афарский',
  'ab': 'Абхазский',
  'af': 'Африкаанс',
  'ak': 'Акан',
  'sq': 'Албанский',
  'am': 'Амхарский',
  'ar': 'Арабский',
  'an': 'Арагонский',
  'hy': 'Армянский',
  'as': 'Ассамский',
  'av': 'Аварский',
  'ae': 'Авестийский',
  'ay': 'Аймара',
  'az': 'Азербайджанский',
  'ba': 'Башкирский',
  'bm': 'Бамбара',
  'eu': 'Баскский',
  'be': 'Белорусский',
  'bn': 'Бенгальский',
  'bh': 'Бихари',
  'bi': 'Бислама',
  'bs': 'Боснийский',
  'br': 'Бретонский',
  'bg': 'Болгарский',
  'my': 'Бирманский',
  'ca': 'Каталанский',
  'ch': 'Чаморро',
  'ce': 'Чеченский',
  'zh': 'Китайский',
  'zh_HANS': 'Упрощенный китайский',
  'zh_HANT': 'Традиционный китайский',
  'cu': 'Церковнославянский',
  'cv': 'Чувашский',
  'kw': 'Корнский',
  'co': 'Корсиканский',
  'cr': 'Кри',
  'cs': 'Чешский',
  'da': 'Датский',
  'dv': 'Дивехи',
  'nl': 'Нидерландский',
  'dz': 'Дзонг-кэ',
  'en': 'Английский',
  'eo': 'Эсперанто',
  'et': 'Эстонский',
  'ee': 'Эве',
  'fo': 'Фарерский',
  'fj': 'Фиджийский',
  'fi': 'Финский',
  'fr': 'Французский',
  'fy': 'Западнофризский',
  'ff': 'Фулах',
  'ka': 'Грузинский',
  'de': 'Немецкий',
  'gd': 'Гэльский',
  'ga': 'Ирландский',
  'gl': 'Галисийский',
  'gv': 'Мэнский',
  'el': 'Греческий',
  'gn': 'Гуарани',
  'gu': 'Гуджарати',
  'ht': 'Гаитянский',
  'ha': 'Хауса',
  'he': 'Иврит',
  'hz': 'Гереро',
  'hi': 'Хинди',
  'ho': 'Хиримоту',
  'hr': 'Хорватский',
  'hu': 'Венгерский',
  'ig': 'Игбо',
  'is': 'Исландский',
  'io': 'Идо',
  'ii': 'Носу',
  'iu': 'Инуктитут',
  'ie': 'Интерлингве',
  'ia': 'Интерлингва',
  'id': 'Индонезийский',
  'ik': 'Инупиак',
  'it': 'Итальянский',
  'jv': 'Яванский',
  'ja': 'Японский',
  'kl': 'Гренландский',
  'kn': 'Каннада',
  'ks': 'Кашмири',
  'kr': 'Канури',
  'kk': 'Казахский',
  'km': 'Кхмерский',
  'ki': 'Кикуйю',
  'rw': 'Киньяруанда',
  'ky': 'Киргизский',
  'kv': 'Коми',
  'kg': 'Конго',
  'ko': 'Корейский',
  'kj': 'Куаньяма',
  'ku': 'Курдский',
  'lo': 'Лаосский',
  'la': 'Латинский',
  'lv': 'Латышский',
  'li': 'Лимбургский',
  'ln': 'Лингала',
  'lt': 'Литовский',
  'lb': 'Люксембургский',
  'lu': 'Луба-катанга',
  'lg': 'Ганда',
  'mk': 'Македонский',
  'mh': 'Маршалльский',
  'ml': 'Малаялам',
  'mi': 'Маори',
  'mr': 'Маратхи',
  'ms': 'Малайский',
  'mg': 'Малагасийский',
  'mt': 'Мальтийский',
  'mn': 'Монгольский',
  'na': 'Науру',
  'nv': 'Навахо',
  'nr': 'Южный ндебеле',
  'nd': 'Северный ндебеле',
  'ng': 'Ндонга',
  'ne': 'Непальский',
  'nn': 'Норвежский нюнорск',
  'nb': 'Норвежский букмол',
  'no': 'Норвежский',
  'ny': 'Чичева',
  'oc': 'Окситанский',
  'oj': 'Оджибве',
  'or': 'Ория',
  'om': 'Оромо',
  'os': 'Осетинский',
  'pa': 'Панджаби',
  'fa': 'Персидский',
  'pi': 'Пали',
  'pl': 'Польский',
  'pt': 'Португальский',
  'ps': 'Пушту',
  'qu': 'Кечуа',
  'rm': 'Романшский',
  'ro': 'Румынский',
  'rn': 'Рунди',
  'ru': 'Русский',
  'sg': 'Санго',
  'sa': 'Санскрит',
  'si': 'Сингальский',
  'sk': 'Словацкий',
  'sl': 'Словенский',
  'se': 'Северносаамский',
  'sm': 'Самоанский',
  'sn': 'Шона',
  'sd': 'Синдхи',
  'so': 'Сомалийский',
  'st': 'Южный сото',
  'es': 'Испанский',
  'sc': 'Сардинский',
  'sr': 'Сербский',
  'ss': 'Свати',
  'su': 'Сунданский',
  'sw': 'Суахили',
  'sv': 'Шведский',
  'ty': 'Таитянский',
  'ta': 'Тамильский',
  'tt': 'Татарский',
  'te': 'Телугу',
  'tg': 'Таджикский',
  'tl': 'Тагальский',
  'th': 'Тайский',
  'bo': 'Тибетский',
  'ti': 'Тигринья',
  'to': 'Тонганский',
  'tn': 'Тсвана',
  'ts': 'Тсонга',
  'tk': 'Туркменский',
  'tr': 'Турецкий',
  'tw': 'Тви',
  'ug': 'Уйгурский',
  'uk': 'Украинский',
  'ur': 'Урду',
  'uz': 'Узбекский',
  've': 'Венда',
  'vi': 'Вьетнамский',
  'vo': 'Волапюк',
  'cy': 'Валлийский',
  'wa': 'Валлонский',
  'wo': 'Волоф',
  'xh': 'Коса',
  'yi': 'Идиш',
  'yo': 'Йоруба',
  'za': 'Чжуанский',
  'zu': 'Зулу'
};

export const getTranslatedLanguageName = (code, defaultName) => {
  return languageTranslations[code] || defaultName || code;
};

export const getTranslatedLanguageOptions = (languageOptions) => {
  return languageOptions.map(option => ({
    ...option,
    label: getTranslatedLanguageName(option.value, option.label)
  }));
};