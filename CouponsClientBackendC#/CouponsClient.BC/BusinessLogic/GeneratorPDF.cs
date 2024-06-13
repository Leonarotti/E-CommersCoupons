using CouponsClient.BC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;
using iTextSharp.text;
using iTextSharp.text.pdf;
using System.IO;

namespace CouponsClient.BC.BusinessLogic
{
    public class GeneratorPDF
    {

        public static MemoryStream GeneratePDF(SaleBill saleBill)
        {
            MemoryStream memoryStream = new MemoryStream();
            Document document = new Document();
            PdfWriter.GetInstance(document, memoryStream).CloseStream = false;
            document.Open();

            // Agregar título al PDF
            Paragraph title = new Paragraph("Factura de compra en Sistema de venta de cupones online")
            {
                Alignment = Element.ALIGN_CENTER
            };
            document.Add(title);
            document.Add(Chunk.NEWLINE); // Agregar un salto de línea

            // Agregar detalles del cliente
            Paragraph clientInfo = new Paragraph($"Nombre: {saleBill.Client.Name} {saleBill.Client.Lastname}\n" +
                                                 $"DNI: {saleBill.Client.Dni}\n" +
                                                 $"Correo electrónico: {saleBill.Client.Email}\n");
            document.Add(clientInfo);
            document.Add(Chunk.NEWLINE); // Agregar un salto de línea

            // Agregar detalles de la venta
            string saleDate = saleBill.Sale.SaleDate.ToString("dd/MM/yyyy");
            Paragraph saleInfo = new Paragraph($"Fecha de factura: {saleDate}\n" +
                                               $"Monto total: ¢{saleBill.Sale.Total}\n" +
                                               $"Número de tarjeta: {saleBill.Sale.CardNumber}\n");
            document.Add(saleInfo);
            document.Add(Chunk.NEWLINE); // Agregar un salto de línea

            // Agregar detalles de los cupones
            foreach (var saleDetail in saleBill.SaleDetails)
            {
                Paragraph couponInfo = new Paragraph($"Código de Cupón: {saleDetail.CouponId}\n" +
                                                     $"Precio regular: ¢{saleDetail.RegularPrice}\n" +
                                                     $"Descuento: {saleDetail.Percentage}%\n" +
                                                     $"Precio con descuento: ¢{saleDetail.RegularPrice * (1 - ((decimal)saleDetail.Percentage / 100))}\n" +
                                                     $"Cantidad: {saleDetail.Quantity}\n" +
                                                     $"Subtotal: ¢{saleDetail.Subtotal}\n");
                document.Add(couponInfo);
                document.Add(Chunk.NEWLINE); // Agregar un salto de línea
            }

            // Cerrar el documento
            document.Close();
            memoryStream.Position = 0;

            return memoryStream;
        }

    }
}
