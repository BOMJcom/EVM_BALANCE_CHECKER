import inquirer from 'inquirer';
import { chainList } from './networks/all_networks';
import { getNativeBalance } from './tasks/native_checker';
import { createFiles } from './utils/create_files';
import { getAddressesFromFile } from './utils/wallets';
import { ADRDESSES_TXT_DIR, logger, PRIVATE_KEY_DIR } from './data/config';
import { getBalancesForTokens } from './tasks/token_checker';
import { Chain } from './networks/interface';
import { removeEmptySheet } from './utils/files_utils';

async function main() {
    createFiles();
    console.log(`Перед проверкой балансов заполните ${ADRDESSES_TXT_DIR} или ${PRIVATE_KEY_DIR}`);

    const options = [
        { name: 'Все сети', value: 'all' },
        ...chainList.map(chain => ({ name: chain.name, value: chain })),
    ];

    const question = {
        type: 'list',
        name: 'selectedChain',
        message: 'Выберите опцию:',
        choices: options,
    };

    try {

        const addressList = await getAddressesFromFile();
        if (addressList.length < 1) {
            logger.warn(`Список адресов пуст, заполните ${ADRDESSES_TXT_DIR} или ${PRIVATE_KEY_DIR}`)
            return;
        }
        const answer = await inquirer.prompt([question as any]);
        
        if (answer.selectedChain === 'all') {
            // Выполняем проверку для всех сетей
            for (const chain of chainList) {
                console.log(`Проверка сети: ${chain.name}`);
                await getNativeBalance(
                    chain,
                    addressList
                );

                await getBalancesForTokens(
                    chain,
                    addressList,
                    chain.tokenAddresses
                );
            }
        } else {
            const chain: Chain = answer.selectedChain; 
            await getNativeBalance(
                chain,
                addressList
            );

            await getBalancesForTokens(
                chain,
                addressList,
                chain.tokenAddresses
            );

            console.log(`Вы выбрали цепочку: ${chain.name}`);
        }

        removeEmptySheet();

    } catch (error) {
        if (error) {
            console.error('Процесс завершен');
        } else if (error instanceof Error && error.message.includes('force closed the prompt')) {
            console.log('\nПроцесс завершен');
            process.exit(0); // Корректное завершение программы
        } else {
            throw error; // Бросаем другие ошибки дальше
        }
    }
}

main();