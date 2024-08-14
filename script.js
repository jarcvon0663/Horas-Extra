function calcularPago() {
    const nombre = document.getElementById('nombre').value;
    const mes = document.getElementById('mes').value;
    const año = parseInt(document.getElementById('año').value);
    const salario = parseFloat(document.getElementById('salario').value.replace(/\./g, ''));
    const horasExtraDiurnas = parseFloat(document.getElementById('horasExtraDiurnas').value) || 0;
    const horasExtraNocturnas = parseFloat(document.getElementById('horasExtraNocturnas').value) || 0;
    const horasDomFest = parseFloat(document.getElementById('horasDomFest').value) || 0;
    const horasExtraDomFestDiurnas = parseFloat(document.getElementById('horasExtraDomFestDiurnas').value) || 0;
    const horasExtraDomFestNocturnas = parseFloat(document.getElementById('horasExtraDomFestNocturnas').value) || 0;

    const valorHora = salario / 230; // 240 horas laborales mensuales
    const pagoExtraDiurna = horasExtraDiurnas * valorHora * 1.25;
    const pagoExtraNocturna = horasExtraNocturnas * valorHora * 1.75;
    const pagoDomFest = horasDomFest * valorHora * 1.75;
    const pagoExtraDomFestDiurna = horasExtraDomFestDiurnas * valorHora * 2;
    const pagoExtraDomFestNocturna = horasExtraDomFestNocturnas * valorHora * 2.5;

    const totalPago = pagoExtraDiurna + pagoExtraNocturna + pagoDomFest + pagoExtraDomFestDiurna + pagoExtraDomFestNocturna;

    const resultadoTexto = `
        Profesional: ${nombre}
        Mes: ${mes} ${año}

        Salario Mensual: ${separarMiles(salario.toFixed(0))}
        Extra Diurnas: ${separarMiles(pagoExtraDiurna.toFixed(0))} | ${horasExtraDiurnas.toFixed(1)} horas
        Extra Nocturnas: ${separarMiles(pagoExtraNocturna.toFixed(0))} | ${horasExtraNocturnas.toFixed(1)} horas
        Recargo Domingos/Festivos: ${separarMiles(pagoDomFest.toFixed(0))} | ${horasDomFest.toFixed(1)} horas
        Extra Diurnas en Dom/Fest: ${separarMiles(pagoExtraDomFestDiurna.toFixed(0))} | ${horasExtraDomFestDiurnas.toFixed(1)} horas
        Extra Nocturnas en Dom/Fest: ${separarMiles(pagoExtraDomFestNocturna.toFixed(0))} | ${horasExtraDomFestNocturnas.toFixed(1)} horas

        Total a pagar: COP ${separarMiles(totalPago.toFixed(0))}
    `;

    document.getElementById('resultado').innerText = resultadoTexto;
    document.getElementById('descargarPDF').style.display = 'block';
}

function separarMiles(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function formatearSalarioInput() {
    const salarioInput = document.getElementById('salario');
    salarioInput.value = separarMiles(salarioInput.value.replace(/\./g, ''));
}

function descargarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const nombre = document.getElementById('nombre').value;
    const mes = document.getElementById('mes').value;
    const año = document.getElementById('año').value;
    const resultado = document.getElementById('resultado').innerText;

    doc.text(`Horas Extra correspondientes a:`, 10, 10);
    doc.text(resultado, 10, 20);

    doc.save(`Horas_Extra_${nombre}_${mes}_${año}.pdf`);
}


document.getElementById('salario').addEventListener('input', formatearSalarioInput);
