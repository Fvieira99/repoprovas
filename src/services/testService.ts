import * as testRepository from "../repositories/testRepository.js";
import * as categoryRepository from "../repositories/categoryRepository.js";
import { notFoundError } from "../utils/errorUtil.js";

export interface InputTestData {
  name: string;
  pdfUrl: string;
  categoryId: number;
  teacherId: number;
  disciplineId: number;
}

export type Query = "disciplines" | "teachers";

export async function createTest(data: InputTestData) {
  const category = await categoryRepository.findOneCategory(data.categoryId);
  if (!category) {
    throw notFoundError("Category doesn't exist.");
  }
  const teacherDisciplineRelation =
    await testRepository.findTeacherAndDisciplineRelation(
      data.disciplineId,
      data.teacherId
    );
  console.log(teacherDisciplineRelation);
  if (!teacherDisciplineRelation) {
    throw notFoundError("Discipline and Teacher have no relation!");
  }

  await testRepository.insert({
    name: data.name,
    pdfUrl: data.pdfUrl,
    categoryId: data.categoryId,
    teacherDisciplineId: teacherDisciplineRelation.id
  });
}

export async function getTestsByQuery(query: Query) {
  if (query === "disciplines") {
    const tests = await testRepository.findByDiscipline();
    return { tests };
  }
  if (query === "teachers") {
    const tests = await testRepository.findByTeacher();
    return { tests };
  }
}
