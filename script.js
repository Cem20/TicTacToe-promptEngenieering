let fields = [
    'cross',
    'circle',
    null,
    null,
    null,
    null,
    null,
    null,
    null,
];

let currentPlayer = 'circle'; // 'circle' or 'cross

function init() {
  render();
}

function render() {
  const contentDiv = document.getElementById('content');
  let tableHTML = '<table>';

  for (let i = 0; i < 3; i++) {
    tableHTML += '<tr>';
    for (let j = 0; j < 3; j++) {
      const index = i * 3 + j;
      tableHTML += `<td onclick="handleClick(${index})" class="${fields[index]}">`;
      
      if (fields[index] === 'circle') {
        tableHTML += generateAnimatedCircleSVG();
      } else if (fields[index] === 'cross') {
        tableHTML += generateAnimatedCrossSVG();
      }

      tableHTML += '</td>';
    }
    tableHTML += '</tr>';
  }

  tableHTML += '</table>';
  contentDiv.innerHTML = tableHTML;
}

function handleClick(index) {
  if (fields[index] === null) {
    fields[index] = currentPlayer;

    const clickedCell = document.getElementsByTagName('td')[index];
    clickedCell.innerHTML = currentPlayer === 'circle' ? generateAnimatedCircleSVG() : generateAnimatedCrossSVG();
    clickedCell.onclick = null; // Remove the onclick event after a move

    currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle'; // Switch player after each move

    // Deaktiviere Animationen für andere Zellen
    document.querySelectorAll('.circle, .cross').forEach(cell => {
      cell.classList.remove('circle', 'cross');
    });

    // Füge Animationen nur für das angeklickte Element hinzu
    clickedCell.classList.add(fields[index]);

    // Überprüfe auf Sieg oder Unentschieden
    
  }
}
  // Initialer Aufruf der render-Funktion
  function generateAnimatedCircleSVG() {
    const svgCode = `
      <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70">
        <circle cx="35" cy="35" r="0" fill="#00B0EF" stroke="none">
          <animate attributeName="r" values="0;30" dur="0.3s" fill="freeze" />
        </circle>
      </svg>
    `;
    
    return svgCode;
  }

  function generateAnimatedCrossSVG() {
    const svgCode = `
      <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70">
        <line x1="5" y1="35" x2="65" y2="35" stroke="#FFC000" stroke-width="10" transform="rotate(45 35 35)">
          <animate attributeName="stroke-dasharray" values="0,100;100,0" dur="2s" fill="freeze" />
        </line>
        <line x1="35" y1="5" x2="35" y2="65" stroke="#FFC000" stroke-width="10" transform="rotate(45 35 35)">
          <animate attributeName="stroke-dasharray" values="0,100;100,0" dur="0.6s" fill="freeze" />
        </line>
      </svg>
    `;
    
    return svgCode;
  }



  // Beispiel: Füge das SVG-Element zum Body hinzu
