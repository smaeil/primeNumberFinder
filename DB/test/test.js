import { createOrReadFile } from "../../middleware/primeNumberFinder.js";

const aiSample = await createOrReadFile('./aiSample.json');
const dbSample = await createOrReadFile('./dbSample.json');

const report = `
Number of Item in samples:
AI = ${aiSample.length}.   DB = ${dbSample.length}

-------------------
`;
console.log(report);

for (let i=0; i < aiSample.length; i++) {
    if (aiSample[i] !== dbSample[i]) {
        console.log(`AI= ${aiSample[i]} ---- DB= ${dbSample[i]}`);
    }
}