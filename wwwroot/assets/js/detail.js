$(document).ready(function () {
  var fetchData = function (organizationCode) {
    return $.ajax({
      url: '/Api/GetStationByOrgCode?orgCode=' + organizationCode,
      method: 'GET',
      dataType: 'json',
    });
  };

  const urlParams = new URLSearchParams(window.location.search);
  const orgParam = urlParams.get('orgCode');

  // Mendapatkan tanggal saat ini
  var currentDate = new Date();
  var formattedDate = currentDate
    .toLocaleString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
    .replace(/\./g, ':');

  fetchData(orgParam)
    .done(function (response) {
      var result = JSON.parse(response);
      const data = result.data;

      // Filter hanya entri dengan devicestatus 'offline'
      var offlineData = data.filter(function (entry) {
        return entry.deviceStatus === 'offline';
      });

      // Menghitung total pos
      var totalPos = data.length;

      // Membuat objek pesan
      var messageObj = {
        totalPos: totalPos,
        formattedDate: formattedDate,
        balaiName: data.length > 0 ? data[0].balaiName : 'Nama Balai',
        website: 'http://' + (data.length > 0 ? data[0].subDomain : 'contoh') + '.higertech.com/',
        offlineData: [],
      };

      // Jika semua pos aktif, tambahkan keterangan
      if (offlineData.length === 0) {
        messageObj.keterangan = 'Alat Aktif Semua';
      } else {
        // Loop melalui setiap entri offline dan tambahkan ke pesan
        offlineData.forEach(function (entry, index) {
          var lastReadingDate = moment(entry.lastReadingAt);
          var lastReadingDateString = lastReadingDate.isValid() ? moment(entry.lastReadingAt).format('DD/MM/YYYY, HH:mm:ss') : '00/00/0000, 00:00';

          messageObj.offlineData.push({
            index: index + 1,
            slug: entry.slug,
            info: 'Alat tidak mengirim data',
            lastReadingDateString: lastReadingDateString,
          });
        });
      }
      messageObj.contact = '081120217941 (admin CS teknis Higertech)';

      // Membuat pesan teks dari objek pesan
      var messageText =
        'Selamat siang\n' +
        'Bapak/Ibu Yth,\n' +
        'Dari total ' +
        messageObj.totalPos +
        ' pos, kami informasikan rekapitulasi data pos offline :\n' +
        'Tanggal    : ' +
        messageObj.formattedDate +
        '\n' +
        'Instansi   : ' +
        messageObj.balaiName +
        '\n' +
        'Website    : ' +
        messageObj.website +
        '\n';

      if (messageObj.offlineData.length > 0) {
        messageObj.offlineData.forEach(function (dataEntry) {
          messageText += dataEntry.index + '. ' + dataEntry.slug + ' ' + dataEntry.info + ',  ' + dataEntry.lastReadingDateString + ' localtime\n';
        });
      } else {
        messageText += 'Keterangan : ' + messageObj.keterangan + '\n';
      }

      messageText += 'Sekian kami sampaikan, untuk informasi lebih lanjut hubungi ' + messageObj.contact + '\n' + 'Terimakasih 🙏🏻.';

      // Menambahkan kontak admin
      messageObj.contact = '081120217941 (admin CS teknis Higertech)';

      // Menampilkan pesan di dalam elemen body
      var preElement = document.createElement('pre');
      preElement.textContent = messageText;
      document.body.appendChild(preElement);

      // Mengatur nilai default pada input textbox nomor telepon
      const defaultPhoneNumber = urlParams.get('phoneNumber') || '';
      document.getElementById('phoneNumber').value = defaultPhoneNumber;

      // Menambahkan event listener untuk tombol "Kirim Pesan"
      document.getElementById('sendButton').addEventListener('click', function () {
        var phoneNumber = document.getElementById('phoneNumber').value.trim(); // Mendapatkan nomor telepon dari input textbox
        if (!phoneNumber) {
          alert('Masukkan nomor telepon terlebih dahulu');
          return;
        }

        // var messageText =
        //   'Selamat siang\n' +
        //   'Bapak/Ibu Yth,\n' +
        //   'Dari total ' +
        //   messageObj.totalPos +
        //   ' pos, kami informasikan rekapitulasi data pos offline :\n' +
        //   'Tanggal    : ' +
        //   messageObj.formattedDate +
        //   '\n' +
        //   'Instansi   : ' +
        //   messageObj.balaiName +
        //   '\n' +
        //   'Website    : ' +
        //   messageObj.website +
        //   '\n';

        // if (messageObj.offlineData.length > 0) {
        //   messageObj.offlineData.forEach(function (dataEntry) {
        //     messageText += dataEntry.index + '. ' + dataEntry.slug + ' ' + dataEntry.info + ',  ' + dataEntry.lastReadingDateString + ' localtime\n';
        //   });
        // } else {
        //   messageText += 'Keterangan : ' + messageObj.keterangan + '\n';
        // }

        // messageText += 'Sekian kami sampaikan, untuk informasi lebih lanjut hubungi ' + messageObj.contact + '\n' + 'Terimakasih 🙏🏻.';

        // Mengirim pesan dengan metode POST ke URL yang ditentukan
        $.ajax({
          url: 'https://live.higertech.com/Api/SendMessageToApi?orgCode=' + orgParam + '&number=' + phoneNumber,
          //url: '/Api/SendMessageToApi?orgCode=' + orgParam + '&number=' + phoneNumber,
          method: 'POST',
          success: function (response) {
            console.log('Pesan berhasil dikirim:', response);
            alert('Pesan berhasil dikirim!');
          },
          error: function (xhr, status, error) {
            console.error('Gagal mengirim pesan:', status, error);
            alert('Gagal mengirim pesan!');
          },
        });
      });

      var backButton = document.createElement('button');
      backButton.innerHTML = 'Back';
      backButton.onclick = function () {
        window.history.back();
      };
      document.body.appendChild(backButton);
    })
    .fail(function (xhr, status, error) {
      console.error('Request failed with status:', status);
    });
});
