import * as categoryRepository from "../repositories/categoryRepository.js";

export async function getCategories() {
    return await categoryRepository.findAllCategories();
}
