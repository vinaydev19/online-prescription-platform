import { jsPDF } from 'jspdf'
import { autoTable } from 'jspdf-autotable'

export const generatePrescriptionPDF = (prescriptionData) => {
    const { careToBeTaken, medicines, doctor, patient } = prescriptionData

    const doc = new jsPDF()

    doc.setFontSize(18)
    doc.text('Prescription', 14, 22)

    doc.setFontSize(12)
    doc.text(`Doctor: ${doctor.name}`, 14, 32)
    doc.text(`Email: ${doctor.email}`, 14, 40)
    doc.text(`Phone: ${doctor.phoneNumber}`, 14, 48)

    doc.text(`Patient: ${patient.name}`, 14, 60)
    doc.text(`Email: ${patient.email}`, 14, 68)
    doc.text(`Phone: ${patient.phoneNumber}`, 14, 76)

    doc.setFontSize(14)
    doc.text('Care To Be Taken:', 14, 90)
    doc.setFontSize(12)
    doc.text(careToBeTaken, 14, 98, { maxWidth: 180 })

    doc.setFontSize(14)
    doc.text('Medicines:', 14, 120)

    const medicineLines = medicines.split('\n').map(line => [line])
    autoTable(doc, {
        startY: 128,
        head: [['Medicine Details']],
        body: medicineLines,
        theme: 'grid',
        styles: { fontSize: 12 }
    })

    return doc.output('blob')
}
