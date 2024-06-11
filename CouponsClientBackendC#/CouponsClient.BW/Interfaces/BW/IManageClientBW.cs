using CouponsClient.BC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CouponsClient.BW.Interfaces.BW
{
    public interface IManageClientBW
    {
        Task<bool> RegisterClient(Client client);
        Task<Client> SignIn(LoginClient loginClient);


        /* 
         -----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEA5G/6kK8Y8WV2H5aKZow+HyldgnOnOWb99SjdJzgbzQ+gxeME
k2D0zpqWxDCYQJdBzHgGllxszRMeV/81H/S1Kaf3hx3EqaAYm7tWUM1HQ+13PQ6G
/QIYVz0XSLuV2qGoF1EwskAxnJ/xIMJbF2yZ4mTXJ+76gNcHTI2YqfLZsDxi7bXj
uS2bBxyk7Fd3M3QZ+vvk6G3f3ZepHJynY4BzjqkJEFnbRj02erBk4ukGmf0x0+/r
YDFEBiUIh19FY3lq2BDQzYrkTSmNexqT1ZVPxz2uCuB+frH8AI9V0l45SAoQL1AO
RQpzrjzToGJJxCCMDbI0i5BbOSleMHF2+RItVwIDAQABAoIBAQC4r33JoTrSmEqe
A+XsGhbLxlvZ8sXaRVK9HT/0RQsZkXk4mThB0kl1X+OTByt/soRl6L6+RQ++tYx9
cxuKb1txKlZzT9TuCdxT7Ym9xC1/J9GZXrCeM2UknQ2RpPGQicbM9nkjhXr8TT4O
YxMpu/yMd7v8N+TwU0bT0IkbMgEr5mLZtNZZRxgY7mS8uXhrArFg1w4YFLMYT/il
wIGo5G7D9oy8X3i1pkkLgHicj5VXjEvYtpEG8JBGJ7Ktd1Ttr2HCtF+TEgO3GyFV
Fgn2bxOC4MRvPaqCB1KPHfhYzps+MbTgKgV/2LXt9AzXcngJrZct4+ksce7tOfuX
KfgD6SLxAoGBAPNmzhtMUVfxP5L/wcGVR/3JfnH22mcR4hYWuE5CrkpR00hCm8Bv
uGcvhFx7gqGdU6MCCwDg1P9r3i4VzFgB29uoTsbW+yhsE8Y9Fj4/Cfr0d3tkSRVz
wa8Vc2v9YcKjEKH/JcEOJIFVTqHtwlEO86efHuvbHyUqH0kTw91hiykPAoGBAPmL
QLKNTnRTWLPfD66Sx8ocQGex7sXxowE6CpCxVhrBOUQJ+2x0l6a9ERvmCXh9c6nS
yTx9qMKN5PTEJjq8oKgdtvGl2mrKNHkYoSbco5zSXP8J3ITpjT6KeSMEzby2RU9W
rLM/OGoYyeIZ49Pyh5BJQicZtQv9pIybCx+jUeIbAoGAYczEAl6mRHRhRBDZke4M
/OyAlQvF5YrfohAkDa2H0IxXtoAsXYkqJ6aLzZ2b5c3iKFiF+YNOo1xlbYfC96kg
ImrLBhfu5T1HJ1LKTLHVUevIPbyBC+dMZbHrVNSKZ5OE/dDNBOqV/s/Tlk0IW+rg
le4+57fB7S8iqgp+tkWh/10CgYEA8AzbIHc42fjV9UdRUh4nT9hv7SCF3n6A3Wbp
AQ5DMXuJKxE3kVkURiPn/vlmKj10p7oC1aD2fQRflDO3PS3SO3+E/c5jPAjFAkBL
2rd8HEU5jx7M7b2q6ZCpmXetdCoBFh56rVYxVgOq71RCcFpgGzVapzktLaAc4ouu
0ydoIBUCgYB0kmSeEmst/eyVfNP+94GJfncMslGXe6VYZYY0VkpqPCuXp18J+96c
6DDpPfb7VjF0HG2fJRA05FPBf97H9OmTVOpssX8v7Ww3BRakxPiStffrdd0iMflW
XhJraTr2lHtBdlfcxGb3RfERsWJloDl8AxqZxsbCpSYpI3r7mL1BHQ==
-----END RSA PRIVATE KEY-----


        dotnet add package BCrypt.Net-Next


        using System;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using BCrypt.Net;
using YourNamespace.Models; // Reemplaza con el namespace correcto
using YourNamespace.Data; // Reemplaza con el namespace correcto

namespace YourNamespace.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        private readonly YourDbContext _context; // Reemplaza con el nombre de tu DbContext
        private readonly RSA _rsa;

        public ClientController(YourDbContext context)
        {
            _context = context;

            _rsa = RSA.Create();
            var privateKeyPem = System.IO.File.ReadAllText("path_to_your_private_key.pem");
            _rsa.ImportFromPem(privateKeyPem);
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] Client client)
        {
            try
            {
                var encryptedPasswordBytes = Convert.FromBase64String(client.Password);
                var decryptedPasswordBytes = _rsa.Decrypt(encryptedPasswordBytes, RSAEncryptionPadding.OaepSHA256);
                var decryptedPassword = Encoding.UTF8.GetString(decryptedPasswordBytes);

                var hashedPassword = BCrypt.Net.BCrypt.HashPassword(decryptedPassword);
                client.Password = hashedPassword;

                _context.Clients.Add(client);
                _context.SaveChanges();

                return CreatedAtAction(nameof(Register), new { id = client.Id }, client);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }

        [HttpPost("signIn")]
        public IActionResult SignIn([FromBody] LoginModel login)
        {
            try
            {
                var client = _context.Clients.FirstOrDefault(c => c.Email == login.Email);
                if (client == null)
                {
                    return NotFound("User not found");
                }

                var encryptedPasswordBytes = Convert.FromBase64String(login.Password);
                var decryptedPasswordBytes = _rsa.Decrypt(encryptedPasswordBytes, RSAEncryptionPadding.OaepSHA256);
                var decryptedPassword = Encoding.UTF8.GetString(decryptedPasswordBytes);

                var isMatch = BCrypt.Net.BCrypt.Verify(decryptedPassword, client.Password);
                if (!isMatch)
                {
                    return Unauthorized("Invalid password");
                }

                return Ok("Login successful");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }
    }
}


        using System;
using System.IO;
using System.Security.Cryptography;
using System.Text;
using Org.BouncyCastle.Crypto;
using Org.BouncyCastle.OpenSsl;
using Org.BouncyCastle.Security;

public class RSAEncryption
{
    private readonly AsymmetricKeyParameter _privateKey;

    public RSAEncryption(string privateKeyPem)
    {
        using (var reader = new StringReader(privateKeyPem))
        {
            var pemReader = new PemReader(reader);
            _privateKey = (AsymmetricKeyParameter)pemReader.ReadObject();
        }
    }

    public string Decrypt(string base64Input)
    {
        var inputBytes = Convert.FromBase64String(base64Input);

        var rsa = new RSACryptoServiceProvider();
        rsa.ImportParameters(DotNetUtilities.ToRSAParameters((RsaPrivateCrtKeyParameters)_privateKey));

        var decryptedBytes = rsa.Decrypt(inputBytes, false);
        return Encoding.UTF8.GetString(decryptedBytes);
    }
}


        string privateKeyPem = File.ReadAllText("path/to/private_key.pem");
var rsaEncryption = new RSAEncryption(privateKeyPem);

string encryptedPassword = "encrypted_password_received_from_client";
string decryptedPassword = rsaEncryption.Decrypt(encryptedPassword);

// Comparar la contraseña descifrada con la almacenada en la base de datos


         */

















        /*

### Desencriptar en el Backend en C#

A continuación, se muestra cómo puedes desencriptar el valor cifrado en tu backend en C# usando la clave privada.

1. **Agregar Dependencias**: Asegúrate de tener las dependencias necesarias en tu proyecto. Puedes usar `System.Security.Cryptography` para las operaciones criptográficas.

2. **Desencriptar Datos**: Aquí tienes un ejemplo de cómo podrías hacerlo:

```csharp
using System;
using System.Security.Cryptography;
using System.Text;

public class EncryptionService
{
    private readonly string privateKeyPem = @"-----BEGIN RSA PRIVATE KEY-----
    MIIEpAIBAAKCAQEA5G/6kK8Y8WV2H5aKZow+HyldgnOnOWb99SjdJzgbzQ+gxeME
    k2D0zpqWxDCYQJdBzHgGllxszRMeV/81H/S1Kaf3hx3EqaAYm7tWUM1HQ+13PQ6G
    /QIYVz0XSLuV2qGoF1EwskAxnJ/xIMJbF2yZ4mTXJ+76gNcHTI2YqfLZsDxi7bXj
    uS2bBxyk7Fd3M3QZ+vvk6G3f3ZepHJynY4BzjqkJEFnbRj02erBk4ukGmf0x0+/r
    YDFEBiUIh19FY3lq2BDQzYrkTSmNexqT1ZVPxz2uCuB+frH8AI9V0l45SAoQL1AO
    RQpzrjzToGJJxCCMDbI0i5BbOSleMHF2+RItVwIDAQABAoIBAQC4r33JoTrSmEqe
    A+XsGhbLxlvZ8sXaRVK9HT/0RQsZkXk4mThB0kl1X+OTByt/soRl6L6+RQ++tYx9
    cxuKb1txKlZzT9TuCdxT7Ym9xC1/J9GZXrCeM2UknQ2RpPGQicbM9nkjhXr8TT4O
    YxMpu/yMd7v8N+TwU0bT0IkbMgEr5mLZtNZZRxgY7mS8uXhrArFg1w4YFLMYT/il
    wIGo5G7D9oy8X3i1pkkLgHicj5VXjEvYtpEG8JBGJ7Ktd1Ttr2HCtF+TEgO3GyFV
    Fgn2bxOC4MRvPaqCB1KPHfhYzps+MbTgKgV/2LXt9AzXcngJrZct4+ksce7tOfuX
    KfgD6SLxAoGBAPNmzhtMUVfxP5L/wcGVR/3JfnH22mcR4hYWuE5CrkpR00hCm8Bv
    uGcvhFx7gqGdU6MCCwDg1P9r3i4VzFgB29uoTsbW+yhsE8Y9Fj4/Cfr0d3tkSRVz
    wa8Vc2v9YcKjEKH/JcEOJIFVTqHtwlEO86efHuvbHyUqH0kTw91hiykPAoGBAPmL
    QLKNTnRTWLPfD66Sx8ocQGex7sXxowE6CpCxVhrBOUQJ+2x0l6a9ERvmCXh9c6nS
    yTx9qMKN5PTEJjq8oKgdtvGl2mrKNHkYoSbco5zSXP8J3ITpjT6KeSMEzby2RU9W
    rLM/OGoYyeIZ49Pyh5BJQicZtQv9pIybCx+jUeIbAoGAYczEAl6mRHRhRBDZke4M
    /OyAlQvF5YrfohAkDa2H0IxXtoAsXYkqJ6aLzZ2b5c3iKFiF+YNOo1xlbYfC96kg
    ImrLBhfu5T1HJ1LKTLHVUevIPbyBC+dMZbHrVNSKZ5OE/dDNBOqV/s/Tlk0IW+rg
    le4+57fB7S8iqgp+tkWh/10CgYEA8AzbIHc42fjV9UdRUh4nT9hv7SCF3n6A3Wbp
    AQ5DMXuJKxE3kVkURiPn/vlmKj10p7oC1aD2fQRflDO3PS3SO3+E/c5jPAjFAkBL
    2rd8HEU5jx7M7b2q6ZCpmXetdCoBFh56rVYxVgOq71RCcFpgGzVapzktLaAc4ouu
    0ydoIBUCgYB0kmSeEmst/eyVfNP+94GJfncMslGXe6VYZYY0VkpqPCuXp18J+96c
    6DDpPfb7VjF0HG2fJRA05FPBf97H9OmTVOpssX8v7Ww3BRakxPiStffrdd0iMflW
    XhJraTr2lHtBdlfcxGb3RfERsWJloDl8AxqZxsbCpSYpI3r7mL1BHQ==
    -----END

 RSA PRIVATE KEY-----";

    public string DecryptPassword(string encryptedPassword)
    {
        var rsa = RSA.Create();
        rsa.ImportFromPem(privateKeyPem);

        var encryptedBytes = Convert.FromBase64String(encryptedPassword);
        var decryptedBytes = rsa.Decrypt(encryptedBytes, RSAEncryptionPadding.OaepSHA1);
        return Encoding.UTF8.GetString(decryptedBytes);
    }
}
```

### Descripción del Código

1. **Importar la Clave Privada**:
   ```csharp
   var rsa = RSA.Create();
   rsa.ImportFromPem(privateKeyPem);
   ```
   Esto importa la clave privada desde el formato PEM.

2. **Desencriptar los Datos**:
   ```csharp
   var encryptedBytes = Convert.FromBase64String(encryptedPassword);
   var decryptedBytes = rsa.Decrypt(encryptedBytes, RSAEncryptionPadding.OaepSHA1);
   ```
   Esto convierte la cadena base64 a un array de bytes y luego desencripta esos bytes usando la clave privada y el relleno `RSA-OAEP`.

3. **Convertir los Bytes Desencriptados a una Cadena**:
   ```csharp
   return Encoding.UTF8.GetString(decryptedBytes);
   ```
   Esto convierte los bytes desencriptados a una cadena UTF-8.

### Consideraciones Adicionales

- Asegúrate de que el esquema de relleno utilizado (`RSA-OAEP` con `SHA-1`) sea consistente tanto en la parte de cifrado como en la de descifrado.
- Almacena las claves de manera segura y limita su acceso únicamente a las partes del sistema que realmente necesitan utilizarlas.
- Revisa las mejores prácticas de seguridad y cumplimiento normativo (por ejemplo, PCI-DSS para manejo de datos de tarjetas de crédito) para asegurarte de que estás manejando los datos sensibles adecuadamente.

Esta implementación asegura que puedes cifrar una contraseña en el frontend usando RSA-OAEP y luego descifrarla de manera segura en el backend usando C#.
         */

    }
}
