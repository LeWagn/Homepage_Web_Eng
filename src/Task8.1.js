const fetchFiles = () => {
    let fetchFileA = new Promise((resolve, reject) => {});
    let fetchFileB = new Promise((resolve, reject) => {});
    fetchFileA = fetch('A.txt');
    fetchFileB = fetch('B.txt');
    return [fetchFileA, fetchFileB];
}

const displayFiles = () => {
    let [fileA, fileB] = fetchFiles();
    Promise.all([fileA, fileB]).then(([fileA, fileB]) => {
        fileA.text().then(fileAText => {
            fileB.text().then(fileBText => {
                let linesA = fileAText.split('\n');
                let linesB = fileBText.split('\n');
                let concatenatedLines = linesA.map((line, index) => line + linesB[index]);
                let output = document.getElementById("output");
                concatenatedLines.forEach(line => {
                    let p = document.createElement("p");
                    p.innerHTML = line;
                    output.appendChild(p);
                });
            });
        });
    });
}

displayFiles();