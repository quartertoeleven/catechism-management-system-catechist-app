const dateLocales = {
  days: ['Chúa Nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ Năm', 'Thứ sáu', 'Thứ bảy'],
  daysShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
  months: [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
  ],
  monthsShort: [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
  ],
}

const semesterOptions = [
  {
    label: 'Học kì I',
    value: 'first',
  },
  {
    label: 'Học kì II',
    value: 'second',
  },
]

const scoreOptions = [
  10, 9.8, 9.5, 9.3, 9, 8.8, 8.5, 8.3, 8, 7.8, 7.5, 7.3, 7, 6.8, 6.5, 6.3, 6, 5.8, 5.5, 5.3, 5, 4.8,
  4.5, 4.3, 4, 3.8, 3.5, 3.3, 3, 2.8, 2.5, 2.3, 2, 1.8, 1.5, 1.3, 1, 0.8, 0.5, 0,
]

const genderOptions = [
  {
    label: 'Nam',
    value: 'male',
  },
  {
    label: 'Nữ',
    value: 'female',
  },
]

const contactTypeOptions = [
  {
    label: 'Điện thoại',
    value: 'phone',
    icon: 'mdi-phone',
  },
  {
    label: 'Zalo',
    value: 'zalo',
    icon: 'mdi-phone',
  },
  {
    label: 'Email',
    value: 'email',
    icon: 'mdi-email',
  },
  {
    label: 'Facebook',
    value: 'facebook',
    icon: 'mdi-facebook',
  },
  {
    label: 'Khác',
    value: 'other',
    icon: 'mdi-account-box-outline',
  },
]

const contactRelationTypeOptions = [
  {
    label: 'Bố',
    value: 'father',
  },
  {
    label: 'Mẹ',
    value: 'mother',
  },
  {
    label: 'Ông',
    value: 'grandfather',
  },
  {
    label: 'Bà',
    value: 'grandmother',
  },
  {
    label: 'Anh/em trai',
    value: 'brother',
  },
  {
    label: 'Chị/em gái',
    value: 'sister',
  },
  {
    label: 'Cô/dì',
    value: 'aunt',
  },
  {
    label: 'Chú/bác',
    value: 'uncle',
  },
  {
    label: 'Khác',
    value: 'other',
  },
]

export {
  dateLocales,
  scoreOptions,
  semesterOptions,
  genderOptions,
  contactTypeOptions,
  contactRelationTypeOptions,
}
