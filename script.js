function calcularPago() {
    const nombre = document.getElementById('nombre').value;
    const mes = document.getElementById('mes').value;
    const año = parseInt(document.getElementById('año').value);
    const salario = parseFloat(document.getElementById('salario').value.replace(/\./g, ''));
    const horasExtraDiurnas = parseFloat(document.getElementById('horasExtraDiurnas').value) || 0;
    const horasExtraNocturnas = parseFloat(document.getElementById('horasExtraNocturnas').value) || 0;
	const horasRecargoNocturno = parseFloat(document.getElementById('horasRecargoNocturno').value) || 0;
    const horasDomFest = parseFloat(document.getElementById('horasDomFest').value) || 0;
    const horasExtraDomFestDiurnas = parseFloat(document.getElementById('horasExtraDomFestDiurnas').value) || 0;
	const horasRecargoDomFestDiurnoNoCom = parseFloat(document.getElementById('horasRecargoDomFestDiurnoNoCom').value) || 0;
    const horasExtraDomFestNocturnas = parseFloat(document.getElementById('horasExtraDomFestNocturnas').value) || 0;
	const horasRecargoDomFestNocturnoNoCom = parseFloat(document.getElementById('horasRecargoDomFestNocturnoNoCom').value) || 0;
	const horasRecargoDomFestNocturnoCom = parseFloat(document.getElementById('horasRecargoDomFestNocturnoCom').value) || 0;

    const valorHora = salario / 230; // 230 horas laborales mensuales
    const pagoExtraDiurna = horasExtraDiurnas * valorHora * 1.25;
    const pagoExtraNocturna = horasExtraNocturnas * valorHora * 1.75;
	const pagoRecargoNocturno = horasRecargoNocturno * valorHora * 0.35;
    const pagoDomFest = horasDomFest * valorHora * 1.75;
    const pagoExtraDomFestDiurna = horasExtraDomFestDiurnas * valorHora * 2;
	const pagoRecargoDomFestDiurnoNoCom = horasRecargoDomFestDiurnoNoCom * valorHora * 1.75;
    const pagoExtraDomFestNocturna = horasExtraDomFestNocturnas * valorHora * 2.5;
	const pagoRecargoDomFestNocturnoNoCom = horasRecargoDomFestNocturnoNoCom * valorHora * 2.1;
	const pagoRecargoDomFestNocturnoCom = horasRecargoDomFestNocturnoCom * valorHora * 1.1;

    const totalPago = pagoExtraDiurna + pagoExtraNocturna + pagoRecargoNocturno + pagoDomFest + pagoExtraDomFestDiurna + pagoRecargoDomFestDiurnoNoCom + pagoExtraDomFestNocturna + pagoRecargoDomFestNocturnoNoCom + pagoRecargoDomFestNocturnoCom;

    const resultadoTexto = `
        Profesional: ${nombre}
        Mes: ${mes} ${año}

        Salario Mensual: ${separarMiles(salario.toFixed(0))}
        Extra Diurna: ${separarMiles(pagoExtraDiurna.toFixed(0))} | ${horasExtraDiurnas.toFixed(1)} horas
        Extra Nocturna: ${separarMiles(pagoExtraNocturna.toFixed(0))} | ${horasExtraNocturnas.toFixed(1)} horas
		Recargo Nocturno: ${separarMiles(pagoRecargoNocturno.toFixed(0))} | ${horasRecargoNocturno.toFixed(1)} horas
        Recargo Dom/Fest: ${separarMiles(pagoDomFest.toFixed(0))} | ${horasDomFest.toFixed(1)} horas
        Extra Diurna en Dom/Fest: ${separarMiles(pagoExtraDomFestDiurna.toFixed(0))} | ${horasExtraDomFestDiurnas.toFixed(1)} horas
		Recargo Dom/Fes Diurno No Compensado: ${separarMiles(pagoRecargoDomFestDiurnoNoCom.toFixed(0))} | ${horasRecargoDomFestDiurnoNoCom.toFixed(1)} horas
        Extra Nocturna en Dom/Fest: ${separarMiles(pagoExtraDomFestNocturna.toFixed(0))} | ${horasExtraDomFestNocturnas.toFixed(1)} horas
		Recargo Dom/Fes Nocturna No Compensado: ${separarMiles(pagoRecargoDomFestNocturnoNoCom.toFixed(0))} | ${horasRecargoDomFestNocturnoNoCom.toFixed(1)} horas
		Recargo Dom/Fes Nocturna Compensado: ${separarMiles(pagoRecargoDomFestNocturnoCom.toFixed(0))} | ${horasRecargoDomFestNocturnoCom.toFixed(1)} horas
		

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
