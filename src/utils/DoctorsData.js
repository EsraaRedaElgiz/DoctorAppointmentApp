import Images from '../constants/Images';
const DoctorsData = [
  {
    name: 'احمد غنيم',
    image: Images.doctor10,
    specialtiy: ' الأسنان',
    rating: [1, 1, 1, 1, 1],
    price: 300,
    about:" ومدير قسم الأبحاث العلمية والتعليم (منذ عام 1992). عُين أستاذًا في المعهد القومي للقلب والرئة في عام 1986، واهتم بتطوير تقنيات جراحات نقل القلب منذ عام 1967. في عام 1980 قام بعملية نقل قلب للمريض دريك موريس، والذي أصبح أطول مريض نقل قلب أوروبي على قيد الحياة حتى موته في يوليو 2005. من بين المشاهير الذين أجرى لهم عمليات كان الكوميدي البريطاني إريك موركامب، ",
    Review: [
      {
        name: 'Ayman Gaballah',
        img: Images.userImage,
        rating: [1, 1, 1, 1],
        comment:
          '  اعطته وسام الواجب الاول ووسام الجمهورية فى يوم الطبيب سنة 1988. وواخد قلادة النيل العظمى سنة 2011  المصرية.',
      },
      {
        name: 'Ahmed Mohamed',
        img: Images.userImage,
        rating: [1, 1, 1],
        comment:
          'كريمة من الملكة اليزابيث التانيه ملكة بريطانيا فمنحته الملكة لقب فارس فى سنة 1966 ويطلق عليه فى الاعلام البريطاني لقب ملك القلوب واخد شهادات الدكتوراه الفخرية من جامعات العالم كمان مصر اعطته النيل العظمى سنة 2011 - اعلى الأوسمة المصرية.',
      },
      {
        name: 'Mohsen Yasser',
        img: Images.userImage,
        rating: [ 1, 1],
        comment:"طول ما في حب، في أمل! تبرعك في عيد الحب السنة دي هيدي أمل لقلوب كتير ويعالج قلوب أكتر"
      },
      {
        name: 'Ahmed Mohamed',
        img: Images.userImage,
        rating: [1, 1, 1],
        comment:
          'كريمة من الملكة اليزابيث التانيه ملكة بريطانيا فمنحته الملكة لقب فارس فى سنة 1966 ويطلق عليه فى الاعلام البريطاني لقب ملك القلوب واخد شهادات الدكتوراه الفخرية من جامعات العالم كمان مصر اعطته النيل العظمى سنة 2011 - اعلى الأوسمة المصرية.',
      },
    ],
  },
  {
    name: 'محمد حماد',
    image: Images.doctor2,
    specialtiy: ' الباطنه ',
    rating: [1, 1, 1],
    price: 200,
    
  },
  {
    name: 'مجدى حسام ',
    image: Images.doctor3,
    specialtiy: ' الجلديه ',
    rating: [1, 1, 1, 1],
    price: 250,
  },
  {
    name: ' محمد عبد الهادى',
    image: Images.doctor4,
    specialtiy: ' الأطفال ',
    rating: [1, 1, 1, 1, 1],
    price: 300,
  },
  {
    name: 'كامل على',
    image: Images.doctor2,
    specialtiy: ' الأمراض العصبيه ',
    rating: [1, 1],
    price: 500,
  },
  {
    name: 'احمد عبد الرحمن',
    image: Images.doctor3,
    specialtiy: ' العيون',
    rating: [1, 1, 1, 1],
    price: 300,
  },
  {
    name: ' حسام ياسر',
    image: Images.doctor5,
    specialtiy: ' أنف وأذن وحنجره ',
    rating: [1, 1, 1],
    price: 350,
  },
  {
    name: 'مجدى حسام ',
    image: Images.doctor3,
    specialtiy: ' الجلديه ',
    rating: [1, 1],
    price: 150,
  },
  {
    name: ' محمد عبد القادر',
    image: Images.doctor4,
    specialtiy: ' الأطفال ',
    rating: [1, 1, 1, 1, 1],
    price: 300,
  },
  {
    name: 'محمد مجدى',
    image: Images.doctor2,
    specialtiy: ' الأمراض العصبيه ',
    rating: [1, 1, 1, 1],
    price: 340,
  },
  {
    name: 'احمد سمير',
    image: Images.doctor3,
    specialtiy: ' العيون ',
    rating: [1, 1, 1],
    price: 190,
  },
  {
    name: ' منصور يحى',
    image: Images.doctor5,
    specialtiy: ' أنف وأذن وحنجره ',
    rating: [1, 1, 1, 1, 1],
    price: 200,
  },
];
export {DoctorsData};
