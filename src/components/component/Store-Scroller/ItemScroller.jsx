
import './scroll.css';

const ItemScroller = () => {
  const items = [
    { imgSrc: '/ser.png', label: 'Mobiles' },
    { imgSrc: '/ser.png', label: 'Television & Soundbar' },
    { imgSrc: '/ser.png', label: 'Television & Soundbar' },
    { imgSrc: '/ser.png', label: 'Television & Soundbar' },
    { imgSrc: '/ser.png', label: 'Television & Soundbar' },
    { imgSrc: '/ser.png', label: 'Refrigerators' },
    { imgSrc: '/ser.png', label: 'Washing Machines' },
    { imgSrc: '/ser.png', label: 'Tablets & Wearables' },
   
    // Add more items as needed
  ];

  return (
    <div className="w-full flex flex-col items-center py-6">
      <div className="custom-scrollbar overflow-x-auto flex space-x-32 px-10 pb-8">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center w-36 cursor-pointer"
          >
            <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
              <img src={item.imgSrc} alt={item.label} className="w-full h-full object-cover" />
            </div>
            <span className="mt-2 text-center text-sm font-semibold">{item.label}</span>
          </div>
        ))}
      </div>
      {/* Wrapper div to control the scroll bar width */}
      <div className="custom-scrollbar-container">
        <div className="custom-scrollbar"></div>
      </div>
    </div>
  );
};

export default ItemScroller;
