aktif();
//tampil();

function aktif() {
	$('#data-list2').html(`
						    <div class="d-flex justify-content-center">
		<div class="spinner-border text-danger" role="status">
			<span class="sr-only">Loading...</span>
		</div>
	  </div>
						`)
     $.ajax({
        //url: 'https://smk-smeatdkosgoro2pdg.sch.id/lulusapi/aktifapi.php',
		url: 'http://localhost/PRESENSI/2/lulusapi/aktifapi.php',
        type: 'get',
        dataType: 'json',
        success: function(result){
			//console.log(result.status);
            if(result.status == "sukses"){
                let datas = result.data;				
                $.each(datas, function(i, data){
					//console.log(data.aktif);
						if(data.aktif == "AKTIF")
							{
								$('#data-list2').html(`
									<div class="row mt-3 justify-content-center">
										<form id=form-user method=POST>
										<font size=2><b>Jadwal Pemgumuman : </b>&nbsp;
											<select name=aktif>
												<option><font size=2> ` + data.aktif + ` </option>
												<option><font size=2>TIDAK AKTIF</option>
											</select>&nbsp;
											<button id=simpan class='btn btn-success btn-sm'><font size=2>Simpan</button><form>
											<br>						
									</div>
								`) 
							}
						if(data.aktif == "TIDAK AKTIF")
							{
								$('#data-list2').html(`
									<div class="row mt-3 justify-content-center">
										<form id=form-user method=POST>
										<font size=2><b>Jadwal Pemgumuman : </b>&nbsp;
											<select name=aktif>
												<option><font size=2> ` + data.aktif + ` </option>
												<option><font size=2>AKTIF</option>
											</select>&nbsp;
											<button id=simpan class='btn btn-success btn-sm'><font size=2>Simpan</button><form>
											<br>						
									</div>
								`) 
							}
                });

					$(document).ready(function (e) {
					$("#form-user").on('submit',(function(e) {
						e.preventDefault();
						$.ajax({
							url: "https://smk-smeatdkosgoro2pdg.sch.id/lulusapi/editaktif.php",
							//url: "https://localhost/lulusapi/editaktif.php",
							type: "POST",
							data:  new FormData(this),
							contentType: false,
							cache: false,
							processData:false,
							success: function(data)
							{
								 alert("Jadwal aktif berhasil di Update"); 
							//alert(data);
							},
							error: function() 
							{ alert("Data Error..");
							} 	        
					   }); return false;
					   //tampil();
					}));
				});
				

        }
		}
    });
}



function tampil() {
	//var coba = "cobaaa";
//console.log(coba);
$('#data-list').html(` <div class="d-flex justify-content-center">
		<div class="spinner-border text-danger" role="status">
			<span class="sr-only">Loading...</span>
		</div>
	  </div>  `);

$('#data-list1').html(``);
 $.ajax({
        //url: 'https://smk-smeatdkosgoro2pdg.sch.id/lulusapi/tampil5.php',
		url: 'http://192.168.43.120/PRESENSI/2/lulusapi/tampil5.php',
		//url: 'http://localhost/PRESENSI/2/lulusapi/tampil5.php',
        type: 'get',
        dataType: 'json',
			data: {
            'id' : $('#search-input').val()
        },
        success: function(result){
            if(result.status == "sukses1"){
                let datas = result.data;				
                $.each(datas, function(i, data){
					
							$('#data-list').html('');
								$('#data-list').append(`
									<form id=form-lulus5 method=POST enctype=multipart/form-data>
									<div class="row mt-3 justify-content-center">								
										<table border=0 width=100% >
											<tr><td ><font size=3><b>NIP / NUP :</td>
											</tr><tr>
											<td style='padding-left:35px';><font size=3 color=blue><b> ` + data.no + `
											<input type=hidden name=no id=no value= ` + data.no + ` ></td></tr>

											<tr><td><b>Nama Pegawai :</td></tr><tr><td style='padding-left:35px';><font size=3 color=blue><b> ` + data.nama + `
											<input type=hidden name='nama' id='nama' value='` + data.nama + `'></td></tr>

											<tr><td><b>Jenis Absen :</td></tr><tr><td style='padding-left:35px';><b>
													<select name=jenis id=jenis>
														<option><font size=2>Masuk</option>
														<option><font size=2>Pulang</option>
													</select></td></tr>

											<tr><td><b>Ket. Absen :</td></tr><tr><td style='padding-left:35px';><b>
													<select name=ket id=ket>
														<option><font size=2>WFO (Work From Office)</option>
														<option><font size=2>WFH ( Work From Home)</option>
														<option><font size=2>Sakit</option>
														<option><font size=2>Izin</option>
														<option><font size=2>Dinas Luar</option>
														<option><font size=2>Pendidikan / Diklat</option>
														<option><font size=2>Cuti</option>
													</select></td></tr>

											<tr><td><b>Hari / Tanggal :</td></tr><tr><td style='padding-left:35px';><font size=3 color=blue><b> ` + data.tanggal + `
											<input type=hidden name=tgl id=tgl value= ` + data.waktu + ` ></td></tr>

											<tr><td><b>Jam :</td></tr><tr><td style='padding-left:35px';><font size=3 color=blue><b> ` + data.jam + `
											<input type=hidden name=jam id=jam value= ` + data.jam + ` ></td></tr>

											<tr><td><b>Foto Selfie :</td></tr><tr><td style='padding-left:35px';><b><font size=2> <input type=file name=file id='but_take' required></td></tr>
											<tr><td colspan=2 height=50><center><input type=submit class='btn btn-primary btn-sm' value=Simpan ></td></tr>
											<tr><td>&nbsp</td></tr>
										</table><br><p>								
									</div></form>
								`)
									
                });
					
					lulus();
					
        }
		if(result.status == "gagal"){ 
			$('#data-list').html(``);
			$('#data-list1').html("<font color=red><b>Data Tidak Ditemukan</b></font>") }
		}
    });
}

	

$('#search-button').on('click', function(){
    tampil();    
});

$('#search-input').on('keyup', function (e){
    if(e.keyCode === 13)
    {
        tampil();
    }
});

function lulus() {

					$(document).ready(function (e) {
					$("#form-lulus5").on('submit',(function(e) {
						spin();
						e.preventDefault();						
						$.ajax({
							//url: "https://smk-smeatdkosgoro2pdg.sch.id/lulusapi/editlulus.php",
							url: "http://192.168.43.120/PRESENSI/2/lulusapi/editlulus.php",
							type: "POST",
							data:  new FormData(this),
							contentType: false,
							cache: false,
							processData:false,
							success: function(data)
							{	 
								 alert("Data berhasil di Update"); 
							$('#data-list3').html('');
							//javascript:history.back();
							location.reload();
							
							},
							error: function() 
							{ alert("Data Error..");
							} 	        
					   }); return false;
					   					   
					}));		

				});			
			}

	function spin() {
	$('#data-list3').html(`
						    <div class="d-flex justify-content-center">
		<div class="spinner-border text-danger" role="status">
			<span class="sr-only">Loading...</span>
		</div>
	  </div>
						`)
	}



        $(document).ready(function(){

            // take picture from camera
            $('#but_take').click(function(){      
                navigator.camera.getPicture(onSuccess, onFail, { quality: 20,
                    destinationType: Camera.DestinationType.FILE_URL 
                });
            });

            // upload select 
            $("#but_select").click(function(){
                navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
                    sourceType: Camera.PictureSourceType.PHOTOLIBRARY, 
                    allowEdit: true,
                    destinationType: Camera.DestinationType.FILE_URI
                });
                
            });

            // Change image source and upload photo to server
            function onSuccess(imageURI) {

                // Set image source
                var image = document.getElementById('img');
                image.src = imageURI  + '?' + Math.random();
                
                var options = new FileUploadOptions();
                options.fileKey = "file";
                options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
                options.mimeType = "image/jpeg";
                
                var params = {};
                params.value1 = "test";
                params.value2 = "param";

                options.params = params;
                options.chunkedMode = false;

                var ft = new FileTransfer();
                ft.upload(imageURI, "http://demo.makitweb.com/phonegap_camera/upload.php", function(result){
                    alert('successfully uploaded ' + result.response);
                }, function(error){
                    //alert('error : ' + JSON.stringify(error));
                }, options);
                
            }

            function onFail(message) {
                //alert('Failed because: ' + message);
            }

        });
        
        