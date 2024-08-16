import fs from 'fs-extra';
import path from 'path';
import { RESULT_DIR, ROOT_DIR } from '../data/config';

export const FILES_DIR: string = path.join(ROOT_DIR, 'files');
export const ADDRESSES_TXT_FILE: string = path.join(FILES_DIR, 'addresses.txt'); // путь к файлу
export const PRIVATE_KEY_FILE: string = path.join(FILES_DIR, 'private_keys.txt'); // путь к файлу

export function createFiles() {
    // Создание директорий, если они не существуют
    fs.ensureDirSync(FILES_DIR);

    // Создание файлов только в случае их отсутствия
    createFileIfNotExists(ADDRESSES_TXT_FILE);
    createFileIfNotExists(PRIVATE_KEY_FILE);
    createFileIfNotExists(RESULT_DIR);
}

// Функция для создания файла, если файл не существует
function createFileIfNotExists(filePath: string) {
    // Проверяем, существует ли файл
    if (!fs.existsSync(filePath)) {
        // Создаем пустой файл
        fs.writeFileSync(filePath, '');
        console.log(`Файл ${path.basename(filePath)} создан в директории ${path.dirname(filePath)}`);
    }
}

// Пример использования функции
createFiles();