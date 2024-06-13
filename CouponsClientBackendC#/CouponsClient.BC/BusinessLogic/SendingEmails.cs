using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Net.Mime;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.IO;

namespace CouponsClient.BC.BusinessLogic
{
    public class SendingEmails
    {

        public static void SendEmailWithPDF(string recipientEmail, MemoryStream pdfStream)
        {
            try
            {
                // Configurar el cliente SMTP para enviar correo electrónico
                var smtpClient = new SmtpClient("smtp.gmail.com")
                {
                    Port = 587,
                    Credentials = new NetworkCredential("leon.pereira15@gmail.com", "oois qydl bjdp zrad"),
                    EnableSsl = true,
                };

                // Crear el mensaje de correo electrónico
                var message = new MailMessage("leon.pereira15@gmail.com", recipientEmail)
                {
                    Subject = "Factura de compra - Sistema de venta de cupones online",
                    Body = "Adjunto encontrarás la factura de tu compra.",
                    IsBodyHtml = true
                };

                // Adjuntar el PDF al mensaje
                pdfStream.Position = 0; // Asegurarse de que el stream esté en la posición inicial
                Attachment attachment = new Attachment(pdfStream, "factura_compra.pdf", MediaTypeNames.Application.Pdf);
                message.Attachments.Add(attachment);

                // Enviar el correo electrónico
                smtpClient.Send(message);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error al enviar el correo electrónico: " + ex.Message);
            }
        }

    }
}
