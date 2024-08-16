import fs from 'fs-extra';
import * as xlsx from 'xlsx';
import { RESULT_DIR } from '../data/config';

export interface TokenBalance {
  token: string;
  address: string;
  balance: number;
}

// Функция для создания файла
export function touch(filePath: string) {
  fs.ensureFileSync(filePath);
}

export function createSpreadsheet(filePath: string, headers: string[], sheetName: string) {
  const ws = xlsx.utils.aoa_to_sheet([headers]);
  const wb = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(wb, ws, sheetName);
  xlsx.writeFile(wb, filePath);
}

export function updateEvmBalance(networkName: string, tokenBalances: TokenBalance[]): void {
  let workbook: xlsx.WorkBook;

  try {
      // Попытка открыть существующий файл
      workbook = xlsx.readFile(RESULT_DIR);
  } catch (error) {
      // Создание нового файла, если он не существует
      workbook = xlsx.utils.book_new();
  }

  let worksheet: xlsx.WorkSheet;
  if (workbook.Sheets[networkName]) {
      worksheet = workbook.Sheets[networkName];
  } else {
      worksheet = xlsx.utils.aoa_to_sheet([['Address']]);
      xlsx.utils.book_append_sheet(workbook, worksheet, networkName);
  }

  const sheetData = xlsx.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];
  const addresses = sheetData.slice(1).map(row => row[0]);

  tokenBalances.forEach(tokenBalance => {
      const tokenIndex = sheetData[0].indexOf(tokenBalance.token);

      if (tokenIndex === -1) {
          sheetData[0].push(tokenBalance.token);
          addresses.forEach((_, index) => {
              sheetData[index + 1].push('');
          });
      }
      const addressIndex = addresses.indexOf(tokenBalance.address);
      if (addressIndex === -1) {
          const newRow = new Array(sheetData[0].length).fill('');
          newRow[0] = tokenBalance.address;
          newRow[sheetData[0].indexOf(tokenBalance.token)] = tokenBalance.balance;
          sheetData.push(newRow);
      } else {
          // Обновление существующего адреса
          sheetData[addressIndex + 1][sheetData[0].indexOf(tokenBalance.token)] = tokenBalance.balance;
      }
  });

  const newWorksheet = xlsx.utils.aoa_to_sheet(sheetData);
  workbook.Sheets[networkName] = newWorksheet;


  // Запись изменений в файл
  xlsx.writeFile(workbook, RESULT_DIR);
}

export function removeEmptySheet() {
    const workbook = xlsx.readFile(RESULT_DIR);
    const sheetName = 'Sheet1'

    if (workbook.SheetNames.includes(sheetName)) {
        // Удаление листа
        delete workbook.Sheets[sheetName];
        const sheetIndex = workbook.SheetNames.indexOf(sheetName);
        if (sheetIndex > -1) {
            workbook.SheetNames.splice(sheetIndex, 1);
        }
        // Сохранение обновленного файла
        xlsx.writeFile(workbook, RESULT_DIR);
    } else {
        console.log(`Лист "${sheetName}" не найден.`);
    }
}

