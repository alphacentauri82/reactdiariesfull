const pupils = [
  {
    id: '0001',
    avatar_url: 'https://s-media-cache-ak0.pinimg.com/originals/cd/17/d9/cd17d958daa0ef6e0c6c7909945198ac.jpg',
    first_name: 'Pipito',
    last_name: 'Garcia',
    school: 'EET 3',
  },
  {
    id: '0002',
    avatar_url: 'https://s-media-cache-ak0.pinimg.com/236x/41/0e/b6/410eb600425e94da63664563fc3f8714.jpg',
    first_name: 'Jaimito',
    last_name: 'Rodiguez',
    school: 'EMET 505',
  },
  {
    id: '0003',
    avatar_url: 'https://s-media-cache-ak0.pinimg.com/originals/21/7c/c7/217cc7bfb3f862ed77bff037e8c72b89.jpg',
    first_name: 'Peter',
    last_name: 'Pam',
    school: 'Poli',
  },
  {
    id: '0004',
    avatar_url: 'https://s-media-cache-ak0.pinimg.com/originals/1e/e4/df/1ee4dfd458a5d45920cc636ff1b54b1f.jpg',
    first_name: 'Campanita',
    last_name: 'Pam',
    school: 'Poli',
  },
];

let pupilSelected = pupils[0];

const api = {
  feed: {
    getEvents() {
      return [
        {
          professor: {
            avatar_url: 'http://icons.iconarchive.com/icons/seanau/user/256/Professor-icon.png',
            first_name: 'Juan',
            last_name: 'Anthony',
            date: 'May 27, 2016',
            subject_matter: 'Matematica',
          },
          pupil: {
            avatar_url: 'https://s-media-cache-ak0.pinimg.com/originals/cd/17/d9/cd17d958daa0ef6e0c6c7909945198ac.jpg',
            first_name: 'Jaimetico',
            last_name: 'Garcia',
            school: 'EET Nro 3',
          },
          img_event_url: 'http://www.material-ui.com/images/nature-600-337.jpg',
          subject: 'Examen 2017',
          message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi. Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque. Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.',
        },
        {
          professor: {
            avatar_url: 'http://icons.iconarchive.com/icons/seanau/user/256/Spy-icon.png',
            first_name: 'Juan',
            last_name: 'Anthony',
            date: 'May 27, 2016',
            subject_matter: 'Matematica',
          },
          pupil: {
            avatar_url: 'https://s-media-cache-ak0.pinimg.com/originals/cd/17/d9/cd17d958daa0ef6e0c6c7909945198ac.jpg',
            first_name: 'Jaimetico',
            last_name: 'Garcia',
            school: 'EET Nro 3',
          },
          img_event_url: 'https://rachthewritersite.files.wordpress.com/2017/02/travel.jpg?w=600&h=337&crop=1',
          subject: 'Examen 2017',
          message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi. Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque. Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.',
        },
        {
          professor: {
            avatar_url: 'http://icons.iconarchive.com/icons/seanau/user/256/Merchant-icon.png',
            first_name: 'Juan',
            last_name: 'Anthony',
            date: 'May 27, 2016',
            subject_matter: 'Matematica',
          },
          pupil: {
            avatar_url: 'https://s-media-cache-ak0.pinimg.com/originals/cd/17/d9/cd17d958daa0ef6e0c6c7909945198ac.jpg',
            first_name: 'Jaimetico',
            last_name: 'Garcia',
            school: 'EET Nro 3',
          },
          img_event_url: 'https://i1.wp.com/artefeed.com/wp-content/uploads/2015/03/me_too__by_pascalcampion600_337.jpg',
          subject: 'Examen 2017',
          message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi. Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque. Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.',
        },
        {
          professor: {
            avatar_url: 'http://icons.iconarchive.com/icons/seanau/user/256/Editor-Teacher-icon.png',
            first_name: 'Juan',
            last_name: 'Anthony',
            date: 'May 27, 2016',
            subject_matter: 'Matematica',
          },
          pupil: {
            avatar_url: 'https://s-media-cache-ak0.pinimg.com/originals/cd/17/d9/cd17d958daa0ef6e0c6c7909945198ac.jpg',
            first_name: 'Jaimetico',
            last_name: 'Garcia',
            school: 'EET Nro 3',
          },
          img_event_url: 'http://lafayettepubliclibrary.org/wp-content/uploads/2009/09/stl-auditorium.jpg',
          subject: 'Examen 2017',
          message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi. Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque. Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.',
        },
      ];
    },
  },
  pupil: {
    getList() {
      return pupils;
    },
    selected() {
      return pupilSelected;
    },
    set(pupilId) {
      pupilSelected = pupils[pupilId];
      return pupilSelected;
    },
  },
};

export default api;
