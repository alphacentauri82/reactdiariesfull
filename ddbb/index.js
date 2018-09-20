const Db = require('./lib/db')
const PreceptorDb = require('./lib/db/preceptor')
const ProfessorDb = require('./lib/db/professor')
const SchoolDb = require('./lib/db/school')
const TutorDb = require('./lib/db/tutor')
const UserDb = require('./lib/db/user')

module.exports = {
  Db,
  PreceptorDb,
  ProfessorDb,
  SchoolDb,
  TutorDb,
  UserDb
}
