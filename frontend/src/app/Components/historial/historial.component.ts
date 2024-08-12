import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cuenta } from 'src/app/models/cuentas';
import { CuentaService } from 'src/app/services/cuenta/cuenta.service';
import { TransferenciaService } from 'src/app/services/trasferencia/trasferencia.service';
import { Transferencia } from 'src/app/models/transferencias';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent{
  listCuentas:Cuenta[]=[];
  transferencias: Transferencia[] = [];
  transferenciasOriginales: Transferencia[] = [];
  tipoTransferencia: string = ''; 

   constructor(
    private router: Router, 
    private _cuentaService: CuentaService,
    private _transferenciaService: TransferenciaService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.extraerCliente();
      //Mostrar las cuentas asociadas al cliente
    this.extraerCuentas();
    // Llamar a la función para cargar las transferencias al inicializar el componente
    this.obtenerHistorial();
  }
  extraerCliente() {
    const transferenciaObj = history.state.transferenciaObj;
    if (transferenciaObj && transferenciaObj.nombre) {
        const nombre = transferenciaObj.nombre;
        var text = document.getElementById('nombre-cliente');
        text!.innerHTML = nombre;
    } else {
        console.log('No se pudo obtener el nombre del cliente');
    }
}
  
  obtenerHistorial() {
    const cedula = history.state.cedula;
    
    if (cedula) {
      this._transferenciaService.getTransferenciasByCedula({ cedula }).subscribe(
        (data: Transferencia[]) => {
          // Log para verificar datos
          console.log('Transferencias obtenidas:', data);
          //this.transferencias = data;
          this.transferenciasOriginales = [...data]; // Guarda una copia de las transacciones originales
          this.transferencias = [...data]; // Inicialmente muestra todas las transacciones
    
        },
        error => {
          console.log('Error al obtener las transferencias', error);
          
        }
      );
    } else {
      console.log('No se recibió una cédula en el estado de la historia');
    }
  }
  

  // Puedes agregar una función para buscar por cédula si no deseas que se cargue al inicio
  buscarTransferencias() {
    this.obtenerHistorial();
  }

  transferenciasM(){
    const cedulaObj = history.state.cedula.cedula;
    const cuentasObj = this.listCuentas;
    const transferenciaObj = {cedula:cedulaObj, cuentas:cuentasObj}
    this.router.navigate(['/transferencia-interna'],{state:{transferenciaObj}});
  }

  misDatos(){
    const cedulaObj = history.state.cedula.cedula;
    const cuentasObj = this.listCuentas;
    const transferenciaObj = {cedula:cedulaObj, cuentas:cuentasObj}
    this.router.navigate(['/suspender-cliente'],{state:{transferenciaObj}});
  }

  menu() {
    const objeto = history.state.transferenciaObj;
    const cedulaObj = objeto.cedula;
    const cedula = { cedula: cedulaObj }
    this.router.navigate(['/menu'], { state: { cedula } });
  }

    ordenarTransferencias(event: Event) {
    const selectElement = event.target as HTMLSelectElement;

    if (selectElement) {
      const selectedValue = selectElement.value;

      this.transferencias = [...this.transferenciasOriginales];
      this.tipoTransferencia = selectedValue;

      switch (selectedValue) {
        case 'hechas':
          this.transferencias = this.transferencias.filter(t => this.isTransferenciaHecha(t));
          break;
        case 'recibidas':
          this.transferencias = this.transferencias.filter(t => this.isTransferenciaRecibida(t));
          break;
        case 'fechaAsc':
          this.transferencias.sort((a, b) => new Date(a.FechaTrasferencia).getTime() - new Date(b.FechaTrasferencia).getTime());
          break;
        case 'fechaDesc':
          this.transferencias.sort((a, b) => new Date(b.FechaTrasferencia).getTime() - new Date(a.FechaTrasferencia).getTime());
          break;
        default:
          break;
      }
    }
  }
   
  isTransferenciaHecha(transferencia: Transferencia): boolean {
    return transferencia.cedula_Emisor === history.state.cedula;
  }

  isTransferenciaRecibida(transferencia: Transferencia): boolean {
    return transferencia.cedula_Destinatario === history.state.cedula;
  }

  downloadPDF() {
    // Define los datos para el PDF
    const nombreBanco = 'EPN Wallet'; // Nombre del banco
    const nombreCliente = document.getElementById('nombre-cliente')?.textContent || 'Cliente'; // Nombre del cliente
    const ubicacionBanco = 'Av. Ladrón de Guevara E11-253, Quito 170143, Ecuador'; // Dirección del banco
    const fechaDescarga = new Date().toLocaleString('es-EC', { // Fecha y hora de descarga
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false
    });

    // Mensaje según el tipo de transferencia
    let mensaje = `Estimado(a) ${nombreCliente},\n\n`;
    if (this.tipoTransferencia === 'hechas') {
      mensaje += `Nos complace proporcionarle su historial completo de transferencias realizadas a través de EPN Wallet. `;
    } else if (this.tipoTransferencia === 'recibidas') {
      mensaje += `Nos complace proporcionarle su historial completo de transferencias recibidas a través de EPN Wallet. `;
    } else {
      mensaje += `Nos complace proporcionarle su historial completo de transacciones a través de EPN Wallet. `;
    }
    mensaje += `Este documento incluye un resumen detallado de todas las transferencias realizadas y recibidas en su cuenta o cuentas.\n` +
      `Por favor, conserve este archivo para sus registros y futuras consultas. Si necesita asistencia adicional, no dude en contactarnos.\n\n`;

    const mensaje2 = 
      `Atentamente,\n\n` +
      `EPN Wallet - Servicio al Cliente\n` +
      `${ubicacionBanco}\n` +
      `Fecha de Descarga:\n${fechaDescarga}`; // Mensaje final

    const data = document.querySelector('.scroll-container') as HTMLElement;

    // Usa html2canvas para capturar el contenido
    html2canvas(data).then(canvas => {
      const imgWidth = 190; // Ancho en mm
      const pageHeight = 295; // Alto en mm
      const imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;
      const pdf = new jsPDF('p', 'mm', 'a4');
      let position = 0;

      // Página 1
      const logoUrl = 'assets/media/Logo.png'; // Ajusta la ruta y tamaño según tu ícono
      const logoWidth = 30;
      const logoHeight = 30;
      const centerX = pdf.internal.pageSize.width / 2;

      // Añade el ícono del banco y el nombre al PDF, centrado
      pdf.addImage(logoUrl, 'PNG', centerX - logoWidth / 2, 10, logoWidth, logoHeight); // Ícono centrado
      pdf.setFontSize(16);
      pdf.text(nombreBanco, centerX, 45, { align: 'center' }); // Nombre del banco centrado

      // Mensaje introductorio
      pdf.setFontSize(12);
      pdf.text(mensaje, 10, 60, { maxWidth: 190 });

      // Ajusta la posición para la imagen de la tabla
      position = 100;
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Mensaje final en la última página
      pdf.setFontSize(12);
      pdf.text(mensaje2, 10, position + imgHeight + 20, { maxWidth: 190 });

      while (heightLeft >= 0) {
        pdf.addPage();
        pdf.addImage(logoUrl, 'PNG', centerX - logoWidth / 2, 10, logoWidth, logoHeight); // Ícono centrado
        pdf.setFontSize(16);
        pdf.text(nombreBanco, centerX, 45, { align: 'center' }); // Nombre del banco centrado
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 10, 60, imgWidth, imgHeight);
        pdf.setFontSize(12);
        pdf.text(mensaje2, 10, 60 + imgHeight + 20, { maxWidth: 190 });
        heightLeft -= pageHeight;
      }

      pdf.save(`${nombreCliente}.historial_transferencias.pdf`);
    });
  }


      
}
