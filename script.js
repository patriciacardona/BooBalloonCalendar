// Dados das datas
const dates = [
    { date: '05/10/2024', day: 'Sábado' },
    { date: '06/10/2024', day: 'Domingo' },
    { date: '12/10/2024', day: 'Sábado' },
    { date: '13/10/2024', day: 'Domingo' },
    { date: '19/10/2024', day: 'Sábado' },
    { date: '20/10/2024', day: 'Domingo' },
    { date: '26/10/2024', day: 'Sábado' },
    { date: '27/10/2024', day: 'Domingo' },
    { date: '02/11/2024', day: 'Sábado' },
    { date: '03/11/2024', day: 'Domingo' },
    { date: '09/11/2024', day: 'Sábado' },
    { date: '10/11/2024', day: 'Domingo' },
    { date: '16/11/2024', day: 'Sábado' },
    { date: '17/11/2024', day: 'Domingo' },
    { date: '23/11/2024', day: 'Sábado' },
    { date: '24/11/2024', day: 'Domingo' },
    { date: '30/11/2024', day: 'Sábado' },
    { date: '01/12/2024', day: 'Domingo' },
    { date: '07/12/2024', day: 'Sábado' },
    { date: '08/12/2024', day: 'Domingo' },
    { date: '14/12/2024', day: 'Sábado' },
    { date: '15/12/2024', day: 'Domingo' },
    { date: '21/12/2024', day: 'Sábado' },
    { date: '22/12/2024', day: 'Domingo' },
    { date: '28/12/2024', day: 'Sábado' },
    { date: '29/12/2024', day: 'Domingo' }
];

// Função para criar a tabela de datas
function createTable() {
    const tableBody = document.querySelector('#calendar tbody');

    dates.forEach(dateObj => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${dateObj.date}</td>
            <td>${dateObj.day}</td>
            <td class="status" data-recreadora="Pati"></td>
            <td class="status" data-recreadora="Jess"></td>
            <td class="status" data-recreadora="Rafa"></td>
            <td class="status" data-recreadora="Tatá"></td>
            <td class="status" data-recreadora="Lara"></td>
            <td class="status" data-recreadora="Isa"></td>
            <td class="status" data-recreadora="Nati"></td>
            <td class="counts">0</td>
            <td class="counts">0</td>
        `;
        tableBody.appendChild(row);
    });

    // Adicionar evento de clique para as células de status
    document.querySelectorAll('.status').forEach(cell => {
        cell.addEventListener('click', () => {
            if (cell.classList.contains('available')) {
                cell.classList.remove('available');
                cell.classList.add('unavailable');
            } else if (cell.classList.contains('unavailable')) {
                cell.classList.remove('unavailable');
                cell.classList.add('available');
            } else {
                cell.classList.add('available');
            }
            updateCounts();
            saveAvailability();
        });
    });

    // Carregar a disponibilidade salva
    loadAvailability();
}

// Função para atualizar as contagens de disponibilidade
function updateCounts() {
    const rows = document.querySelectorAll('#calendar tbody tr');
    rows.forEach(row => {
        const availableCount = row.querySelectorAll('.available').length;
        const unavailableCount = row.querySelectorAll('.unavailable').length;
        row.cells[9].innerText = availableCount; // Disponíveis
        row.cells[10].innerText = unavailableCount; // Indisponíveis
    });
}

// Função para salvar a disponibilidade no localStorage
function saveAvailability() {
    const rows = document.querySelectorAll('#calendar tbody tr');
    const availability = {};

    rows.forEach(row => {
        const date = row.cells[0].innerText;
        const status = {};
        document.querySelectorAll(`.status`).forEach(cell => {
            if (cell.parentElement === row) {
                const recreadora = cell.getAttribute('data-recreadora');
                status[recreadora] = cell.classList.contains('available') ? 'disponível' : 'indisponível';
            }
        });
        availability[date] = status;
    });

    localStorage.setItem('availability', JSON.stringify(availability));
}

// Função para carregar a disponibilidade do localStorage
function loadAvailability() {
    const savedAvailability = localStorage.getItem('availability');
    if (savedAvailability) {
        const availability = JSON.parse(savedAvailability);
        const rows = document.querySelectorAll('#calendar tbody tr');
        
        rows.forEach(row => {
            const date = row.cells[0].innerText;
            const status = availability[date] || {};

            document.querySelectorAll(`.status`).forEach(cell => {
                if (cell.parentElement === row) {
                    const recreadora = cell.getAttribute('data-recreadora');
                    if (status[recreadora] === 'disponível') {
                        cell.classList.add('available');
                    } else if (status[recreadora] === 'indisponível') {
                        cell.classList.add('unavailable');
                    }
                }
            });
        });

        updateCounts();
    }
}

// Inicializar a tabela quando a página carregar
document.addEventListener('DOMContentLoaded', createTable);
