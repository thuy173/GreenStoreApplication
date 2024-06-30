import SvgColor from '../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Ứng dụng',
    icon: icon('ic_applicationUI'),
    iconRight: icon('ic_arrdown'),
    children: [
      {
        title: 'Giới thiệu',
        path: '/introduce',
        icon: icon('ic_introduce'),
      },
      {
        title: 'Biểu ngữ',
        path: '/banner',
        icon: icon('ic_slide'),
      },
      {
        title: 'Tin tức',
        path: '/news',
        icon: icon('ic_news'),
      },
      {
        title: 'Đối tác',
        path: '/partners',
        icon: icon('ic_partners'),
      },
    ],
  },
  {
    title: 'Khóa học',
    path: '/course',
    icon: icon('ic_course'),
  },
  {
    title: 'Khối lớp',
    path: '/grade',
    icon: icon('ic_grade'),
  },
  {
    title: 'Chương trình',
    path: '/curriculum',
    icon: icon('ic_curriculum'),
  },
  {
    title: 'Môn học',
    path: '/subject',
    icon: icon('ic_subject'),
  },
  {
    title: 'Chuyên đề câu hỏi',
    path: '/quizThematic',
    icon: icon('ic_quiz_thematic'),
  },
  {
    title: 'Kho câu hỏi',
    path: '/quiz',
    icon: icon('ic_quiz'),
  },

  {
    title: 'Kiểm tra',
    icon: icon('ic_test_doc'),
    iconRight: icon('ic_arrdown'),
    children: [
      {
        title: 'Online',
        path: '/testDocSystem',
        icon: icon('ic_test_doc_sys'),
      },
      {
        title: 'Tài liệu',
        path: '/testDocument',
        icon: icon('ic_test_doc_app'),
      },
    ],
  },
  {
    title: 'Phê duyệt Hỏi đáp',
    path: '/faq/faqUnApprove',
    icon: icon('ic_approve'),
  },
  {
    title: 'Trả lời hỏi đáp',
    path: '/faq/premium',
    icon: icon('ic_faq'),
  },
  {
    title: 'Gói phí',
    path: '/plan',
    icon: icon('ic_plan'),
  },
  {
    title: 'Thanh toán',
    path: '/payment',
    icon: icon('ic_payment'),
  },
  {
    title: 'Báo cáo câu hỏi',
    path: '/reportQuiz',
    icon: icon('ic_report_quiz'),
  },
  {
    title: 'Sách',
    path: '/book',
    icon: icon('ic_book'),
  },
  {
    title: 'Tỉnh thành',
    path: '/provinces',
    icon: icon('ic_province'),
  },
  {
    title: 'Trường học',
    path: '/school',
    icon: icon('ic_school'),
  },

  {
    title: 'Giáo viên',
    path: '/teacher',
    icon: icon('ic_user'),
  },

  {
    title: 'Học sinh',
    path: '/user',
    icon: icon('ic_student'),
  },
  {
    title: 'Các quyền giáo viên',
    path: '/role',
    icon: icon('ic_test_doc_sys'),
  },
];

export default navConfig;
