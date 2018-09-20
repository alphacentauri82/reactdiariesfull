'use strict'

const uuid = require('uuid-base62')

function randomDNI () {
  return Math.floor(Math.random() * 100000000)
}

const fixtures = {
  getImage () {
    return {
      url: `https//sarlanga/${uuid.v4()}.jpg`,
      userId: uuid.uuid()
    }
  },
  getImages (n) {
    const images = []
    while (n-- > 0) {
      images.push(this.getImage())
    }
    return images
  },
  getUser_old () {
    return {
      name: 'a randon name',
      username: `user_${uuid.v4()}`,
      password: uuid.uuid(),
      email: `${uuid.v4()}@gmail.com`,
      role: 'student'
    }
  },
  getUser () {
    return {
      dni: `${randomDNI()}`,
      name: 'a randon name',
      username: `user_${uuid.v4()}`,
      password: uuid.uuid(),
      email: `${uuid.v4()}@gmail.com`,
      role: 'student'
    }
  },
  getProfessor () {
    return {
      name: 'randon professor',
      dni: `${randomDNI()}`,
      user_id: `user_id${uuid.v4()}`,
      schools: [`school_id${uuid.v4()}`],
      assignments: [`assignment_id${uuid.v4()}`],
      registration_number: 1234567890
    }
  },
  getProfessors (n) {
    const professors = []
    while (n-- > 0) {
      professors.push(this.getProfessor())
    }
    return professors
  },
  getPreceptor () {
    return {
      name: 'randon preceptor',
      dni: `${randomDNI()}`,
      user_id: `user_id${uuid.v4()}`,
      schools: [`school_id${uuid.v4()}`],
      divisions: [`divisions_id${uuid.v4()}`],
      address: 'ramdom address school'
    }
  },
  getPreceptors (n) {
    const preceptors = []
    while (n-- > 0) {
      preceptors.push(this.getPreceptor())
    }
    return preceptors
  },
  getSchool () {
    return {
      name: 'randon school',
      address: 'ramdom address school',
      number: '1234567890'
    }
  },
  getSchools (n) {
    const schools = []
    while (n-- > 0) {
      schools.push(this.getSchool())
    }
    return schools
  },
  getTutor () {
    return {
      name: 'randon tutor',
      user_id: `user_id${uuid.v4()}`,
      students: [`student_id${uuid.v4()}`],
      dni: `${randomDNI()}`,
      address: 'random address',
      role_tutor: 'random tutor'
    }
  },
  getTutors (n) {
    const tutors = []
    while (n-- > 0) {
      tutors.push(this.getTutor())
    }
    return tutors
  }
}

module.exports = fixtures
