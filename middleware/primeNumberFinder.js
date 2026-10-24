// 0- imports
import fs from 'fs/promises';


// 1- handling the extranal json file: **************************************************************
export async function createOrReadFile(filePath) {
    const defaultContent = [2, 3, 5, 7, 11, 13];
    // read the db if exists
    try {
        let db = await fs.readFile(filePath,'utf-8');
        return JSON.parse(db);
        
    } catch (error) {
        
        if (error.code === 'ENOENT') {
            // if the file was not found!
            await fs.writeFile(filePath, JSON.stringify(defaultContent), 'utf-8');
            console.log(`The "${filePath}" was created!`);
            return defaultContent;
            
        } else {
            console.log(error);
            throw error;
        }
    }
}

async function writeToFile(filePath, data) {
    try {

        if (typeof data !== 'string') {
            data = JSON.stringify(data);
        }

        await fs.writeFile(filePath, data, 'utf-8');
        console.log('DB was Updated!!!');
        return;
        
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// 2- search in existig json file: *******************************************************************
async function searchInDB(number, db) {

    // if number is 0 or 1
    if (number === 0 || number === 1 || number === -1) {
        console.log('search result: input was', number);
        return false;
    }

    // negative number will conver to positive
    if (number < 0) {
        number = number * -1 ;
        console.log('The number has change to positive.');
    }

    
    try {
        
        const result = db.filter(n => n === number)[0];

        if (result === number) {
            return true
        }
        return false;
    } catch (error) {
        return false;
    }
}

// 3- extending the range: ***************************************************************************

async function findPrimeFiller(number, filePath, list) {
    try {
        let isPrime = true;
        const initialListLength = list.length;

        /*
        Real Deal!!
        skip the even number reduce load by half
        in case prime number list divide it only by primes. the none primes are already none prime.
        if list ends. check one by one and update the list. charting the uncharted area will relief pani for next time.
        */
       
                
        for (let i = list[list.length -1]; i <= number ; i=i+2) {
            // step 1 check it against the list
            for (let j = 0; j < list.length; j++) {
                if ((i % list[j]) === 0) {
                    isPrime = false;
                }
            }

            // in case the i is prime it will be added to list

            if (isPrime) {
                list.push(i);
            }

            // rest isPrime to initial value for next round
            if ((i + 2) <= number) {
                isPrime = true;
            }
        }

        if (list.length > initialListLength) {
            await writeToFile(filePath, list);
        }

        return isPrime;

    } catch (error) {
        console.log(error);
        throw error;
    }
}

// exporting the object
async function primeNumberFinder(number, dbPath) {
    number = parseInt(Number(number));
    try {
        const db = await createOrReadFile(dbPath);
        let result = false;
        
        if (number <= db[db.length -1]) {
            result = await searchInDB(number, db);
            return result;
        } else {
            result = await findPrimeFiller(number, dbPath, db);
            return result;
        }

        
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export default primeNumberFinder;