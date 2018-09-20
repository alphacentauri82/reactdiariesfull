const api = {
  menu: {
    getAdminItems() {
      return [
        {
          path: '/admin',
          textId: 'menu.admin.home',
        },
      ];
    },
    getProfessorItems() {
      return [
        {
          path: '/professors',
          textId: 'menu.professor.home',
        },
        {
          path: '/professors/subject_matter',
          textId: 'menu.professor.subject_matter',
        },
        {
          path: '/professors/messages',
          textId: 'menu.professor.messages',
        },
      ];
    },
    getTutorItems() {
      return [
        {
          path: '/tutor',
          textId: 'menu.tutor.home',
        },
        {
          path: '/tutor/messages',
          textId: 'menu.tutor.messages',
        },
        {
          path: '/tutor/grades',
          textId: 'menu.tutor.grades',
        },
        {
          path: '/tutor/absences',
          textId: 'menu.tutor.absences',
        },
        {
          path: '/tutor/warnnings',
          textId: 'menu.tutor.warnnings',
        },
      ];
    },
  },
};

export default api;
