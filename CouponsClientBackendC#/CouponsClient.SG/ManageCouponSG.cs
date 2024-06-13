using CouponsClient.BC.Constant;
using CouponsClient.BC.Models;
using CouponsClient.BW.Interfaces.SG;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace CouponsClient.SG
{
    public class ManageCouponSG : IManageCouponSG
    {
        private readonly HttpClient _httpClient;

        public ManageCouponSG(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<IEnumerable<Coupon>> GetCouponsWithDetails()
        {
            HttpResponseMessage response = await _httpClient.GetAsync(URLCoupons_API.URL + "coupon/getCouponsWithDetails.php");
            if (!response.IsSuccessStatusCode)
            {
                throw new HttpRequestException($"Cannot retrieve coupons from {URLCoupons_API.URL + "coupon/getCouponsWithDetails.php"}");
            }

            var couponsString = await response.Content.ReadAsStringAsync();

            if (string.IsNullOrEmpty(couponsString))
            {
                return null;
            }

            var coupons = JsonSerializer.Deserialize<IEnumerable<Coupon>>(couponsString);

            return coupons;
        }

        public async Task<Coupon> GetCouponWithDetailsById(int id)
        {
            HttpResponseMessage response = await _httpClient.GetAsync(URLCoupons_API.URL + "coupon/getCouponWithDetailsById.php?id=" + id);
            if (!response.IsSuccessStatusCode)
            {
                throw new HttpRequestException($"Cannot retrieve coupon from {URLCoupons_API.URL + "coupon/getCouponWithDetailsById.php?id=" + id}");
            }

            var couponString = await response.Content.ReadAsStringAsync();

            if (string.IsNullOrEmpty(couponString))
            {
                return null;
            }

            var coupon = JsonSerializer.Deserialize<Coupon>(couponString);

            return coupon;
        }
    }
}
