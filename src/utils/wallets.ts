import fs from 'fs';
import path from 'path';
import { ADRDESSES_TXT_DIR, PRIVATE_KEY_DIR } from '../data/config';
import { ethers } from 'ethers';

// export async function getAddressesFromFile(): Promise<string[]> {
//     try {
//         // Читаем файл и получаем данные в виде строки
//         const data = fs.readFileSync(ADRDESSES_TXT_DIR, 'utf8');

//         // Разделяем строку по строкам и фильтруем пустые строки
//         const addresses = data.split('\n').map(line => line.trim()).filter(line => line !== '');

//         return addresses;
//     } catch (error) {
//         console.error('Ошибка при чтении файла:', error);
//         return [];
//     }
// }

export async function getAddressesFromFile(): Promise<string[]> {
    try {
        // Читаем файл с адресами и получаем данные в виде строки
        const data = fs.readFileSync(ADRDESSES_TXT_DIR, 'utf8');

        // Разделяем строку по строкам и фильтруем пустые строки
        const addresses = data.split('\n').map(line => line.trim()).filter(line => line !== '');

        // Читаем файл с приватными ключами
        const privateKeysData = fs.readFileSync(PRIVATE_KEY_DIR, 'utf8');

        // Разделяем строку по строкам и фильтруем пустые строки
        const privateKeys = privateKeysData.split('\n').map(line => line.trim()).filter(line => line !== '');
        // Генерируем адреса из приватных ключей
        const addressesFromPrivateKeys = privateKeys.map(privateKey => {
            const wallet = new ethers.Wallet(privateKey);
            return wallet.address;
        });

        // Объединяем адреса из обоих источников
        const allAddresses = [...addresses, ...addressesFromPrivateKeys];

        return allAddresses;
    } catch (error) {
        console.error('Ошибка при чтении файла: Файл пуст | Не найден');
        return [];
    }
}