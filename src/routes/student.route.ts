import { Router } from 'express';
import {
    createStudent,
    getStudent,
    updateStudent,
    deleteStudent,
    deleteStudents
} from '#controllers/student.controller';

export const StudentRouter = Router();

StudentRouter.get('/', getStudent);
StudentRouter.get('/:id', getStudent);
StudentRouter.post('/', createStudent);
StudentRouter.put('/:id', updateStudent);
StudentRouter.delete('/:id', deleteStudent);
StudentRouter.delete('/', deleteStudents);
