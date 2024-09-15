// src/ImageContainer.js
import React from 'react';

function ImageContainer() {
  const imageUrls = [
    'https://media.istockphoto.com/id/1158623408/photo/indian-hindu-veg-thali-food-platter-selective-focus.webp?a=1&b=1&s=612x612&w=0&k=20&c=WOCrpfQJRlyY9W84K4iAaIfJVCWbIs_UroFYKK9y1Qg=',
    'https://plus.unsplash.com/premium_photo-1673108852141-e8c3c22a4a22?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Zm9vZCUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D',
    'https://media.istockphoto.com/id/1295633127/photo/grilled-chicken-meat-and-fresh-vegetable-salad-of-tomato-avocado-lettuce-and-spinach-healthy.webp?a=1&b=1&s=612x612&w=0&k=20&c=c3rHwkr6ErBR7LleKDhrIoEhgB5mjiaB_GSuWVebxC4=',
    'https://media.istockphoto.com/id/838927480/photo/onam-sadya-on-a-banana-leaf.jpg?s=612x612&w=0&k=20&c=gwLv5UccfysMWJn2nEPXoQfczkCTBylrmenTmHonHrc=',
    'https://media.istockphoto.com/id/1256242420/photo/indian-food-platter-or-thali-contains-vegetarian-recipes-a-complete-meal.webp?a=1&b=1&s=612x612&w=0&k=20&c=O2bRrs2ibWNjI4j2xEGxDTPfXYqrVsXab3qmALjmixg=',
    'https://media.istockphoto.com/id/1305516603/photo/shahi-paneer-or-paneer-kadai.jpg?s=612x612&w=0&k=20&c=V5xD4I1ciIjtyoH0FzuNeFnAl7oV9RJAoNs52X6pgE4=',
    'https://media.istockphoto.com/id/495204032/photo/fresh-tasty-burger.jpg?s=612x612&w=0&k=20&c=k6X_gSHlo-WdKsqTnfBjoEbjdhrlz6RNhUs23ivpIxk=',
    'https://media.istockphoto.com/id/187248625/photo/pepperoni-pizza.jpg?s=612x612&w=0&k=20&c=QHrM65XqDQd3Z50r5cT2qV4nwctw6rNMM1JTlGEEVzI=',
    'https://media.istockphoto.com/id/483137365/photo/asian-chow-mein-noodles.jpg?s=612x612&w=0&k=20&c=aVkPKpDkiAM7CxTFinQBax0i-nm-ybzWimrJRyPePcg=',
    'https://media.istockphoto.com/id/1501531610/photo/delicious-plate-of-italian-food-pink-sauce-pasta-closeup-on-the-bowl-horizontal-top-view.jpg?s=612x612&w=0&k=20&c=2Qsub96MM7y0YXfEedBYSbovZX-5yVW6FDp6Khoo-aQ=',
  ];

  return (
    <div className="overflow-hidden relative w-full p-4 ">
      <div className="relative w-full h-full flex overflow-hidden">
        <div className="animate-scroll flex">
          {imageUrls.map((url, index) => (
            <div key={index} className="flex-shrink-0">
              <img
                src={url}
                alt={`Random ${index}`}
                className="w-[150px] h-[150px] p-2 border-2 bg-black rounded-full object-cover mr-4"
              />
            </div>
          ))}
          {/* Duplicate set of images for seamless scroll */}
          {imageUrls.map((url, index) => (
            <div key={index + 10} className="flex-shrink-0">
              <img
                src={url}
                alt={`Random ${index}`}
                className="w-[150px] h-[150px] p-2 border-2 bg-black rounded-full object-cover mr-4"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ImageContainer;
