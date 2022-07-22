import { Test } from "@prisma/client";
import prisma from "../config/database.js";

export type CreateTestData = Omit<Test, "id">;

export async function insert(data: CreateTestData) {
  await prisma.test.create({ data });
}

export async function findTeacherAndDisciplineRelation(
  disciplineId: number,
  teacherId: number
) {
  return await prisma.teachersDisciplines.findFirst({
    where: {
      disciplineId,
      teacherId
    }
  });
}

export async function findByDiscipline() {
  return await prisma.term.findMany({
    include: {
      disciplines: {
        include: {
          teacherDisciplines: {
            include: {
              teacher: true,
              tests: {
                include: {
                  category: true
                }
              }
            }
          }
        }
      }
    }
  });
}

export async function findByTeacher() {
  return await prisma.teachersDisciplines.findMany({
    include: {
      teacher: true,
      discipline: true,
      tests: {
        include: {
          category: true
        }
      }
    }
  });
}
