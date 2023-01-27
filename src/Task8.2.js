const fetchFiles = async () => {
    let fileA = await fetch('A.txt');
    let fileB = await fetch('B.txt');
    return [fileA, fileB];
}

const displayFiles = async () => {
    let [fileA, fileB] = await fetchFiles();
    let fileAText = await fileA.text();
    let fileBText = await fileB.text();
    let linesA = fileAText.split('\n');
    let linesB = fileBText.split('\n');
    let concatenatedLines = linesA.map((line, index) => line + linesB[index]);
    let output = document.getElementById("ausgabe");
    concatenatedLines.forEach(line => {
        let p = document.createElement("p");
        p.innerHTML = line;
        output.appendChild(p);
    });
}

displayFiles();