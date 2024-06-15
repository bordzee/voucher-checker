$(document).ready(function() {
    $.ajax({
        url: 'https://<omada-controller-ip>:<port>/api/v1/voucher',
        method: 'GET',
        headers: {
            'Authorization': 'Bearer <your-access-token>'
        },
        success: function(data) {
            const voucherInfo = data.vouchers.map(voucher => `
                <p>Voucher Code: ${voucher.code}</p>
                <p>Remaining Time: ${voucher.remainingTime}</p>
            `).join('');
            $('#voucher-info').html(voucherInfo);
        },
        error: function(error) {
            console.error('Error fetching voucher data:', error);
        }
    });
});
