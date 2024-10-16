const donationForm = document.getElementById('donationForm');
const submissionTable = document.getElementById('submissionTable');
const donationTableBody = document.querySelector('#donationTable tbody');

// Handle form submission
donationForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form data
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const amount = document.getElementById('amount').value;
    const date = document.getElementById('date').value;
    const paymentMode = document.getElementById('paymentMode').value;
    const purpose = document.getElementById('purpose').value;

    // Store data in array
    const newData = {
        fullName: `${firstName} ${lastName}`, // Combine first name and last name
        phone,
        address,
        amount,
        date,
        paymentMode,
        purpose
    };

    // Add to table
    addToTable(newData);

    // Generate PDF Receipt
    generatePDFReceipt(newData);

    // Show table section
    submissionTable.classList.remove('hidden');

    // Clear form
    donationForm.reset();
});

// Add submission to table
function addToTable(data) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${data.fullName}</td>
        <td>${data.phone}</td>
        <td>${data.address}</td>
        <td>₹${data.amount}</td>
        <td>${data.date}</td>
        <td>${data.paymentMode}</td>
        <td>${data.purpose}</td>
    `;
    donationTableBody.appendChild(row);
}

// Function to generate PDF with watermark and premium design
function generatePDFReceipt(data) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Set document properties
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(20);
    
    // Title
    doc.setTextColor(255, 87, 34); // Color for the title
    doc.text('Imammia Imambara Donation Receipt', 15, 20);
    
    // Address
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0); // Reset to black for address
    doc.text('Bhilauli Aima, Azamgarh, Uttar Pradesh', 15, 30);
    
    // Add a line below the title and address
    doc.setDrawColor(0);
    doc.line(10, 35, 200, 35); // Line from x1,y1 to x2,y2

    // Add the donation details
    doc.setFontSize(12);
    doc.text(`Name: ${data.fullName}`, 15, 50); // Display full name
    doc.text(`Phone: ${data.phone}`, 15, 60); // Reduced gap
    doc.text(`Address: ${data.address}`, 15, 70);
    doc.text(`Amount: ₹${data.amount}`, 15, 80);
    doc.text(`Date: ${data.date}`, 15, 90);
    doc.text(`Payment Mode: ${data.paymentMode}`, 15, 100);
    doc.text(`Purpose: ${data.purpose}`, 15, 110);

    // Page layout adjustments
    doc.setFontSize(10);
    doc.text("Thank you for your generous donation towards the Imam Hussain Imambargah; your support is invaluable and greatly appreciated!", 15, 130);
    
    // Download the PDF
    doc.save(`receipt_${data.fullName}.pdf`); // Use full name in file name
}
