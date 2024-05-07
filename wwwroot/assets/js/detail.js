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

  // Function to Open Popup with Message
  function openPopup(title, message) {
    var popup = document.getElementById('popupContainer');
    var popupTitle = document.querySelector('.popup-content h2');
    var popupContent = document.querySelector('.popup-content p');

    popupTitle.textContent = title; // Set judul popup
    popupContent.textContent = message; // Set pesan pada popup
    popup.style.display = 'flex';

    // Delay untuk memberikan efek animasi
    setTimeout(function () {
      popup.querySelector('.popup-content').style.opacity = 1;
      popup.querySelector('.popup-content').style.transform = 'translateY(0)';
    }, 50); // Sesuaikan dengan kebutuhan, delay minimal untuk efek animasi
  }

  // Function to Close Popup
  function closePopup() {
    var popup = document.getElementById('popupContainer');
    var popupContent = popup.querySelector('.popup-content');
    popupContent.style.opacity = 0; // Animasi fade out
    popupContent.style.transform = 'translateY(-20px)'; // Geser ke atas
    setTimeout(function () {
      popup.style.display = 'none'; // Setelah animasi selesai, sembunyikan popup
    }, 300); // Sesuaikan dengan durasi animasi
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
          messageObj.offlineData.push({
            index: index + 1,
            slug: entry.slug,
            info: 'Alat tidak mengirim data',
            lastReadingDateString: moment(entry.lastReadingAt).format('DD/MM/YYYY, HH:mm:ss'),
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
        moment().format('DD/MM/YYYY, HH:mm:ss') + // Gunakan waktu saat ini
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

      // Event listener untuk tombol "Kirim Pesan" ke ID grup
      document.getElementById('sendGroupButton').addEventListener('click', function () {
        var idGrup = document.getElementById('idGrup').value.trim();
        if (!idGrup) {
          alert('Masukkan ID Grup terlebih dahulu');
          return;
        }

        // Menampilkan overlay loading saat memulai pengiriman pesan
        openLoadingPopup();

        // Mengirim pesan ke ID grup
        $.ajax({
          url: 'https://live.higertech.com/Api/SendMessageGroup?orgCode=' + orgParam + '&number=' + idGrup,
          //url: '/Api/SendMessageGroup?orgCode=' + orgParam + '&number=' + idGrup,
          method: 'POST',
          beforeSend: function () {
            // Tampilkan loading
            $('#loading').show();
            console.log('Mengirim pesan ke ' + idGrup + '...');
          }, // Mengirim orgCode, ID grup, dan pesan
          success: function (response) {
            closeLoadingPopup(); // Tutup loading popup
            openSuccessPopup(); // Buka popup sukses
          },
          error: function (xhr, status, error) {
            closeLoadingPopup(); // Tutup loading popup
            openErrorPopup(); // Buka popup error
            console.error('Error sending message:', error); // Tampilkan pesan error di konsol
          },
        });
      });

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
        openLoadingPopup();

        var successfulNumbers = [];
        var failedNumbers = [];

        phoneNumberList.forEach(function (phoneNumber) {
          if (/^\d+$/.test(phoneNumber) && phoneNumber.length >= 10 && phoneNumber.length <= 15) {
            $.ajax({
              url: 'https://live.higertech.com/Api/SendMessageToApi?orgCode=' + orgParam + '&number=' + phoneNumber,
              //url: '/Api/SendMessageToApi?orgCode=' + orgParam + '&number=' + phoneNumber,
              method: 'POST',
              beforeSend: function () {
                // Tampilkan loading
                $('#loading').show();
                console.log('Mengirim pesan ke ' + phoneNumber + '...');
              },
              success: function (response) {
                console.log('Pesan berhasil dikirim ke ' + phoneNumber + ':', response);
                successfulNumbers.push(phoneNumber);

                // Tampilkan sukses popup jika semua nomor berhasil dikirim
                if (successfulNumbers.length === phoneNumberList.length) {
                  closeLoadingPopup(); // Tutup loading popup
                  openSuccessPopup(); // Buka popup sukses
                }
              },
              error: function (xhr, status, error) {
                console.error('Gagal mengirim pesan ke ' + phoneNumber + ':', status, error);
                failedNumbers.push(phoneNumber);

                // Tampilkan error popup jika ada yang gagal dikirim
                if (failedNumbers.length > 0) {
                  closeLoadingPopup(); // Tutup loading popup
                  openErrorPopup(); // Buka popup error
                }
              },
            });
          } else {
            failedNumbers.push(phoneNumber);
            console.error('Nomor telepon tidak valid:', phoneNumber);
          }
        });
      });
    })
    .fail(function (xhr, status, error) {
      console.error('Request failed with status:', status);
    });
});
