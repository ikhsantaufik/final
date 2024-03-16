// ======================= VERSION OOP ===================================
// =======================             ===================================
// =======================             ===================================
// =======================================================================

// class Testimonial {
//   #quote = ""; // # => membuat property menjadi private
//   #image = "";

//   constructor(quote, image) {
//     this.#quote = quote;
//     this.#image = image;
//   }

//   get quote() {
//     return this.#quote;
//   }

//   get image() {
//     return this.#image;
//   }

//   get ShowTestimonials() {
//     return `<div class="testimonial">
//               <img
//                 class="profile-testimonial"
//                 src=${this.image}
//                 alt="profile"
//               />
//               <p class="quote">${this.quote}</p>
//               <p class="author">${this.author}</p>
//             </div>`;
//   }
// }

// class Author extends Testimonial {
//   #author = "";

//   constructor(author, quote, image) {
//     super(quote, image);
//     this.#author = author;
//   }

//   get author() {
//     return this.#author;
//   }
// }

// class Company extends Testimonial {
//   #company = "";

//   constructor(company, quote, image) {
//     super(quote, image);
//     this.#company = company;
//   }

//   get author() {
//     return this.#company + " Corporation";
//   }
// }

// const user = new Author(
//   "Sabeni",
//   "Callback",
//   "https://png.pngtree.com/png-clipart/20200604/ourmid/pngtree-anime-chibi-character-full-body-blue-tshirt-png-image_2218229.jpg"
// );
// const user1 = new Author(
//   "Melas",
//   "Callback2",
//   "https://png.pngtree.com/png-clipart/20200104/ourmid/pngtree-social-devotional-anime-characters-png-image_2109969.jpg"
// );
// const user2 = new Author(
//   "Putri",
//   "Callback 3",
//   "https://png.pngtree.com/png-clipart/20200104/ourmid/pngtree-smk-nw-anjani-anime-character-png-image_2109968.jpg"
// );

// const user3 = new Author(
//   " Maharani",
//   "Callback 4",
//   "https://i.pinimg.com/474x/87/e0/0a/87e00abf0270fd9bba6df20ba97ee614.jpg"
// );

// let data = [user, user1, user2, user3];
// let dataForHTML = "";

// for (let i = 0; i < data.length; i++) {
//   dataForHTML += data[i].ShowTestimonials;
// }

// document.getElementById("testimonials").innerHTML = dataForHTML;

// ======================= VERSION HOF ===================================
// =======================             ===================================
// =======================             ===================================
// =======================================================================
// const data = [
//   {
//     name: "Supri",
//     comment: "Sangat  semangat",
//     image:
//       "https://png.pngtree.com/png-clipart/20200604/ourmid/pngtree-anime-chibi-character-full-body-blue-tshirt-png-image_2218229.jpg",
//     rating: 1,
//   },
//   {
//     name: "Jhon",
//     comment: "Ganteng Banget",
//     image:
//       "https://png.pngtree.com/png-clipart/20200104/ourmid/pngtree-social-devotional-anime-characters-png-image_2109969.jpg",
//     rating: 1,
//   },
//   {
//     name: "Arif",
//     comment: "Bingung banget",
//     image:
//       "https://png.pngtree.com/png-clipart/20200104/ourmid/pngtree-smk-nw-anjani-anime-character-png-image_2109968.jpg",
//     rating: 2,
//   },
//   {
//     name: "Ikhsan",
//     comment: "Fullstack Development",
//     image:
//       "https://i.pinimg.com/474x/87/e0/0a/87e00abf0270fd9bba6df20ba97ee614.jpg",
//     rating: 5,
//   },
//   {
//     name: "Mageran",
//     comment: "Pinjem 100",
//     image:
//       "https://png.pngtree.com/png-clipart/20200102/ourmid/pngtree-anime-characters-learn-by-reading-png-image_2109248.jpg",
//     rating: 3,
//   },
// ];

// // show all testimonial datas
// function Testimonials() {
//   let dataHTML = "";

//   data.forEach(function (data) {
//     dataHTML += `
//         <div class="testimonial">
//         <img
//           class="profile-testimonial"
//           src="${data.image}"
//         />
//         <p class="quote">${data.comment}</p>
//         <p class="author">- ${data.name}</p>
//       </div>
//     `;
//   });

//   document.getElementById("testimonials").innerHTML = dataHTML;
// }

// Testimonials();

// const FilterTestimonial = (rating) => {
//   let dataHTML = "";

//   const dataFiltered = data.filter((data) => {
//     return data.rating === rating;
//   });

//   if (!dataFiltered.length) {
//     dataHTML += `<h1>Data not found!!</h1>`;
//   } else {
//     dataFiltered.forEach((data) => {
//       console.log(data);
//       dataHTML += `
//           <div class="testimonial">
//           <img
//             class="profile-testimonial"
//             src="${data.image}"
//           />
//           <p class="quote">${data.comment}</p>
//           <p class="author">- ${data.name}</p>
//         </div>
//       `;
//     });
//   }
//   document.getElementById("testimonials").innerHTML = dataHTML;
// };

// ======================= VERSION Async, Promes, Ajax ===================================
// =======================                             ===================================
// =======================                             ===================================
// =======================================================================================
const janji = new Promise((resolve, reject) => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://api.npoint.io/1465052a4f4453fb4ba3", true);
  xhr.onload = () => {
    if (xhr.status === 200) {
      // console.log("berhasil", xhr.response)
      resolve(JSON.parse(xhr.response));
    } else {
      reject("Internal server error!");
      // console.log("gagal", xhr.response)
    }
  };

  xhr.onerror = () => {
    // kesalahan kita sendiri / client
    reject("Network error!");
    // console.log("Network error! Please check your internet connection")
  };
  xhr.send();
});

function html(item) {
  return `<div class="testimonial">
  <img
    class="profile-testimonial"
    src="${item.image}"
  />
  <p class="quote">${item.comment}</p>
  <p class="author">- ${item.author}</p>
  <i class="fa-solid fa-star">${item.rate}</i>
</div>`;
}

async function allTestimonials() {
  let testimonialHTML = ``;
  const testimonialData = await janji;
  const data = testimonialData;
  const datas = data.data;
  // const response = await fetch('https://api.npoint.io/8cb224c89fa998fae96a', {
  //     method: "GET"
  // })
  // const testimonialData = await response.json()

  // console.log(testimonialData)

  datas.forEach((item) => {
    testimonialHTML += html(item);
  });

  document.getElementById("testimonials").innerHTML = testimonialHTML;
}
allTestimonials();

async function filterTestimonials(rate) {
  let testimonialHTML = ``;
  const testimonialData = await janji;
  const data = testimonialData;
  const datas = data.data;
  // const response = await fetch('https://api.npoint.io/8cb224c89fa998fae96a', {
  //     method: "GET"
  // })

  // const testimonialData = await response.json()

  const testimonialFiltered = datas.filter((item) => {
    return item.rate === rate;
  });

  if (testimonialFiltered.length === 0) {
    testimonialHTML = `<h3> Data not found! </h3>`;
  } else {
    testimonialFiltered.forEach((item) => {
      testimonialHTML += html(item);
    });
  }

  document.getElementById("testimonials").innerHTML = testimonialHTML;
}
