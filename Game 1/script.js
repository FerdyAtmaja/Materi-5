//membuat variabel canvas untuk memilih elemen HTML dengan id "myCanvas"
var canvas = document.getElementById("myCanvas");
// membuat variabel context sebagai objek untuk menggambar di canvas (pensil/kuas)
var context = canvas.getContext("2d");

var speed = 10; //inisialisasi variabel speed dengan nilai awal 10
gameSpeed = 100; //set kecepatan game (semakin besar semakin lambat)
//mengatur posisi awal bird
var bird = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  vx: 0,
  vy: 1,
};

//membuat variabel pip untuk menampung pip dalam bentuk array
var pip = [];

var gravity = 0.5; //Set kecepatan jatuh 'bird'
var bounce = 4; //Set kekuatan lompatan 'bird
var distance = 100; //Set jarak rongga antara pip atas dan pip bawah
var dir = "left";

document.onkeydown = function (e) {
  if (!e) {
    e = window.e;
  }
  var code = e.keyCode;
  if (e.charCode && codee == 0) {
    code = e.charCode;
  }
  switch (code) {
    case 37: //left
      if (dir != "right") dir = "left";
      break;
    case 38:
      if (dir != "down") dir = "up";
      break;
    case 39:
      if (dir != "left") dir = "right";
      break;
    case 40:
      if (dir != "up") dir = "down";
      break;
  }
};

var b = 0.8;

//MEMBUAT OBJEK 'BIRD'
function makeBird() {
  var image = new Image(); //Deklarasi method Image() menggunakan variable image
  image.src = "img/Superheroes.png"; //Mengambil gambar karakter dari direktori lokal
  context.drawImage(image, bird.x, bird.y, 30, 25); //Untuk menggambarkan gambar ke kanvas

  bird.y += bird.vy;
  bird.vy += gravity;
  if (dir == "up") {
    bird.vy = -bounce;
    dir = "";
  }

  if (bird.y + 10 >= canvas.height) {
    // dir = 'up';
  }
}

//MEMBUAT OBJEK 'PIP'
function makePip() {
  for (p of pip) {
    context.beginPath(); //Method untuk memulai path
    context.rect(p.top.x, p.top.y, p.top.width, p.top.height); //Elemen <rect> digunakan untuk membuat persegi panjang dan variasi bentuk persegi panjang
    context.fillStyle = "grey"; // mengatur warna pada pip atas
    context.fill(); //Method untuk untuk mengisi warna pada objek agar tidak transparan
    context.closePath(); //Method untuk membuat jalur dari titik saat ini kembali ke titik awal.

    p.bottom.y = p.top.height + distance;
    p.bottom.height = canvas.height - p.bottom.y;

    context.beginPath(); //Method untuk memulai path
    context.rect(p.bottom.x, p.bottom.y, p.bottom.width, p.bottom.height); //Elemen <rect> digunakan untuk membuat persegi panjang dan variasi bentuk persegi panjang
    context.fillStyle = "grey"; // mengatur warna pada pip bawah
    context.fill(); //Method untuk untuk mengisi warna pada objek agar tidak transparan
    context.closePath(); //Method untuk membuat jalur dari titik saat ini kembali ke titik awal.

    p.bottom.x -= 1;
    p.top.x -= 1;

    if (p.top.x < -10) {
      pip.shift();
    }

    if (isCollideB(bird, p.bottom) || isCollideT(bird, p.top) || bird.y + 10 >= canvas.height) {
      alert("Your score: " + score);
      window.location.reload();
    }

    if (score % 10 == 0) {
      console.log(distance);
      score += 1;
      distance -= 5;
    }
  }
}

function isCollideB(b, p) {
  return b.x + 10 > p.x && b.x < p.x + 10 && (b.y > p.y || b.y + 10 > p.y);
}

function isCollideT(b, p) {
  return b.x + 10 > p.x && b.x < p.x + 10 && b.y < p.y + p.height;
}

function rnd(min, max) {
  var r = Math.round(Math.random() * (max - min) + min);
  return r - (r % speed);
}

//inisialisasi score dengan nilai 0
var score = 0;
//inisialisasi frame dengan nilai 0
var frame = 0;
(function loop() {
  //reqAnimationFrame digunakan untuk meminta atau memulai suatu animasi dalam bingkai fungsi tersebut
  requestAnimationFrame(function () {
    //menghapus gambar pada canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (frame % gameSpeed == 0) {
      pip.push({
        //set dinding atas
        top: {
          x: canvas.width,
          y: 0,
          height: rnd(70, 140), //set panjang dinding penghalang
          width: 15, // set lebar dinding penghalang
        },

        //set dinding bawah
        bottom: {
          x: canvas.width,
          y: 0,
          height: rnd(100, 160), //set panjang dinding penghalang
          width: 15, // set lebar dinding penghalang
        },
      });
      score++; //menambah 1 score
    }
    makeBird(); //memanggil fungsi 'makeBird()'
    makePip(); //memanggil fungsi 'makePip()'
    frame++; //frame ditambah 1
    loop(); //perulangan terus menerus dari function loop() selama bird tidak menabrak dinding penghalang
  });
})();
