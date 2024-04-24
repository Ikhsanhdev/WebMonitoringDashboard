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

  // Function to Open Popup with Message
  function openPopup(title, message) {
    var popup = document.getElementById('popupContainer');
    var popupTitle = document.querySelector('.popup-content h2');
    var popupContent = document.querySelector('.popup-content p');

    popupTitle.textContent = title; // Set judul popup
    popupContent.textContent = message; // Set pesan pada popup
    popup.style.display = 'flex';
  }

  // Function to Close Popup
  function closePopup() {
    var popup = document.getElementById('popupContainer');
    popup.style.display = 'none';
  }

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

      messageText += 'Sekian kami sampaikan, untuk informasi lebih lanjut hubungi 081120217941 (admin CS teknis Higertech)' + '\n' + 'Terimakasih 🙏🏻.';
      //messageObj.contact = '081120217941 (admin CS teknis Higertech)';

      // Membuat elemen untuk pesan
      var messageElement = document.createElement('pre');
      messageElement.textContent = messageText;

      // Membuat tombol "Back"
      var backButton = document.createElement('button');
      backButton.innerHTML = 'Back';
      backButton.className = 'btn btn-outline-info  back-button';
      backButton.onclick = function () {
        window.history.back();
      };

      // Membuat card body
      var cardBody = document.createElement('div');
      cardBody.className = 'card-body';
      cardBody.appendChild(messageElement);
      cardBody.appendChild(backButton);

      // Membuat card
      var card = document.createElement('div');
      card.className = 'card';
      card.appendChild(cardBody);

      // Menampilkan card di dalam elemen dengan id 'javascriptContent'
      document.getElementById('javascriptContent').appendChild(card);

      // Menambahkan event listener untuk tombol "Kirim Pesan"
      document.getElementById('sendButton').addEventListener('click', function () {
        var phoneNumbers = document.getElementById('phoneNumber').value.trim();
        if (!phoneNumbers) {
          alert('Masukkan nomor telepon terlebih dahulu');
          return;
        }

        var phoneNumberList = phoneNumbers.split(/[\s,]+/);
        if (phoneNumberList.length === 0) {
          alert('Masukkan nomor telepon terlebih dahulu');
          return;
        }

        // Menampilkan overlay loading saat memulai pengiriman pesan
        $('#overlay').fadeIn();

        var successfulNumbers = [];
        var failedNumbers = [];

        phoneNumberList.forEach(function (phoneNumber) {
          if (/^\d+$/.test(phoneNumber) && phoneNumber.length >= 10 && phoneNumber.length <= 15) {
            $.ajax({
              url: 'https://live.higertech.com/Api/SendMessageToApi?orgCode=' + orgParam + '&number=' + phoneNumber,
              //url: '/Api/SendMessageToApi?orgCode=' + orgParam + '&number=' + phoneNumber,
              method: 'POST',
              success: function (response) {
                console.log('Pesan berhasil dikirim ke ' + phoneNumber + ':', response);
                successfulNumbers.push(phoneNumber);

                if (successfulNumbers.length + failedNumbers.length === phoneNumberList.length) {
                  var message = '';
                  var title = 'Pesan Terkirim'; // Judul untuk pesan berhasil
                  if (successfulNumbers.length > 0) {
                    message += 'Pesan berhasil dikirim ke nomor : ' + successfulNumbers.join(', ') + '\n';
                  }
                  if (failedNumbers.length > 0) {
                    title = 'Pesan Tidak Terkirim'; // Judul untuk pesan gagal terkirim
                    message += 'Gagal mengirim pesan ke nomor : ' + failedNumbers.join(', ') + '\n';
                  }
                  openPopup(title, message); // Tampilkan popup dengan judul dan pesan hasil pengiriman
                  $('#overlay').fadeOut();
                }
              },
              error: function (xhr, status, error) {
                console.error('Gagal mengirim pesan ke ' + phoneNumber + ':', status, error);
                failedNumbers.push(phoneNumber);

                if (successfulNumbers.length + failedNumbers.length === phoneNumberList.length) {
                  var message = 'Gagal mengirim pesan ke nomor : ' + failedNumbers.join(', ') + '\n'; // Pesan untuk kesalahan pengiriman
                  var title = 'Pesan Tidak Terkirim'; // Judul untuk pesan gagal terkirim
                  if (successfulNumbers.length > 0) {
                    message += ', Pesan berhasil dikirim ke nomor : ' + successfulNumbers.join(', ');
                  }
                  openPopup(title, message); // Tampilkan popup dengan judul dan pesan hasil pengiriman
                  $('#overlay').fadeOut();
                }
              },
            });
          } else {
            failedNumbers.push(phoneNumber);

            if (successfulNumbers.length + failedNumbers.length === phoneNumberList.length) {
              var message = '';
              var title = 'Pesan Tidak Terkirim'; // Judul untuk pesan gagal terkirim
              if (successfulNumbers.length > 0) {
                message += 'Pesan berhasil dikirim ke nomor : ' + successfulNumbers.join(', ') + '\n';
              }
              if (failedNumbers.length > 0) {
                message += 'Gagal mengirim pesan ke nomor : ' + failedNumbers.join(', ') + '\n';
              }
              openPopup(title, message); // Tampilkan popup dengan judul dan pesan hasil pengiriman
              $('#overlay').fadeOut();
            }
          }
        });
      });
    })
    .fail(function (xhr, status, error) {
      console.error('Request failed with status:', status);
    });
});
