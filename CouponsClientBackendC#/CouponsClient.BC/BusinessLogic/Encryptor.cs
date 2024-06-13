using System;
using System.Net.Mail;
using System.Net.Mime;
using System.Net;
using System.Security.Cryptography;
using System.Text;

namespace CouponsClient.BC.BusinessLogic
{
    public class Encryptor
    {
        private readonly string privateKeyPem = @"
-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCqE0hXmXYbvL96
eT6oO7xUDQsPZ05MeXOswUf5rg8grWRaHGdZag3o3XA4GvPuFprud/pYVK32u6fY
Z9ohHHHXQDHZhSguzVCSTOOi64G/X+m9HqEG29DtuNOslPJiIc7YJefqU96rEeAr
kCLOuWzoFiqNHr79yO6evRT67ejIFz7SghMEUY6oYFffpBMpubnig7016+nNkQ+H
5oKY4RZ9UFTFGhT1TtC4U5uvvZUtB1w3DYkrZNgo51NGcbXBov5mAJoWO0nNutvf
EYIsKeLQXJUo+5NtVQ9pYoi8h63Hppsg5AQ0XblC5kYZjpdQVhgLw767V4MexIn3
biqjdkhJAgMBAAECgf8qhKeRPsxIIue7tpPzevuaB6i8MRdiBvrkNW3I/brKcI6l
+HPd5qWTkch8PkC9ROl2tIfhjUnwZPmRIGVn4bSUG3ha6O8ixDFgYdiG4lmNfmzw
2rdm/4074PkKLDJsVgdgAhn4ev8vxUhFm8MX60NOwjvhC86zo4gEJ0EXemK3oq7m
mSwGInfKC4gtSc4dFGXIwDG4XQVXEY/zRBzFfOrOL1LGumLMDhgd78H12Icf8CUb
U6vTSgsnSumM+VkoieGOPNVzmiLSXR+hnFwXY0w0I+aE3SZmkWKmYNzYJKmV8wcQ
zs3SxR/TIKsO1m+S5YVNenQo2Fiiw6F18ZUksQECgYEA7NqZjQw6w1L9A6PZjlBH
freZKqzA9NOcDMWc2VAqnkmoCMYo818z8+QmSOQoYGbw/OILqU8EgYD0ixAnGipx
ozYrKrnwLliHNaqvVFS2qH3B6vzWs0Tf6diGJAnxSHVEs723rKcTekLmebVKmd25
FOiKwZmHzXAtfCEJR0kRJYsCgYEAt9LIO3rc06NWC1iClz3oL7ZSqKbv/imZZq75
aSJPtwc/yCa8e3xXTCQN0zUrQOQ5Sycew0CI3OKahNa/Aw+lMs9b4JqMwcMz3jly
Nwh1q/TaP4kWMxmWALHOV86QXmfvc1PU3Qb+dJ7906Y+A81Iolc59pSdr8Il/PAY
twFMi/sCgYEAi8QfUkVCM9q35Tr9+WXUGqma37zbjF2Gu16tROtyir9qQes1ZQ/r
52LdWKwSS3jTgladjQZM4WLIa3tXp7AeKLKhXHAmlCK3fuq+1aO7ucej89fJljXx
b9vOpFudnyVcKjist1xMORxbRry9Tfix6+2hW8cOhSNKI/KWuBMc5CsCgYEAqq9w
tzIVG/q9KZnM4IxeLPdZdzpS+6g6xUrRUdrHNAbqJXo6Z1sEYDHWGHh1KjMANBUm
Dly8+IT8vz37bOc5GJ3MDRjUfBI59i1XLVyQjtOzV21+DILEcu6mz4eBK/fMMkT0
ESuuWDFNNRpW2QbjW8IskxZZ+NoIlf2GpV7yacMCgYEAn33aMq4NKR9HjVa4pdz+
bVjWWwcuaBxD4RSD4fCqJNJ+wtz+uyhzNZBxY1VKkPMrpOJwEyU1zCm0ZCcfahc3
C+eQhdIR0HiWgdVCUF3h0lgSU9Ok32nv5c6A5D742i2LxlJ29UEWGsK7E0cO2+5y
vWMgSK0GNIypgSWabc2lyfY=
-----END PRIVATE KEY-----
";

        public string Decrypt(string encryptedData)
        {
            byte[] encryptedBytes = Convert.FromBase64String(encryptedData);
            using (var rsa = RSA.Create())
            {
                rsa.ImportFromPem(privateKeyPem);
                byte[] decryptedBytes = rsa.Decrypt(encryptedBytes, RSAEncryptionPadding.OaepSHA256);
                return Encoding.UTF8.GetString(decryptedBytes);
            }
        }
    }
}

//pruebasleodev@gmail.com

public void SendEmailWithPDF(string recipientEmail, string attachmentPath)
{
    try
    {
        // Configurar el cliente SMTP para enviar correo electrónico
        var smtpClient = new SmtpClient("smtp.gmail.com")
        {
            Port = 587,
            Credentials = new NetworkCredential("Su correo", "su contraseña"),
            EnableSsl = true,
        };

        // Crear el mensaje de correo electrónico
        var message = new MailMessage("Su correo", recipientEmail)
        {
            Subject = "Ticket de Concierto",
            Body = "En este correo encontrarás tus tickets de concierto.",
            IsBodyHtml = true
        };

        // Adjuntar el PDF al mensaje
        Attachment attachment = new Attachment(attachmentPath, MediaTypeNames.Application.Pdf);
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

       public class TicketService
{
    public void GenerateTicketPDF(string filePath, CorreoDTO correoDTO)
    {
        // Crear un nuevo documento PDF
        iTextSharp.text.Document document = new iTextSharp.text.Document();
        PdfWriter.GetInstance(document, new FileStream(filePath, FileMode.Create));
        document.Open();

        // Agregar texto al PDF
        Paragraph paragraph = new Paragraph("Ticket de Concierto");
        document.Add(paragraph);
        document.Add(Chunk.NEWLINE); // Agregar un salto de línea

        DateTime fechaticket = DateTime.Now;

        string detailsText = $"Fecha de factura: {fechaticket}\nArtista: {correoDTO.nombreArtista}\nFecha del concierto: {correoDTO.fechaConcierto} \nNumero de asientos:{correoDTO.asientos}\nPrecio total: ¢{correoDTO.montoTotal}";
        // Agregar los detalles del ticket al PDF
        Paragraph detailsParagraph = new Paragraph(detailsText);
        document.Add(detailsParagraph);
        document.Add(Chunk.NEWLINE); // Agregar un salto de línea



        // Cerrar el documento
        document.Close();
    }

}