using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CouponsClient.BC.BusinessLogic
{
    public class Masking
    {
        public static string MaskCardNumber(string cardNumber)
        {
            if (string.IsNullOrEmpty(cardNumber) || cardNumber.Length < 4)
            {
                return string.Empty;
            }

            return string.Concat("**** **** **** ", cardNumber.Substring(cardNumber.Length - 4));
        }
    }
}
