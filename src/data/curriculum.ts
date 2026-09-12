import { Module, Question, Lesson } from '../types';

export const MODULES: Module[] = [
  {
    id: 1,
    title: 'Natural Sonlar Asoslari',
    tagline: 'Natural son, raqam va son tushunchalari hamda ilk o‘qishlar',
    outcome: 'O‘quvchi natural son, raqam va son tushunchalarini mukammal farqlaydi va uch xonaligacha sonlarni mustaqil o‘qiydi.',
    badgeId: 'boshlovchi',
    lessons: [
      {
        id: 'lesson-1',
        moduleId: 1,
        number: 1,
        title: '0 dan boshlaymiz: Natural son nima?',
        tagline: 'Narsalarni sanashda ishlatiladigan sonlar va 0 ning o‘rni',
        durationMinutes: 7,
        content: {
          problem: 'Kunlik hayotda do‘konda, maktabda yoki uyda narsalarni sanashimizga to‘g‘ri keladi. Qanday sonlarni sanashda ishlatamiz? Nega 0 natural son hisoblanmaydi?',
          explanation: [
            'Narsalarni (kitoblar, qalamlar, odamlar) sanashda ishlatiladigan sonlar NATURAL SONLAR deyiladi.',
            'Natural sonlar qatori 1 dan boshlanadi: 1, 2, 3, 4, 5, ... va cheksiz davom etadi.',
            '0 (nol) natural son EMAS! Chunki biz sanashni noldan boshlamaymiz ("bitta kitob", "ikkita kitob" deymiz, "nolta kitob" deb sanamaymiz).',
            'Manfiy sonlar (-5) va kasr sonlar (2.5 yoki 1/2) ham natural son hisoblanmaydi.',
            'RAQAM — bu sonlarni yozish uchun ishlatiladigan belgi (harf kabi). Jami 10 ta raqam bor: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9.',
            'SON — bu raqamlar yordamida hosil qilinadigan miqdor (so‘z kabi).'
          ],
          examples: [
            { number: '1, 2, 15, 340', reading: 'Bular — natural sonlar', note: 'Chunki buyumlarni sanashda ishlatiladi' },
            { number: '0', reading: 'Natural son emas!', note: 'Hech narsa yo‘qligini bildiradi, sanashda aytilmaydi' },
            { number: '-7, 3.5, 1/4', reading: 'Natural sonlar emas!', note: 'Butun musbat sanash sonlari emas' }
          ],
          interactiveType: 'pick_natural',
          interactiveData: {
            instruction: 'Quyidagi kartochkalardan FAQAT NATURAL SONLARNI bosing:',
            items: [
              { val: '14', isNatural: true },
              { val: '0', isNatural: false, hint: '0 natural son emas, chunki sanashda "nolta" deb boshlanmaydi!' },
              { val: '89', isNatural: true },
              { val: '-5', isNatural: false, hint: 'Manfiy sonlar sanashda ishlatilmaydi!' },
              { val: '3.14', isNatural: false, hint: 'Kasr sonlar natural emas!' },
              { val: '1', isNatural: true, hint: '1 — eng kichik natural sondir!' },
              { val: '1 200', isNatural: true },
              { val: '0.5', isNatural: false, hint: 'O‘nli kasrlar natural son emas!' }
            ]
          },
          guidedPractice: {
            instruction: 'Quyidagi fikrlardan qaysi biri to‘g‘ri?',
            target: 'Natural sonlar haqida to‘g‘ri qoidani toping:',
            options: [
              '0 — eng kichik natural sondir.',
              '1 — eng kichik natural sondir va natural sonlar sanashda ishlatiladi.',
              'Manfiy sonlar ham natural hisoblanadi.',
              'Jami 10 ta natural son mavjud.'
            ],
            correctAnswer: '1 — eng kichik natural sondir va natural sonlar sanashda ishlatiladi.',
            hint: 'Eslang: sanashni qaysi sondan boshlaymiz? 1 dan!',
            explanation: 'Barakalla! Sanash 1 dan boshlanadi, shuning uchun eng kichik natural son 1 dir. 0 esa natural son emas.'
          },
          independentPractice: {
            instruction: 'Quyidagi ro‘yxatda nechta natural son bor: 0, 7, -3, 19, 4.2, 100 ?',
            target: '0, 7, -3, 19, 4.2, 100',
            options: ['2 ta', '3 ta (7, 19, 100)', '4 ta', '5 ta'],
            correctAnswer: '3 ta (7, 19, 100)',
            hint: '0, manfiy (-3) va kasr (4.2) sonlarni chiqarib tashlang.',
            explanation: 'To‘g‘ri! Faqat 7, 19 va 100 natural sonlardir. Jami 3 ta.'
          },
          miniTest: [
            {
              id: 'm1-l1-q1',
              question: 'Eng kichik natural son qaysi?',
              options: ['0', '1', '10', 'Cheksiz'],
              correctIndex: 1,
              hint: 'Sanashni nimadan boshlaysiz?',
              explanation: 'To‘g‘ri! Eng kichik natural son 1 hisoblanadi.'
            },
            {
              id: 'm1-l1-q2',
              question: 'Quyidagilardan qaysi biri raqam ham, natural son ham bo‘la oladi?',
              options: ['0', '7', '-2', '12'],
              correctIndex: 1,
              hint: '0 raqam lekin natural son emas. 12 son lekin bitta raqam emas.',
              explanation: '7 ham 0-9 orasidagi raqam, ham sanashdagi natural sondir.'
            },
            {
              id: 'm1-l1-q3',
              question: 'Nima uchun 0 natural son emas?',
              options: [
                'Chunki u juft son',
                'Chunki buyumlarni sanashda "nolta buyum" deb sanalmaydi',
                'Chunki u 10 dan kichik',
                'Chunki u harf emas'
              ],
              correctIndex: 1,
              hint: 'Natural sonlarning asosiy vazifasi buyumlarni sanashdir.',
              explanation: 'Aynan shunday! 0 mavjud bo‘lmaslikni ifodalaydi, sanashda esa 1 dan boshlanadi.'
            }
          ],
          summary: [
            'Natural sonlar — narsalarni sanashda ishlatiladigan sonlar (1, 2, 3, ...).',
            'Eng kichik natural son — 1. Eng katta natural son yo‘q, ular cheksizdir.',
            '0 natural son emas, lekin u juda muhim raqamdir.',
            'Raqamlar atigi 10 ta: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9.'
          ]
        }
      },
      {
        id: 'lesson-2',
        moduleId: 1,
        number: 2,
        title: '10 ta raqam — cheksiz sonlar',
        tagline: '0 dan 9 gacha bo‘lgan raqamlardan cheksiz sonlar yasash san’ati',
        durationMinutes: 8,
        content: {
          problem: 'Qanday qilib atigi 10 ta belgi (0, 1, 2, 3, 4, 5, 6, 7, 8, 9) orqali yerdagi barcha odamlar (8 milliard) yoki yulduzlarni ifodalash mumkin?',
          explanation: [
            'O‘zbek tilida 29 ta harf bilan millionlab so‘zlar yoziladi. Matematikada esa 10 ta raqam bilan CHEKSIZ KO‘P SONLAR yoziladi!',
            'Biz ishlatadigan tizim O‘NLI POSITSION TIZIM deb ataladi.',
            '"Positsion" degani — raqamning turgan O‘RNI uning qiymatini belgilaydi.',
            'Masalan, 3 raqami: 3 da uch birlikni, 35 da o‘ttizni, 300 da uch yuzni bildiradi!',
            'Berilgan raqamlardan eng katta son tuzish uchun: eng katta raqamni eng oldinga qo‘yamiz.',
            'Eng kichik son tuzish uchun: eng kichik noldan farqli raqamni oldinga qo‘yamiz (chunki son 0 bilan boshlanmaydi).'
          ],
          examples: [
            { number: '4, 8, 1', reading: 'Eng katta son: 841 | Eng kichik son: 148', note: 'Raqamlar o‘rni almashsa, sonning qiymati tubdan o‘zgaradi' },
            { number: '5, 0, 9', reading: 'Eng katta son: 950 | Eng kichik son: 509', note: 'Eng kichik sonda 0 oldinga qo‘yilmaydi (059 bo‘lmaydi)' }
          ],
          interactiveType: 'build_number',
          interactiveData: {
            digits: ['7', '2', '9', '4'],
            targetType: 'max',
            instruction: 'Berilgan raqamlardan ENG KATTA 4 xonali sonni tuzing:',
            expected: '9742'
          },
          guidedPractice: {
            instruction: '2, 0, 8 raqamlaridan foydalanib yozish mumkin bo‘lgan eng kichik 3 xonali son qaysi?',
            target: '2, 0, 8 raqamlaridan eng kichik 3 xonali son',
            options: ['028', '208', '280', '802'],
            correctAnswer: '208',
            hint: 'Son 0 bilan boshlana olmaydi! Shuning uchun 2 ni birinchi qo‘yamiz, keyin 0 ni.',
            explanation: 'Barakalla! Son 0 bilan boshlanmaydi, eng kichik noldan farqli raqam 2, so‘ngra 0 va 8: natija 208.'
          },
          independentPractice: {
            instruction: '5, 1, 9, 3 raqamlaridan tuzilgan eng katta son qaysi?',
            target: '5, 1, 9, 3',
            options: ['9531', '9351', '5931', '1359'],
            correctAnswer: '9531',
            hint: 'Raqamlarni kamayish tartibida joylashtiring: 9, keyin 5, keyin 3, keyin 1.',
            explanation: 'To‘g‘ri! 9531 — berilgan raqamlardan tuzish mumkin bo‘lgan eng katta sondir.'
          },
          miniTest: [
            {
              id: 'm1-l2-q1',
              question: 'Raqamlar jami nechta?',
              options: ['9 ta', '10 ta (0 dan 9 gacha)', 'Cheksiz', '100 ta'],
              correctIndex: 1,
              hint: '0 ni hisobga olishni unutmang.',
              explanation: 'Jami 10 ta raqam bor: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9.'
            },
            {
              id: 'm1-l2-q2',
              question: 'Quyidagilardan qaysi biri son 0 bilan boshlana olmasligini to‘g‘ri tushuntiradi?',
              options: [
                'Chunki 0 mavjud emas',
                'Chunki 05 raqami aslida 1 xonali 5 sonini bildiradi, boshidagi 0 ma’noga ega emas',
                'Chunki 0 har doim oxirida turishi shart',
                'Chunki 0 faqat juft sonlarda bo‘ladi'
              ],
              correctIndex: 1,
              hint: '05 deb yozsak, u necha xonali?',
              explanation: 'To‘g‘ri, 05 bu shunchaki 5 demakdir, shuning uchun natural son 0 bilan boshlanmaydi.'
            }
          ],
          summary: [
            'Raqamlar 10 ta, ular yordamida cheksiz ko‘p sonlar yoziladi.',
            'Raqamning qiymati uning sondagi egallagan o‘rniga (xonasiga) bog‘liq.',
            'Eng katta son tuzishda raqamlar kattasidan kichigiga qarab tiziladi.',
            'Eng kichik son tuzishda noldan boshqa eng kichik raqam birinchi qo‘yiladi.'
          ]
        }
      },
      {
        id: 'lesson-3',
        moduleId: 1,
        number: 3,
        title: 'Sonni ko‘rgan zahoti o‘qishni boshlaymiz',
        tagline: 'Bir, ikki va uch xonali sonlarni ravon va xatosiz o‘qish',
        durationMinutes: 8,
        content: {
          problem: 'Doskada "347" yozilgan. Uni "uch-to‘rt-yetti" deb o‘qiymizmi yoki maxsus qoidasi bormi? Uch xonagacha bo‘lgan sonlarni qanday to‘g‘ri talaffuz qilamiz?',
          explanation: [
            'Bir xonali sonlar (1 ta raqamdan iborat): 1 (bir), 2 (ikki), 3 (uch), 4 (to‘rt), 5 (besh), 6 (olti), 7 (yetti), 8 (sakkiz), 9 (to‘qqiz).',
            'O‘nliklar: 10 (o‘n), 20 (yigirma), 30 (o‘ttiz), 40 (qirq), 50 (ellik), 60 (oltmish), 70 (yetmish), 80 (sakson), 90 (to‘qson).',
            'Ikki xonali sonlar: Avval o‘nlik, keyin birlik o‘qiladi. Masalan: 25 = "yigirma besh", 87 = "sakson yetti".',
            'Yuzliklar: 100 (yuz yoki bir yuz), 200 (ikki yuz), 300 (uch yuz), ..., 900 (to‘qqiz yuz).',
            'Uch xonali sonlar: Avval yuzlik, so‘ng o‘nlik, so‘ng birlik o‘qiladi. Masalan: 347 = "uch yuz qirq yetti".'
          ],
          examples: [
            { number: '7', reading: 'yetti', note: 'Bir xonali son' },
            { number: '25', reading: 'yigirma besh', note: 'Ikki xonali: 20 + 5' },
            { number: '347', reading: 'uch yuz qirq yetti', note: 'Uch xonali: 300 + 40 + 7' },
            { number: '608', reading: 'olti yuz sakkiz', note: 'O‘nlik xonasi 0 bo‘lgani uchun aytilmaydi!' }
          ],
          interactiveType: 'select_reading',
          interactiveData: {
            number: '482',
            options: [
              'to‘rt yuz sakson ikki',
              'qirq sakkiz ikki',
              'to‘rt sakson ikki',
              'to‘rt yuz sakson'
            ],
            correct: 'to‘rt yuz sakson ikki'
          },
          guidedPractice: {
            instruction: '703 soni qanday to‘g‘ri o‘qiladi?',
            target: '703',
            options: [
              'yetti yuz uch',
              'yetmish uch',
              'yetti yuz nol uch',
              'yetti o‘n uch'
            ],
            correctAnswer: 'yetti yuz uch',
            hint: 'O‘rtadagi 0 raqami o‘nlik yo‘qligini bildiradi, u so‘z bilan aytilmaydi.',
            explanation: 'Barakalla! 703 — "yetti yuz uch" deb o‘qiladi. Nol xonasi talaffuz qilinmaydi.'
          },
          independentPractice: {
            instruction: '560 sonining to‘g‘ri o‘qilishini toping:',
            target: '560',
            options: [
              'besh yuz oltmish',
              'ellik olti yuz',
              'besh oltmish nol',
              'besh yuz olti'
            ],
            correctAnswer: 'besh yuz oltmish',
            hint: 'Birliklar xonasida 0 turibdi, demak faqat 500 va 60 o‘qiladi.',
            explanation: 'To‘g‘ri! 560 = "besh yuz oltmish".'
          },
          miniTest: [
            {
              id: 'm1-l3-q1',
              question: '915 soni qanday o‘qiladi?',
              options: ['to‘qqiz yuz o‘n besh', 'to‘qqiz bir besh', 'to‘qson bir besh', 'to‘qqiz yuz ellik bir'],
              correctIndex: 0,
              hint: '900 + 10 + 5',
              explanation: '915 = to‘qqiz yuz o‘n besh.'
            },
            {
              id: 'm1-l3-q2',
              question: 'Quyidagi qaysi sonda nol o‘qilmasdan tushirib qoldiriladi?',
              options: ['402 (to‘rt yuz ikki)', '10 (o‘n)', '100 (yuz)', 'Barchasida nollar alohida aytilmaydi'],
              correctIndex: 3,
              hint: 'O‘zbek tilida hech qachon "to‘rt yuz nol ikki" deyilmaydi.',
              explanation: 'To‘g‘ri! Nollar xonani ko‘rsatadi, lekin "nol" deb o‘qilmaydi.'
            }
          ],
          summary: [
            'Bir xonali sonlar — birliklar (1..9).',
            'Ikki xonali sonlar — o‘nlik + birlik (masalan, 45 = qirq besh).',
            'Uch xonali sonlar — yuzlik + o‘nlik + birlik (masalan, 347 = uch yuz qirq yetti).',
            'Xonada 0 bo‘lsa, u so‘zda aytilmaydi, lekin xonani to‘ldirib turadi.'
          ]
        }
      }
    ]
  },
  {
    id: 2,
    title: 'Sonning Xonalari va Tuzilishi',
    tagline: 'Xonalar, ularning qiymati va sonni uch xonali guruhlarga ajratish',
    outcome: 'O‘quvchi sonning xonalarini aniqlaydi, xona birliklari yig‘indisini tushunadi va katta sonlarni o‘ngdan chapga 3 xonadan bo‘lishni o‘rganadi.',
    badgeId: 'son_detektivi',
    lessons: [
      {
        id: 'lesson-4',
        moduleId: 2,
        number: 4,
        title: 'Birlik, o‘nlik, yuzlik — sonning skeleti',
        tagline: 'Har bir sonning ichki tuzilishi va xonalar jadvali',
        durationMinutes: 9,
        content: {
          problem: '583 soni berilgan. Undagi 5 nimani, 8 nimani va 3 nimani bildiradi? Nega ular bir xil qiymatga ega emas?',
          explanation: [
            'Har qanday son o‘ng tomondan boshlab xonalarga bo‘linadi:',
            '1-o‘rin (eng o‘ngda) — BIRLIKLAR xonasi (1 ta buyum)',
            '2-o‘rin — O‘NLIKLAR xonasi (10 talik guruh)',
            '3-o‘rin — YUZLIKLAR xonasi (100 talik guruh)',
            'Masalan, 583 sonida:',
            '• 5 — yuzliklar xonasida (qiymati: 500)',
            '• 8 — o‘nliklar xonasida (qiymati: 80)',
            '• 3 — birliklar xonasida (qiymati: 3)',
            '583 = 500 + 80 + 3. Bu xona qo‘shiluvchilari yig‘indisi deyiladi!'
          ],
          examples: [
            { number: '583', reading: '5 yuzlik + 8 o‘nlik + 3 birlik', breakdown: '500 + 80 + 3' },
            { number: '904', reading: '9 yuzlik + 0 o‘nlik + 4 birlik', breakdown: '900 + 0 + 4' }
          ],
          interactiveType: 'drag_drop_slots',
          interactiveData: {
            targetNumber: '746',
            slots: [
              { label: 'Yuzliklar', expectedDigit: '7', placeValue: '700' },
              { label: 'O‘nliklar', expectedDigit: '4', placeValue: '40' },
              { label: 'Birliklar', expectedDigit: '6', placeValue: '6' }
            ]
          },
          guidedPractice: {
            instruction: '429 sonida nechta o‘nlik bor?',
            target: '429 sonidagi o‘nliklar xonasi',
            options: ['4 ta', '2 ta (yigirma)', '9 ta', '42 ta'],
            correctAnswer: '2 ta (yigirma)',
            hint: 'O‘nliklar xonasi o‘ngdan ikkinchi o‘rinda turadi.',
            explanation: 'Barakalla! 429 sonida 4 yuzlik, 2 o‘nlik va 9 birlik bor.'
          },
          independentPractice: {
            instruction: '805 sonining xona qo‘shiluvchilari yig‘indisi qaysi?',
            target: '805',
            options: ['800 + 5', '80 + 5', '800 + 50', '8 + 0 + 5'],
            correctAnswer: '800 + 5',
            hint: 'O‘nliklar xonasi 0 bo‘lgani uchun u 0 ga teng, shuning uchun 800 + 5.',
            explanation: 'To‘g‘ri! 805 = 800 + 5.'
          },
          miniTest: [
            {
              id: 'm2-l4-q1',
              question: '631 sonida birliklar xonasidagi raqam qaysi?',
              options: ['6', '3', '1', '600'],
              correctIndex: 2,
              hint: 'Birliklar xonasi eng o‘ngda turadi.',
              explanation: 'Eng oxirgi (o‘ngdagi) raqam — 1, bu birliklar xonasidir.'
            },
            {
              id: 'm2-l4-q2',
              question: '3 yuzlik, 7 o‘nlik va 0 birlikdan qanday son hosil bo‘ladi?',
              options: ['370', '307', '730', '37'],
              correctIndex: 0,
              hint: '300 + 70 + 0',
              explanation: '300 + 70 = 370.'
            }
          ],
          summary: [
            'Xonalar har doim O‘NGDAN CHAPGA sanaladi: birlik, o‘nlik, yuzlik.',
            'Har bir xona oldingisidan 10 barobar katta.',
            'Sonni xona qo‘shiluvchilari yig‘indisi ko‘rinishida ifodalash mumkin.'
          ]
        }
      },
      {
        id: 'lesson-5',
        moduleId: 2,
        number: 5,
        title: 'Raqamning joyi uning qiymatini o‘zgartiradi',
        tagline: 'Bitta raqam turli xonalarda qanday qiymatlarni ifodalaydi?',
        durationMinutes: 8,
        content: {
          problem: '6 raqamini olaylik. U bir joyda 6 so‘m bo‘lsa, boshqa joyda 600 000 so‘m bo‘ladi! Bu qanday sodir bo‘ladi?',
          explanation: [
            'Raqam qanchalik chaproq xonaga o‘tsa, uning qiymati 10 marta, 100 marta, 1 000 marta oshaveradi!',
            'Qarang:',
            '• 6 — 6 birlik (qiymati: 6)',
            '• 60 — 6 o‘nlik (qiymati: 60)',
            '• 600 — 6 yuzlik (qiymati: 600)',
            '• 6 000 — 6 minglik (qiymati: 6 000)',
            '• 60 000 — 6 o‘n minglik (qiymati: 60 000)',
            '• 600 000 — 6 yuz minglik (qiymati: 600 000)',
            'Demak, raqamning o‘zi emas, uning JOYI (xonasi) eng muhim kuchdir!'
          ],
          examples: [
            { number: '6', reading: 'qiymati: 6', note: 'Birlik' },
            { number: '60', reading: 'qiymati: 60', note: 'O‘nlik (10 marta katta)' },
            { number: '600', reading: 'qiymati: 600', note: 'Yuzlik (100 marta katta)' },
            { number: '6 000', reading: 'qiymati: 6 000', note: 'Minglik (1 000 marta katta)' }
          ],
          interactiveType: 'value_detector',
          interactiveData: {
            number: '56 420',
            targetDigit: '6',
            options: ['6', '60', '600', '6 000', '60 000'],
            correct: '6 000'
          },
          guidedPractice: {
            instruction: '463 812 sonidagi 6 raqamining qiymati qanchaga teng?',
            target: '4[6]3 812',
            options: ['60', '600', '6 000', '60 000'],
            correctAnswer: '60 000',
            hint: '6 raqamidan keyin nechta xona (raqam) borligini sanang: 3, 8, 1, 2 — jami 4 ta raqam bor, demak 4 ta nol!',
            explanation: 'Barakalla! 6 dan keyin 4 ta xona bor, demak uning qiymati 60 000 (oltmish ming).'
          },
          independentPractice: {
            instruction: 'Qaysi sonda 7 raqamining qiymati 700 ga teng?',
            target: '700 qiymatiga ega sonni toping',
            options: ['7 250', '3 741', '72', '1 007'],
            correctAnswer: '3 741',
            hint: '7 raqami yuzliklar xonasida (o‘ngdan 3-o‘rinda) turgan sonni qidiring.',
            explanation: 'To‘g‘ri! 3 741 sonida 7 yuzliklar xonasida turibdi va uning qiymati 700 ga teng.'
          },
          miniTest: [
            {
              id: 'm2-l5-q1',
              question: '9 854 sonida 8 raqamining qiymati qancha?',
              options: ['8', '80', '800', '8 000'],
              correctIndex: 2,
              hint: '8 raqami qaysi xonada?',
              explanation: '8 raqami yuzliklar xonasida, demak uning qiymati 800.'
            }
          ],
          summary: [
            'Raqam qaysi xonada tursa, o‘sha xona birligiga ko‘paytirilgan qiymatga ega bo‘ladi.',
            'Oson qoida: raqamdan keyin nechta raqam tursa, shuncha nol qo‘shiladi.'
          ]
        }
      },
      {
        id: 'lesson-6',
        moduleId: 2,
        number: 6,
        title: 'Sonni o‘qishdan oldin uni bo‘lib ol!',
        tagline: 'Oltin qoida: Sonni o‘ngdan chapga qarab 3 xonadan guruhlash',
        durationMinutes: 9,
        content: {
          problem: 'Katta son yozilgan: 3456782500. Buni birdaniga o‘qish juda qiyin va ko‘zni charchatadi! Uni qanday qilib oson o‘qiladigan holatga keltirish mumkin?',
          explanation: [
            'KATONING ASOSIY QOIDASI: Har qanday ko‘p xonali son O‘NGDAN CHAPGA qarab UCH RAQAMDAN guruhlarga (sinflarga) ajratiladi!',
            'Har bir 3 talik guruh orasiga probel (bo‘sh joy) qo‘yiladi.',
            'Diqqat: Guruhlarni ajratish O‘NGDAN (oxiridan) boshlanadi!',
            'Eng chapdagi guruhda 3 ta, 2 ta yoki hatto 1 ta raqam qolishi mumkin.',
            'Misollar:',
            '• 1250 → 1 250 (o‘ngdan 3 ta: 250, qoldi: 1)',
            '• 25480 → 25 480 (o‘ngdan 3 ta: 480, qoldi: 25)',
            '• 345678 → 345 678',
            '• 2500700 → 2 500 700',
            '• 15678900 → 15 678 900'
          ],
          examples: [
            { number: '1250', reading: '1 250', note: '1 ming 250' },
            { number: '25480', reading: '25 480', note: '25 ming 480' },
            { number: '345678', reading: '345 678', note: '345 ming 678' },
            { number: '15678900', reading: '15 678 900', note: '15 million 678 ming 900' }
          ],
          interactiveType: 'group_triplets',
          interactiveData: {
            rawNumber: '2500700',
            correctGrouping: '2 500 700',
            hint: 'Oxiridan 3 ta: 700, keyin yana 3 ta: 500, oldinda: 2'
          },
          guidedPractice: {
            instruction: '489123 soni qanday to‘g‘ri uchliklarga ajratiladi?',
            target: '489123',
            options: ['489 123', '48 91 23', '4 891 23', '4891 23'],
            correctAnswer: '489 123',
            hint: 'O‘ngdan 3 ta sanang: 123. Oldinda 489 qoladi.',
            explanation: 'Barakalla! 489 123 ko‘rinishida ikkita to‘liq 3 xonali guruh hosil bo‘ladi.'
          },
          independentPractice: {
            instruction: '8045200 soni to‘g‘ri ajratilgan variantni toping:',
            target: '8045200',
            options: ['8 045 200', '80 45 200', '804 5200', '8045 200'],
            correctAnswer: '8 045 200',
            hint: 'O‘ngdan 3 ta: 200, keyin 3 ta: 045, eng chapda 8.',
            explanation: 'To‘g‘ri! 8 045 200 ko‘rinishida ajratiladi.'
          },
          miniTest: [
            {
              id: 'm2-l6-q1',
              question: 'Sonlarni uch xonadan guruhlash qaysi tomondan boshlanadi?',
              options: [
                'Chapdan o‘ngga qarab',
                'O‘ngdan chapga qarab',
                'O‘rtasidan boshlab',
                'Ixtiyoriy tomondan'
              ],
              correctIndex: 1,
              hint: 'Birliklar qaysi tomonda turadi?',
              explanation: 'Juda to‘g‘ri! Guruhlash har doim O‘NGDAN (birliklardan) chapga qarab 3 tadan amalga oshiriladi.'
            }
          ],
          summary: [
            'Sonni o‘qishdan oldin har doim o‘ngdan chapga 3 xonadan ajrating.',
            'Guruhlar orasidagi probel ko‘rishni va o‘qishni 10 barobar osonlashtiradi.',
            'Har bir 3 talik guruh o‘zining SINFIGA (minglar, millionlar...) ega.'
          ]
        }
      }
    ]
  },
  {
    id: 3,
    title: 'Katta Natural Sonlarni O‘qish',
    tagline: 'Mingliklar, millionlar, milliardlar va ko‘p nollik sonlar',
    outcome: 'O‘quvchi ming, million va milliard sinflaridagi sonlarni ravon o‘qiydi hamda nollarni to‘g‘ri talaffuz qilishni o‘rganadi.',
    badgeId: 'katta_sonlar_ustasi',
    lessons: [
      {
        id: 'lesson-7',
        moduleId: 3,
        number: 7,
        title: 'Mingliklar: katta sonlarni o‘qishning kaliti',
        tagline: '2-sinf — Minglar sinfi bilan tanishamiz',
        durationMinutes: 9,
        content: {
          problem: 'Do‘konda narx 125 000 so‘m yoki avtomobil 12 340 dollar deb yozilgan. Minglik sonlarni qanday oson o‘qiymiz?',
          explanation: [
            'O‘ngdan hisoblaganda 2-uchlik guruh MINGLAR SINFI deyiladi.',
            'Qoida juda oddiy:',
            '1. Minglar sinfidagi sonni xuddi oddiy sondek o‘qiysiz (masalan: 125).',
            '2. So‘ngra "MING" so‘zini qo‘shasiz.',
            '3. Keyin birliklar sinfidagi qolgan sonni o‘qiysiz.',
            'Misollar:',
            '• 1 245 → bir ming ikki yuz qirq besh',
            '• 7 500 → yetti ming besh yuz',
            '• 12 340 → o‘n ikki ming uch yuz qirq',
            '• 105 600 → bir yuz besh ming olti yuz',
            '• 999 999 → to‘qqiz yuz to‘qson to‘qqiz ming to‘qqiz yuz to‘qson to‘qqiz'
          ],
          examples: [
            { number: '1 245', reading: 'bir ming ikki yuz qirq besh' },
            { number: '12 340', reading: 'o‘n ikki ming uch yuz qirq' },
            { number: '105 600', reading: 'bir yuz besh ming olti yuz' },
            { number: '999 999', reading: 'to‘qqiz yuz to‘qson to‘qqiz ming to‘qqiz yuz to‘qson to‘qqiz' }
          ],
          interactiveType: 'select_reading',
          interactiveData: {
            number: '48 025',
            options: [
              'qirq sakkiz ming yigirma besh',
              'to‘rt yuz sakson ming yigirma besh',
              'qirq sakkiz yuz yigirma besh',
              'qirq sakkiz ming ikki yuz besh'
            ],
            correct: 'qirq sakkiz ming yigirma besh'
          },
          guidedPractice: {
            instruction: '304 500 soni qanday to‘g‘ri o‘qiladi?',
            target: '304 500',
            options: [
              'uch yuz to‘rt ming besh yuz',
              'o‘ttiz to‘rt ming besh yuz',
              'uch yuz qirq ming besh yuz',
              'uch yuz to‘rt besh yuz'
            ],
            correctAnswer: 'uch yuz to‘rt ming besh yuz',
            hint: 'Minglar sinfida 304 turibdi, demak "uch yuz to‘rt ming", keyin 500.',
            explanation: 'Barakalla! 304 500 = uch yuz to‘rt ming besh yuz.'
          },
          independentPractice: {
            instruction: '"Sakson besh ming yetti" qaysi son?',
            target: 'Sakson besh ming yetti',
            options: ['85 007', '85 700', '85 070', '857 000'],
            correctAnswer: '85 007',
            hint: '85 ming, undan keyin esa faqat 7 (yuzlik va o‘nlik nol: 007).',
            explanation: 'To‘g‘ri! 85 007 soni "sakson besh ming yetti" deb o‘qiladi.'
          },
          miniTest: [
            {
              id: 'm3-l7-q1',
              question: '15 000 sonida nechta minglik bor?',
              options: ['15 ta', '150 ta', '1 ta', '5 ta'],
              correctIndex: 0,
              hint: 'Minglar sinfidagi sonni ayting.',
              explanation: '15 000 da 15 ta minglik bor.'
            }
          ],
          summary: [
            '2-uchlik guruh — Minglar sinfidir.',
            'Avval guruhdagi son oddiy o‘qiladi, ketidan "ming" so‘zi qo‘shiladi.',
            'Oxirgi 3 ta raqam (birliklar sinfi) odatdagidek o‘qiladi.'
          ]
        }
      },
      {
        id: 'lesson-8',
        moduleId: 3,
        number: 8,
        title: 'Millionlar: endi sonlar kattalashadi',
        tagline: '3-sinf — Millionlar sinfi va 7-9 xonali ulkan sonlar',
        durationMinutes: 10,
        content: {
          problem: 'Mamlakatimiz aholisi 37 000 000 dan oshdi. Millionli sonlarni qanday o‘qiymiz?',
          explanation: [
            'O‘ngdan hisoblaganda 3-uchlik guruh MILLIONLAR SINFI deyiladi.',
            'Endi bizda 3 ta sinf bor:',
            '| Millionlar sinfi | Minglar sinfi | Birliklar sinfi |',
            'O‘qish tartibi:',
            '1. Millionlar sinfidagi sonni o‘qing + "MILLION" deng.',
            '2. Minglar sinfidagi sonni o‘qing + "MING" deng.',
            '3. Birliklar sinfidagi sonni o‘qing.',
            'Misollar:',
            '• 1 000 000 → bir million',
            '• 2 500 000 → ikki million besh yuz ming',
            '• 12 300 000 → o‘n ikki million uch yuz ming',
            '• 105 450 000 → bir yuz besh million to‘rt yuz ellik ming',
            '• 999 999 999 → to‘qqiz yuz to‘qson to‘qqiz million to‘qqiz yuz to‘qson to‘qqiz ming to‘qqiz yuz to‘qson to‘qqiz'
          ],
          examples: [
            { number: '1 000 000', reading: 'bir million' },
            { number: '2 500 000', reading: 'ikki million besh yuz ming' },
            { number: '12 300 000', reading: 'o‘n ikki million uch yuz ming' },
            { number: '105 450 000', reading: 'bir yuz besh million to‘rt yuz ellik ming' }
          ],
          interactiveType: 'select_reading',
          interactiveData: {
            number: '4 015 600',
            options: [
              'to‘rt million o‘n besh ming olti yuz',
              'qirq million o‘n besh ming olti yuz',
              'to‘rt million bir yuz ellik ming olti yuz',
              'to‘rt yuz o‘n besh ming olti yuz'
            ],
            correct: 'to‘rt million o‘n besh ming olti yuz'
          },
          guidedPractice: {
            instruction: '37 200 000 soni qanday o‘qiladi?',
            target: '37 200 000',
            options: [
              'o‘ttiz yetti million ikki yuz ming',
              'uch yuz yetmish ikki million',
              'o‘ttiz yetti ming ikki yuz',
              'uch million yetti yuz yigirma ming'
            ],
            correctAnswer: 'o‘ttiz yetti million ikki yuz ming',
            hint: 'Millionlar sinfida 37, minglar sinfida 200 turibdi.',
            explanation: 'Barakalla! 37 200 000 = o‘ttiz yetti million ikki yuz ming.'
          },
          independentPractice: {
            instruction: '100 050 000 sonining o‘qilishini toping:',
            target: '100 050 000',
            options: [
              'bir yuz million ellik ming',
              'o‘n million besh yuz ming',
              'bir million ellik ming',
              'bir yuz ellik million'
            ],
            correctAnswer: 'bir yuz million ellik ming',
            hint: 'Millionlar: 100, Minglar: 050 (ellik), Birliklar: 000.',
            explanation: 'To‘g‘ri! Bir yuz million ellik ming.'
          },
          miniTest: [
            {
              id: 'm3-l8-q1',
              question: 'Bitta millionda nechta nol bor?',
              options: ['5 ta', '6 ta', '7 ta', '9 ta'],
              correctIndex: 1,
              hint: '1 000 000 soniga qarang.',
              explanation: '1 000 000 sonida to‘g‘ri 6 ta nol bor!'
            }
          ],
          summary: [
            '3-uchlik guruh — Millionlar sinfi.',
            'Millionli sonlar 7, 8 yoki 9 xonadan iborat bo‘ladi.',
            'Sinflarni chapdan boshlab ketma-ket o‘qiymiz.'
          ]
        }
      },
      {
        id: 'lesson-9',
        moduleId: 3,
        number: 9,
        title: 'Milliardgacha bir qadam',
        tagline: '4-sinf — Milliardlar sinfi va 10-12 xonali astronomik sonlar',
        durationMinutes: 10,
        content: {
          problem: 'Yer yuzida 8 milliarddan ortiq odam yashaydi. 10 xonali yoki 12 xonali sonlarni qanday o‘qish mumkin?',
          explanation: [
            'O‘ngdan hisoblaganda 4-uchlik guruh MILLIARDLAR SINFI deyiladi.',
            'Sinflar zanjiri:',
            '| 4-sinf: MILLIARDLAR | 3-sinf: MILLIONLAR | 2-sinf: MINGLAR | 1-sinf: BIRLIKLAR |',
            'Qoida xuddi avvalgidek!',
            'Har bir sinfdagi 3 talik sonni o‘qiymiz va sinf nomini aytamiz:',
            'Misollar:',
            '• 1 000 000 000 → bir milliard (9 ta nol)',
            '• 2 345 000 000 → ikki milliard uch yuz qirq besh million',
            '• 12 500 300 000 → o‘n ikki milliard besh yuz million uch yuz ming',
            '• 105 020 400 700 → bir yuz besh milliard yigirma million to‘rt yuz ming yetti yuz'
          ],
          examples: [
            { number: '1 000 000 000', reading: 'bir milliard' },
            { number: '2 345 000 000', reading: 'ikki milliard uch yuz qirq besh million' },
            { number: '12 500 300 000', reading: 'o‘n ikki milliard besh yuz million uch yuz ming' },
            { number: '105 020 400 700', reading: 'bir yuz besh milliard yigirma million to‘rt yuz ming yetti yuz' }
          ],
          interactiveType: 'step_by_step_reader',
          interactiveData: {
            number: '12 500 300 000'
          },
          guidedPractice: {
            instruction: '8 000 000 000 soni qanday o‘qiladi?',
            target: '8 000 000 000',
            options: ['sakkiz milliard', 'sakson million', 'sakkiz million', 'sakkiz trillion'],
            correctAnswer: 'sakkiz milliard',
            hint: '9 ta nol bor, bu milliardlar sinfidir.',
            explanation: 'Barakalla! 8 000 000 000 = sakkiz milliard.'
          },
          independentPractice: {
            instruction: '5 020 000 000 sonining to‘g‘ri o‘qilishi:',
            target: '5 020 000 000',
            options: [
              'besh milliard yigirma million',
              'ellik milliard ikki yuz million',
              'besh million yigirma ming',
              'besh milliard ikki yuz ming'
            ],
            correctAnswer: 'besh milliard yigirma million',
            hint: 'Milliard: 5, Million: 020 (yigirma), Ming va Birlik: 000.',
            explanation: 'To‘g‘ri! Besh milliard yigirma million.'
          },
          miniTest: [
            {
              id: 'm3-l9-q1',
              question: '1 milliardda nechta nol bor?',
              options: ['6 ta', '8 ta', '9 ta', '12 ta'],
              correctIndex: 2,
              hint: '1 000 000 000 sonidagi nollarni sanang.',
              explanation: '1 milliardda roppa-rosa 9 ta nol bor.'
            }
          ],
          summary: [
            '4-sinf — Milliardlar sinfidir (10, 11, 12 xonali sonlar).',
            'Sinflar: Birliklar → Minglar → Millionlar → Milliardlar.',
            'Qancha katta bo‘lmasin, har bir guruh 3 xonali qilib o‘qiladi.'
          ]
        }
      },
      {
        id: 'lesson-10',
        moduleId: 3,
        number: 10,
        title: 'Nol ko‘p bo‘lsa, adashma!',
        tagline: 'Orada va oxirida ko‘p nollari bor sonlarni to‘g‘ri o‘qish siri',
        durationMinutes: 9,
        content: {
          problem: '50 060 700 sonini ko‘rganda ko‘pchilik adashib ketadi. Nollarni qanday boshqaramiz? Nega "nol" so‘zi talaffuz qilinmaydi?',
          explanation: [
            'NEGA NOLLAR O‘QILMAYDI?',
            'O‘zbek tilida agar butun bir sinf yoki xona 0 lardan iborat bo‘lsa, u sinf nomi ham, "nol" so‘zi ham aytilmaydi!',
            'Lekin nollar juda muhim: ular boshqa raqamlarni o‘z xonasida ushlab turadi!',
            'Misollarni solishtiring:',
            '• 5 006 → besh ming olti (o‘rtadagi 00 o‘qilmaydi)',
            '• 50 060 → ellik ming oltmish',
            '• 500 600 → besh yuz ming olti yuz',
            '• 5 006 000 → besh million olti ming',
            '• 50 060 700 → ellik million oltmish ming yetti yuz',
            'AGAR BUTUN SINF NOL BO‘LSA:',
            'Masalan: 7 000 045 sonida minglar sinfi (000) butunlay nol. Shuning uchun "ming" so‘zi aytilmaydi: "yetti million qirq besh" deb o‘qiladi!'
          ],
          examples: [
            { number: '5 006', reading: 'besh ming olti' },
            { number: '50 060', reading: 'ellik ming oltmish' },
            { number: '5 006 000', reading: 'besh million olti ming' },
            { number: '50 060 700', reading: 'ellik million oltmish ming yetti yuz' }
          ],
          interactiveType: 'zero_rules',
          interactiveData: {
            number: '7 000 025',
            options: [
              'yetti million yigirma besh',
              'yetti million nol ming yigirma besh',
              'yetti ming yigirma besh',
              'yetmish million yigirma besh'
            ],
            correct: 'yetti million yigirma besh'
          },
          guidedPractice: {
            instruction: '40 008 soni qanday to‘g‘ri o‘qiladi?',
            target: '40 008',
            options: [
              'qirq ming sakkiz',
              'to‘rt yuz ming sakkiz',
              'qirq ming nol sakkiz',
              'to‘rt ming sakkiz'
            ],
            correctAnswer: 'qirq ming sakkiz',
            hint: 'Minglar: 40, Birliklar: 008 (faqat 8).',
            explanation: 'Barakalla! 40 008 = qirq ming sakkiz.'
          },
          independentPractice: {
            instruction: '9 000 000 005 sonining o‘qilishini toping:',
            target: '9 000 000 005',
            options: [
              'to‘qqiz milliard besh',
              'to‘qqiz million besh',
              'to‘qqiz yuz milliard besh',
              'to‘qqiz milliard nol besh'
            ],
            correctAnswer: 'to‘qqiz milliard besh',
            hint: 'Millionlar va minglar sinfi butunlay nol bo‘lgani uchun tushirib qoldiriladi.',
            explanation: 'To‘g‘ri! To‘qqiz milliard besh.'
          },
          miniTest: [
            {
              id: 'm3-l10-q1',
              question: 'Agar sonning minglar sinfi "000" bo‘lsa, nima qilinadi?',
              options: [
                '"nol ming" deb aytiladi',
                'Minglar sinfi butunlay aytilmasdan, keyingi sinfga o‘tiladi',
                'Sonni o‘qib bo‘lmaydi',
                'Faqat "ming" so‘zi aytiladi'
              ],
              correctIndex: 1,
              hint: '7 000 012 ni eslang.',
              explanation: 'Butunlay nol bo‘lgan sinflar nomi aytilmaydi.'
            }
          ],
          summary: [
            'Nol turgan xonalar alohida aytilmaydi.',
            'Butunlay nol bo‘lgan sinflar (masalan 000) o‘qish paytida tushirib qoldiriladi.',
            'Nollar yozuvda o‘z o‘rnida turishi shart, aks holda sonning qiymati buziladi.'
          ]
        }
      }
    ]
  },
  {
    id: 4,
    title: 'Amaliy Qo‘llash va Mustahkamlash',
    tagline: '3 qadam algoritmi, raqamdan so‘zga, real hayotiy sonlar va yakuniy test',
    outcome: 'O‘quvchi istalgan ko‘p xonali natural sonni 3 qadamda xatosiz o‘qiydi va yozadi.',
    badgeId: 'matematik_diktor',
    lessons: [
      {
        id: 'lesson-11',
        moduleId: 4,
        number: 11,
        title: '3 qadamda istalgan katta sonni o‘qi!',
        tagline: 'Universal algoritm: O‘ngdan 3 talik ajrat → Sinfni o‘qi → Birlashtir',
        durationMinutes: 10,
        content: {
          problem: 'Sizga 156 789 204 315 kabi bahaybat son berildi. Uni qanday qilib 5 soniya ichida qo‘rqmasdan, aniq va ravon o‘qish mumkin?',
          explanation: [
            'HAR QANDAY SONNI O‘QISHNING 3 QADAMLI OLTIN ALGORITMI:',
            '1-QADAM: Sonni o‘ngdan chapga qarab UCHTADAN AJRAT (probellar qo‘y):',
            '156 789 204 315',
            '2-QADAM: Har bir guruh ustiga sinf nomini qo‘y:',
            '[156 milliard] [789 million] [204 ming] [315]',
            '3-QADAM: Sinflarni chapdan o‘ngga qarab ketma-ket BIRLASHTIRIB O‘QI:',
            '«Bir yuz ellik olti milliard yetti yuz sakson to‘qqiz million ikki yuz to‘rt ming uch yuz o‘n besh».',
            'Mana shu 3 qadam bilan siz koinotdagi istalgan sonni xatosiz o‘qiy olasiz!'
          ],
          examples: [
            {
              number: '25 300 612',
              reading: 'yigirma besh million uch yuz ming olti yuz o‘n ikki',
              breakdown: '1-qadam: 25 300 612 | 2-qadam: [25 mln] [300 ming] [612] | 3-qadam: birlashtirish'
            }
          ],
          interactiveType: 'three_step_algorithm',
          interactiveData: {
            sampleNumber: '84 502 310'
          },
          guidedPractice: {
            instruction: '42 005 600 sonini 3 qadam algoritmi orqali o‘qilganda qaysi javob chiqadi?',
            target: '42 005 600',
            options: [
              'qirq ikki million besh ming olti yuz',
              'to‘rt yuz yigirma million besh yuz',
              'qirq ikki ming besh yuz oltmish',
              'qirq ikki million ellik ming olti yuz'
            ],
            correctAnswer: 'qirq ikki million besh ming olti yuz',
            hint: 'Million: 42, Ming: 005 (besh), Birlik: 600.',
            explanation: 'Barakalla! 42 005 600 = qirq ikki million besh ming olti yuz.'
          },
          independentPractice: {
            instruction: '600 004 020 sonining to‘g‘ri o‘qilishini toping:',
            target: '600 004 020',
            options: [
              'olti yuz million to‘rt ming yigirma',
              'oltmish million to‘rt yuz yigirma',
              'olti yuz ming to‘rt yuz yigirma',
              'olti yuz million qirq ming ikki'
            ],
            correctAnswer: 'olti yuz million to‘rt ming yigirma',
            hint: 'Million: 600, Ming: 004, Birlik: 020.',
            explanation: 'To‘g‘ri! Olti yuz million to‘rt ming yigirma.'
          },
          miniTest: [
            {
              id: 'm4-l11-q1',
              question: '3 qadam algoritmining 1-qadami nima?',
              options: [
                'Sonni o‘ngdan chapga 3 xonadan guruhlash',
                'Darhol ovoz chiqarib o‘qish',
                'Nollarni o‘chirib tashlash',
                'Raqamlarni qo‘shib chiqish'
              ],
              correctIndex: 0,
              hint: 'Oltin qoidani eslang.',
              explanation: '1-qadam — har doim sonni o‘ngdan chapga 3 xonadan ajratishdir.'
            }
          ],
          summary: [
            '1-qadam: O‘ngdan chapga 3 xonadan ajrat.',
            '2-qadam: Har bir sinfni mustaqil o‘qi.',
            '3-qadam: Sinflarni chapdan o‘ngga birlashtir.'
          ]
        }
      },
      {
        id: 'lesson-12',
        moduleId: 4,
        number: 12,
        title: 'Raqamdan so‘zga, so‘zdan raqamga',
        tagline: 'Ikki tomonlama mustahkamlash trenajyori',
        durationMinutes: 10,
        content: {
          problem: 'Sizga matn berildi: "Yigirma besh million uch yuz ming olti yuz o‘n ikki". Buni bank kvitansiyasiga raqam bilan qanday yozasiz? Xatoga yo‘l qo‘ymaslik siri nimada?',
          explanation: [
            'SO‘ZDAN RAQAMGA O‘TISH SIRI:',
            '1. So‘zdagi sinf nomlarini qidiring: "million", "ming".',
            '2. "Million" dan oldingi sonni yozing: "yigirma besh" → 25.',
            '3. "Ming" dan oldingi sonni yozing: "uch yuz" → 300.',
            '4. Qolgan oxirgi sonni yozing: "olti yuz o‘n ikki" → 612.',
            '5. Birlashtiring: 25 300 612!',
            'OGOH BO‘LING: Har bir sinf (eng chapdagisidan tashqari) aniq 3 TA RAQAMDAN iborat bo‘lishi shart!',
            'Masalan, "ikki million besh ming yetti":',
            '• Million: 2',
            '• Ming: 5 emas, 005 bo‘ladi!',
            '• Birlik: 7 emas, 007 bo‘ladi!',
            '• Natija: 2 005 007 (agar 257 deb yozsangiz, qo‘pol xato bo‘ladi).'
          ],
          examples: [
            { number: '25 300 612', reading: 'Yigirma besh million uch yuz ming olti yuz o‘n ikki' },
            { number: '2 005 007', reading: 'Ikki million besh ming yetti (005 va 007 ga e’tibor bering!)' }
          ],
          interactiveType: 'word_to_num_converter',
          interactiveData: {
            text: 'O‘ttiz million to‘rt yuz ming ellik',
            options: ['30 400 050', '30 40 50', '300 400 050', '30 040 500'],
            correct: '30 400 050'
          },
          guidedPractice: {
            instruction: '«Besh million sakson ming to‘rt» soni raqamlar bilan qanday yoziladi?',
            target: 'Besh million sakson ming to‘rt',
            options: ['5 080 004', '5 800 004', '5 80 4', '50 080 004'],
            correctAnswer: '5 080 004',
            hint: 'Million: 5. Minglar: sakson (080). Birliklar: to‘rt (004).',
            explanation: 'Barakalla! 5 080 004 to‘g‘ri javob.'
          },
          independentPractice: {
            instruction: '«Yetti milliard ikki yuz» qaysi son?',
            target: 'Yetti milliard ikki yuz',
            options: ['7 000 000 200', '7 200 000 000', '7 000 200', '7 000 000 020'],
            correctAnswer: '7 000 000 200',
            hint: 'Milliard: 7. Million va Ming sinflari yo‘q (000 000). Birliklar: 200.',
            explanation: 'To‘g‘ri! 7 000 000 200.'
          },
          miniTest: [
            {
              id: 'm4-l12-q1',
              question: 'Nega «uch million besh» soni 35 deb yozilmaydi?',
              options: [
                'Chunki 35 bu o‘ttiz besh, million bo‘lishi uchun xonalar to‘ldirilishi kerak (3 000 005)',
                'Chunki 35 kichik son',
                'Chunki probel qo‘yilmagan',
                'Barcha javoblar to‘g‘ri'
              ],
              correctIndex: 0,
              hint: 'Xonalarni to‘ldiruvchi nollarni eslang.',
              explanation: 'Uch million besh = 3 000 005.'
            }
          ],
          summary: [
            'So‘zdan raqamga o‘tishda sinf so‘zlariga e’tibor bering.',
            'Har bir oraliq sinfda aniq 3 ta raqam bo‘lishi kerak (yetishmagan xonalarga nollar qo‘yiladi).'
          ]
        }
      },
      {
        id: 'lesson-13',
        moduleId: 4,
        number: 13,
        title: 'Hayotdagi katta sonlarni o‘qi',
        tagline: 'Aholi soni, masofalar, bank kartalari, astronomiya va budjet',
        durationMinutes: 9,
        content: {
          problem: 'Biz nega katta sonlarni o‘rganamiz? Ular faqat kitobda emas, real hayotimizda har kuni uchraydi!',
          explanation: [
            'REAL HAYOTIY MISOLLAR:',
            '1. AHOLI SONI:',
            'O‘zbekiston aholisi: 37 200 000 kishi (o‘ttiz yetti million ikki yuz ming kishi).',
            'Butun dunyo aholisi: 8 100 000 000 kishi (sakkiz milliard bir yuz million kishi).',
            '2. ASTRONOMIYA VA MASOFA:',
            'Quyoshdan Yergacha masofa: 149 600 000 km (bir yuz qirq to‘qqiz million olti yuz ming kilometr).',
            'Oy bilan Yer orasidagi masofa: 384 400 km (uch yuz sakson to‘rt ming to‘rt yuz kilometr).',
            '3. IQTISODIYOT VA PUL:',
            'Katta xarid yoki korxona oylik aylanmasi: 450 000 000 so‘m (to‘rt yuz ellik million so‘m).',
            '4. TEXNOLOGIYA:',
            '1 Gigabayt xotira: 1 073 741 824 bayt!'
          ],
          examples: [
            { number: '37 200 000', reading: 'o‘ttiz yetti million ikki yuz ming', note: 'O‘zbekiston aholisi' },
            { number: '149 600 000', reading: 'bir yuz qirq to‘qqiz million olti yuz ming', note: 'Quyoshgacha masofa (km)' },
            { number: '8 100 000 000', reading: 'sakkiz milliard bir yuz million', note: 'Dunyo aholisi' }
          ],
          interactiveType: 'real_life_explorer',
          interactiveData: {
            items: [
              { context: 'O‘zbekiston davlat budjeti loyihasi (so‘m)', val: '315 000 000 000', reading: 'uch yuz o‘n besh milliard' },
              { context: 'Toshkent metropoliteni yillik yo‘lovchilari', val: '245 000 000', reading: 'ikki yuz qirq besh million' },
              { context: 'Avtomobil spidometri ko‘rsatkichi (km)', val: '185 420', reading: 'bir yuz sakson besh ming to‘rt yuz yigirma' }
            ]
          },
          guidedPractice: {
            instruction: 'Oy bilan Yer orasidagi 384 400 km masofa qanday o‘qiladi?',
            target: '384 400 km',
            options: [
              'uch yuz sakson to‘rt ming to‘rt yuz',
              'uch million sakson to‘rt ming',
              'o‘ttiz sakkiz ming to‘rt yuz',
              'uch yuz sakson to‘rt million'
            ],
            correctAnswer: 'uch yuz sakson to‘rt ming to‘rt yuz',
            hint: 'Minglar sinfi: 384, Birliklar sinfi: 400.',
            explanation: 'Barakalla! 384 400 = uch yuz sakson to‘rt ming to‘rt yuz.'
          },
          independentPractice: {
            instruction: 'Tadbirkor bankdan 150 000 000 so‘m kredit oldi. Bu son qanday o‘qiladi?',
            target: '150 000 000',
            options: [
              'bir yuz ellik million',
              'o‘n besh million',
              'bir yuz ellik ming',
              'bir milliard ellik million'
            ],
            correctAnswer: 'bir yuz ellik million',
            hint: '6 ta nol bor, oldida 150 turibdi.',
            explanation: 'To‘g‘ri! Bir yuz ellik million so‘m.'
          },
          miniTest: [
            {
              id: 'm4-l13-q1',
              question: 'Agar hisob raqamingizda 12 050 000 so‘m bo‘lsa, u qanday o‘qiladi?',
              options: [
                'o‘n ikki million ellik ming',
                'bir yuz yigirma million ellik ming',
                'o‘n ikki ming ellik',
                'o‘n ikki million besh yuz ming'
              ],
              correctIndex: 0,
              hint: 'Million: 12, Ming: 050 (ellik).',
              explanation: '12 050 000 = o‘n ikki million ellik ming.'
            }
          ],
          summary: [
            'Katta sonlar koinot, geografiya, bank va statistikada har qadamda mavjud.',
            'Ularni to‘g‘ri o‘qish — moliyaviy va intellektual savodxonlik belgisidir.'
          ]
        }
      },
      {
        id: 'lesson-14',
        moduleId: 4,
        number: 14,
        title: 'FINAL TEST — Bilimingizni sinovdan o‘tkazing!',
        tagline: '20 ta savoldan iborat yakuniy sertifikat testi (O‘tish: 18/20)',
        durationMinutes: 15,
        content: {
          problem: 'Siz butun kursni bosib o‘tdingiz! Endi haqiqiy "Matematik Diktor" unvoniga loyiq ekanligingizni isbotlash vaqti keldi.',
          explanation: [
            'FINAL TEST SHARTLARI:',
            '• Jami 20 ta savol',
            '• 5 ta — Xonalarni aniqlash',
            '• 5 ta — Sonlarni to‘g‘ri o‘qish',
            '• 5 ta — So‘zdan raqamga aylantirish',
            '• 5 ta — O‘qilishdagi xatolarni topish',
            '• O‘tish chegarasi: 18 / 20 ball (90% va undan yuqori)',
            '• Xato qilsangiz, tizim darhol to‘g‘ri javobni aytmaydi — sizga «Maslahat olish» imkoniyati beriladi!'
          ],
          examples: [],
          interactiveType: 'select_reading',
          guidedPractice: {
            instruction: 'Tayyormisiz?',
            target: 'Boshlash tugmasini bosing!',
            options: ['Ha, tayyorman!'],
            correctAnswer: 'Ha, tayyorman!',
            hint: 'Diqqat bilan har bir savolni o‘qing.',
            explanation: 'Omad tilaymiz!'
          },
          independentPractice: {
            instruction: 'Diqqatingizni jamlang!',
            target: 'Test boshlanmoqda',
            options: ['Davom etish'],
            correctAnswer: 'Davom etish',
            hint: 'Shoshilmang.',
            explanation: 'Boshladik!'
          },
          miniTest: [],
          summary: [
            'Final testni 18+ ball bilan topshiring va oliy «Matematik Diktor» kubogini qo‘lga kiriting!'
          ]
        }
      }
    ]
  }
];

export const ALL_LESSONS: Lesson[] = MODULES.flatMap(m => m.lessons);

export const FINAL_TEST_QUESTIONS: Question[] = [
  // 1-5: Xonalarni aniqlash
  {
    id: 'ft-1',
    category: 'xonalar',
    question: '758 412 sonida 5 raqami qaysi xonada turibdi?',
    options: ['O‘n minglar xonasi', 'Minglar xonasi', 'Yuz minglar xonasi', 'O‘nliklar xonasi'],
    correctIndex: 0,
    hint: 'O‘ngdan sanang: 2 (birlik), 1 (o‘nlik), 4 (yuzlik), 8 (minglik), 5 (o‘n minglik).',
    explanation: '5 raqami o‘ngdan 5-o‘rinda, ya’ni o‘n minglar xonasida turibdi.'
  },
  {
    id: 'ft-2',
    category: 'xonalar',
    question: '3 045 200 sonida millionlar xonasidagi raqam qaysi?',
    options: ['3', '0', '4', '5'],
    correctIndex: 0,
    hint: 'Millionlar sinfidagi birinchi xonaga qarang.',
    explanation: 'Millionlar xonasida 3 raqami turibdi (3 million).'
  },
  {
    id: 'ft-3',
    category: 'xonalar',
    question: '68 492 sonida 8 raqamining haqiqiy qiymati qancha?',
    options: ['8', '80', '800', '8 000'],
    correctIndex: 3,
    hint: '8 dan keyin 3 ta raqam bor: 4, 9, 2.',
    explanation: '8 raqami minglar xonasida joylashgan, uning qiymati 8 000.'
  },
  {
    id: 'ft-4',
    category: 'xonalar',
    question: 'Qaysi sonda 7 raqami yuzliklar xonasida turibdi?',
    options: ['4 725', '7 425', '4 275', '4 257'],
    correctIndex: 0,
    hint: 'Yuzliklar xonasi o‘ngdan 3-o‘rinda bo‘ladi.',
    explanation: '4 725 sonida 7 o‘ngdan 3-o‘rinda (yuzliklar xonasida) turibdi.'
  },
  {
    id: 'ft-5',
    category: 'xonalar',
    question: 'Sonlarni xonalarga va sinflarga ajratish qaysi tomondan boshlanadi?',
    options: ['O‘ngdan chapga', 'Chapdan o‘ngga', 'Ixtiyoriy', 'Kattasidan kichigiga'],
    correctIndex: 0,
    hint: 'Birliklar xonasi qayerda joylashgan?',
    explanation: 'Barcha guruhlash va xonalar sanog‘i o‘ngdan chapga qarab amalga oshiriladi.'
  },

  // 6-10: Sonlarni o‘qish
  {
    id: 'ft-6',
    category: 'oqish',
    question: '12 045 soni qanday to‘g‘ri o‘qiladi?',
    options: [
      'o‘n ikki ming qirq besh',
      'bir yuz yigirma ming qirq besh',
      'o‘n ikki ming to‘rt yuz besh',
      'bir million ikki ming qirq besh'
    ],
    correctIndex: 0,
    hint: 'Minglar: 12, Birliklar: 045 (qirq besh).',
    explanation: '12 045 = o‘n ikki ming qirq besh.'
  },
  {
    id: 'ft-7',
    category: 'oqish',
    question: '5 006 200 soni qanday o‘qiladi?',
    options: [
      'besh million olti ming ikki yuz',
      'ellik million olti yuz ming ikki yuz',
      'besh yuz olti ming ikki yuz',
      'besh million oltmish ming ikki yuz'
    ],
    correctIndex: 0,
    hint: 'Million: 5, Ming: 006 (olti), Birlik: 200.',
    explanation: '5 006 200 = besh million olti ming ikki yuz.'
  },
  {
    id: 'ft-8',
    category: 'oqish',
    question: '105 000 000 soni qanday o‘qiladi?',
    options: [
      'bir yuz besh million',
      'o‘n besh million',
      'bir yuz ellik million',
      'bir milliard ellik million'
    ],
    correctIndex: 0,
    hint: 'Millionlar sinfida 105 soni turibdi.',
    explanation: '105 000 000 = bir yuz besh million.'
  },
  {
    id: 'ft-9',
    category: 'oqish',
    question: '2 300 040 005 soni qanday to‘g‘ri o‘qiladi?',
    options: [
      'ikki milliard uch yuz million qirq ming besh',
      'yigirma uch milliard qirq ming besh',
      'ikki million uch yuz ming qirq besh',
      'ikki milliard o‘ttiz million qirq ming besh'
    ],
    correctIndex: 0,
    hint: 'Milliard: 2, Million: 300, Ming: 040 (qirq), Birlik: 005 (besh).',
    explanation: '2 300 040 005 = ikki milliard uch yuz million qirq ming besh.'
  },
  {
    id: 'ft-10',
    category: 'oqish',
    question: '50 060 soni qanday o‘qiladi?',
    options: [
      'ellik ming oltmish',
      'besh yuz oltmish',
      'ellik olti ming',
      'besh ming oltmish'
    ],
    correctIndex: 0,
    hint: 'Minglar: 50, Birliklar: 060.',
    explanation: '50 060 = ellik ming oltmish.'
  },

  // 11-15: So‘zdan raqamga
  {
    id: 'ft-11',
    category: 'sozdan_raqamga',
    question: '«Yetti million yigirma ming besh» soni qaysi?',
    options: ['7 020 005', '7 200 005', '7 002 005', '72 000 005'],
    correctIndex: 0,
    hint: 'Million: 7, Ming: 020, Birlik: 005.',
    explanation: '7 020 005 to‘g‘ri yozilishidir.'
  },
  {
    id: 'ft-12',
    category: 'sozdan_raqamga',
    question: '«O‘n besh milliard uch yuz ming» soni qaysi?',
    options: ['15 000 300 000', '15 300 000 000', '15 000 000 300', '15 300 000'],
    correctIndex: 0,
    hint: 'Milliard: 15, Million sinfi yo‘q (000), Ming: 300, Birlik: 000.',
    explanation: '15 000 300 000 sonida millionlar sinfi nollardan iborat.'
  },
  {
    id: 'ft-13',
    category: 'sozdan_raqamga',
    question: '«Sakson to‘rt ming olti yuz o‘n ikki» sonining raqamdagi ko‘rinishi:',
    options: ['84 612', '804 612', '840 612', '8 461 200'],
    correctIndex: 0,
    hint: 'Ming: 84, Birlik: 612.',
    explanation: '84 612.'
  },
  {
    id: 'ft-14',
    category: 'sozdan_raqamga',
    question: '«Besh million to‘rt» soni qanday yoziladi?',
    options: ['5 000 004', '5 400 000', '5 004', '54'],
    correctIndex: 0,
    hint: 'Milliondan keyin 6 ta xona bo‘lishi kerak (minglar 000, birliklar 004).',
    explanation: '5 000 004 to‘g‘ri javob.'
  },
  {
    id: 'ft-15',
    category: 'sozdan_raqamga',
    question: '«Bir yuz yigirma million besh yuz ming» soni qaysi?',
    options: ['120 500 000', '125 000 000', '12 500 000', '1 200 500 000'],
    correctIndex: 0,
    hint: 'Million: 120, Ming: 500, Birlik: 000.',
    explanation: '120 500 000.'
  },

  // 16-20: Xatoni topish
  {
    id: 'ft-16',
    category: 'xato_topish',
    question: '4 005 sonini o‘qishda qaysi xatoga yo‘l qo‘yilgan: «To‘rt ming nol nol besh»?',
    options: [
      'Nollar o‘zbek tilida so‘z bilan aytilmaydi, to‘g‘risi: «to‘rt ming besh»',
      'Son aslida qirq besh',
      'Ming so‘zini aytish shart emas',
      'Hech qanday xato yo‘q'
    ],
    correctIndex: 0,
    hint: 'Nollarning talaffuzi haqidagi qoidani eslang.',
    explanation: 'Nollar hech qachon "nol nol" deb o‘qilmaydi. To‘g‘risi: «to‘rt ming besh».'
  },
  {
    id: 'ft-17',
    category: 'xato_topish',
    question: '2 500 000 sonini «yigirma besh million» deb o‘qigan o‘quvchi nima xatoga yo‘l qo‘ydi?',
    options: [
      'Sonni o‘ngdan 3 tadan ajratmagan va sinflar o‘rnini adashtirgan (to‘g‘risi: 2 million 500 ming)',
      'U to‘g‘ri o‘qigan',
      '«Ming» so‘zini qo‘shib yuborgan',
      'Nollarni sanay olmagan'
    ],
    correctIndex: 0,
    hint: '2 500 000 da millionlar sinfida faqat 2 turibdi.',
    explanation: 'Millionlar sinfida 2, minglar sinfida 500 turibdi. Demak: «ikki million besh yuz ming».'
  },
  {
    id: 'ft-18',
    category: 'xato_topish',
    question: '«Uch million oltmish» sonini 3 000 60 deb yozishdagi xato nimada?',
    options: [
      'Birliklar sinfida 3 ta raqam bo‘lishi kerak edi (060), bu yerda esa 2 ta raqam (60) yozilgan',
      'Uch raqami noto‘g‘ri qo‘yilgan',
      'Son oldiga 0 qo‘yilmagan',
      'Bunday xato mavjud emas'
    ],
    correctIndex: 0,
    hint: 'Birliklar sinfidagi xonalar sonini sanang.',
    explanation: 'Har bir oraliq sinf 3 xonali bo‘lishi shart! To‘g‘risi: 3 000 060.'
  },
  {
    id: 'ft-19',
    category: 'xato_topish',
    question: '«059» yozuvidagi xatolik nimada?',
    options: [
      'Natural son 0 raqami bilan boshlanmaydi',
      'Bu son toq son',
      '9 raqami oldinda turishi kerak edi',
      '0 raqam emas'
    ],
    correctIndex: 0,
    hint: 'Sonlarning yozilish qoidasini eslang.',
    explanation: 'Natural sonlar 0 bilan boshlanmaydi. Boshidagi 0 hech qanday qiymatga ega emas.'
  },
  {
    id: 'ft-20',
    category: 'xato_topish',
    question: 'Quyidagi o‘qilishlarning qaysi birida xato mavjud?',
    options: [
      '1 000 005 → «bir million besh ming»',
      '25 000 → «yigirma besh ming»',
      '400 000 → «to‘rt yuz ming»',
      '7 000 000 000 → «yetti milliard»'
    ],
    correctIndex: 0,
    hint: '1 000 005 da 5 qaysi sinfda turibdi?',
    explanation: '1 000 005 da 5 minglar sinfida emas, birliklar sinfida turibdi! To‘g‘risi: «bir million besh».'
  }
];

export const SPEED_CHALLENGE_BANK = [
  {
    number: '45 200',
    options: ['qirq besh ming ikki yuz', 'to‘rt yuz ellik ming ikki yuz', 'qirq besh ming yigirma', 'to‘rt ming besh yuz'],
    correctIndex: 0
  },
  {
    number: '3 000 050',
    options: ['uch million ellik', 'o‘ttiz million besh yuz', 'uch yuz ming ellik', 'uch million besh yuz'],
    correctIndex: 0
  },
  {
    number: '125 400',
    options: ['bir yuz yigirma besh ming to‘rt yuz', 'o‘n ikki ming besh yuz qirq', 'bir million yigirma besh ming', 'bir yuz yigirma ming to‘rt yuz'],
    correctIndex: 0
  },
  {
    number: '8 000 000 000',
    options: ['sakkiz milliard', 'sakson million', 'sakkiz million', 'sakkiz yuz ming'],
    correctIndex: 0
  },
  {
    number: '506 020',
    options: ['besh yuz olti ming yigirma', 'ellik olti ming ikki yuz', 'besh million olti ming', 'besh yuz oltmish ming yigirma'],
    correctIndex: 0
  },
  {
    number: '1 200 340',
    options: ['bir million ikki yuz ming uch yuz qirq', 'o‘n ikki million o‘ttiz to‘rt', 'bir yuz yigirma ming uch yuz qirq', 'bir million yigirma ming uch yuz'],
    correctIndex: 0
  },
  {
    number: '70 008',
    options: ['yetmish ming sakkiz', 'yetti yuz ming sakkiz', 'yetmish sakkiz ming', 'yetti ming sakkiz'],
    correctIndex: 0
  },
  {
    number: '14 000 000',
    options: ['o‘n to‘rt million', 'bir yuz qirq million', 'o‘n to‘rt ming', 'bir million to‘rt yuz ming'],
    correctIndex: 0
  }
];

export const INITIAL_BADGES = [
  {
    id: 'boshlovchi',
    name: 'Boshlovchi',
    level: '🥉 1-Daraja',
    icon: 'Sparkles',
    description: '1-modulni muvaffaqiyatli tamomlagan o‘quvchiga',
    unlocked: false
  },
  {
    id: 'son_detektivi',
    name: 'Son Detektivi',
    level: '🥈 2-Daraja',
    icon: 'Search',
    description: 'Xonalar va 3 talik guruhlash sirini to‘liq o‘zlashtirgan o‘quvchiga',
    unlocked: false
  },
  {
    id: 'katta_sonlar_ustasi',
    name: 'Katta Sonlar Ustasi',
    level: '🥇 3-Daraja',
    icon: 'Award',
    description: 'Minglik, millionlik va milliardlik sonlarni xatosiz o‘qiy oluvchi o‘quvchiga',
    unlocked: false
  },
  {
    id: 'matematik_diktor',
    name: 'Matematik Diktor',
    level: '🏆 Oliy Unvon',
    icon: 'Crown',
    description: 'Final test yoki Bitiruv loyihasini a’lo darajada yakunlagan diktorga',
    unlocked: false
  }
];
