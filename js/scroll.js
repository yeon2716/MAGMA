function loco(){
    gsap.registerPlugin(ScrollTrigger);
    
    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
    
    const locoScroll = new LocomotiveScroll({
      el: document.querySelector("#main"),
      smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    // Locomotive Scroll이 업데이트될 때마다 스크롤 트리거에 업데이트하라고 말합니다(동기식 위치 지정)
    locoScroll.on("scroll", ScrollTrigger.update);
    
    // tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
    //ScrollTrigger에 Locomotive Scroll이  hijacking things하고 있으므로 "smooth-scroll" 요소에 대해 이러한 프록시 방법을 사용하도록 지시합니다
    ScrollTrigger.scrollerProxy("#main", {
      scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
      }, // we don't have to define a scrollLeft because we're only scrolling vertically.//scrollLeft 정의할 필요가 없습니다. 왜냐하면 우리는 오직 수직으로 스크롤하기 때문입니다.
      getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
      },
      // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
      // LocomotiveScroll은 모바일 장치에서 완전히 다르게 처리합니다. 심지어 용기를 변형시키지도 않습니다. 따라서 올바른 행동을 취하고 불안감을 피하기 위해서는 위치가 고정된 것을 핀으로 고정해야 합니다. 우리는 용기(기관차 스크롤 제어 요소)에 변형이 적용되는지 확인함으로써 그것을 감지합니다
      pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });
    
    
    
    
    
    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    //창이 업데이트될 때마다 스크롤 트리거를 새로 고치고 LocomotiveScroll을 업데이트해야 합니다.
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    
    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    //모든 것이 설정된 후, 스크롤 트리거를 새로 고치고() 고정 등을 위해 패딩이 추가되었을 수 있으므로 기관차 스크롤을 업데이트합니다.
    ScrollTrigger.refresh();
    }
    loco()
  //---------------------------------------------


  //page2
  let clutter="";

  //.textContent --> 텍스트 콘텐츠을 가져온다
  let page2_h2 = document.querySelector('#page2>h2').textContent.split("");
  page2_h2.forEach((dets)=>{
    clutter += `<span>${dets}</span>`;
    document.querySelector('#page2>h2').innerHTML=clutter;
  })

  gsap.to("#page2>h2>span",{
    scrollTrigger:{
        trigger:"#page2>h2>span",
        start:"top bottom",
        end:"bottom top",
        scroller:"#main",
        scrub:.5,
    },
    stagger:0.2,
    color:"#fff"
  })


  gsap.to("#page2>.background",{
    scrollTrigger:{
        trigger:"#page2",
        start:"top top",
        end:"bottom bottom",
        scroller:"#main",
        scrub:true,
    },
    opacity:0
  })
//page3
function canvas(){
  const canvas = document.querySelector("#page3>canvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


window.addEventListener("resize", function () {
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
render();
});

function files(index) {
var data = `
./img/frames00007.png
./img/frames00010.png
./img/frames00013.png
./img/frames00016.png
./img/frames00019.png
./img/frames00022.png
./img/frames00025.png
./img/frames00028.png
./img/frames00031.png
./img/frames00034.png
./img/frames00037.png
./img/frames00040.png
./img/frames00043.png
./img/frames00046.png
./img/frames00049.png
./img/frames00052.png
./img/frames00055.png
./img/frames00058.png
./img/frames00061.png
./img/frames00064.png
./img/frames00067.png
./img/frames00070.png
./img/frames00073.png
./img/frames00076.png
./img/frames00079.png
./img/frames00082.png
./img/frames00085.png
./img/frames00088.png
./img/frames00091.png
./img/frames00094.png
./img/frames00097.png
./img/frames00100.png
./img/frames00103.png
./img/frames00106.png
./img/frames00109.png
./img/frames00112.png
./img/frames00115.png
./img/frames00118.png
./img/frames00121.png
./img/frames00124.png
./img/frames00127.png
./img/frames00130.png
./img/frames00133.png
./img/frames00136.png
./img/frames00139.png
./img/frames00142.png
./img/frames00145.png
./img/frames00148.png
./img/frames00151.png
./img/frames00154.png
./img/frames00157.png
./img/frames00160.png
./img/frames00163.png
./img/frames00166.png
./img/frames00169.png
./img/frames00172.png
./img/frames00175.png
./img/frames00178.png
./img/frames00181.png
./img/frames00184.png
./img/frames00187.png
./img/frames00190.png
./img/frames00193.png
./img/frames00196.png
./img/frames00199.png
./img/frames00202.png
`;
return data.split("\n")[index];
}

const frameCount = 67;

const images = [];
const imageSeq = {
frame: 1,
};

for (let i = 0; i < frameCount; i++) {
const img = new Image();
img.src = files(i);
images.push(img);
}
console.log(images)

gsap.to(imageSeq, {
frame: frameCount - 1,//애니메이션의 마지막 프레임
snap: "frame", //스크롤 위치에 따라 프레임이 변경
ease: `none`,
scrollTrigger: {
  scrub: .5,
  trigger: `#page3`,
  start: `top top`,
  end: `250% top`,
  scroller: `#main`,// 스크롤을 감지하는 컨테이너 엘리먼트
},
onUpdate: render,
});

images[1].onload = render;

function render() {
//console.log(imageSeq)
scaleImage(images[imageSeq.frame], context);
}

function scaleImage(img, ctx) {
var canvas = ctx.canvas;
var hRatio = canvas.width / img.width;
var vRatio = canvas.height / img.height;
var ratio = Math.max(hRatio, vRatio);
var centerShift_x = (canvas.width - img.width * ratio) / 2;
var centerShift_y = (canvas.height - img.height * ratio) / 2;
ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.drawImage(
  img,
  0,
  0,
  img.width,
  img.height,
  centerShift_x,
  centerShift_y,
  img.width * ratio,
  img.height * ratio
);
}
ScrollTrigger.create({

trigger: "#page3",
pin: true,
scroller: `#main`,
start: `top top`,
end: `250% top`,
});
}
canvas()

// page4
let clutter2="";

//.textContent --> 텍스트 콘텐츠을 가져온다
let page4_h2 = document.querySelector('#page4>h2').textContent.split("");
page4_h2.forEach((dets)=>{
  clutter2 += `<span>${dets}</span>`;
  document.querySelector('#page4>h2').innerHTML=clutter2;
})

gsap.to("#page4>h2>span",{
  scrollTrigger:{
      trigger:"#page4>h2>span",
      start:"top bottom",
      end:"bottom top",
      scroller:"#main",
      scrub:.5,
  },
  stagger:0.2,
  color:"#fff"
})


gsap.to("#page4>.background",{
  scrollTrigger:{
      trigger:"#page4",
      start:"top top",
      end:"bottom bottom",
      scroller:"#main",
      scrub:true,
  },
  opacity:0
})

//page5
function canvas5(){
  const canvas = document.querySelector("#page5>canvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


window.addEventListener("resize", function () {
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
render();
});

function files(index) {
var data = `./img/bridges00004.png
./img/bridges00007.png
./img/bridges00010.png
./img/bridges00013.png
./img/bridges00016.png
./img/bridges00019.png
./img/bridges00022.png
./img/bridges00025.png
./img/bridges00028.png
./img/bridges00031.png
./img/bridges00034.png
./img/bridges00037.png
./img/bridges00040.png
./img/bridges00043.png
./img/bridges00046.png
./img/bridges00049.png
./img/bridges00052.png
./img/bridges00055.png
./img/bridges00058.png
./img/bridges00061.png
./img/bridges00064.png
./img/bridges00067.png
./img/bridges00070.png
./img/bridges00073.png
./img/bridges00076.png
./img/bridges00079.png
./img/bridges00082.png
./img/bridges00085.png
./img/bridges00088.png
./img/bridges00091.png
./img/bridges00094.png
./img/bridges00097.png
./img/bridges00100.png
./img/bridges00103.png
./img/bridges00106.png
./img/bridges00109.png
./img/bridges00112.png
./img/bridges00115.png
./img/bridges00118.png
./img/bridges00121.png
./img/bridges00124.png
./img/bridges00127.png
./img/bridges00130.png
./img/bridges00133.png
./img/bridges00136.png
./img/bridges00139.png
./img/bridges00142.png
./img/bridges00145.png
./img/bridges00148.png
./img/bridges00151.png
./img/bridges00154.png
./img/bridges00157.png
./img/bridges00160.png
./img/bridges00163.png
./img/bridges00202.png
`;
return data.split("\n")[index];
}

const frameCount = 55;

const images = [];
const imageSeq = {
frame: 1,
};

for (let i = 0; i < frameCount; i++) {
const img = new Image();
img.src = files(i);
images.push(img);
}
console.log(images)

gsap.to(imageSeq, {
frame: frameCount - 1,//애니메이션의 마지막 프레임
snap: "frame", //스크롤 위치에 따라 프레임이 변경
ease: `none`,
scrollTrigger: {
  scrub: .5,
  trigger: `#page5`,
  start: `top top`,
  end: `250% top`,
  scroller: `#main`,// 스크롤을 감지하는 컨테이너 엘리먼트
},
onUpdate: render,
});

images[1].onload = render;

function render() {
//console.log(imageSeq)
scaleImage(images[imageSeq.frame], context);
}

function scaleImage(img, ctx) {
var canvas = ctx.canvas;
var hRatio = canvas.width / img.width;
var vRatio = canvas.height / img.height;
var ratio = Math.max(hRatio, vRatio);
var centerShift_x = (canvas.width - img.width * ratio) / 2;
var centerShift_y = (canvas.height - img.height * ratio) / 2;
ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.drawImage(
  img,
  0,
  0,
  img.width,
  img.height,
  centerShift_x,
  centerShift_y,
  img.width * ratio,
  img.height * ratio
);
}
ScrollTrigger.create({
trigger: "#page5",
pin: true,
scroller: `#main`,
start: `top top`,
end: `250% top`,
});
}
canvas5()


//page6
let clutter3="";

//.textContent --> 텍스트 콘텐츠을 가져온다
let page6_h2 = document.querySelector('#page6>h2').textContent.split("");
page6_h2.forEach((dets)=>{
  clutter3 += `<span>${dets}</span>`;
  document.querySelector('#page6>h2').innerHTML=clutter3;
})

gsap.to("#page6>h2>span",{
  scrollTrigger:{
      trigger:"#page6>h2>span",
      start:"top bottom",
      end:"bottom top",
      scroller:"#main",
      scrub:.5,
  },
  stagger:0.2,
  color:"#fff"
})


//page7
function canvas7(){
    const canvas = document.querySelector("#page7>canvas");
  const context = canvas.getContext("2d");
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  
  window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  render();
  });
  
  function files(index) {
  var data = `https://thisismagma.com/assets/home/lore/seq/1.webp?2
  https://thisismagma.com/assets/home/lore/seq/2.webp?2
  https://thisismagma.com/assets/home/lore/seq/3.webp?2
  https://thisismagma.com/assets/home/lore/seq/4.webp?2
  https://thisismagma.com/assets/home/lore/seq/5.webp?2
  https://thisismagma.com/assets/home/lore/seq/6.webp?2
  https://thisismagma.com/assets/home/lore/seq/7.webp?2
  https://thisismagma.com/assets/home/lore/seq/8.webp?2
  https://thisismagma.com/assets/home/lore/seq/9.webp?2
  https://thisismagma.com/assets/home/lore/seq/10.webp?2
  https://thisismagma.com/assets/home/lore/seq/11.webp?2
  https://thisismagma.com/assets/home/lore/seq/12.webp?2
  https://thisismagma.com/assets/home/lore/seq/13.webp?2
  https://thisismagma.com/assets/home/lore/seq/14.webp?2
  https://thisismagma.com/assets/home/lore/seq/15.webp?2
  https://thisismagma.com/assets/home/lore/seq/16.webp?2
  https://thisismagma.com/assets/home/lore/seq/17.webp?2
  https://thisismagma.com/assets/home/lore/seq/18.webp?2
  https://thisismagma.com/assets/home/lore/seq/19.webp?2
  https://thisismagma.com/assets/home/lore/seq/20.webp?2
  https://thisismagma.com/assets/home/lore/seq/21.webp?2
  https://thisismagma.com/assets/home/lore/seq/22.webp?2
  https://thisismagma.com/assets/home/lore/seq/23.webp?2
  https://thisismagma.com/assets/home/lore/seq/24.webp?2
  https://thisismagma.com/assets/home/lore/seq/25.webp?2
  https://thisismagma.com/assets/home/lore/seq/26.webp?2
  https://thisismagma.com/assets/home/lore/seq/27.webp?2
  https://thisismagma.com/assets/home/lore/seq/28.webp?2
  https://thisismagma.com/assets/home/lore/seq/29.webp?2
  https://thisismagma.com/assets/home/lore/seq/30.webp?2
  https://thisismagma.com/assets/home/lore/seq/31.webp?2
  https://thisismagma.com/assets/home/lore/seq/32.webp?2
  https://thisismagma.com/assets/home/lore/seq/33.webp?2
  https://thisismagma.com/assets/home/lore/seq/34.webp?2
  https://thisismagma.com/assets/home/lore/seq/35.webp?2
  https://thisismagma.com/assets/home/lore/seq/36.webp?2
  https://thisismagma.com/assets/home/lore/seq/37.webp?2
  https://thisismagma.com/assets/home/lore/seq/38.webp?2
  https://thisismagma.com/assets/home/lore/seq/39.webp?2
  https://thisismagma.com/assets/home/lore/seq/40.webp?2
  https://thisismagma.com/assets/home/lore/seq/41.webp?2
  https://thisismagma.com/assets/home/lore/seq/42.webp?2
  https://thisismagma.com/assets/home/lore/seq/43.webp?2
  https://thisismagma.com/assets/home/lore/seq/44.webp?2
  https://thisismagma.com/assets/home/lore/seq/45.webp?2
  https://thisismagma.com/assets/home/lore/seq/46.webp?2
  https://thisismagma.com/assets/home/lore/seq/47.webp?2
  https://thisismagma.com/assets/home/lore/seq/48.webp?2
  https://thisismagma.com/assets/home/lore/seq/49.webp?2
  https://thisismagma.com/assets/home/lore/seq/50.webp?2
  https://thisismagma.com/assets/home/lore/seq/51.webp?2
  https://thisismagma.com/assets/home/lore/seq/52.webp?2
  https://thisismagma.com/assets/home/lore/seq/53.webp?2
  https://thisismagma.com/assets/home/lore/seq/54.webp?2
  https://thisismagma.com/assets/home/lore/seq/55.webp?2
  https://thisismagma.com/assets/home/lore/seq/56.webp?2
  https://thisismagma.com/assets/home/lore/seq/57.webp?2
  https://thisismagma.com/assets/home/lore/seq/58.webp?2
  https://thisismagma.com/assets/home/lore/seq/59.webp?2
  https://thisismagma.com/assets/home/lore/seq/60.webp?2
  https://thisismagma.com/assets/home/lore/seq/61.webp?2
  https://thisismagma.com/assets/home/lore/seq/62.webp?2
  https://thisismagma.com/assets/home/lore/seq/63.webp?2
  https://thisismagma.com/assets/home/lore/seq/64.webp?2
  https://thisismagma.com/assets/home/lore/seq/65.webp?2
  https://thisismagma.com/assets/home/lore/seq/66.webp?2
  https://thisismagma.com/assets/home/lore/seq/67.webp?2
  https://thisismagma.com/assets/home/lore/seq/68.webp?2
  https://thisismagma.com/assets/home/lore/seq/69.webp?2
  https://thisismagma.com/assets/home/lore/seq/70.webp?2
  https://thisismagma.com/assets/home/lore/seq/71.webp?2
  https://thisismagma.com/assets/home/lore/seq/72.webp?2
  https://thisismagma.com/assets/home/lore/seq/73.webp?2
  https://thisismagma.com/assets/home/lore/seq/74.webp?2
  https://thisismagma.com/assets/home/lore/seq/75.webp?2
  https://thisismagma.com/assets/home/lore/seq/76.webp?2
  https://thisismagma.com/assets/home/lore/seq/77.webp?2
  https://thisismagma.com/assets/home/lore/seq/78.webp?2
  https://thisismagma.com/assets/home/lore/seq/79.webp?2
  https://thisismagma.com/assets/home/lore/seq/80.webp?2
  https://thisismagma.com/assets/home/lore/seq/81.webp?2
  https://thisismagma.com/assets/home/lore/seq/82.webp?2
  https://thisismagma.com/assets/home/lore/seq/83.webp?2
  https://thisismagma.com/assets/home/lore/seq/84.webp?2
  https://thisismagma.com/assets/home/lore/seq/85.webp?2
  https://thisismagma.com/assets/home/lore/seq/86.webp?2
  https://thisismagma.com/assets/home/lore/seq/87.webp?2
  https://thisismagma.com/assets/home/lore/seq/88.webp?2
  https://thisismagma.com/assets/home/lore/seq/89.webp?2
  https://thisismagma.com/assets/home/lore/seq/90.webp?2
  https://thisismagma.com/assets/home/lore/seq/91.webp?2
  https://thisismagma.com/assets/home/lore/seq/92.webp?2
  https://thisismagma.com/assets/home/lore/seq/93.webp?2
  https://thisismagma.com/assets/home/lore/seq/94.webp?2
  https://thisismagma.com/assets/home/lore/seq/95.webp?2
  https://thisismagma.com/assets/home/lore/seq/96.webp?2
  https://thisismagma.com/assets/home/lore/seq/97.webp?2
  https://thisismagma.com/assets/home/lore/seq/98.webp?2
  https://thisismagma.com/assets/home/lore/seq/99.webp?2
  https://thisismagma.com/assets/home/lore/seq/100.webp?2
  https://thisismagma.com/assets/home/lore/seq/101.webp?2
  https://thisismagma.com/assets/home/lore/seq/102.webp?2
  https://thisismagma.com/assets/home/lore/seq/103.webp?2
  https://thisismagma.com/assets/home/lore/seq/104.webp?2
  https://thisismagma.com/assets/home/lore/seq/105.webp?2
  https://thisismagma.com/assets/home/lore/seq/106.webp?2
  https://thisismagma.com/assets/home/lore/seq/107.webp?2
  https://thisismagma.com/assets/home/lore/seq/108.webp?2
  https://thisismagma.com/assets/home/lore/seq/109.webp?2
  https://thisismagma.com/assets/home/lore/seq/110.webp?2
  https://thisismagma.com/assets/home/lore/seq/111.webp?2
  https://thisismagma.com/assets/home/lore/seq/112.webp?2
  https://thisismagma.com/assets/home/lore/seq/113.webp?2
  https://thisismagma.com/assets/home/lore/seq/114.webp?2
  https://thisismagma.com/assets/home/lore/seq/115.webp?2
  https://thisismagma.com/assets/home/lore/seq/116.webp?2
  https://thisismagma.com/assets/home/lore/seq/117.webp?2
  https://thisismagma.com/assets/home/lore/seq/118.webp?2
  https://thisismagma.com/assets/home/lore/seq/119.webp?2
  https://thisismagma.com/assets/home/lore/seq/120.webp?2
  https://thisismagma.com/assets/home/lore/seq/121.webp?2
  https://thisismagma.com/assets/home/lore/seq/122.webp?2
  https://thisismagma.com/assets/home/lore/seq/123.webp?2
  https://thisismagma.com/assets/home/lore/seq/124.webp?2
  https://thisismagma.com/assets/home/lore/seq/125.webp?2
  https://thisismagma.com/assets/home/lore/seq/126.webp?2
  https://thisismagma.com/assets/home/lore/seq/127.webp?2
  https://thisismagma.com/assets/home/lore/seq/128.webp?2
  https://thisismagma.com/assets/home/lore/seq/129.webp?2
  https://thisismagma.com/assets/home/lore/seq/130.webp?2
  https://thisismagma.com/assets/home/lore/seq/131.webp?2
  https://thisismagma.com/assets/home/lore/seq/132.webp?2
  https://thisismagma.com/assets/home/lore/seq/133.webp?2
  https://thisismagma.com/assets/home/lore/seq/134.webp?2
  https://thisismagma.com/assets/home/lore/seq/135.webp?2
  https://thisismagma.com/assets/home/lore/seq/136.webp?2
  `;
  return data.split("\n")[index];
  }
  
  const frameCount = 136;
  
  const images = [];
  const imageSeq = {
  frame: 1,
  };
  
  for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = files(i);
  images.push(img);
  }
  console.log(images)
  
  gsap.to(imageSeq, {
  frame: frameCount - 1,//애니메이션의 마지막 프레임
  snap: "frame", //스크롤 위치에 따라 프레임이 변경
  ease: `none`,
  scrollTrigger: {
    scrub: .5,
    trigger: `#page7`,
    start: `top top`,
    end: `250% top`,
    scroller: `#main`,// 스크롤을 감지하는 컨테이너 엘리먼트
  },
  onUpdate: render,
  });
  
  images[1].onload = render;
  
  function render() {
  //console.log(imageSeq)
  scaleImage(images[imageSeq.frame], context);
  }
  
  function scaleImage(img, ctx) {
  var canvas = ctx.canvas;
  var hRatio = canvas.width / img.width;
  var vRatio = canvas.height / img.height;
  var ratio = Math.max(hRatio, vRatio);
  var centerShift_x = (canvas.width - img.width * ratio) / 2;
  var centerShift_y = (canvas.height - img.height * ratio) / 2;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(
    img,
    0,
    0,
    img.width,
    img.height,
    centerShift_x,
    centerShift_y,
    img.width * ratio,
    img.height * ratio
  );
  }
  ScrollTrigger.create({
  trigger: "#page7",
  pin: true,
  scroller: `#main`,
  start: `top top`,
  end: `250% top`,
  });
  }
  canvas7()

  gsap.to("#page7",{
    scrollTrigger:{
      trigger:`#page7`,
      start:`top top`,
      end:`bottom 40%`,
      scroller:`#main`,
      scrub:true
    },
    opacity:1
  })
  gsap.to(".page7-cir",{
    scrollTrigger:{
      trigger:`.page7-cir`,
      start:`top center`,
      end:`bottom 40%`,
      scroller:`#main`,
      scrub:0.5
    },
    scale:1.5,
    //circle이 커지고 난뒤 할일
    onComplete:()=>{
      gsap.to(".page7-cir",{
        scrollTrigger:{
          trigger:`.page7-cir`,
          start:`bottom 20%`,
          end:`bottom top`,
          scroller:`#main`,
          scrub:1
        },
       opacity:0
      })
      
    }
  })



  gsap.to(".page7-cir-inner",{
    scrollTrigger:{
      trigger:`.page7-cir-inner`,
      start:`top center`,
      end:`bottom 40%`,
      scroller:`#main`,
      scrub:true
    },
    backgroundColor : `#0a3bce91`,
  })
  
  

//page8
gsap.to("#page8",{
    scrollTrigger: {
      trigger: "#page8",
      start: "top top",
      end: "+=300% top",
      scroller: "#main",
      pin:true
    },
   
  })


  let clutter4 = "";

document.querySelector("#page8 h2").textContent.split("").forEach(function(dets){
    clutter4 += `<span>${dets}</span>`

    document.querySelector("#page8 h2").innerHTML = clutter4;
})

gsap.fromTo("#page8 h2>span",{
    y:'100%',rotate:30
},{
    scrollTrigger:{
        trigger:'#page8 h2>span',
        start:'top 80%',
        end:'bottom center',
        scroller:"#main",
        scrub:5
    },
    stagger:0.2,
    rotate:0,
    y:0
})

gsap.fromTo('.page8-inner',{opacity:0},{
    scrollTrigger:{
        trigger:'.page8-inner',
        start:'top top',
        end:'+=50% top',
        scroller:"#main",
        scrub:1,
    },
    opacity:1,
    onComplete:()=>{
       gsap.to("#page8 video",{
        scale:1
       } );
    }
})

//page11
function canvas11(){
    const canvas = document.querySelector("#page11 canvas");
  const context = canvas.getContext("2d");
  
  canvas.width = window.innerWidth/5;
  canvas.height = window.innerHeight/3.5;
  
  
  window.addEventListener("resize", function () {
  canvas.width = window.innerWidth/5;
  canvas.height = window.innerHeight/3.5;
  render();
  });
  
  function files(index) {
  var data = `https://thisismagma.com/assets/home/roadmap/seq/1.webp
  https://thisismagma.com/assets/home/roadmap/seq/2.webp
  https://thisismagma.com/assets/home/roadmap/seq/3.webp
  https://thisismagma.com/assets/home/roadmap/seq/4.webp
  https://thisismagma.com/assets/home/roadmap/seq/5.webp
  https://thisismagma.com/assets/home/roadmap/seq/6.webp
  https://thisismagma.com/assets/home/roadmap/seq/7.webp
  https://thisismagma.com/assets/home/roadmap/seq/8.webp
  https://thisismagma.com/assets/home/roadmap/seq/9.webp
  https://thisismagma.com/assets/home/roadmap/seq/10.webp
  https://thisismagma.com/assets/home/roadmap/seq/11.webp
  https://thisismagma.com/assets/home/roadmap/seq/12.webp
  https://thisismagma.com/assets/home/roadmap/seq/13.webp
  https://thisismagma.com/assets/home/roadmap/seq/14.webp
  https://thisismagma.com/assets/home/roadmap/seq/15.webp
  https://thisismagma.com/assets/home/roadmap/seq/16.webp
  https://thisismagma.com/assets/home/roadmap/seq/17.webp
  https://thisismagma.com/assets/home/roadmap/seq/18.webp
  https://thisismagma.com/assets/home/roadmap/seq/19.webp
  https://thisismagma.com/assets/home/roadmap/seq/20.webp
  https://thisismagma.com/assets/home/roadmap/seq/21.webp
  https://thisismagma.com/assets/home/roadmap/seq/22.webp
  https://thisismagma.com/assets/home/roadmap/seq/23.webp
  https://thisismagma.com/assets/home/roadmap/seq/24.webp
  https://thisismagma.com/assets/home/roadmap/seq/25.webp
  https://thisismagma.com/assets/home/roadmap/seq/26.webp
  https://thisismagma.com/assets/home/roadmap/seq/27.webp
  https://thisismagma.com/assets/home/roadmap/seq/28.webp
  https://thisismagma.com/assets/home/roadmap/seq/29.webp
  https://thisismagma.com/assets/home/roadmap/seq/30.webp
  https://thisismagma.com/assets/home/roadmap/seq/31.webp
  https://thisismagma.com/assets/home/roadmap/seq/32.webp
  https://thisismagma.com/assets/home/roadmap/seq/33.webp
  https://thisismagma.com/assets/home/roadmap/seq/34.webp
  https://thisismagma.com/assets/home/roadmap/seq/35.webp
  https://thisismagma.com/assets/home/roadmap/seq/36.webp
  https://thisismagma.com/assets/home/roadmap/seq/37.webp
  https://thisismagma.com/assets/home/roadmap/seq/38.webp
  https://thisismagma.com/assets/home/roadmap/seq/39.webp
  https://thisismagma.com/assets/home/roadmap/seq/40.webp
  https://thisismagma.com/assets/home/roadmap/seq/41.webp
  https://thisismagma.com/assets/home/roadmap/seq/42.webp
  https://thisismagma.com/assets/home/roadmap/seq/43.webp
  https://thisismagma.com/assets/home/roadmap/seq/44.webp
  https://thisismagma.com/assets/home/roadmap/seq/45.webp
  https://thisismagma.com/assets/home/roadmap/seq/46.webp
  https://thisismagma.com/assets/home/roadmap/seq/47.webp
  https://thisismagma.com/assets/home/roadmap/seq/48.webp
  https://thisismagma.com/assets/home/roadmap/seq/49.webp
  https://thisismagma.com/assets/home/roadmap/seq/50.webp
  https://thisismagma.com/assets/home/roadmap/seq/51.webp
  https://thisismagma.com/assets/home/roadmap/seq/52.webp
  https://thisismagma.com/assets/home/roadmap/seq/53.webp
  https://thisismagma.com/assets/home/roadmap/seq/54.webp
  https://thisismagma.com/assets/home/roadmap/seq/55.webp
  https://thisismagma.com/assets/home/roadmap/seq/56.webp
  https://thisismagma.com/assets/home/roadmap/seq/57.webp
  https://thisismagma.com/assets/home/roadmap/seq/58.webp
  https://thisismagma.com/assets/home/roadmap/seq/59.webp
  https://thisismagma.com/assets/home/roadmap/seq/60.webp
  https://thisismagma.com/assets/home/roadmap/seq/61.webp
  https://thisismagma.com/assets/home/roadmap/seq/62.webp
  https://thisismagma.com/assets/home/roadmap/seq/63.webp
  https://thisismagma.com/assets/home/roadmap/seq/64.webp
  https://thisismagma.com/assets/home/roadmap/seq/65.webp
  https://thisismagma.com/assets/home/roadmap/seq/66.webp
  https://thisismagma.com/assets/home/roadmap/seq/67.webp
  https://thisismagma.com/assets/home/roadmap/seq/68.webp
  https://thisismagma.com/assets/home/roadmap/seq/69.webp
  https://thisismagma.com/assets/home/roadmap/seq/70.webp
  https://thisismagma.com/assets/home/roadmap/seq/71.webp
  https://thisismagma.com/assets/home/roadmap/seq/72.webp
  https://thisismagma.com/assets/home/roadmap/seq/73.webp
  https://thisismagma.com/assets/home/roadmap/seq/74.webp
  https://thisismagma.com/assets/home/roadmap/seq/75.webp
  `;
  return data.split("\n")[index];
  }
  
  const frameCount = 75;
  
  const images = [];
  const imageSeq = {
  frame: 1,
  };
  
  for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = files(i);
  images.push(img);
  }
  console.log(images)
  
  gsap.to(imageSeq, {
  frame: frameCount - 1,//애니메이션의 마지막 프레임
  snap: "frame", //스크롤 위치에 따라 프레임이 변경
  ease: `none`,
  scrollTrigger: {
    scrub: .2,
    trigger: `#page11 .mg-roadmap-right`,
    start: `top top`,
    end: `bottom 80%`,
    scroller: `#main`,// 스크롤을 감지하는 컨테이너 엘리먼트
  },
  onUpdate: render,
  });
  
  images[1].onload = render;
  
  function render() {
  //console.log(imageSeq)
  scaleImage(images[imageSeq.frame], context);
  }
  
  function scaleImage(img, ctx) {
  var canvas = ctx.canvas;
  var hRatio = canvas.width / img.width;
  var vRatio = canvas.height / img.height;
  var ratio = Math.max(hRatio, vRatio);
  var centerShift_x = (canvas.width - img.width * ratio) / 2;
  var centerShift_y = (canvas.height - img.height * ratio) / 2;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(
    img,
    0,
    0,
    img.width,
    img.height,
    centerShift_x,
    centerShift_y,
    img.width * ratio,
    img.height * ratio
  );
  }
  ScrollTrigger.create({
  trigger: "#page11 .mg-roadmap-right",
  pin: true,
  scroller: `#main`,
  start: `top top`,
  end: `bottom 80%`,
  });
  }
  canvas11()

//sticky영역의 left
let mgi = document.querySelectorAll('.mg-roadmap-item');

mgi.forEach((item)=>{
    let item_count=item.querySelector('.mg-roadmap-count');
    let item_title=item.querySelector('.mg-roadmap-title');
    let item_text=item.querySelector('.mg-roadmap-text');
    gsap.fromTo([item_count,item_title,item_text],{opacity:0},{
        scrollTrigger:{
            trigger:item,
            start:"top center",
            end:"bottom center",
            scrub:0.5,
            scroller:"#main"
        },
        opacity:1,
        stagger:0.2
    })
})











  //전체 background
  gsap.fromTo("#main",{backgroundColor:"#093dcc"},{
    scrollTrigger:{
        trigger:"#page9",
        start:"top top",
        end:"bottom center",
        scroller:"#main",
        scrube:true,
    },
    backgroundColor:"#03268e"
  })